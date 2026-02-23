// // import React, { useState } from 'react';
// // import { useNavigate } from 'react-router';
// // import { GlassCard } from '../components/GlassCard';
// // import { GlassButton } from '../components/GlassButton';
// // import { GlassInput } from '../components/GlassInput';
// // import { Sparkles, Mail, Lock, Chrome, Apple } from 'lucide-react';

// // export function LoginScreen() {
// //   const navigate = useNavigate();
// //   const [email, setEmail] = useState('');
// //   const [password, setPassword] = useState('');

// //   const handleLogin = () => {
// //     navigate('/home');
// //   };

// //   return (
// //     <div className="screen-container overflow-y-auto pb-12">
// //       <div className="flex flex-col items-center justify-center min-h-screen px-6 pt-12">
// //         {/* Glass Card */}
// //         <GlassCard className="w-full max-w-sm p-8 flex flex-col items-center">
// //           <h1 className="text-3xl font-bold mb-10 text-center tracking-tight text-white/90">Login</h1>
          
// //           <div className="w-full space-y-5">
// //             <div className="relative">
// //               <GlassInput
// //                 type="email"
// //                 placeholder="Email"
// //                 value={email}
// //                 onChange={(e) => setEmail(e.target.value)}
// //                 className="pl-5 ring-offset-background"
// //               />
// //             </div>
            
// //             <div className="relative">
// //               <GlassInput
// //                 type="password"
// //                 placeholder="Password"
// //                 value={password}
// //                 onChange={(e) => setPassword(e.target.value)}
// //                 className="pl-5"
// //               />
// //             </div>
// //           </div>

// //           <div className="w-full text-right mt-3">
// //             <button className="text-xs text-white/60 hover:text-white transition-colors">
// //               Forgot Password?
// //             </button>
// //           </div>

// //           <GlassButton onClick={handleLogin} className="w-full mt-10 text-lg py-5 shadow-xl shadow-mint/20">
// //             Login
// //           </GlassButton>

// //           <p className="text-center mt-10 text-sm text-white/60">
// //             Don't have an account?{' '}
// //             <button
// //               onClick={() => navigate('/signup')}
// //               className="text-white font-semibold hover:underline"
// //             >
// //               Sign up
// //             </button>
// //           </p>

// //           <div className="w-full flex items-center gap-4 my-8">
// //             <div className="h-[1px] flex-1 bg-white/10" />
// //             <span className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Or continue with</span>
// //             <div className="h-[1px] flex-1 bg-white/10" />
// //           </div>

// //           <div className="grid grid-cols-2 gap-4 w-full">
// //             <button className="flex items-center justify-center space-x-2 py-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
// //               <Chrome className="w-5 h-5" />
// //               <span className="text-sm font-medium">Google</span>
// //             </button>
// //             <button className="flex items-center justify-center space-x-2 py-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
// //               <Apple className="w-5 h-5" />
// //               <span className="text-sm font-medium">Apple</span>
// //             </button>
// //           </div>
// //         </GlassCard>
// //       </div>
// //     </div>
// //   );
// // }



// // with auth

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router';
// import { GlassCard } from '../components/GlassCard';
// import { GlassButton } from '../components/GlassButton';
// import { GlassInput } from '../components/GlassInput';
// import { Chrome, Apple } from 'lucide-react';
// import toast from 'react-hot-toast';

// import { auth, db, googleProvider, appleProvider } from '../../server/firebase';
// import { signInWithPopup } from 'firebase/auth';
// import { doc, setDoc, getDoc } from 'firebase/firestore';

// export function LoginScreen() {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const saveUserToDB = async (user) => {
//     const userRef = doc(db, 'users', user.uid);
//     const userSnap = await getDoc(userRef);

//     if (!userSnap.exists()) {
//       await setDoc(userRef, {
//         uid: user.uid,
//         name: user.displayName || 'Unknown User',
//         email: user.email,
//         authProvider: user.providerData[0]?.providerId || 'unknown',
//         createdAt: new Date(),
//       });
//     }
//   };

