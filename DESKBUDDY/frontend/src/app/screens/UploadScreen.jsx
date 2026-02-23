// import React, { useState } from 'react';
// import { useNavigate } from 'react-router';
// import { motion, AnimatePresence } from 'framer-motion';
// import { GlassCard } from '../components/GlassCard';
// import { GlassButton } from '../components/GlassButton';
// import { GlassInput } from '../components/GlassInput';
// import { ArrowLeft, Upload, Sparkles, Image as ImageIcon } from 'lucide-react';

// export function UploadScreen() {
//   const navigate = useNavigate();
//   const [activeTab, setActiveTab] = useState('upload'); // 'upload' | 'generate'
//   const [isDragging, setIsDragging] = useState(false);
//   const [prompt, setPrompt] = useState('');
//   const [previewImage, setPreviewImage] = useState('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe');
//   const [isFocused, setIsFocused] = useState(false);

//   const handleTabChange = (tab) => {
//     setActiveTab(tab);
//   };

//   return (
//     <div className="screen-container overflow-y-auto pb-24 text-[var(--text-main)]">
//       {/* Header */}
//       <div className="fixed top-0 left-0 right-0 z-10 px-6 pt-8 pb-4 backdrop-blur-xl">
//         <div className="flex items-center justify-between">
//           <div className="flex items-center space-x-4">
//             <button onClick={() => navigate('/home')} className="nav-icon">
//               <ArrowLeft className="w-6 h-6" />
//             </button>
//             <h1 className="text-2xl font-semibold">Media</h1>
//           </div>
//         </div>
//       </div>

//       {/* Tabs */}
//       <div className="px-6 pt-24 mb-8">
//         <div className="grid grid-cols-2 p-1 gap-1 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10">
//           <button
//             onClick={() => handleTabChange('upload')}
//             className={`py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
//               activeTab === 'upload'
//                 ? 'bg-gradient-to-r from-[var(--mint)] to-[var(--gold)] text-[#1A2822] shadow-lg shadow-[var(--mint)]/20'
//                 : 'text-[var(--text-main)] opacity-60 hover:opacity-100 hover:bg-[var(--glass-bg)]'
//             }`}
//           >
//             Upload Image
//           </button>
//           <button
//             onClick={() => handleTabChange('generate')}
//             className={`py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
//               activeTab === 'generate'
//                 ? 'bg-gradient-to-r from-[var(--mint)] to-[var(--gold)] text-[#1A2822] shadow-lg shadow-[var(--mint)]/20'
//                 : 'text-[var(--text-main)] opacity-60 hover:opacity-100 hover:bg-[var(--glass-bg)]'
//             }`}
//           >
//             Generate Image
//           </button>
//         </div>
//       </div>

//       {/* Content Area */}
//       <div className="px-6">
//         <AnimatePresence mode="wait">
//           {activeTab === 'upload' ? (
//             <motion.div
//               key="upload"
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               exit={{ opacity: 0, x: 20 }}
//               transition={{ duration: 0.3 }}
//               className="space-y-8"
//             >
//               {/* Drop Zone matching image */}
//               <GlassCard
//                 className={`w-full aspect-[4/3] flex flex-col items-center justify-center space-y-4 border-2 border-dashed ${
//                   isDragging ? 'border-mint bg-mint/5' : 'border-white/20'
//                 }`}
//                 onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
//                 onDragLeave={() => setIsDragging(false)}
//                 onDrop={(e) => { e.preventDefault(); setIsDragging(false); }}
//               >
//                 <div className="w-16 h-16 rounded-2xl bg-current opacity-10 flex items-center justify-center mb-2">
//                   <Upload className="w-8 h-8 opacity-80" />
//                 </div>
//                 <p className="opacity-60 font-medium">Tap or drag to upload</p>
//               </GlassCard>

