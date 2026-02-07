// // this as said by google does comp with esp

// const express = require("express");
// const cors = require("cors");
// const multer = require("multer");
// const axios = require("axios");
// const ffmpeg = require("fluent-ffmpeg");
// const fs = require("fs");
// const path = require("path");
// const os = require("os");
// require("dotenv").config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// // 1. Output Setup
// const OUTPUT_DIR = path.join(__dirname, "output");
// if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR);
// app.use("/output", express.static(OUTPUT_DIR));

// // 2. Upload Setup
// const upload = multer({ storage: multer.memoryStorage() });

// // --- CONFIGURATION ---
// const HF_TOKEN = process.env.HUGGING_FACE_TOKEN;
// const HF_MODEL_URL =
//   "https://router.huggingface.co/hf-inference/models/stabilityai/stable-diffusion-xl-base-1.0";

// // --- CORE HELPER: CONVERT TO ESP32-SAFE JPG ---
// const processToESP32JPG = (buffer, filename) => {
//   return new Promise((resolve, reject) => {
//     const tempPath = path.join(OUTPUT_DIR, `temp_${filename}.bin`);
//     const outputPath = path.join(OUTPUT_DIR, `${filename}.jpg`);

//     fs.writeFileSync(tempPath, buffer);

//     ffmpeg(tempPath)
//       // .outputOptions([
//       //   "-vf",
//       //   "scale=240:280",
//       //   // "scale=160:-2", // 160px width (Perfect for ST7735/ILI9341)
//       //   "-q:v",
//       //   "2", // High quality
//       //   "-pix_fmt",
//       //   "yuvj420p", // Standard color space for ESP32 decoders
//       //   "-map_metadata",
//       //   "-1", // STRIP METADATA (Saves RAM on ESP32)
//       //   "-f",
//       //   "image2", // Force standard image container
//       // ])
//       .outputOptions([
//         "-vf",
//         "scale=240:240:force_original_aspect_ratio=increase,crop=240:240", // EXACT 240x280 FILL
//         "-q:v",
//         "2",
//         "-pix_fmt",
//         "yuvj420p",
//         "-map_metadata",
//         "-1",
//         "-f",
//         "image2",
//       ])
//       .toFormat("mjpeg")
//       .save(outputPath)
//       .on("end", () => {
//         try {
//           fs.unlinkSync(tempPath);
//         } catch (e) {}
//         resolve(outputPath);
//       })
//       .on("error", (err) => reject(err));
//   });
// };

// // --- ROUTE 1: TEXT -> JPG ---
// app.post("/api/text-to-gif", async (req, res) => {
//   const { prompt } = req.body;
//   if (!prompt) return res.status(400).json({ error: "No prompt provided" });

//   const filename = `txt_${Date.now()}`;
//   const ip =
//     Object.values(os.networkInterfaces())
//       .flat()
//       .find((i) => i.family === "IPv4" && !i.internal)?.address || "localhost";

//   try {
//     console.log(`🎨 Generating ESP32 JPG for: "${prompt}"...`);

//     const response = await axios.post(
//       HF_MODEL_URL,
//       { inputs: prompt },
//       {
//         headers: {
//           Authorization: `Bearer ${HF_TOKEN}`,
//           "Content-Type": "application/json",
//           Accept: "image/png",
//         },
//         responseType: "arraybuffer",
//         timeout: 30000,
//       },
//     );

//     await processToESP32JPG(response.data, filename);

//     const finalUrl = `http://${ip}:8887/output/${filename}.jpg`;
//     console.log(`✅ Ready: ${finalUrl}`);
//     res.json({ success: true, url: finalUrl, type: "jpg" });
//   } catch (err) {
//     console.error("Error:", err.message);
//     res.status(500).json({ error: "Generation failed." });
//   }
// });

// // --- ROUTE 2: UPLOAD -> JPG ---
// app.post("/api/image-to-gif", upload.single("image"), async (req, res) => {
//   if (!req.file) return res.status(400).json({ error: "No image provided" });

//   const filename = `img_${Date.now()}`;
//   const ip =
//     Object.values(os.networkInterfaces())
//       .flat()
//       .find((i) => i.family === "IPv4" && !i.internal)?.address || "localhost";

//   try {
//     console.log(`📸 Converting Upload to ESP32 JPG...`);
//     await processToESP32JPG(req.file.buffer, filename);
//     const finalUrl = `http://${ip}:8887/output/${filename}.jpg`;
//     res.json({ success: true, url: finalUrl, type: "jpg" });
//   } catch (err) {
//     console.error("Error:", err.message);
//     res.status(500).json({ error: "Conversion failed." });
//   }
// });

// const PORT = 8887;
// app.listen(PORT, () =>
//   console.log(`ESP32 Safe-JPG Backend running on port ${PORT}`),
// );

// // Anime couple in a romantic pose, warm lighting, abstract glowing love aura forming a heart shape in the background, soft focus, aesthetic anime illustration