//   const handleGoogleAuth = async () => {
//     try {
//       toast.loading('Logging in with Google...', { id: 'auth' });
//       const result = await signInWithPopup(auth, googleProvider);
//       await saveUserToDB(result.user);
//       toast.success('Successfully logged in!', { id: 'auth' });
//       navigate('/home');
//     } catch (error) {
//       toast.error(error.message, { id: 'auth' });
//     }
//   };

//   const handleAppleAuth = async () => {
//     try {
//       toast.loading('Logging in with Apple...', { id: 'auth' });
//       const result = await signInWithPopup(auth, appleProvider);
//       await saveUserToDB(result.user);
//       toast.success('Successfully logged in!', { id: 'auth' });
//       navigate('/home');
//     } catch (error) {
//       toast.error(error.message, { id: 'auth' });
//     }
//   };

//   const handleManualLogin = () => {
//     toast('Manual email/password setup coming soon!', { icon: '🚧' });
//   };

//   return (
//     <div className="min-h-screen bg-[radial-gradient(ellipse_at_center,var(--bg-glow)_0%,var(--bg-base)_100%)] text-[var(--text-main)] font-['Inter',-apple-system,BlinkMacSystemFont,sans-serif] overflow-y-auto pb-12">
//       <div className="flex flex-col items-center justify-center min-h-screen px-6 pt-12">
//         <GlassCard className="w-full max-w-sm p-8 flex flex-col items-center">
//           <h1 className="text-3xl font-bold mb-10 text-center tracking-tight">Login</h1>
          
//           <div className="w-full space-y-5">
//             <div className="relative">
//               <GlassInput type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-5 ring-offset-background" />
//             </div>
//             <div className="relative">
//               <GlassInput type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="pl-5" />
//             </div>
//           </div>

//           <div className="w-full text-right mt-3">
//             <button className="text-xs opacity-60 hover:opacity-100 transition-colors">Forgot Password?</button>
//           </div>

//           <GlassButton onClick={handleManualLogin} className="w-full mt-10 text-lg py-5 shadow-xl shadow-mint/20">
//             Login
//           </GlassButton>

//           <p className="text-center mt-10 text-sm opacity-60">
//             Don't have an account?{' '}
//             <button onClick={() => navigate('/signup')} className="font-semibold hover:underline">Sign up</button>
//           </p>

//           <div className="w-full flex items-center gap-4 my-8">
//             <div className="h-[1px] flex-1 bg-current opacity-10" />
//             <span className="text-[10px] opacity-40 uppercase tracking-widest font-bold">Or continue with</span>
//             <div className="h-[1px] flex-1 bg-current opacity-10" />
//           </div>

//           <div className="grid grid-cols-2 gap-4 w-full">
//             <button onClick={handleGoogleAuth} className="flex items-center justify-center space-x-2 py-3 rounded-2xl bg-[var(--glass-bg)] border border-[var(--glass-border)] hover:bg-[var(--mint)]/10 transition-all">
//               <Chrome className="w-5 h-5" />
//               <span className="text-sm font-medium">Google</span>
//             </button>
//             <button onClick={handleAppleAuth} className="flex items-center justify-center space-x-2 py-3 rounded-2xl bg-[var(--glass-bg)] border border-[var(--glass-border)] hover:bg-[var(--gold)]/10 transition-all">
//               <Apple className="w-5 h-5" />
//               <span className="text-sm font-medium">Apple</span>
//             </button>
//           </div>
//         </GlassCard>
//       </div>
//     </div>
//   );
// }

// for google inteface mobile
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { GlassCard } from '../components/GlassCard';
import { GlassButton } from '../components/GlassButton';
import { GlassInput } from '../components/GlassInput';
import { Chrome, Apple } from 'lucide-react';
import toast from 'react-hot-toast';

