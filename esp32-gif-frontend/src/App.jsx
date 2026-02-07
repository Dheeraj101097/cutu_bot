import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Image as ImageIcon,
  Zap,
  Wind,
  Film,
  ArrowRight,
  Loader2,
  Copy,
  Wifi,
  Sun,
  Moon,
} from "lucide-react";

function App() {
  const [darkMode, setDarkMode] = useState(false); // Start with light mode
  const [activeTab, setActiveTab] = useState("text"); // 'text' | 'image'
  const [prompt, setPrompt] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [vibe, setVibe] = useState("cinematic");

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null); // { url, type }
  const [error, setError] = useState("");

  // Load theme preference from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setDarkMode(savedTheme === "dark");
    }
  }, []);

  // Save theme preference
  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
      setResult(null);
    }
  };

  const generate = async () => {
    if (activeTab === "text" && !prompt) return;
    if (activeTab === "image" && !selectedFile) return;

    setLoading(true);
    setError("");
    setResult(null);

    const backend = "http://localhost:8887";

    try {
      let res;
      if (activeTab === "text") {
        res = await axios.post(`${backend}/api/text-to-gif`, { prompt });
      } else {
        const formData = new FormData();
        formData.append("image", selectedFile);
        formData.append("vibe", vibe);
        res = await axios.post(`${backend}/api/image-to-gif`, formData);
      }
      setResult({ url: res.data.url, type: res.data.type });
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.error ||
          err.message ||
          "Server Error. Check console/backend.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 font-sans flex items-center justify-center p-4 sm:p-6 ${
        darkMode
          ? "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white"
          : "bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 text-slate-800"
      }`}
    >
      {/* Background Glow */}
      <div className="fixed inset-0 pointer-events-none opacity-40">
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 ${
            darkMode ? "bg-amber-500/20" : "bg-yellow-400/30"
          } rounded-full blur-3xl`}
        />
        <div
          className={`absolute top-1/4 right-1/4 w-64 h-64 ${
            darkMode ? "bg-yellow-500/15" : "bg-amber-300/25"
          } rounded-full blur-3xl`}
        />
      </div>

      {/* Theme Toggle */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className={`fixed top-4 right-4 z-50 p-2.5 sm:p-3 rounded-full transition-all duration-300 ${
          darkMode
            ? "bg-slate-800/80 text-amber-400 hover:bg-slate-700/80"
            : "bg-white/80 text-amber-600 hover:bg-white"
        } backdrop-blur-sm shadow-lg hover:scale-110`}
        aria-label="Toggle theme"
      >
        {darkMode ? <Sun size={18} /> : <Moon size={18} />}
      </button>

      <div className="w-full max-w-md relative z-10">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6 sm:mb-8"
        >
          <h1
            className={`text-2xl sm:text-3xl font-bold tracking-tight mb-2 ${
              darkMode ? "text-white" : "text-slate-800"
            }`}
          >
            ESP32{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500">
              Studio
            </span>
          </h1>
          <p
            className={`text-sm ${
              darkMode ? "text-slate-400" : "text-slate-600"
            }`}
          >
            Create media for your microcontroller
          </p>
        </motion.div>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`backdrop-blur-xl border rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden ${
            darkMode
              ? "bg-slate-800/40 border-slate-700/50"
              : "bg-white/60 border-slate-200/50"
          }`}
        >
          {/* Tabs */}
          <div
            className={`grid grid-cols-2 p-1 gap-1 rounded-xl sm:rounded-2xl mb-4 sm:mb-6 mx-3 sm:mx-4 mt-3 sm:mt-4 ${
              darkMode ? "bg-slate-700/50" : "bg-slate-100/80"
            }`}
          >
            {["text", "image"].map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setResult(null);
                  setError("");
                }}
                className={`py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-300 ${
                  activeTab === tab
                    ? darkMode
                      ? "bg-gradient-to-r from-amber-500 to-yellow-500 text-white shadow-lg shadow-amber-500/30"
                      : "bg-gradient-to-r from-amber-400 to-yellow-400 text-white shadow-lg shadow-amber-400/40"
                    : darkMode
                      ? "text-slate-400 hover:text-slate-200"
                      : "text-slate-600 hover:text-slate-800"
                }`}
              >
                {tab === "text" ? "Generate JPG" : "Animate GIF"}
              </button>
            ))}
          </div>

          <div className="px-4 sm:px-6 pb-4 sm:pb-6">
            <AnimatePresence mode="wait">
              {/* TEXT MODE */}
              {activeTab === "text" && (
                <motion.div
                  key="text"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-4"
                >
                  <div className="relative group">
                    <textarea
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      placeholder="What should the ESP32 show?"
                      className={`w-full h-32 rounded-xl sm:rounded-2xl p-4 text-sm resize-none transition-all focus:outline-none ${
                        darkMode
                          ? "bg-slate-900/50 border border-slate-700 text-white placeholder:text-slate-500 focus:border-amber-500/50"
                          : "bg-white/80 border border-slate-200 text-slate-800 placeholder:text-slate-400 focus:border-amber-400/50"
                      }`}
                    />
                    <Sparkles
                      size={16}
                      className={`absolute bottom-4 right-4 ${
                        darkMode ? "text-amber-500/50" : "text-amber-600/50"
                      }`}
                    />
                  </div>
                </motion.div>
              )}

              {/* IMAGE MODE */}
              {activeTab === "image" && (
                <motion.div
                  key="image"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-4"
                >
                  <label
                    className={`block h-32 border-2 border-dashed rounded-xl sm:rounded-2xl relative cursor-pointer transition-all overflow-hidden group ${
                      darkMode
                        ? "border-slate-600 bg-slate-800/30 hover:border-amber-500/50"
                        : "border-slate-300 bg-white/50 hover:border-amber-400/50"
                    }`}
                  >
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleFile}
                    />
                    {preview ? (
                      <img
                        src={preview}
                        className="w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity"
                      />
                    ) : (
                      <div
                        className={`absolute inset-0 flex flex-col items-center justify-center ${
                          darkMode
                            ? "text-slate-500 group-hover:text-amber-400"
                            : "text-slate-400 group-hover:text-amber-600"
                        } transition-colors`}
                      >
                        <ImageIcon size={24} className="mb-2" />
                        <span className="text-xs font-medium">
                          Tap to upload
                        </span>
                      </div>
                    )}
                  </label>

                  {/* Vibe Chips */}
                  <div className="flex gap-2 justify-center flex-wrap">
                    {[
                      { id: "cinematic", label: "Cinematic", icon: Film },
                      { id: "nature", label: "Nature", icon: Wind },
                      { id: "action", label: "Action", icon: Zap },
                    ].map((v) => (
                      <button
                        key={v.id}
                        onClick={() => setVibe(v.id)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-xs font-semibold uppercase border transition-all ${
                          vibe === v.id
                            ? darkMode
                              ? "bg-gradient-to-r from-amber-500 to-yellow-500 text-white border-transparent shadow-lg shadow-amber-500/30"
                              : "bg-gradient-to-r from-amber-400 to-yellow-400 text-white border-transparent shadow-lg shadow-amber-400/40"
                            : darkMode
                              ? "bg-transparent text-slate-400 border-slate-600 hover:border-amber-500/50 hover:text-amber-400"
                              : "bg-transparent text-slate-600 border-slate-300 hover:border-amber-400/50 hover:text-amber-600"
                        }`}
                      >
                        <v.icon size={12} /> {v.label}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Error */}
            {error && (
              <div
                className={`mt-4 text-xs sm:text-sm text-center py-2.5 sm:py-3 rounded-lg ${
                  darkMode
                    ? "text-red-300 bg-red-950/30 border border-red-900/50"
                    : "text-red-600 bg-red-50 border border-red-200"
                }`}
              >
                {error}
              </div>
            )}

            {/* Action Button */}
            <button
              onClick={generate}
              disabled={
                loading ||
                (activeTab === "text" && !prompt) ||
                (activeTab === "image" && !selectedFile)
              }
              className={`mt-4 sm:mt-6 w-full py-3 sm:py-4 bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-400 hover:from-amber-400 hover:via-yellow-400 hover:to-amber-300 text-white rounded-xl sm:rounded-2xl font-semibold text-sm sm:text-base transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg ${
                darkMode ? "shadow-amber-500/30" : "shadow-amber-400/40"
              }`}
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-xs sm:text-sm">Processing...</span>
                </>
              ) : (
                <>{activeTab === "text" ? "Generate Image" : "Animate"}</>
              )}
            </button>
          </div>
        </motion.div>

        {/* Result Card (Pops in) */}
        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`mt-4 border rounded-2xl sm:rounded-3xl p-3 sm:p-4 flex gap-3 sm:gap-4 items-center shadow-xl ${
                darkMode
                  ? "bg-slate-800/50 border-slate-700/50"
                  : "bg-white/60 border-slate-200/50"
              }`}
            >
              <div
                className={`w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden border shrink-0 ${
                  darkMode
                    ? "bg-slate-900 border-slate-700"
                    : "bg-white border-slate-200"
                }`}
              >
                <img
                  src={result.url}
                  className="w-full h-full object-contain"
                  alt="Result"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;



// color dark but same functionality
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   Sparkles,
//   Image as ImageIcon,
//   Zap,
//   Wind,
//   Film,
//   ArrowRight,
//   Loader2,
//   Copy,
//   Wifi,
//   Sun,
//   Moon,
// } from "lucide-react";

// function App() {
//   const [darkMode, setDarkMode] = useState(false); // Start with light mode
//   const [activeTab, setActiveTab] = useState("text"); // 'text' | 'image'
//   const [prompt, setPrompt] = useState("");
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [preview, setPreview] = useState(null);
//   const [vibe, setVibe] = useState("cinematic");

//   const [loading, setLoading] = useState(false);
//   const [result, setResult] = useState(null); // { url, type }
//   const [error, setError] = useState("");

//   // Load theme preference from localStorage
//   useEffect(() => {
//     const savedTheme = localStorage.getItem("theme");
//     if (savedTheme) {
//       setDarkMode(savedTheme === "dark");
//     }
//   }, []);

//   // Save theme preference
//   useEffect(() => {
//     localStorage.setItem("theme", darkMode ? "dark" : "light");
//   }, [darkMode]);

//   const handleFile = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setSelectedFile(file);
//       setPreview(URL.createObjectURL(file));
//       setResult(null);
//     }
//   };

//   const generate = async () => {
//     if (activeTab === "text" && !prompt) return;
//     if (activeTab === "image" && !selectedFile) return;

//     setLoading(true);
//     setError("");
//     setResult(null);

//     const backend = "http://localhost:8887";

//     try {
//       let res;
//       if (activeTab === "text") {
//         res = await axios.post(`${backend}/api/text-to-gif`, { prompt });
//       } else {
//         const formData = new FormData();
//         formData.append("image", selectedFile);
//         formData.append("vibe", vibe);
//         res = await axios.post(`${backend}/api/image-to-gif`, formData);
//       }
//       setResult({ url: res.data.url, type: res.data.type });
//     } catch (err) {
//       console.error(err);
//       setError(
//         err.response?.data?.error || err.message || "Server Error. Check console/backend."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div
//       className={`min-h-screen transition-colors duration-300 font-sans flex items-center justify-center p-4 sm:p-6 ${
//         darkMode
//           ? "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white"
//           : "bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 text-slate-800"
//       }`}
//     >
//       {/* Background Glow */}
//       <div className="fixed inset-0 pointer-events-none opacity-40">
//         <div
//           className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 ${
//             darkMode ? "bg-amber-500/20" : "bg-yellow-400/30"
//           } rounded-full blur-3xl`}
//         />
//         <div
//           className={`absolute top-1/4 right-1/4 w-64 h-64 ${
//             darkMode ? "bg-yellow-500/15" : "bg-amber-300/25"
//           } rounded-full blur-3xl`}
//         />
//       </div>

//       {/* Theme Toggle */}
//       <button
//         onClick={() => setDarkMode(!darkMode)}
//         className={`fixed top-4 right-4 z-50 p-2.5 sm:p-3 rounded-full transition-all duration-300 ${
//           darkMode
//             ? "bg-slate-800/80 text-amber-400 hover:bg-slate-700/80"
//             : "bg-white/80 text-amber-600 hover:bg-white"
//         } backdrop-blur-sm shadow-lg hover:scale-110`}
//         aria-label="Toggle theme"
//       >
//         {darkMode ? <Sun size={18} /> : <Moon size={18} />}
//       </button>

//       <div className="w-full max-w-md relative z-10">
//         {/* Header */}
//         <motion.div
//           initial={{ y: -20, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ duration: 0.5 }}
//           className="text-center mb-6 sm:mb-8"
//         >
//           <h1
//             className={`text-2xl sm:text-3xl font-bold tracking-tight mb-2 ${
//               darkMode ? "text-white" : "text-slate-800"
//             }`}
//           >
//             ESP32{" "}
//             <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500">
//               Studio
//             </span>
//           </h1>
//           <p
//             className={`text-sm ${
//               darkMode ? "text-slate-400" : "text-slate-600"
//             }`}
//           >
//             Create media for your microcontroller
//           </p>
//         </motion.div>

//         {/* Main Card */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: 0.2 }}
//           className={`backdrop-blur-xl border rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden ${
//             darkMode
//               ? "bg-slate-800/40 border-slate-700/50"
//               : "bg-white/60 border-slate-200/50"
//           }`}
//         >
//           {/* Tabs */}
//           <div
//             className={`grid grid-cols-2 p-1 gap-1 rounded-xl sm:rounded-2xl mb-4 sm:mb-6 mx-3 sm:mx-4 mt-3 sm:mt-4 ${
//               darkMode ? "bg-slate-700/50" : "bg-slate-100/80"
//             }`}
//           >
//             {["text", "image"].map((tab) => (
//               <button
//                 key={tab}
//                 onClick={() => {
//                   setActiveTab(tab);
//                   setResult(null);
//                   setError("");
//                 }}
//                 className={`py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-300 ${
//                   activeTab === tab
//                     ? darkMode
//                       ? "bg-gradient-to-r from-amber-500 to-yellow-500 text-white shadow-lg shadow-amber-500/30"
//                       : "bg-gradient-to-r from-amber-400 to-yellow-400 text-white shadow-lg shadow-amber-400/40"
//                     : darkMode
//                     ? "text-slate-400 hover:text-slate-200"
//                     : "text-slate-600 hover:text-slate-800"
//                 }`}
//               >
//                 {tab === "text" ? "Generate JPG" : "Animate GIF"}
//               </button>
//             ))}
//           </div>

//           <div className="px-4 sm:px-6 pb-4 sm:pb-6">
//             <AnimatePresence mode="wait">
//               {/* TEXT MODE */}
//               {activeTab === "text" && (
//                 <motion.div
//                   key="text"
//                   initial={{ opacity: 0, x: -20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   exit={{ opacity: 0, x: 20 }}
//                   className="space-y-4"
//                 >
//                   <div className="relative group">
//                     <textarea
//                       value={prompt}
//                       onChange={(e) => setPrompt(e.target.value)}
//                       placeholder="What should the ESP32 show?"
//                       className={`w-full h-32 rounded-xl sm:rounded-2xl p-4 text-sm resize-none transition-all focus:outline-none ${
//                         darkMode
//                           ? "bg-slate-900/50 border border-slate-700 text-white placeholder:text-slate-500 focus:border-amber-500/50"
//                           : "bg-white/80 border border-slate-200 text-slate-800 placeholder:text-slate-400 focus:border-amber-400/50"
//                       }`}
//                     />
//                     <Sparkles
//                       size={16}
//                       className={`absolute bottom-4 right-4 ${
//                         darkMode ? "text-amber-500/50" : "text-amber-600/50"
//                       }`}
//                     />
//                   </div>
//                 </motion.div>
//               )}

//               {/* IMAGE MODE */}
//               {activeTab === "image" && (
//                 <motion.div
//                   key="image"
//                   initial={{ opacity: 0, x: -20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   exit={{ opacity: 0, x: 20 }}
//                   className="space-y-4"
//                 >
//                   <label
//                     className={`block h-32 border-2 border-dashed rounded-xl sm:rounded-2xl relative cursor-pointer transition-all overflow-hidden group ${
//                       darkMode
//                         ? "border-slate-600 bg-slate-800/30 hover:border-amber-500/50"
//                         : "border-slate-300 bg-white/50 hover:border-amber-400/50"
//                     }`}
//                   >
//                     <input
//                       type="file"
//                       className="hidden"
//                       accept="image/*"
//                       onChange={handleFile}
//                     />
//                     {preview ? (
//                       <img
//                         src={preview}
//                         className="w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity"
//                       />
//                     ) : (
//                       <div
//                         className={`absolute inset-0 flex flex-col items-center justify-center ${
//                           darkMode
//                             ? "text-slate-500 group-hover:text-amber-400"
//                             : "text-slate-400 group-hover:text-amber-600"
//                         } transition-colors`}
//                       >
//                         <ImageIcon size={24} className="mb-2" />
//                         <span className="text-xs font-medium">Tap to upload</span>
//                       </div>
//                     )}
//                   </label>

//                   {/* Vibe Chips */}
//                   <div className="flex gap-2 justify-center flex-wrap">
//                     {[
//                       { id: "cinematic", label: "Cinematic", icon: Film },
//                       { id: "nature", label: "Nature", icon: Wind },
//                       { id: "action", label: "Action", icon: Zap },
//                     ].map((v) => (
//                       <button
//                         key={v.id}
//                         onClick={() => setVibe(v.id)}
//                         className={`flex items-center gap-1.5 px-3 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-xs font-semibold uppercase border transition-all ${
//                           vibe === v.id
//                             ? darkMode
//                               ? "bg-gradient-to-r from-amber-500 to-yellow-500 text-white border-transparent shadow-lg shadow-amber-500/30"
//                               : "bg-gradient-to-r from-amber-400 to-yellow-400 text-white border-transparent shadow-lg shadow-amber-400/40"
//                             : darkMode
//                             ? "bg-transparent text-slate-400 border-slate-600 hover:border-amber-500/50 hover:text-amber-400"
//                             : "bg-transparent text-slate-600 border-slate-300 hover:border-amber-400/50 hover:text-amber-600"
//                         }`}
//                       >
//                         <v.icon size={12} /> {v.label}
//                       </button>
//                     ))}
//                   </div>
//                 </motion.div>
//               )}
//             </AnimatePresence>

//             {/* Error */}
//             {error && (
//               <div
//                 className={`mt-4 text-xs sm:text-sm text-center py-2.5 sm:py-3 rounded-lg ${
//                   darkMode
//                     ? "text-red-300 bg-red-950/30 border border-red-900/50"
//                     : "text-red-600 bg-red-50 border border-red-200"
//                 }`}
//               >
//                 {error}
//               </div>
//             )}

//             {/* Action Button */}
//             <button
//               onClick={generate}
//               disabled={loading || (activeTab === "text" && !prompt) || (activeTab === "image" && !selectedFile)}
//               className={`mt-4 sm:mt-6 w-full py-3 sm:py-4 bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-400 hover:from-amber-400 hover:via-yellow-400 hover:to-amber-300 text-white rounded-xl sm:rounded-2xl font-semibold text-sm sm:text-base transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg ${
//                 darkMode ? "shadow-amber-500/30" : "shadow-amber-400/40"
//               }`}
//             >
//               {loading ? (
//                 <>
//                   <Loader2 className="animate-spin w-4 h-4 sm:w-5 sm:h-5" />
//                   <span className="text-xs sm:text-sm">Processing...</span>
//                 </>
//               ) : (
//                 <>{activeTab === "text" ? "Generate Image" : "Animate"}</>
//               )}
//             </button>
//           </div>
//         </motion.div>

//         {/* Result Card (Pops in) */}
//         <AnimatePresence>
//           {result && (
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               className={`mt-4 border rounded-2xl sm:rounded-3xl p-3 sm:p-4 flex gap-3 sm:gap-4 items-center shadow-xl ${
//                 darkMode
//                   ? "bg-slate-800/50 border-slate-700/50"
//                   : "bg-white/60 border-slate-200/50"
//               }`}
//             >
//               <div
//                 className={`w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden border shrink-0 ${
//                   darkMode
//                     ? "bg-slate-900 border-slate-700"
//                     : "bg-white border-slate-200"
//                 }`}
//               >
//                 <img
//                   src={result.url}
//                   className="w-full h-full object-contain"
//                   alt="Result"
//                 />
//               </div>
//               <div className="flex-1 min-w-0">
//                 <div className="flex items-center justify-between mb-1.5 sm:mb-2">
//                   <div className="flex items-center gap-1.5">
//                     <Wifi
//                       size={12}
//                       className={darkMode ? "text-amber-400" : "text-amber-600"}
//                     />
//                     <span
//                       className={`text-[10px] font-bold uppercase tracking-wider ${
//                         darkMode ? "text-amber-400" : "text-amber-600"
//                       }`}
//                     >
//                       ESP32 Ready
//                     </span>
//                   </div>
//                   <span
//                     className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded ${
//                       darkMode
//                         ? "text-slate-300 bg-slate-700"
//                         : "text-slate-600 bg-slate-100"
//                     }`}
//                   >
//                     {result.type.toUpperCase()}
//                   </span>
//                 </div>
//                 <div
//                   className={`flex items-center gap-2 p-2 rounded-lg border group cursor-pointer transition-colors ${
//                     darkMode
//                       ? "bg-slate-900/50 border-slate-700 hover:border-amber-500/50"
//                       : "bg-slate-50 border-slate-200 hover:border-amber-400/50"
//                   }`}
//                   onClick={() => navigator.clipboard.writeText(result.url)}
//                 >
//                   <code
//                     className={`text-[10px] sm:text-xs truncate flex-1 font-mono ${
//                       darkMode ? "text-amber-400" : "text-amber-600"
//                     }`}
//                   >
//                     {result.url}
//                   </code>
//                   <Copy
//                     size={12}
//                     className={
//                       darkMode
//                         ? "text-slate-400 group-hover:text-amber-400"
//                         : "text-slate-500 group-hover:text-amber-600"
//                     }
//                   />
//                 </div>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// }

// export default App;