// abv is http whcih gen img below is wit hmqtt protocol publishing

const express = require("express");
const cors = require("cors");
const multer = require("multer");
const axios = require("axios");
const ffmpeg = require("fluent-ffmpeg");
const fs = require("fs");
const path = require("path");
const os = require("os");
const mqtt = require("mqtt");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// --- 1. MQTT SETUP ---
// Using emqx because it is generally faster/more reliable than mosquitto for binary data
const MQTT_BROKER = "mqtt://broker.emqx.io:1883";
const MQTT_TOPIC = "dheeraj/imagetest";

console.log("Connecting to MQTT Broker...");
const mqttClient = mqtt.connect(MQTT_BROKER);

mqttClient.on("connect", () => {
  console.log("✅ MQTT Connected! Ready to push images.");
});

mqttClient.on("error", (err) => {
  console.error("❌ MQTT Error:", err);
});

// --- 2. FILE SYSTEM SETUP ---
const OUTPUT_DIR = path.join(__dirname, "output");
if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR);
app.use("/output", express.static(OUTPUT_DIR));

const upload = multer({ storage: multer.memoryStorage() });
const HF_TOKEN = process.env.HUGGING_FACE_TOKEN;

// Using a reliable SDXL Turbo model (faster for ESP32 testing)
const HF_MODEL_URL =
  "https://router.huggingface.co/hf-inference/models/stabilityai/stable-diffusion-xl-base-1.0";

// --- 3. PROCESSOR (FFMPEG) ---
const processToESP32JPG = (buffer, filename) => {
  return new Promise((resolve, reject) => {
    const tempPath = path.join(OUTPUT_DIR, `temp_${filename}.bin`);
    const outputPath = path.join(OUTPUT_DIR, `${filename}.jpg`);

    fs.writeFileSync(tempPath, buffer);

    ffmpeg(tempPath)
      .outputOptions([
        "-vf",
        "scale=240:240:force_original_aspect_ratio=increase,crop=240:240", // Exact resizing
        "-q:v",
        "2",
        "-pix_fmt",
        "yuvj420p",
        "-map_metadata",
        "-1", // Strip headers
        "-f",
        "image2",
      ])
      .toFormat("mjpeg")
      .save(outputPath)
      .on("end", () => {
        try {
          fs.unlinkSync(tempPath);
        } catch (e) {}
        resolve(outputPath);
      })
      .on("error", (err) => reject(err));
  });
};

// --- 4. HELPER: MQTT PUSH ---
const pushToDevice = (filePath) => {
  try {
    const imageBuffer = fs.readFileSync(filePath);
    console.log(`📡 Pushing ${imageBuffer.length} bytes to ESP32 via MQTT...`);

    // Publish binary buffer to the topic
    mqttClient.publish(MQTT_TOPIC, imageBuffer, { qos: 0, retain: false });
    return true;
  } catch (e) {
    console.error("MQTT Push Failed:", e);
    return false;
  }
};

// --- ROUTES ---

app.post("/api/text-to-gif", async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ error: "No prompt provided" });

  const filename = `txt_${Date.now()}`;

  try {
    console.log(`🎨 Generating: "${prompt}"...`);

    // --- THE FIX IS HERE ---
    const response = await axios.post(
      HF_MODEL_URL,
      { inputs: prompt },
      {
        headers: {
          Authorization: `Bearer ${HF_TOKEN}`,
          "Content-Type": "application/json",
          Accept: "image/png", // <--- CRITICAL FIX: Tell HF we want an image!
        },
        responseType: "arraybuffer", // Force binary response
        timeout: 60000, // 60s timeout
      },
    );

    console.log("✅ HF Generation Success. Processing...");
    const filePath = await processToESP32JPG(response.data, filename);

    // PUSH TO DEVICE IMMEDIATELY
    pushToDevice(filePath);

    res.json({ success: true, message: "Image sent to device" });
  } catch (err) {
    // Better Error Logging
    if (err.response && err.response.data) {
      const errorMsg = Buffer.from(err.response.data).toString("utf8");
      console.error("❌ HuggingFace API Error:", errorMsg);
      return res
        .status(500)
        .json({ error: "AI Generation Failed: " + errorMsg });
    }
    console.error("❌ Server Error:", err.message);
    res.status(500).json({ error: "Generation failed." });
  }
});

app.post("/api/image-to-gif", upload.single("image"), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No image provided" });
  const filename = `img_${Date.now()}`;

  try {
    console.log(`📸 Processing Upload...`);
    const filePath = await processToESP32JPG(req.file.buffer, filename);

    pushToDevice(filePath);

    res.json({ success: true, message: "Image sent to device" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Conversion failed." });
  }
});

const PORT = 8887;
app.listen(PORT, () =>
  console.log(`🚀 Industry-Grade Backend running on port ${PORT}`),
);
