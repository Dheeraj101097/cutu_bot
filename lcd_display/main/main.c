#include <stdio.h>
#include <string.h>
#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "esp_log.h"
#include "esp_wifi.h"
#include "esp_event.h"
#include "nvs_flash.h"
#include "mqtt_client.h" // ESP-IDF MQTT Component

// Drivers
#include "driver/gpio.h"
#include "driver/spi_master.h"
#include "esp_lcd_panel_io.h"
#include "esp_lcd_panel_vendor.h"
#include "esp_lcd_panel_ops.h"
#include "esp_lcd_gc9a01.h"
#include "jpeg_decoder.h"

static const char *TAG = "ESP_MQTT";

// --- CONFIG ---
#define WIFI_SSID "Airtel_sidd_0833" // YOUR WIFI NAME
#define WIFI_PASS "air63939"         // YOUR WIFI PASSWORD
#define MQTT_BROKER "mqtt://broker.emqx.io:1883"
#define MQTT_TOPIC "dheeraj/imagetest"
// --- YOUR WORKING PINOUT ---
#define LCD_HOST SPI2_HOST
#define PIN_NUM_SCLK 10
#define PIN_NUM_MOSI 11
#define PIN_NUM_MISO -1
#define PIN_NUM_CS 9
#define PIN_NUM_DC 8
#define PIN_NUM_RST 12
#define PIN_NUM_BK 40
#define LCD_H_RES 240
#define LCD_V_RES 240

// Globals
esp_lcd_panel_handle_t panel_handle = NULL;
uint8_t *incoming_img_buffer = NULL;
int current_img_pos = 0;

// --- 1. DISPLAY FUNCTION (Using your working logic) ---
void display_image(uint8_t *data, size_t len)
{
  ESP_LOGI(TAG, "Decoding Image (%d bytes)...", len);

  esp_jpeg_image_cfg_t jpeg_cfg = {
      .indata = data,
      .indata_size = len,
      .out_format = JPEG_IMAGE_FORMAT_RGB565,
      .out_scale = JPEG_IMAGE_SCALE_0,
      .flags = {.swap_color_bytes = 1} // Your working setting
  };

  esp_jpeg_image_output_t info;
  esp_jpeg_get_image_info(&jpeg_cfg, &info);

  uint8_t *pixels = heap_caps_malloc(info.output_len, MALLOC_CAP_SPIRAM);
  if (!pixels)
  {
    ESP_LOGE(TAG, "Pixel Alloc Failed");
    return;
  }

  jpeg_cfg.outbuf = pixels;
  jpeg_cfg.outbuf_size = info.output_len;

  esp_jpeg_image_output_t outimg;
  if (esp_jpeg_decode(&jpeg_cfg, &outimg) == ESP_OK)
  {

    // Use your EXACT working draw logic
    int w = (outimg.width < LCD_H_RES) ? outimg.width : LCD_H_RES;
    int h = (outimg.height < LCD_V_RES) ? outimg.height : LCD_V_RES;

    esp_lcd_panel_draw_bitmap(panel_handle, 0, 0, w, h, (uint16_t *)pixels);
    ESP_LOGI(TAG, "Image Drawn Successfully!");
  }
  else
  {
    ESP_LOGE(TAG, "JPEG Decode Error");
  }
  free(pixels);
}

// --- 2. MQTT EVENT HANDLER ---
static void mqtt_event_handler(void *handler_args, esp_event_base_t base, int32_t event_id, void *event_data)
{
  esp_mqtt_event_handle_t event = event_data;

  switch ((esp_mqtt_event_id_t)event_id)
  {
  case MQTT_EVENT_CONNECTED:
    ESP_LOGI(TAG, "MQTT Connected. Subscribing...");
    esp_mqtt_client_subscribe(event->client, MQTT_TOPIC, 1);
    break;

  case MQTT_EVENT_DATA:
    if (event->topic_len > 0 && strncmp(event->topic, MQTT_TOPIC, event->topic_len) != 0)
      return;

    // First Chunk
    if (event->current_data_offset == 0)
    {
      ESP_LOGI(TAG, "Incoming Image Total Size: %d", event->total_data_len);
      if (incoming_img_buffer)
        free(incoming_img_buffer);
      incoming_img_buffer = heap_caps_malloc(event->total_data_len, MALLOC_CAP_SPIRAM);
      current_img_pos = 0;
      if (!incoming_img_buffer)
        return;
    }

    // Append Data
    if (incoming_img_buffer)
    {
      memcpy(incoming_img_buffer + current_img_pos, event->data, event->data_len);
      current_img_pos += event->data_len;

      // Complete?
      if (current_img_pos >= event->total_data_len)
      {
        ESP_LOGI(TAG, "Download Complete. Displaying...");
        display_image(incoming_img_buffer, event->total_data_len);
        free(incoming_img_buffer);
        incoming_img_buffer = NULL;
        current_img_pos = 0;
      }
    }
    break;
  default:
    break;
  }
}

