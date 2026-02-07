// #include <stdio.h>
// #include <string.h>
// #include "freertos/FreeRTOS.h"
// #include "freertos/task.h"
// #include "esp_log.h"
// #include "driver/gpio.h"
// #include "driver/spi_master.h"

// // Hardware Drivers
// #include "esp_lcd_panel_io.h"
// #include "esp_lcd_panel_vendor.h"
// #include "esp_lcd_panel_ops.h"
// #include "esp_lcd_gc9a01.h"

// // JPEG Decoder (New API)
// #include "jpeg_decoder.h"

// static const char *TAG = "Waveshare_1.28";

// // --- Waveshare ESP32-S3-LCD-1.28 Pinout (From Wiki) ---
// #define LCD_HOST SPI2_HOST
// #define PIN_NUM_SCLK 10
// #define PIN_NUM_MOSI 11
// #define PIN_NUM_MISO -1 // Not used for LCD
// #define PIN_NUM_CS 9
// #define PIN_NUM_DC 8
// #define PIN_NUM_RST 12
// #define PIN_NUM_BK 40 // Backlight
// #define LCD_H_RES 240
// #define LCD_V_RES 240

// // --- Embedded Image Data ---
// // These names match the filename "image.jpg" in CMakeLists.txt
// extern const uint8_t image_jpg_start[] asm("_binary_image_jpg_start");
// extern const uint8_t image_jpg_end[] asm("_binary_image_jpg_end");

// void app_main(void)
// {
//   ESP_LOGI(TAG, "Starting Project...");

//   // 1. Backlight
//   gpio_config_t bk_gpio_config = {
//       .mode = GPIO_MODE_OUTPUT,
//       .pin_bit_mask = 1ULL << PIN_NUM_BK};
//   gpio_config(&bk_gpio_config);
//   gpio_set_level(PIN_NUM_BK, 1);

//   // 2. SPI Init
//   spi_bus_config_t buscfg = {
//       .sclk_io_num = PIN_NUM_SCLK,
//       .mosi_io_num = PIN_NUM_MOSI,
//       .miso_io_num = PIN_NUM_MISO,
//       .quadwp_io_num = -1,
//       .quadhd_io_num = -1,
//       .max_transfer_sz = LCD_H_RES * LCD_V_RES * 2 + 1024,
//   };
//   ESP_ERROR_CHECK(spi_bus_initialize(LCD_HOST, &buscfg, SPI_DMA_CH_AUTO));

//   // 3. Panel IO
//   esp_lcd_panel_io_handle_t io_handle = NULL;
//   esp_lcd_panel_io_spi_config_t io_config = {
//       .dc_gpio_num = PIN_NUM_DC,
//       .cs_gpio_num = PIN_NUM_CS,
//       .pclk_hz = 40 * 1000 * 1000,
//       .lcd_cmd_bits = 8,
//       .lcd_param_bits = 8,
//       .spi_mode = 0,
//       .trans_queue_depth = 10,
//   };
//   ESP_ERROR_CHECK(esp_lcd_new_panel_io_spi((esp_lcd_spi_bus_handle_t)LCD_HOST, &io_config, &io_handle));

//   // 4. Driver Init
//   esp_lcd_panel_handle_t panel_handle = NULL;
//   esp_lcd_panel_dev_config_t panel_config = {
//       .reset_gpio_num = PIN_NUM_RST,
//       .rgb_ele_order = LCD_RGB_ELEMENT_ORDER_BGR,
//       .bits_per_pixel = 16,
//   };
//   ESP_ERROR_CHECK(esp_lcd_new_panel_gc9a01(io_handle, &panel_config, &panel_handle));

//   esp_lcd_panel_reset(panel_handle);
//   esp_lcd_panel_init(panel_handle);
//   esp_lcd_panel_invert_color(panel_handle, true);
//   esp_lcd_panel_disp_on_off(panel_handle, true);

//   // 5. JPEG Decoding
//   ESP_LOGI(TAG, "Decoding JPEG...");