//               {/* Sample Uploaded Image matching image */}
//               <div className="flex justify-center">
//                 <GlassCard className="w-64 p-3 relative group overflow-hidden">
//                   <div className="album-glow opacity-30 group-hover:opacity-50 transition-opacity" />
//                   <div className="relative z-10">
//                     <div className="aspect-square rounded-2xl overflow-hidden mb-4 border border-white/10">
//                       <img
//                         src={previewImage}
//                         alt="Preview"
//                         className="w-full h-full object-cover"
//                       />
//                     </div>
//                     {/* <div className="text-center">
//                       <p className="text-sm font-medium opacity-90">Sample uploaded</p>
//                       <p className="text-xs opacity-50">Inner image</p>
//                     </div> */}
//                   </div>
//                 </GlassCard>
//               </div>
//             </motion.div>
//           ) : (
//             <motion.div
//               key="generate"
//               initial={{ opacity: 0, x: 20 }}
//               animate={{ opacity: 1, x: 0 }}
//               exit={{ opacity: 0, x: -20 }}
//               transition={{ duration: 0.3 }}
//               className="space-y-9"
//             >
//               <div className="space-y-4">
//                 <p className="text-md font-medium text-[var(--text-main)] opacity-80">Input Prompt</p>
//                 <textarea
//                   value={prompt}
//                   onChange={(e) => setPrompt(e.target.value)}
//                   placeholder="Describe the image you want to generate..."
//                   className="w-full h-36 p-5 rounded-3xl bg-[var(--glass-bg)] border border-[var(--glass-border)] backdrop-blur-xl outline-none focus:border-[var(--mint)]/50 transition-all resize-none text-[var(--text-main)] placeholder:text-[var(--text-main)] placeholder:opacity-30"
//                 />
//               </div>

//               {/* <div className="relative mt-4">
//   <textarea
//     value={prompt}
//     onChange={(e) => setPrompt(e.target.value)}
//     onFocus={() => setIsFocused(true)}
//     onBlur={() => setIsFocused(false)}
//     // Placeholder is now ALWAYS visible when the box is empty
//     placeholder="Describe the image you want to generate..."
//     className="w-full h-36 p-5 rounded-3xl bg-[var(--glass-bg)] border border-[var(--glass-border)] backdrop-blur-xl outline-none focus:border-[var(--mint)]/50 transition-all resize-none text-current placeholder:text-current placeholder:opacity-40"
//   />

//   <label
//     className={`absolute pointer-events-none transition-all duration-300 px-2 rounded-md ${
//       isFocused || prompt
//         ? '-top-3 left-4 text-xs opacity-100 text-[var(--mint)] bg-[var(--glass-bg)] backdrop-blur-xl border border-[var(--glass-border)]'
//         : 'top-3 left-4 text-xs opacity-0 scale-95'
//     }`}
//   >
//     Input Prompt
//   </label>
// </div> */}

//               <GlassButton className="w-full py-4 bg-red-400 flex items-center justify-center space-x-2">
//                 {/* <Sparkles className="w-5 h-5" /> */}
//                 <span>Generate Image</span>
//               </GlassButton>

//               {/* <div className="pt-8">
//                 <p className="text-sm font-medium opacity-40 uppercase tracking-wider mb-4">Recent Styles</p>
//                 <div className="grid grid-cols-3 gap-3">
//                   {['Cinematic', 'Nature', 'Action'].map((vibe) => (
//                     <button
//                       key={vibe}
//                       className="px-4 py-2 rounded-full border border-current opacity-10 bg-current opacity-5 text-xs opacity-60 hover:opacity-100 hover:border-mint/30 transition-all"
//                     >
//                       {vibe}
//                     </button>
//                   ))}
//                 </div>
//               </div> */}
//               {/* Sample Uploaded Image matching image */}
//               <div className="flex justify-center">
//                 <GlassCard className="w-64 p-3 relative group overflow-hidden">
//                   <div className="album-glow opacity-30 group-hover:opacity-50 transition-opacity" />
//                   <div className="relative z-10">
//                     <div className="aspect-square rounded-2xl overflow-hidden mb-4 border border-white/10">
//                       <img
//                         src={previewImage}
//                         alt="Preview"
//                         className="w-full h-full object-cover"
//                       />
//                     </div>
//                     {/* <div className="text-center">
//                       <p className="text-sm font-medium opacity-90">Sample uploaded</p>
//                       <p className="text-xs opacity-50">Inner image</p>
//                     </div> */}
//                   </div>
//                 </GlassCard>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// }




// with logic