// --- 3. WIFI HANDLER ---
static void wifi_event_handler(void *arg, esp_event_base_t event_base, int32_t event_id, void *event_data)
{
  if (event_id == WIFI_EVENT_STA_START)
    esp_wifi_connect();
  else if (event_id == WIFI_EVENT_STA_DISCONNECTED)
  {
    esp_wifi_connect();
    ESP_LOGI(TAG, "Wi-Fi lost, retrying...");
  }
  else if (event_id == IP_EVENT_STA_GOT_IP)
  {
    ESP_LOGI(TAG, "Wi-Fi Connected! Starting MQTT...");

    esp_mqtt_client_config_t mqtt_cfg = {.broker.address.uri = MQTT_BROKER};
    esp_mqtt_client_handle_t client = esp_mqtt_client_init(&mqtt_cfg);
    esp_mqtt_client_register_event(client, ESP_EVENT_ANY_ID, mqtt_event_handler, client);
    esp_mqtt_client_start(client);
  }
}

void app_main(void)
{
  // ---------------------------------------------------------
  // 1. LCD INITIALIZATION (COPIED EXACTLY FROM YOUR WORKING CODE)
  // ---------------------------------------------------------

  // Setup Backlight
  gpio_config_t bk_gpio_config = {.mode = GPIO_MODE_OUTPUT, .pin_bit_mask = 1ULL << PIN_NUM_BK};
  gpio_config(&bk_gpio_config);
  gpio_set_level(PIN_NUM_BK, 1);

  // SPI Bus
  spi_bus_config_t buscfg = {
      .sclk_io_num = PIN_NUM_SCLK,
      .mosi_io_num = PIN_NUM_MOSI,
      .miso_io_num = PIN_NUM_MISO,
      .quadwp_io_num = -1,
      .quadhd_io_num = -1,
      .max_transfer_sz = LCD_H_RES * LCD_V_RES * 2 + 4096,
  };
  ESP_ERROR_CHECK(spi_bus_initialize(LCD_HOST, &buscfg, SPI_DMA_CH_AUTO));

  // Panel IO (20MHz as per your working code)
  esp_lcd_panel_io_handle_t io_handle = NULL;
  esp_lcd_panel_io_spi_config_t io_config = {
      .dc_gpio_num = PIN_NUM_DC,
      .cs_gpio_num = PIN_NUM_CS,
      .pclk_hz = 20 * 1000 * 1000,
      .lcd_cmd_bits = 8,
      .lcd_param_bits = 8,
      .spi_mode = 0,
      .trans_queue_depth = 10,
  };
  ESP_ERROR_CHECK(esp_lcd_new_panel_io_spi((esp_lcd_spi_bus_handle_t)LCD_HOST, &io_config, &io_handle));

  // Driver Init
  esp_lcd_panel_handle_t temp_handle = NULL;
  esp_lcd_panel_dev_config_t panel_config = {
      .reset_gpio_num = PIN_NUM_RST,
      .rgb_ele_order = LCD_RGB_ELEMENT_ORDER_BGR,
      .bits_per_pixel = 16,
  };
  ESP_ERROR_CHECK(esp_lcd_new_panel_gc9a01(io_handle, &panel_config, &temp_handle));
  panel_handle = temp_handle;

  // YOUR CRITICAL WORKING SETTINGS
  esp_lcd_panel_reset(panel_handle);
  esp_lcd_panel_init(panel_handle);
  esp_lcd_panel_invert_color(panel_handle, true);  // <-- KEEP TRUE
  esp_lcd_panel_mirror(panel_handle, true, false); // <-- MIRROR X FIX
  esp_lcd_panel_disp_on_off(panel_handle, true);

  // ---------------------------------------------------------
  // 2. WI-FI & MQTT INIT
  // ---------------------------------------------------------
  nvs_flash_init();
  esp_netif_init();
  esp_event_loop_create_default();
  esp_netif_create_default_wifi_sta();

  wifi_init_config_t cfg = WIFI_INIT_CONFIG_DEFAULT();
  esp_wifi_init(&cfg);

  esp_event_handler_instance_register(WIFI_EVENT, ESP_EVENT_ANY_ID, &wifi_event_handler, NULL, NULL);
  esp_event_handler_instance_register(IP_EVENT, IP_EVENT_STA_GOT_IP, &wifi_event_handler, NULL, NULL);

  wifi_config_t wifi_config = {.sta = {.ssid = WIFI_SSID, .password = WIFI_PASS}};
  esp_wifi_set_mode(WIFI_MODE_STA);
  esp_wifi_set_config(WIFI_IF_STA, &wifi_config);
  esp_wifi_start();
}