// Native & Firebase Imports
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { auth, db, appleProvider } from '../../server/firebase'; // Removed googleProvider
import { signInWithPopup, GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

export function LoginScreen() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Initialize Native Google Auth
  useEffect(() => {
    GoogleAuth.initialize({
      clientId: import.meta.env.VITE_GOOGLE_WEB_CLIENT_ID, // ⚠️ REPLACE THIS
      scopes: ['profile', 'email'],
      grantOfflineAccess: true,
    });
  }, []);

  const saveUserToDB = async (user) => {
    const userRef = doc(db, 'users', user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      await setDoc(userRef, {
        uid: user.uid,
        name: user.displayName || 'Unknown User',
        email: user.email,
        authProvider: user.providerData[0]?.providerId || 'unknown',
        createdAt: new Date(),
      });
    }
  };

  const handleGoogleAuth = async () => {
    try {
      toast.loading('Opening Google...', { id: 'auth' });
      
      // 1. Trigger Native Android UI
      const googleUser = await GoogleAuth.signIn();
      
      // 2. Pass secure token to Firebase
      const credential = GoogleAuthProvider.credential(googleUser.authentication.idToken);
      const result = await signInWithCredential(auth, credential);
      
      // 3. Save to DB and Route
      await saveUserToDB(result.user);
      toast.success('Successfully logged in!', { id: 'auth' });
      navigate('/home');
    } catch (error) {
      console.error(error);
      toast.error('Google login cancelled or failed.', { id: 'auth' });
    }
  };

  const handleAppleAuth = async () => {
    try {
      toast.loading('Logging in with Apple...', { id: 'auth' });
      const result = await signInWithPopup(auth, appleProvider);
      await saveUserToDB(result.user);
      toast.success('Successfully logged in!', { id: 'auth' });
      navigate('/home');
    } catch (error) {
      toast.error(error.message, { id: 'auth' });
    }
  };

  const handleManualLogin = () => {
    toast('Manual email/password setup coming soon!', { icon: '🚧' });
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_center,var(--bg-glow)_0%,var(--bg-base)_100%)] text-[var(--text-main)] font-['Inter',-apple-system,BlinkMacSystemFont,sans-serif] overflow-y-auto pb-12">
      <div className="flex flex-col items-center justify-center min-h-screen px-6 pt-12">
        <GlassCard className="w-full max-w-sm p-8 flex flex-col items-center">
          <h1 className="text-3xl font-bold mb-10 text-center tracking-tight">Login</h1>
          
          <div className="w-full space-y-5">
            <div className="relative">
              <GlassInput type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-5 ring-offset-background" />
            </div>
            <div className="relative">
              <GlassInput type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="pl-5" />
            </div>
          </div>

          <div className="w-full text-right mt-3">
            <button className="text-xs opacity-60 hover:opacity-100 transition-colors">Forgot Password?</button>
          </div>

          <GlassButton onClick={handleManualLogin} className="w-full mt-10 text-lg py-5 shadow-xl shadow-mint/20">
            Login
          </GlassButton>

          <p className="text-center mt-10 text-sm opacity-60">
            Don't have an account?{' '}
            <button onClick={() => navigate('/signup')} className="font-semibold hover:underline">Sign up</button>
          </p>

          <div className="w-full flex items-center gap-4 my-8">
            <div className="h-[1px] flex-1 bg-current opacity-10" />
            <span className="text-[10px] opacity-40 uppercase tracking-widest font-bold">Or continue with</span>
            <div className="h-[1px] flex-1 bg-current opacity-10" />
          </div>

          <div className="grid grid-cols-2 gap-4 w-full">
            <button onClick={handleGoogleAuth} className="flex items-center justify-center space-x-2 py-3 rounded-2xl bg-[var(--glass-bg)] border border-[var(--glass-border)] hover:bg-[var(--mint)]/10 transition-all">
              <Chrome className="w-5 h-5" />
              <span className="text-sm font-medium">Google</span>
            </button>
            <button onClick={handleAppleAuth} className="flex items-center justify-center space-x-2 py-3 rounded-2xl bg-[var(--glass-bg)] border border-[var(--glass-border)] hover:bg-[var(--gold)]/10 transition-all">
              <Apple className="w-5 h-5" />
              <span className="text-sm font-medium">Apple</span>
            </button>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}