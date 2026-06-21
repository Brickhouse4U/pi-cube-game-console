# Pi Cube Game Console
A custom game console menu built with Electron, React, and Vite — designed to run on a Raspberry Pi 4 as a dedicated embedded OS built with Yocto.

> ⚠️ This project is currently in active development. Many features are placeholders and will be implemented incrementally.

---

## Table of Contents
1. [Overview](#overview)
2. [Current State](#current-state)
3. [Planned Features](#planned-features)
4. [Tech Stack](#tech-stack)
5. [Project Structure](#project-structure)
6. [Getting Started](#getting-started)
7. [Building for Raspberry Pi](#building-for-raspberry-pi)
8. [Yocto Integration](#yocto-integration)
9. [Roadmap](#roadmap)

---

## Overview

Pi Cube Game Console is a fullscreen Electron application that serves as the main UI for a custom Raspberry Pi 4 based game console. It boots directly into the menu via a Yocto-built embedded Linux OS, replacing the standard desktop environment entirely.

| Property | Value |
|---|---|
| Target Hardware | Raspberry Pi 4 (armv7l) |
| OS | Custom Yocto Linux (scarthgap) |
| App Framework | Electron 32 + React 18 + Vite 5 |
| Display | Fullscreen X.Org via systemd service |

---

## Current State

The application provides a fully navigable menu with working hardware integration.

### Games Page
- Browses games stored at `/media/picube/games/` on the device
- Displays a video preview and title for the selected game
- Launches games as a Python subprocess via Electron IPC
- Gamepad A button launches the selected game; B button returns to the main menu

### Options Page
- Brightness slider connected to system display via `ddcutil` (DDC/CI)
- Volume slider connected to ALSA via `amixer`
- Gamepad D-pad navigates between sliders and adjusts values
- B button returns to the main menu

### Main Menu
- Lists available pages (Games, Options)
- Gamepad D-pad up/down navigates; A selects

### Navigation
- Routing handled by `react-router-dom` with `HashRouter`
- Gamepad input handled by a custom polling module using the browser Gamepad API

---

## Planned Features

The following feature is still pending implementation:

### 1. 💾 External Device Manager
A new page for managing games and files stored on a USB drive or external storage device. Will allow users to browse, add, and remove games from the console.

---

## Tech Stack

### Frontend
| Package | Version | Purpose |
|---|---|---|
| `react` | ^18.3.1 | UI framework |
| `react-dom` | ^18.3.1 | React DOM rendering |
| `react-router-dom` | ^7.13.1 | Page routing / navigation |
| `lodash` | ^4.17.21 | Debounce utility for slider input |

### Build Tools
| Package | Version | Purpose |
|---|---|---|
| `typescript` | ^6.0.3 | Type checking for both renderer and main process |
| `vite` | ^5.4.0 | Frontend bundler / dev server |
| `@vitejs/plugin-react` | ^4.3.0 | React support for Vite |
| `concurrently` | ^9.2.1 | Run Vite and Electron simultaneously in dev |

### Desktop
| Package | Version | Purpose |
|---|---|---|
| `electron` | ^32.0.0 | Desktop app wrapper |
| `electron-builder` | ^25.0.0 | Packages app as AppImage for ARM |

---

## Project Structure

```
pi-cube-game-console/
├── electron/
│   ├── main.ts              # Electron main process — window creation, IPC handlers
│   ├── preload.ts           # Context bridge — exposes APIs to renderer
│   └── utils/
│       ├── assets.ts        # Resolves resource paths (sounds, pictures, game covers)
│       ├── brightness.ts    # Display brightness via ddcutil (CommonJS, main process only)
│       ├── gamepad.ts       # Gamepad polling using browser Gamepad API
│       ├── sound.ts         # Audio preloading and playback
│       └── volume.ts        # System volume via amixer (CommonJS, main process only)
├── src/
│   ├── components/
│   │   ├── Buttons/
│   │   │   ├── CancelButton.tsx
│   │   │   ├── DownButton.tsx
│   │   │   ├── MenuOption.tsx
│   │   │   └── UpButton.tsx
│   │   ├── GamesPageComponents/
│   │   │   ├── GameSelectionsView.tsx
│   │   │   └── GameSnippet.tsx
│   │   ├── OptionsPageComponents/
│   │   │   └── CustomSlider.tsx
│   │   └── CubeLayout.tsx
│   ├── pages/
│   │   ├── Games.tsx        # Games browser page
│   │   ├── MainMenu.tsx     # Main menu / landing page
│   │   └── Options.tsx      # System settings page
│   ├── styles/              # CSS module styles
│   ├── electron.d.ts        # Window interface augmentation for preload APIs
│   ├── vite-env.d.ts        # Vite client type reference
│   ├── App.tsx              # Root component + router setup
│   └── main.tsx             # React entry point
├── index.html               # Electron renderer entry point
├── tsconfig.json            # TypeScript config for renderer + electron utils
├── tsconfig.electron.json   # TypeScript config for electron main process (CommonJS)
├── tsconfig.node.json       # TypeScript config for vite.config.ts
├── vite.config.ts           # Vite configuration
└── package.json
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm

### Install dependencies
```bash
npm install
```

### Run in development mode
```bash
npm start
```
This starts both the Vite dev server and Electron simultaneously.

### Build for production (local x64)
```bash
npm run package:local
```

### Build for Raspberry Pi (armv7l)
```bash
npm run package:pi
```
Output: `dist/Game-Console-Menu-1.0.0-armv7l.AppImage`

---

## Building for Raspberry Pi

The app is packaged as an `armv7l` AppImage for the Raspberry Pi 4's 32-bit userspace.

> ⚠️ **Architecture Note**: The target is `armv7l` (32-bit), NOT `arm64`. Raspberry Pi OS uses a 32-bit userspace even on the Pi 4's 64-bit hardware. Using `arm64` will result in a binary that silently fails to run.

```bash
# Build the armv7l AppImage
npm run package:pi

# Test on Pi via SSH
scp dist/Game-Console-Menu-1.0.0-armv7l.AppImage user@<pi-ip>:/home/user/
ssh user@<pi-ip>
DISPLAY=:0 ./Game-Console-Menu-1.0.0-armv7l.AppImage --no-sandbox
```

### Required Electron flags on Pi
The following flags are required when running on the Yocto image due to missing GPU/EGL support:
```
--no-sandbox
--disable-gpu
--disable-software-rasterizer
--disable-gpu-compositing
--use-gl=swiftshader
```

---

## Yocto Integration

This app is deployed as part of a custom Yocto Linux image for the Raspberry Pi 4. The Yocto layer that packages and auto-starts this app is maintained separately:

👉 **[meta-game-console](https://github.com/Brickhouse4U/meta-game-console)**

The Yocto build extracts the AppImage contents and installs them to `/opt/game-console-menu/` on the target image. A systemd service starts X.Org and launches the app automatically on boot.

---

## Roadmap

```
✅ Phase 0 — Project setup and Yocto deployment
✅ Phase 1 — Basic page navigation (Games + Options)
✅ Phase 2 — Brightness adjustment (Options → ddcutil → display)
⬜ Phase 3 — External device manager page
✅ Phase 4 — Game launcher (spawn Python subprocess via IPC)
✅ Phase 5 — Volume integration (Options → amixer → ALSA)
✅ Phase 6 — Gamepad / controller support (browser Gamepad API)
✅ Phase 7 — Full TypeScript migration (renderer + main process)
```

---

## Notes
This project was developed for personal/educational purposes. The Yocto build configuration and initial project structure were developed with the assistance of Claude (Anthropic) and validated through iterative testing on physical hardware.
