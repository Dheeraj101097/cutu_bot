// // this code generates img from text and uplaoded photot o jpg and gives url no effects

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

// // --- CORE HELPER: CONVERT ANY INPUT TO ESP32 MJPEG ---
// const processToESP32JPG = (buffer, filename) => {
//   return new Promise((resolve, reject) => {
//     // Save temp file (we use .bin so FFmpeg auto-detects if input is PNG/WebP/JPG)
//     const tempPath = path.join(OUTPUT_DIR, `temp_${filename}.bin`);
//     const outputPath = path.join(OUTPUT_DIR, `${filename}.jpg`);

//     fs.writeFileSync(tempPath, buffer);

//     ffmpeg(tempPath)
//       .outputOptions([
//         "-vf",
//         "scale=160:-2", // Resize to 160px width, auto height (even)
//         "-q:v",
//         "2", // High Quality
//         "-pix_fmt",
//         "yuvj420p", // Standard color space for ESP32 Decoders
//       ])
//       .toFormat("mjpeg") // Force MJPEG format
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
//     console.log(`🎨 Generating JPG for: "${prompt}"...`);

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

//     // Pass the uploaded buffer directly to the MJPEG converter
//     await processToESP32JPG(req.file.buffer, filename);

//     const finalUrl = `http://${ip}:8887/output/${filename}.jpg`;
//     console.log(`✅ Ready: ${finalUrl}`);

//     res.json({ success: true, url: finalUrl, type: "jpg" });
//   } catch (err) {
//     console.error("Error:", err.message);
//     res.status(500).json({ error: "Conversion failed." });
//   }
// });

// const PORT = 8887;
// app.listen(PORT, () =>
//   console.log(`ESP32 MJPEG Server running on port ${PORT}`),
// );

// this as said by google does comp with esp

const express = require("express");
const cors = require("cors");
const multer = require("multer");
const axios = require("axios");
const ffmpeg = require("fluent-ffmpeg");
const fs = require("fs");
const path = require("path");
const os = require("os");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// 1. Output Setup
const OUTPUT_DIR = path.join(__dirname, "output");
if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR);
app.use("/output", express.static(OUTPUT_DIR));

// 2. Upload Setup
const upload = multer({ storage: multer.memoryStorage() });

// --- CONFIGURATION ---
const HF_TOKEN = process.env.HUGGING_FACE_TOKEN;
const HF_MODEL_URL =
  "https://router.huggingface.co/hf-inference/models/stabilityai/stable-diffusion-xl-base-1.0";

// --- CORE HELPER: CONVERT TO ESP32-SAFE JPG ---
const processToESP32JPG = (buffer, filename) => {
  return new Promise((resolve, reject) => {
    const tempPath = path.join(OUTPUT_DIR, `temp_${filename}.bin`);
    const outputPath = path.join(OUTPUT_DIR, `${filename}.jpg`);

    fs.writeFileSync(tempPath, buffer);

    ffmpeg(tempPath)
      // .outputOptions([
      //   "-vf",
      //   "scale=240:280",
      //   // "scale=160:-2", // 160px width (Perfect for ST7735/ILI9341)
      //   "-q:v",
      //   "2", // High quality
      //   "-pix_fmt",
      //   "yuvj420p", // Standard color space for ESP32 decoders
      //   "-map_metadata",
      //   "-1", // STRIP METADATA (Saves RAM on ESP32)
      //   "-f",
      //   "image2", // Force standard image container
      // ])
      .outputOptions([
        "-vf",
        "scale=240:240:force_original_aspect_ratio=increase,crop=240:240", // EXACT 240x280 FILL
        "-q:v",
        "2",
        "-pix_fmt",
        "yuvj420p",
        "-map_metadata",
        "-1",
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

// --- ROUTE 1: TEXT -> JPG ---
app.post("/api/text-to-gif", async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ error: "No prompt provided" });

  const filename = `txt_${Date.now()}`;
  const ip =
    Object.values(os.networkInterfaces())
      .flat()
      .find((i) => i.family === "IPv4" && !i.internal)?.address || "localhost";

  try {
    console.log(`🎨 Generating ESP32 JPG for: "${prompt}"...`);

    const response = await axios.post(
      HF_MODEL_URL,
      { inputs: prompt },
      {
        headers: {
          Authorization: `Bearer ${HF_TOKEN}`,
          "Content-Type": "application/json",
          Accept: "image/png",
        },
        responseType: "arraybuffer",
        timeout: 30000,
      },
    );

    await processToESP32JPG(response.data, filename);

    const finalUrl = `http://${ip}:8887/output/${filename}.jpg`;
    console.log(`✅ Ready: ${finalUrl}`);
    res.json({ success: true, url: finalUrl, type: "jpg" });
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json({ error: "Generation failed." });
  }
});

// --- ROUTE 2: UPLOAD -> JPG ---
app.post("/api/image-to-gif", upload.single("image"), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No image provided" });

  const filename = `img_${Date.now()}`;
  const ip =
    Object.values(os.networkInterfaces())
      .flat()
      .find((i) => i.family === "IPv4" && !i.internal)?.address || "localhost";

  try {
    console.log(`📸 Converting Upload to ESP32 JPG...`);
    await processToESP32JPG(req.file.buffer, filename);
    const finalUrl = `http://${ip}:8887/output/${filename}.jpg`;
    res.json({ success: true, url: finalUrl, type: "jpg" });
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json({ error: "Conversion failed." });
  }
});

const PORT = 8887;
app.listen(PORT, () =>
  console.log(`ESP32 Safe-JPG Backend running on port ${PORT}`),
);

// Anime couple in a romantic pose, warm lighting, abstract glowing love aura forming a heart shape in the background, soft focus, aesthetic anime illustration