//   esp_jpeg_image_cfg_t jpeg_cfg = {
//       .indata = (uint8_t *)image_jpg_start,
//       .indata_size = (image_jpg_end - image_jpg_start),
//       .out_format = JPEG_IMAGE_FORMAT_RGB565,
//       .out_scale = JPEG_IMAGE_SCALE_0,
//       .flags = {
//           .swap_color_bytes = 1, // <--- CHANGED BACK TO 1
//       }};

//   // Calculate buffer size
//   esp_jpeg_image_output_t info;
//   esp_jpeg_get_image_info(&jpeg_cfg, &info);
//   uint8_t *output_buffer = heap_caps_malloc(info.output_len, MALLOC_CAP_SPIRAM);

//   if (!output_buffer)
//   {
//     ESP_LOGE(TAG, "No memory!");
//     return;
//   }

//   jpeg_cfg.outbuf = output_buffer;
//   jpeg_cfg.outbuf_size = info.output_len;

//   esp_jpeg_image_output_t outimg;
//   esp_err_t ret = esp_jpeg_decode(&jpeg_cfg, &outimg);

//   if (ret == ESP_OK)
//   {
//     ESP_LOGI(TAG, "Image Size: %d x %d", outimg.width, outimg.height);

//     // --- CRITICAL FIX FOR 280px WIDE IMAGE ON 240px SCREEN ---

//     // If image width matches screen (240), send normally
//     if (outimg.width == LCD_H_RES && outimg.height == LCD_V_RES)
//     {
//       esp_lcd_panel_draw_bitmap(panel_handle, 0, 0, LCD_H_RES, LCD_V_RES, (uint16_t *)output_buffer);
//     }
//     else
//     {
//       // If image is WIDER (280px), we must crop it manually line-by-line
//       // or the LCD controller gets confused by the extra pixels.

//       uint16_t *src = (uint16_t *)output_buffer;

//       // Allocate a small buffer for just ONE line (240 pixels)
//       uint16_t *line_buffer = heap_caps_malloc(LCD_H_RES * 2, MALLOC_CAP_DMA);

//       for (int y = 0; y < LCD_V_RES; y++)
//       {
//         // Copy only the first 240 pixels of the current row
//         memcpy(line_buffer, &src[y * outimg.width], LCD_H_RES * 2);

//         // Draw this single line to the screen
//         esp_lcd_panel_draw_bitmap(panel_handle, 0, y, LCD_H_RES, y + 1, line_buffer);
//       }
//       free(line_buffer);
//     }
//   }

//   free(output_buffer);
// }

// abv is working but only plbm is small flickering

// below is stable with 240x240
#include <stdio.h>
#include <string.h>
#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "esp_log.h"
#include "driver/gpio.h"
#include "driver/spi_master.h"
#include "esp_lcd_panel_io.h"
#include "esp_lcd_panel_vendor.h"
#include "esp_lcd_panel_ops.h"
#include "esp_lcd_gc9a01.h"
#include "jpeg_decoder.h" // Use the new header

static const char *TAG = "Waveshare_1.28";

// --- PINOUT ---
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

extern const uint8_t image_jpg_start[] asm("_binary_imgtest_jpg_start");
extern const uint8_t image_jpg_end[] asm("_binary_imgtest_jpg_end");

