# ESP32 GIF Backend

Express.js backend server for processing images/GIFs and communicating with ESP32 via MQTT.

## 📋 Prerequisites

- **Node.js** v16 or higher
- **npm** (comes with Node.js)
- **FFmpeg** (for image/video processing)
  - Windows: Download from [ffmpeg.org](https://ffmpeg.org/download.html) and add to PATH
  - Linux: `sudo apt-get install ffmpeg`
  - Mac: `brew install ffmpeg`

## 🚀 Setup Instructions

### Step 1: Navigate to Backend Folder

Make sure you're in the `cutu_bot` root directory, then:

```bash
cd esp32-gif-backend
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install all required packages:
- express
- cors
- multer
- axios
- fluent-ffmpeg
- mqtt
- dotenv
- form-data
- node-fetch
- @gradio/client

### Step 3: Environment Configuration

Create a `.env` file in the `esp32-gif-backend` folder:

```env
HUGGING_FACE_TOKEN=your_huggingface_token_here
MQTT_BROKER_URL=mqtt://your-mqtt-broker-url
MQTT_PORT=1883
PORT=3000
```

**Note:** Replace the placeholder values with your actual credentials.

### Step 4: Verify Installation

Check that all dependencies are installed:

```bash
npm list
```

## 🏃 Running the Backend

### Start the Server

```bash
node final_index.js
```

The server will start and display the port it's running on (typically `http://localhost:3000`).

### Verify Server is Running

You should see output similar to:
```
Server running on port 3000
MQTT connected
```

## 🔧 Troubleshooting

### Error: "Cannot find module 'express'"

**Solution:**
```bash
# Make sure you're in the correct directory
cd esp32-gif-backend

# Reinstall dependencies
npm install
```

### Error: "fluent-ffmpeg" Installation Issues

**Problem:** FFmpeg binary not found or not in PATH.

**Solution:**

1. **Install FFmpeg:**
   - **Windows:** Download from [ffmpeg.org](https://ffmpeg.org/download.html)
     - Extract to `C:\ffmpeg`
     - Add `C:\ffmpeg\bin` to your system PATH
   - **Linux:** `sudo apt-get update && sudo apt-get install ffmpeg`
   - **Mac:** `brew install ffmpeg`

2. **Verify FFmpeg installation:**
   ```bash
   ffmpeg -version
   ```

3. **If still not working, specify FFmpeg path in code:**
   ```js
   // In final_index.js, add:
   ffmpeg.setFfmpegPath('C:\\ffmpeg\\bin\\ffmpeg.exe'); // Windows
   // or
   ffmpeg.setFfmpegPath('/usr/bin/ffmpeg'); // Linux/Mac
   ```

### Error: "MQTT connection failed"

**Solution:**

1. Check your `.env` file has correct MQTT broker URL
2. Verify MQTT broker is running and accessible
3. Check network connectivity
4. Verify MQTT port (default: 1883)

### Error: "HUGGING_FACE_TOKEN not found"

**Solution:**

1. Create a `.env` file in `esp32-gif-backend/` if it doesn't exist
2. Add your Hugging Face token:
   ```env
   HUGGING_FACE_TOKEN=your_actual_token_here
   ```
3. Get your token from [Hugging Face Settings](https://huggingface.co/settings/tokens)

### Error: "Port 3000 already in use"

**Solution:**

**Option 1: Kill the process using the port**

Windows PowerShell:
```powershell
netstat -ano | findstr :3000
taskkill /PID <PID_NUMBER> /F
```

Linux/Mac:
```bash
lsof -ti:3000 | xargs kill -9
```

**Option 2: Change the port**

Edit `final_index.js` and change:
```js
const PORT = process.env.PORT || 3000; // Change 3000 to another port
```

Or set in `.env`:
```env
PORT=3001
```

### Error: "npm ERR! code ELIFECYCLE"

**Solution:**

1. Clear npm cache:
   ```bash
   npm cache clean --force
   ```

2. Delete `node_modules` and `package-lock.json`:
   ```bash
   # Windows PowerShell
   Remove-Item -Recurse -Force node_modules, package-lock.json
   
   # Linux/Mac
   rm -rf node_modules package-lock.json
   ```

3. Reinstall:
   ```bash
   npm install
   ```

### Error: "EACCES: permission denied"

**Solution:**

**Linux/Mac:**
```bash
sudo npm install
```

**Or fix npm permissions:**
```bash
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
export PATH=~/.npm-global/bin:$PATH
```

### Error: "node-gyp" build errors

**Solution:**

1. Install build tools:
   - **Windows:** Install [Visual Studio Build Tools](https://visualstudio.microsoft.com/downloads/)
   - **Linux:** `sudo apt-get install build-essential`
   - **Mac:** `xcode-select --install`

2. Reinstall:
   ```bash
   npm install --build-from-source
   ```

## 📁 Project Structure

```
esp32-gif-backend/
├── final_index.js          # Main server file
├── index.js                # Alternative/backup entry point
├── package.json            # Dependencies and scripts
├── package-lock.json       # Locked dependency versions
├── .env                    # Environment variables (create this)
└── README.md               # This file
```

## 🔌 API Endpoints

The backend provides various endpoints for:
- Image/GIF upload and processing
- MQTT communication with ESP32
- Hugging Face API integration

Check `final_index.js` for the complete list of endpoints.

## 🛠️ Development

### Adding New Dependencies

```bash
npm install <package-name>
```

### Updating Dependencies

```bash
npm update
```

### Checking for Outdated Packages

```bash
npm outdated
```

## 📝 Notes

- The backend should be kept in the same parent folder as the frontend (`cutu_bot/`)
- Make sure the frontend is running on a different port (typically 5173)
- CORS is enabled to allow frontend communication
- The server processes images and sends them to ESP32 via MQTT

## 🔗 Related Documentation

- [Express.js Documentation](https://expressjs.com/)
- [MQTT.js Documentation](https://github.com/mqttjs/MQTT.js)
- [fluent-ffmpeg Documentation](https://github.com/fluent-ffmpeg/node-fluent-ffmpeg)

---

**For complete project setup, refer to the main README.md in the root directory.**
