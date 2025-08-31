# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

SecureGen is a React-based cryptographically secure password generator built as a Progressive Web App (PWA). It's designed for local-first operation with all data processing happening client-side, never sending data to external servers.

## Development Commands

### Core Commands
- `npm run dev` - Start development server on port 3000
- `npm run build` - Build for production (runs TypeScript compilation + Vite build)
- `npm run lint` - Run ESLint with TypeScript support
- `npm run preview` - Preview production build locally

### Testing
- `vitest` or `npm test` - Run tests using Vitest
- Tests are configured to run files matching `**/*.test.tsx` and `**/*.spec.tsx`
- Test setup file: `src/test/setup.ts` (note: there's also `src/test/setups.ts` which appears to be the actual file)
- Tests use jsdom environment with global test utilities

## Architecture

### Core Structure
- **React + TypeScript**: Main application framework
- **Vite**: Build tool and dev server
- **Framer Motion**: Animation library for UI interactions
- **Tailwind CSS**: Utility-first styling (with custom Apple-style classes)
- **PWA**: Progressive Web App with offline capabilities via Vite PWA plugin

### Key Directories
```
src/
├── components/          # React components
│   ├── __tests__/      # Component tests  
├── hooks/              # Custom React hooks
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
└── test/               # Test configuration and setup
```

### Core Components Architecture
- **App.tsx**: Main application component with two-column layout
- **usePasswordGenerator**: Central hook managing password generation state and session management
- **PasswordDisplay**: Shows generated passwords with strength indicators
- **SettingsPanel**: Password generation configuration
- **SessionList**: Manages current session passwords
- **ExportDropdown**: Handles password export in multiple formats

### Data Flow
1. Settings managed via `usePasswordGenerator` hook
2. Cryptographically secure password generation via `crypto.getRandomValues()`
3. Session management with local state (no persistence)
4. Export functionality supports CSV, TXT, and KeePass formats

### Security Architecture
- Uses Web Crypto API (`crypto.getRandomValues()`) for secure random generation
- All processing is client-side - no network requests
- Password strength calculation with multiple criteria
- Option to exclude similar characters for better readability

### Styling System
- Tailwind CSS with custom Apple-style color classes (e.g., `apple-blue-500`, `apple-gray-200`)
- Responsive design with `lg:grid-cols-2` layout breakpoint
- Framer Motion animations for smooth user interactions

## Development Notes

### Testing Setup
- Vitest with jsdom environment
- Mocks for `crypto.getRandomValues()`, `navigator.clipboard`, and `framer-motion`
- Test files should use `.test.tsx` or `.spec.tsx` extensions

### PWA Configuration
- Configured in `vite.config.ts` with auto-update registration
- Includes app manifest for standalone mobile app experience
- Workbox for offline functionality

### Type System
Key interfaces in `src/types/password.ts`:
- `IPasswordSettings`: Generation parameters
- `IPasswordEntry`: Session password entry
- `IPasswordStrength`: Strength calculation result
- `IExportData`: Export format structure

## Important Implementation Details

### Password Generation
- Character sets are configurable (lowercase, uppercase, numbers, symbols)
- Similar character exclusion available (`il1Lo0O`)
- Minimum validation ensures at least one character type is selected

### Session Management
- Passwords stored in component state only (not persisted)
- Each entry includes timestamp, settings snapshot, and site name
- Clear session functionality removes all data

### Export Functionality
- Three formats: CSV, TXT (human-readable), and KeePass CSV
- Files include UTF-8 BOM for proper encoding
- Automatic filename generation with current date