void app_main(void)
{
  // 1. Setup Backlight
  gpio_config_t bk_gpio_config = {
      .mode = GPIO_MODE_OUTPUT,
      .pin_bit_mask = 1ULL << PIN_NUM_BK};
  gpio_config(&bk_gpio_config);
  gpio_set_level(PIN_NUM_BK, 1);

  // 2. SPI Bus (Standard Config)
  spi_bus_config_t buscfg = {
      .sclk_io_num = PIN_NUM_SCLK,
      .mosi_io_num = PIN_NUM_MOSI,
      .miso_io_num = PIN_NUM_MISO,
      .quadwp_io_num = -1,
      .quadhd_io_num = -1,
      .max_transfer_sz = LCD_H_RES * LCD_V_RES * 2 + 4096, // Extra space for safety
  };
  ESP_ERROR_CHECK(spi_bus_initialize(LCD_HOST, &buscfg, SPI_DMA_CH_AUTO));

  // 3. Panel IO - SLOW DOWN TO 20MHz TO STOP FLICKERING
  esp_lcd_panel_io_handle_t io_handle = NULL;
  esp_lcd_panel_io_spi_config_t io_config = {
      .dc_gpio_num = PIN_NUM_DC,
      .cs_gpio_num = PIN_NUM_CS,
      .pclk_hz = 20 * 1000 * 1000, // <--- 20MHz (Stable Speed)
      .lcd_cmd_bits = 8,
      .lcd_param_bits = 8,
      .spi_mode = 0,
      .trans_queue_depth = 10,
  };
  ESP_ERROR_CHECK(esp_lcd_new_panel_io_spi((esp_lcd_spi_bus_handle_t)LCD_HOST, &io_config, &io_handle));

  // 4. Driver Init
  esp_lcd_panel_handle_t panel_handle = NULL;
  esp_lcd_panel_dev_config_t panel_config = {
      .reset_gpio_num = PIN_NUM_RST,
      .rgb_ele_order = LCD_RGB_ELEMENT_ORDER_BGR,
      .bits_per_pixel = 16,
  };
  ESP_ERROR_CHECK(esp_lcd_new_panel_gc9a01(io_handle, &panel_config, &panel_handle));

  esp_lcd_panel_reset(panel_handle);
  esp_lcd_panel_init(panel_handle);
  esp_lcd_panel_invert_color(panel_handle, true); // <--- Keep TRUE for Waveshare
  esp_lcd_panel_disp_on_off(panel_handle, true);
  // Argument 1: panel_handle
  // Argument 2: true = Mirror X (Fixes horizontal flip)
  // Argument 3: false = Mirror Y (Keep vertical as is)
  ESP_ERROR_CHECK(esp_lcd_panel_mirror(panel_handle, true, false));

  esp_lcd_panel_disp_on_off(panel_handle, true);
  // 5. Decode JPEG
  ESP_LOGI(TAG, "Decoding...");

  esp_jpeg_image_cfg_t jpeg_cfg = {
      .indata = (uint8_t *)image_jpg_start,
      .indata_size = (image_jpg_end - image_jpg_start),
      .out_format = JPEG_IMAGE_FORMAT_RGB565,
      .out_scale = JPEG_IMAGE_SCALE_0,
      .flags = {
          .swap_color_bytes = 1, // <--- 1 IS CORRECT FOR MAGENTA/PINK ISSUE
      }};

  // Get Info
  esp_jpeg_image_output_t info;
  esp_jpeg_get_image_info(&jpeg_cfg, &info);

  // Allocate Buffer
  uint8_t *buffer = heap_caps_malloc(info.output_len, MALLOC_CAP_SPIRAM);
  if (!buffer)
  {
    ESP_LOGE(TAG, "Alloc failed");
    return;
  }

  jpeg_cfg.outbuf = buffer;
  jpeg_cfg.outbuf_size = info.output_len;

  esp_jpeg_image_output_t outimg;
  if (esp_jpeg_decode(&jpeg_cfg, &outimg) == ESP_OK)
  {
    ESP_LOGI(TAG, "Decoded Size: %dx%d", outimg.width, outimg.height);

    // --- THE FIX FOR GARBAGE PIXELS ---
    // Even if the JPEG is 240x248 (padding), we ONLY draw 240x240.
    // We use the smaller of the two dimensions to prevent overflow.
    int w = (outimg.width < LCD_H_RES) ? outimg.width : LCD_H_RES;
    int h = (outimg.height < LCD_V_RES) ? outimg.height : LCD_V_RES;

    esp_lcd_panel_draw_bitmap(panel_handle, 0, 0, w, h, (uint16_t *)buffer);
  }

  // Free buffer later if needed
  // free(buffer);
}