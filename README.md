# CUTU_BOT - ESP32 GIF Display Project

A complete MERN stack project for displaying GIFs on an ESP32 LCD display, with a React frontend and Express backend.

## 📁 Project Structure

```
cutu_bot/
├── esp32-gif-backend/      # Express.js backend server
├── esp32-gif-frontend/     # React + Vite frontend
└── lcd_display/            # ESP32 firmware (ESP-IDF project)
```

## 🚀 Quick Start Guide

### Prerequisites

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **ESP-IDF** (for ESP32 development) - [Installation Guide](https://docs.espressif.com/projects/esp-idf/en/latest/esp32/get-started/)
- **Git** - [Download](https://git-scm.com/)

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd cutu_bot
```

### Step 2: Setup Backend and Frontend

The backend and frontend should be kept in the same parent folder (`cutu_bot`). They are already in the correct structure.

#### Backend Setup

```bash
cd esp32-gif-backend
npm install
```

**Note:** If you encounter errors during installation, see the [Troubleshooting](#troubleshooting) section below.

#### Frontend Setup

```bash
cd esp32-gif-frontend
npm install
```

**Note:** Tailwind CSS and other dependencies will be installed. If you face issues, refer to the [Troubleshooting](#troubleshooting) section.

### Step 3: Setup ESP32 LCD Display (ESP-IDF)

The `lcd_display` folder should be opened **separately** in a different location or IDE for ESP-IDF development.

#### Option A: Using ESP-IDF in VS Code

1. Install the **ESP-IDF Extension** in VS Code
2. Open the `lcd_display` folder in VS Code
3. Configure ESP-IDF (the extension will guide you)
4. Build and flash using the ESP-IDF commands

#### Option B: Using ESP-IDF Command Line

1. Open a new terminal/command prompt
2. Navigate to the `lcd_display` folder:
   ```bash
   cd path/to/cutu_bot/lcd_display
   ```
3. Set up ESP-IDF environment:
   ```bash
   # On Windows (PowerShell)
   . $env:userprofile\esp\esp-idf\export.ps1
   
   # On Linux/Mac
   . $HOME/esp/esp-idf/export.sh
   ```
4. Configure the project:
   ```bash
   idf.py menuconfig
   ```
5. Build the project:
   ```bash
   idf.py build
   ```
6. Flash to ESP32:
   ```bash
   idf.py -p COM_PORT flash monitor
   ```
   Replace `COM_PORT` with your ESP32's COM port (e.g., `COM3` on Windows, `/dev/ttyUSB0` on Linux)

## 🏃 Running the Application

### Start Backend Server

```bash
cd esp32-gif-backend
node final_index.js
```

The backend will typically run on `http://localhost:3000` (check the console output for the exact port).

### Start Frontend Development Server

Open a **new terminal** and run:

```bash
cd esp32-gif-frontend
npm run dev
```

The frontend will be available at `http://localhost:5173` (Vite default port).

### Access the Application

1. Open your browser and navigate to `http://localhost:5173`
2. The frontend will communicate with the backend API
3. Upload GIFs/images through the interface
4. The backend processes them and sends to ESP32 via MQTT

## 🔧 Troubleshooting

### Node Modules Installation Errors

#### Error: "npm ERR! code ELIFECYCLE"

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json
# On Windows PowerShell:
Remove-Item -Recurse -Force node_modules, package-lock.json

# Reinstall
npm install
```

#### Error: "Cannot find module" or "Module not found"

**Solution:**
```bash
# Make sure you're in the correct directory
cd esp32-gif-backend  # or esp32-gif-frontend

# Reinstall dependencies
npm install
```

### Tailwind CSS Errors

#### Error: "Tailwind CSS not working" or "Styles not applying"

**Solution:**

1. **Verify Tailwind is installed:**
   ```bash
   cd esp32-gif-frontend
   npm list tailwindcss
   ```

2. **Reinstall Tailwind and PostCSS:**
   ```bash
   npm install -D tailwindcss postcss autoprefixer
   ```

3. **Verify `tailwind.config.js` exists** and has correct content paths:
   ```js
   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"]
   ```

4. **Check `postcss.config.js` exists:**
   ```js
   export default {
     plugins: {
       tailwindcss: {},
       autoprefixer: {},
     },
   }
   ```

5. **Verify `src/index.css` includes Tailwind directives:**
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

6. **Restart the dev server:**
   ```bash
   # Stop the server (Ctrl+C) and restart
   npm run dev
   ```

#### Error: "PostCSS plugin tailwindcss requires PostCSS 8"

**Solution:**
```bash
npm install -D postcss@^8.5.6 tailwindcss@^3.4.17
```

### Library/Module Errors

#### Error: "fluent-ffmpeg" installation issues (Backend)

**Solution:**
- **Windows:** Install FFmpeg separately from [ffmpeg.org](https://ffmpeg.org/download.html) and add to PATH
- **Linux:** `sudo apt-get install ffmpeg`
- **Mac:** `brew install ffmpeg`

#### Error: "framer-motion" or React errors (Frontend)

**Solution:**
```bash
cd esp32-gif-frontend
npm install react@^19.2.0 react-dom@^19.2.0 framer-motion@^12.29.0
```

### Port Already in Use

#### Error: "Port 3000 (or 5173) is already in use"

**Solution:**
```bash
# Find and kill the process using the port
# On Windows PowerShell:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# On Linux/Mac:
lsof -ti:3000 | xargs kill -9
```

Or change the port in:
- **Backend:** Edit `final_index.js` and change the port
- **Frontend:** Edit `vite.config.js` and add:
  ```js
  export default {
    server: {
      port: 5174  // or any other available port
    }
  }
  ```

### ESP-IDF Errors

#### Error: "idf.py: command not found"

**Solution:**
- Make sure ESP-IDF is properly installed
- Source the ESP-IDF environment script before running commands
- Use the ESP-IDF extension in VS Code for easier setup

#### Error: "No serial ports found"

**Solution:**
- Check USB cable connection
- Install ESP32 USB drivers
- Verify COM port in Device Manager (Windows) or `ls /dev/tty*` (Linux/Mac)

## 📝 Environment Variables

### Backend Environment Setup

Create a `.env` file in `esp32-gif-backend/`:

```env
HUGGING_FACE_TOKEN=your_token_here
MQTT_BROKER_URL=mqtt://your-broker-url
MQTT_PORT=1883
PORT=3000
```

## 🛠️ Development

### Backend Development
- Main entry point: `esp32-gif-backend/final_index.js`
- Uses Express.js for API endpoints
- Handles image processing and MQTT communication

### Frontend Development
- Built with React 19 and Vite
- Uses Tailwind CSS for styling
- Framer Motion for animations
- Main component: `esp32-gif-frontend/src/App.jsx`

### ESP32 Firmware
- ESP-IDF based project
- Main code: `lcd_display/main/main.c`
- Handles MQTT communication and LCD display

## 📚 Additional Resources

- [ESP-IDF Documentation](https://docs.espressif.com/projects/esp-idf/en/latest/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Vite Documentation](https://vitejs.dev/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

[Add your license information here]

---

**Note:** Make sure to keep the backend and frontend in the same parent folder (`cutu_bot`), while the `lcd_display` folder should be opened separately for ESP-IDF development.
