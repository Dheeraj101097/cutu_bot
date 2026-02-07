# ESP32 GIF Frontend

React + Vite frontend application with Tailwind CSS for uploading and managing GIFs/images for ESP32 display.

## 📋 Prerequisites

- **Node.js** v16 or higher
- **npm** (comes with Node.js)

## 🚀 Setup Instructions

### Step 1: Navigate to Frontend Folder

Make sure you're in the `cutu_bot` root directory, then:

```bash
cd esp32-gif-frontend
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install all required packages including:
- React 19
- Vite
- Tailwind CSS
- Framer Motion
- Axios
- Lucide React icons
- PostCSS and Autoprefixer

### Step 3: Verify Installation

Check that all dependencies are installed:

```bash
npm list
```

## 🏃 Running the Frontend

### Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or another port if 5173 is in use).

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

## 🔧 Troubleshooting

### Tailwind CSS Not Working / Styles Not Applying

This is one of the most common issues. Follow these steps:

#### Step 1: Verify Tailwind Installation

```bash
npm list tailwindcss postcss autoprefixer
```

If any are missing, install them:
```bash
npm install -D tailwindcss postcss autoprefixer
```

#### Step 2: Check `tailwind.config.js`

Make sure the file exists and has correct content paths:

```js
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  // ... rest of config
}
```

#### Step 3: Verify `postcss.config.js`

The file should exist with:
```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

If it doesn't exist, create it in the `esp32-gif-frontend` folder.

#### Step 4: Check `src/index.css`

Make sure it includes Tailwind directives at the top:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

#### Step 5: Verify Import in `src/main.jsx`

Ensure `index.css` is imported:
```js
import './index.css'
```

#### Step 6: Restart Dev Server

```bash
# Stop the server (Ctrl+C) and restart
npm run dev
```

#### Step 7: Clear Cache and Rebuild

If still not working:
```bash
# Delete node_modules and reinstall
Remove-Item -Recurse -Force node_modules, package-lock.json  # Windows
# or
rm -rf node_modules package-lock.json  # Linux/Mac

npm install
npm run dev
```

### Error: "PostCSS plugin tailwindcss requires PostCSS 8"

**Solution:**
```bash
npm install -D postcss@^8.5.6 tailwindcss@^3.4.17
```

### Error: "Cannot find module 'react'"

**Solution:**
```bash
# Make sure you're in the correct directory
cd esp32-gif-frontend

# Reinstall dependencies
npm install
```

### Error: "framer-motion" not working

**Solution:**
```bash
npm install framer-motion@^12.29.0
```

If issues persist:
```bash
npm install react@^19.2.0 react-dom@^19.2.0 framer-motion@^12.29.0
```

### Error: "Port 5173 already in use"

**Solution:**

**Option 1: Kill the process**

Windows PowerShell:
```powershell
netstat -ano | findstr :5173
taskkill /PID <PID_NUMBER> /F
```

Linux/Mac:
```bash
lsof -ti:5173 | xargs kill -9
```

**Option 2: Change the port**

Create or edit `vite.config.js`:
```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174  // or any other available port
  }
})
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

### Error: "Vite dependencies are optimized" (slow startup)

**Solution:**
This is normal on first run. Vite pre-bundles dependencies. Subsequent runs will be faster.

If it's consistently slow:
```bash
# Clear Vite cache
rm -rf node_modules/.vite  # Linux/Mac
Remove-Item -Recurse -Force node_modules\.vite  # Windows
```

### Error: "ESLint errors"

**Solution:**

The project uses ESLint. To fix auto-fixable issues:
```bash
npm run lint -- --fix
```

To disable ESLint temporarily, edit `vite.config.js`:
```js
export default {
  // ... other config
  eslint: {
    ignoreDuringBuilds: true
  }
}
```

### Error: "Module not found" for custom imports

**Solution:**

1. Check file paths are correct (case-sensitive on Linux/Mac)
2. Verify imports use correct extensions (`.jsx`, `.js`)
3. Check `vite.config.js` for alias configurations

### Error: "React Hooks" warnings

**Solution:**

Make sure you're using React 19 compatible hooks. If you see warnings:
```bash
npm install react@^19.2.0 react-dom@^19.2.0
```

## 📁 Project Structure

```
esp32-gif-frontend/
├── src/
│   ├── App.jsx           # Main React component
│   ├── main.jsx          # Entry point
│   └── index.css         # Global styles with Tailwind
├── index.html            # HTML template
├── package.json          # Dependencies and scripts
├── vite.config.js        # Vite configuration
├── tailwind.config.js    # Tailwind CSS configuration
├── postcss.config.js     # PostCSS configuration
└── README.md             # This file
```

## 🎨 Styling

The project uses **Tailwind CSS** with custom colors:
- `nook-bg-dark`: Deep black background
- `nook-bg-light`: Warm paper white
- `nook-accent`: Muted gold accent color

Custom fonts:
- Sans: Inter
- Serif: Playfair Display

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Adding New Dependencies

```bash
npm install <package-name>
```

### Updating Dependencies

```bash
npm update
```

### Hot Module Replacement (HMR)

Vite provides instant HMR. Changes to files in `src/` will automatically update in the browser.

## 🔌 Backend Integration

The frontend communicates with the backend API (typically running on `http://localhost:3000`).

Make sure:
1. Backend server is running before starting frontend
2. CORS is enabled in backend
3. API endpoints match between frontend and backend

## 📝 Notes

- The frontend should be kept in the same parent folder as the backend (`cutu_bot/`)
- Tailwind CSS requires PostCSS 8+
- React 19 is used - ensure compatibility with all dependencies
- Vite is used as the build tool for fast development

## 🔗 Related Documentation

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Framer Motion Documentation](https://www.framer.com/motion/)

---

**For complete project setup, refer to the main README.md in the root directory.**
