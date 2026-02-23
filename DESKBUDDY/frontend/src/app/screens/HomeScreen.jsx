// import React from 'react';
// import { useNavigate } from 'react-router';
// import { GlassCard } from '../components/GlassCard';
// import { MessageSquare, Upload, TrendingUp, Music, Home, Plus, Search, Bell, User } from 'lucide-react';

// export function HomeScreen() {
//   const navigate = useNavigate();

//   const features = [
//     { icon: MessageSquare, label: 'Bot', route: '/chat' },
//     { icon: Upload, label: 'Upload', route: '/upload' },
//     { icon: TrendingUp, label: 'Stocks', route: '/stocks' },
//     { icon: Music, label: 'Music', route: '/music' },
//   ];

//   const navItems = [
//     { icon: Home, active: true },
//     { icon: Plus, active: false },
//     { icon: Bell, active: false },
//     { icon: User, active: false },
//   ];
  

//   return (
//     <div className="screen-container">
//       <div className="flex flex-col h-full px-6 pt-16 pb-24">
//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-4xl mb-2">Hi Dheeraj</h1>
//           <p className="opacity-60">Welcome to your AI-Native OS</p>
//         </div>

//         {/* Feature Grid */}
//         <div className="grid grid-cols-2 gap-4 flex-1">
//           {features.map((feature) => {
//             const Icon = feature.icon;
//             return (
//               <GlassCard
//                 key={feature.label}
//                 className="feature-card"
//                 onClick={() => navigate(feature.route)}
//               >
//                 <div className="flex flex-col items-center justify-center h-full space-y-4">
//                   <div className="icon-wrapper">
//                     <Icon className="w-8 h-8" />
//                   </div>
//                   <span className="text-lg">{feature.label}</span>
//                 </div>
//               </GlassCard>
//             );
//           })}
//         </div>
//       </div>

//       {/* Bottom Navigation */}
//       <div className="fixed bottom-6 left-6 right-6">
//         <GlassCard className="px-8 py-4">
//           <div className="flex justify-between items-center">
//             {navItems.map((item, idx) => {
//               const Icon = item.icon;
//               return (
//                 <button
//                   key={idx}
//                   className={`nav-icon ${item.active ? 'active' : ''}`}
//                   onClick={() => {
//                     if (idx === 3) navigate('/settings');
//                   }}
//                 >
//                   <Icon className="w-6 h-6" />
//                 </button>
//               );
//             })}
//           </div>
//         </GlassCard>
//       </div>
//     </div>
//   );
// }




// with auth
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Changed to react-router-dom for web
import { GlassCard } from '../components/GlassCard';
import { MessageSquare, Upload, TrendingUp, Music, Home, Plus, Search, Bell, User } from 'lucide-react';

// Firebase import
import { auth } from '../../server/firebase';
import { onAuthStateChanged } from 'firebase/auth';

export function HomeScreen() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState(''); // State to hold the dynamic name

  // Listen to Firebase Auth state to get the user's name
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // Grab the display name, fallback to 'User' if null
        const fullName = currentUser.displayName || 'User';
        // Split by space to just get the first name
        const first = fullName.split(' ')[0];
        setFirstName(first);
      }
    });
    
    return unsubscribe; // Cleanup listener on unmount
  }, []);

  const features = [
    { icon: MessageSquare, label: 'Bot', route: '/chat' },
    { icon: Upload, label: 'Upload', route: '/upload' },
    { icon: TrendingUp, label: 'Stocks', route: '/stocks' },
    { icon: Music, label: 'Music', route: '/music' },
  ];


  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_center,var(--bg-glow)_0%,var(--bg-base)_100%)] text-[var(--text-main)] font-['Inter',-apple-system,BlinkMacSystemFont,sans-serif] overflow-x-hidden">
      <div className="flex flex-col h-full px-6 pt-16 pb-24">
        {/* Header */}
        <div className="mb-8">
          {/* Dynamic Greeting */}
          <h1 className="text-4xl mb-2">Hi {firstName}</h1>
          <p className="text-[var(--gold)] opacity-80">Welcome to your AI-Native OS</p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-2 gap-4 flex-1">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <GlassCard
                key={feature.label}
                className="feature-card"
                onClick={() => navigate(feature.route)}
              >
                <div className="flex flex-col items-center justify-center h-full space-y-4">
                  <div className="icon-wrapper">
                    <Icon className="w-8 h-8" />
                  </div>
                  <span className="text-lg">{feature.label}</span>
                </div>
              </GlassCard>
            );
          })}
        </div>
      </div>

    </div>
  );
}

