# StorageNet Project

## Overview
StorageNet is a decentralized storage network simulation built as a demonstration of peer-to-peer storage concepts. The application allows users to upload files, allocate storage space, and earn rewards for contributing to the network.

## Tech Stack
- **Frontend Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4
- **UI Components**: Radix UI primitives with custom implementations
- **State Management**: @github/spark hooks (useKV for persistent storage)
- **Icons**: Phosphor Icons
- **Data Visualization**: D3.js, Recharts
- **Animations**: Framer Motion

## Project Structure
```
src/
├── components/
│   ├── ui/           # Reusable UI components (buttons, cards, etc.)
│   ├── Dashboard.tsx # Main dashboard view
│   ├── Upload.tsx    # File upload functionality
│   ├── Network.tsx   # Network visualization
│   └── Provider.tsx  # Storage provider interface
├── lib/
│   ├── types.ts      # TypeScript type definitions
│   └── utils.ts      # Utility functions
├── hooks/            # Custom React hooks
├── styles/           # Global styles and theme
└── App.tsx           # Main application component
```

## Key Features
1. **Storage Dashboard**: Display storage metrics, earnings, and network status
2. **File Upload Simulation**: Simulate uploading files with sharding visualization
3. **Storage Provider Setup**: Allow users to allocate storage and earn rewards
4. **Points & Rewards System**: Track and display point accumulation
5. **Network Visualization**: Interactive visualization of network nodes and file distribution

## Data Models
- **StorageFile**: Represents uploaded files with metadata
- **StorageStats**: User's storage statistics and provider status
- **Transaction**: Records of user activities and point transactions

## Development Conventions
- Use TypeScript for all new code
- Follow React functional component patterns with hooks
- Utilize Tailwind CSS for styling with the defined design system
- Store state using @github/spark's useKV hook for persistence
- Maintain consistent file naming (PascalCase for components)
- Export components as default exports

## Design System
- **Color Palette**: Cyber Blue primary, Electric Teal secondary, Vibrant Magenta accent
- **Typography**: Inter font family with defined hierarchy
- **Components**: Radix UI based with custom theming
- **Spacing**: Tailwind's spacing scale with consistent patterns
- **Animations**: Framer Motion for meaningful micro-interactions

## Build & Development
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint