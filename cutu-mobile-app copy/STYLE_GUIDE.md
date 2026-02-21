# CUTU Bot Mobile App — Style Guide

Design system for the CUTU Bot mobile-first UI. Light, cool palette with glass-morphism and clean typography. Aligned with UrbanNook (urbannook.in) and crop-modelling.vercel.app aesthetics.

---

## 1. Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `cutu-bg` | `#f8fafc` | Page background |
| `cutu-bg-elevated` | `#ffffff` | Elevated surfaces |
| `cutu-primary` | `#0ea5e9` | Primary actions, links, active states |
| `cutu-primary-light` | `#38bdf8` | Hover, accents |
| `cutu-primary-soft` | `#bae6fd` | Soft backgrounds, pills |
| `cutu-accent` | `#06b6d4` | Secondary accent (gradients) |
| `cutu-accent-pastel` | `#a5f3fc` | Pastel accent surfaces |
| `cutu-text` | `#1e293b` | Primary text |
| `cutu-text-secondary` | `#64748b` | Secondary text |
| `cutu-muted` | `#94a3b8` | Muted icons, labels |
| `cutu-sky` | `#e0f2fe` | Sky blue backgrounds |
| `cutu-lavender` | `#c7d2fe` | Lavender accent |
| `cutu-mint` | `#a7f3d0` | Mint accent |

**Rules**
- Light mode only. No dark theme.
- Use gradients sparingly: `from-cutu-primary to-cutu-accent`.
- Glass cards: `bg-white/72 backdrop-blur-xl border border-white/60`.

---

## 2. Typography

| Family | Use |
|--------|-----|
| **DM Sans** | Body, UI labels, buttons |
| **Outfit** | Headings, display |

| Element | Size | Weight | Line height |
|---------|------|--------|-------------|
| Page title | 18–24px | 600 | 1.2 |
| Section title | 14–16px | 600 | 1.3 |
| Body | 14px | 400 | 1.5 |
| Caption | 12px | 400 | 1.4 |
| Small label | 10–11px | 500 | 1.2 |

---

## 3. Spacing

| Token | Value | Usage |
|-------|-------|-------|
| `xs` | 4px | Tight gaps |
| `sm` | 8px | Icon-text gap |
| `md` | 16px | Section padding |
| `lg` | 24px | Card padding |
| `xl` | 32px | Page margins |

- Mobile content padding: `px-4` (16px) horizontal.
- Bottom nav safe area: `safe-bottom` for notch devices.

---

## 4. Components

### GlassCard
- `bg-white/72 backdrop-blur-xl border border-white/60`
- `rounded-2xl shadow-glass`
- Optional: `active:scale-[0.98]` for tap feedback

### Buttons
- Primary: `bg-cutu-primary` or gradient `from-cutu-primary to-cutu-accent`
- Secondary: `border border-slate-200 text-cutu-text`
- Destructive: `border border-red-200 text-red-600`

### Modals
- Full bleed on mobile (sheet from bottom)
- Rounded top corners: `rounded-t-3xl`
- Backdrop: `bg-slate-900/30 backdrop-blur-sm`

---

## 5. Breakpoints

| Breakpoint | Min width | Usage |
|------------|-----------|-------|
| Default | 320px | Mobile-first base |
| `sm` | 480px | Larger phones |
| `md` | 768px | Tablets (optional) |

Layout is optimized for **320px–480px** mobile viewport.

---

## 6. Motion & UX

- **Splash**: Fade out over 0.5s after 2.2s display.
- **Cards**: Fade + slide up (`opacity: 0 → 1`, `y: 8 → 0`), ~0.3s.
- **Modal**: Spring animation, `damping: 25`, `stiffness: 300`.
- **Nav tab**: Pill highlight with `layoutId="nav-pill"` for smooth transition.
- **Buttons**: `active:scale-[0.98]` for tap feedback.

---

## 7. Iconography

- **Library**: Lucide React
- **Size**: 18–24px for actions, 14px for inline.
- **Stroke**: 1.5–2 for clarity on small screens.
- **Color**: `text-cutu-muted` inactive, `text-cutu-primary` active.

---

## 8. Accessibility

- `aria-label` on icon-only buttons.
- Sufficient contrast: text on `cutu-bg` meets WCAG AA.
- `-webkit-tap-highlight-color: transparent` to reduce flash on tap.
- `touch-action: manipulation` for faster tap response.

---

## 9. File Structure

```
cutu-mobile-app/
├── src/
│   ├── components/
│   │   ├── BottomNav.jsx
│   │   ├── GlassCard.jsx
│   │   └── Modal.jsx
│   ├── pages/
│   │   ├── SplashScreen.jsx
│   │   ├── Landing.jsx
│   │   ├── Login.jsx
│   │   ├── SignUp.jsx
│   │   ├── AppLayout.jsx
│   │   ├── BotChat.jsx
│   │   ├── ImageUpload.jsx
│   │   ├── StocksDashboard.jsx
│   │   ├── MusicPlayer.jsx
│   │   ├── More.jsx
│   │   ├── Notifications.jsx
│   │   ├── Help.jsx
│   │   └── Feedback.jsx
│   ├── App.jsx
│   └── index.css
├── tailwind.config.js
├── package.json
└── STYLE_GUIDE.md
```

---

## 10. UX Annotations (per screen)

| Screen | Notes |
|--------|-------|
| **Splash** | 2.2s display, then fade to landing/app. |
| **Landing** | Feature cards are tappable; CTA fixed at bottom. |
| **Login/SignUp** | Social + email; passwordless option shown. |
| **Bot Chat** | Input bar fixed above nav; image picker in bar. |
| **Images** | Tap area for upload/camera; `capture` on file input for camera. |
| **Stocks** | Search + refresh; placeholder for charts. |
| **Music** | Seek bar, play/pause, playlist list. |
| **More** | Profile card, settings links, logout modal. |
| **Modal** | Backdrop tap to close; sheet on mobile. |
