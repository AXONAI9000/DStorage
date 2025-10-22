# StorageNet Project Onboarding Guide

Welcome to StorageNet! This comprehensive guide will help you understand the project structure, key features, and how to get started with development.

---

## 1. Project Overview

**StorageNet** is a decentralized storage network simulation application built as an educational Web3 demonstration. It showcases how users can share storage space, earn rewards for contributions, and understand the fundamentals of distributed file systems.

### Core Vision
- **Trustworthy**: Clear visualization of storage metrics and rewards builds confidence in the system
- **Educational**: Interactive elements help users understand decentralized storage concepts
- **Gamified**: Point-based rewards and progress tracking make participation engaging

### Project Type
Light Application with multiple features and basic state management - demonstrates core concepts of P2P storage with simulated metrics, file management, and reward tracking without actual blockchain or distributed storage implementation.

---

## 2. Tech Stack

### Frontend Framework & Build Tools
- **React 19.0.0**: Modern React with latest features and performance improvements
- **TypeScript ~5.7.2**: Type-safe JavaScript development
- **Vite 6.3.5**: Next-generation frontend build tool for fast development and optimized builds
- **Tailwind CSS 4.1.11**: Utility-first CSS framework for rapid UI development

### UI Components & Libraries
- **Radix UI**: Headless component library for building accessible, high-quality design systems
  - Includes: accordion, alert-dialog, avatar, badge, button, card, carousel, checkbox, collapsible, command, context-menu, dialog, dropdown-menu, form, hover-card, input, label, menubar, navigation-menu, pagination, popover, progress, radio-group, resizable, scroll-area, select, separator, sheet, sidebar, skeleton, slider, switch, table, tabs, textarea, toggle, tooltip
- **Shadcn UI**: Pre-built component library based on Radix UI and Tailwind CSS
- **Heroicons & Phosphor Icons**: Icon libraries for UI elements
- **Class Variance Authority (CVA)**: TypeScript-first CSS composition framework

### State Management & Data
- **GitHub Spark**: KV storage solution using `@github/spark` for persistent data management
- **@tanstack/react-query**: Data synchronization and server state management
- **Zod**: TypeScript-first schema validation with static type inference

### Visualization & Animation
- **D3.js**: Data-driven visualization library for network graphs
- **Three.js**: 3D graphics library for advanced visualizations
- **Recharts**: React components for composable, responsive charts
- **Framer Motion**: Animation and motion library for React
- **Embla Carousel**: Carousel/slider component

### Forms & Validation
- **React Hook Form**: Performant, flexible form validation
- **@hookform/resolvers**: Validation resolvers for React Hook Form

### Additional Libraries
- **Octokit**: GitHub API client
- **Marked**: Markdown parser and renderer
- **Next-themes**: Theme management (light/dark mode)
- **Sonner**: Toast notification library
- **Date-fns**: Modern date utility library
- **UUID**: UUID generator
- **Vaul**: Drawer component utilities

### Development Tools
- **ESLint**: JavaScript linter with TypeScript support
- **Tailwind CSS PostCSS**: CSS processing for Tailwind
- **Vite React Plugin**: React integration with Vite

---

## 3. Quick Start

### Prerequisites
- Node.js 16+ and npm/yarn
- Git for version control
- Modern web browser

### Installation & Setup

```bash
# Clone the repository
git clone <repository-url>
cd spark-template

# Install dependencies
npm install

# Start development server
npm run dev

# The app will be available at http://localhost:5000
```

### Available Scripts

```bash
# Development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build locally
npm preview

# Lint code with ESLint
npm run lint

# Optimize dependencies
npm run optimize

# Kill process on port 5000 (Windows/Linux)
npm run kill
```

### First Steps
1. Run `npm install` to install all dependencies
2. Run `npm run dev` to start the development server
3. Open http://localhost:5000 in your browser
4. Explore the Dashboard, Upload, Network, and Provider tabs
5. Review the component structure in `src/components/`

---

## 4. Project Structure

```
spark-template/
├── docs/                          # Documentation files
│   └── PROJECT_ONBOARDING.md      # This file
├── src/
│   ├── components/
│   │   ├── ui/                    # Radix UI & Shadcn components
│   │   ├── App.tsx               # Main application component
│   │   ├── Dashboard.tsx         # Storage metrics & stats display
│   │   ├── Upload.tsx            # File upload interface
│   │   ├── Network.tsx           # Network visualization
│   │   ├── Provider.tsx          # Storage provider management
│   │   ├── Provider.tsx          # Context providers (theme, queries)
│   │   └── ErrorFallback.tsx     # Error boundary fallback
│   ├── hooks/
│   │   └── use-mobile.ts        # Mobile detection hook
│   ├── lib/
│   │   ├── types.ts             # TypeScript type definitions
│   │   └── utils.ts             # Utility functions
│   ├── styles/
│   │   ├── main.css             # Main styles
│   │   ├── theme.css            # Theme definitions
│   │   └── index.css            # Index styles
│   ├── main.tsx                 # React DOM entry point
│   └── App.tsx                  # Root application component
├── .github/                       # GitHub-specific files
├── .vscode/                       # VS Code settings
├── public/                        # Static assets
├── package.json                   # Project dependencies
├── tsconfig.json                  # TypeScript configuration
├── vite.config.ts                # Vite configuration
├── tailwind.config.js            # Tailwind CSS configuration
├── theme.json                    # Theme configuration
├── components.json               # Shadcn component registry
├── runtime.config.json           # Runtime configuration
├── README.md                      # Project readme
├── PRD.md                         # Product requirements document
├── SECURITY.md                    # Security guidelines
├── LICENSE                        # MIT license
└── .gitignore                     # Git ignore rules
```

### Key Directories

- **`src/components/ui/`**: Pre-built UI components from Radix UI and Shadcn
- **`src/components/`**: Custom application components (Dashboard, Upload, Network, Provider)
- **`src/lib/`**: Type definitions and utility functions
- **`src/styles/`**: Global styles and theme configuration
- **`.github/`**: GitHub Actions workflows and settings

---

## 5. Core Functionality

### 5.1 Storage Dashboard
- **Purpose**: Display storage contribution metrics, earnings, and network status
- **Component**: [`src/components/Dashboard.tsx`](../src/components/Dashboard.tsx)
- **Features**:
  - Real-time storage metrics visualization
  - Earned points display
  - Network health indicators
  - File listing and management
  - Transaction history

### 5.2 File Upload Simulation
- **Purpose**: Simulate uploading files to the distributed network with visualization
- **Component**: [`src/components/Upload.tsx`](../src/components/Upload.tsx)
- **Features**:
  - Drag-and-drop file upload
  - File sharding visualization
  - Distribution animation
  - Retrieval code generation
  - Upload progress tracking

### 5.3 Network Visualization
- **Purpose**: Interactive visualization showing simulated network nodes and file distribution
- **Component**: [`src/components/Network.tsx`](../src/components/Network.tsx)
- **Features**:
  - D3-based network graph visualization
  - Node status indicators
  - File chunk distribution display
  - Interactive hover details
  - Real-time network metrics

### 5.4 Storage Provider Setup
- **Purpose**: Allow users to allocate storage and become network providers
- **Component**: [`src/components/Provider.tsx`](../src/components/Provider.tsx)
- **Features**:
  - Storage allocation control (slider)
  - Provider activation/deactivation
  - Earning potential calculation
  - Real-time earnings tracking
  - Provider statistics

### 5.5 Points & Rewards System
- **Purpose**: Track and gamify participation through point accumulation
- **Features**:
  - Automatic point calculation based on actions
  - Animated counter updates
  - Achievement milestones
  - Leaderboard integration
  - Reward history tracking

---

## 6. State Management

### Data Persistence with GitHub Spark

The application uses **GitHub Spark's KV storage** for persistent state management:

```typescript
// Example from App.tsx
const [files = [], setFiles] = useKV<StorageFile[]>('storage-files', [])
const [stats = {...}, setStats] = useKV<StorageStats>('storage-stats', {...})
const [transactions = [], setTransactions] = useKV<Transaction[]>('transactions', [])
```

### Core Data Types

**StorageFile**:
```typescript
interface StorageFile {
  id: string              // Unique file identifier
  name: string            // File name
  size: number            // File size in bytes
  uploadedAt: number      // Timestamp of upload
  shards: number          // Number of distributed shards
  status: 'uploading' | 'active' | 'retrieving'
  retrievalCode: string   // Code to retrieve file
}
```

**StorageStats**:
```typescript
interface StorageStats {
  totalAllocated: number  // Total storage allocated (GB)
  totalUsed: number       // Storage currently used (GB)
  filesStored: number     // Number of files stored
  pointsEarned: number    // Total points/tokens earned
  isProvider: boolean     // Whether user is a provider
  providerEarnings: number // Earnings from providing storage
  networkNodes: number    // Number of nodes in network
}
```

**Transaction**:
```typescript
interface Transaction {
  id: string                                      // Unique transaction ID
  type: 'upload' | 'download' | 'provide' | 'reward'
  amount: number                                  // Transaction amount
  timestamp: number                               // Transaction timestamp
  description: string                             // Transaction description
}
```

### State Flow
1. Initial state is loaded from GitHub Spark KV storage with default values
2. User interactions update state via setter functions
3. Changes are automatically persisted to GitHub Spark
4. Components re-render on state changes

---

## 7. Development Notes

### Code Organization Best Practices

1. **Component Structure**: Keep components focused on single responsibilities
2. **Type Safety**: Always use TypeScript types, import from `src/lib/types.ts`
3. **Styling**: Use Tailwind CSS utility classes and component variants from CVA
4. **Icons**: Use Phosphor Icons (`@phosphor-icons/react`) for consistency
5. **Forms**: Use React Hook Form with Zod validation for type-safe forms

### Common Development Tasks

#### Adding a New Component

```typescript
// src/components/MyComponent.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function MyComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Component</CardTitle>
      </CardHeader>
      <CardContent>
        <Button>Click me</Button>
      </CardContent>
    </Card>
  )
}
```

#### Using Existing UI Components

```typescript
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

// Use in component
<Dialog open={isOpen} onOpenChange={setIsOpen}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Dialog Title</DialogTitle>
      <DialogDescription>Dialog description goes here</DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>
```

#### Working with GitHub Spark

```typescript
import { useKV } from '@github/spark/hooks'

function MyComponent() {
  const [data = 'default', setData] = useKV<string>('my-key', 'default')
  
  return (
    <>
      <p>{data}</p>
      <button onClick={() => setData('new value')}>Update</button>
    </>
  )
}
```

### Styling Guidelines

- Use Tailwind CSS classes for styling
- Use `cn()` utility from `src/lib/utils.ts` for conditional classes
- Leverage component variants from CVA for complex styling patterns
- Follow mobile-first responsive design: `sm:`, `md:`, `lg:` prefixes
- Color palette from `theme.json`: primary, secondary, accent, muted colors

### Icon Guidelines

Use Phosphor Icons for consistency:
- `HardDrives`, `Database` - Storage related
- `Globe`, `Graph` - Network related
- `Coins`, `TrendUp` - Rewards/earnings
- `ShareNetwork`, `BroadcastTower` - Provider related
- `File`, `Folder`, `FileArrowUp` - File operations

### Performance Considerations

1. **Code Splitting**: Lazy load components with React.lazy() if needed
2. **Image Optimization**: Use appropriate image formats and sizes
3. **Bundle Size**: Monitor dependencies and use tree-shaking
4. **Animations**: Use Framer Motion for performant animations
5. **Data Fetching**: Use React Query for efficient data management

### Common Issues & Solutions

**Issue**: State not persisting between page reloads
- **Solution**: Verify GitHub Spark is correctly initialized and KV keys are unique

**Issue**: Styling conflicts in Tailwind
- **Solution**: Use `cn()` utility for proper class merging, check specificity

**Issue**: Components not updating on prop changes
- **Solution**: Ensure proper dependency arrays in useEffect/useMemo

---

## 8. Deployment

### Building for Production

```bash
# Build the production bundle
npm run build

# Output will be in the 'dist/' directory
```

### Preview Production Build Locally

```bash
npm run preview
```

### Deployment Platforms

The project can be deployed to:

- **Vercel**: Recommended for React/Vite applications
  ```bash
  npm install -g vercel
  vercel
  ```

- **GitHub Pages**: Static hosting via GitHub Actions
  - Configure `vite.config.ts` with correct base path
  - Set up GitHub Actions workflow

- **Netlify**: Simple drag-and-drop or Git integration
  - Build command: `npm run build`
  - Publish directory: `dist`

- **Docker**: Container deployment
  ```dockerfile
  FROM node:18
  WORKDIR /app
  COPY package*.json ./
  RUN npm install
  COPY . .
  RUN npm run build
  EXPOSE 3000
  CMD ["npm", "run", "preview"]
  ```

### Environment Variables

Create `.env.local` for sensitive configuration:
```
VITE_API_BASE_URL=https://api.example.com
VITE_GITHUB_TOKEN=your_token_here
```

Access in code:
```typescript
const apiUrl = import.meta.env.VITE_API_BASE_URL
```

### Pre-deployment Checklist

- [ ] Run linting: `npm run lint`
- [ ] Build successfully: `npm run build`
- [ ] Test production build: `npm run preview`
- [ ] Update environment variables
- [ ] Review security settings in `SECURITY.md`
- [ ] Test all features in production build
- [ ] Update README.md with deployment instructions

---

## 9. Maintenance

### Dependency Management

```bash
# Check for outdated packages
npm outdated

# Update packages safely
npm update

# Audit for security vulnerabilities
npm audit

# Fix known vulnerabilities
npm audit fix
```

### Code Quality

```bash
# Run linter to check code style
npm run lint

# TypeScript compilation check
npx tsc -b --noCheck
```

### Performance Optimization

```bash
# Analyze bundle size
npm run build -- --analyze

# Pre-optimize dependencies
npm run optimize
```

### Common Maintenance Tasks

1. **Dependency Updates**: Review and test before updating major versions
2. **Security Patches**: Apply security updates promptly
3. **Code Reviews**: Maintain code quality through peer review
4. **Testing**: Add unit tests for critical functionality
5. **Documentation**: Keep documentation synchronized with code changes

### Monitoring & Logging

- Implement error boundary with [`ErrorFallback.tsx`](../src/components/ErrorFallback.tsx)
- Use browser console for development debugging
- Integrate with services like Sentry for production error tracking
- Monitor performance metrics with web vitals

---

## 10. Extension Opportunities

### Potential Features

1. **Real Blockchain Integration**
   - Connect to Ethereum or other blockchain networks
   - Implement actual token rewards
   - Deploy smart contracts

2. **Advanced Visualizations**
   - 3D network visualization with Three.js
   - Real-time data streaming with WebSockets
   - Advanced analytics dashboard

3. **User Authentication**
   - GitHub OAuth integration (already using Octokit)
   - Wallet connection for Web3
   - User profiles and settings

4. **Enhanced Data Management**
   - Actual file upload/storage backend
   - S3 or IPFS integration
   - File encryption and security

5. **Social Features**
   - Leaderboards and rankings
   - User profiles and reputation system
   - Community rewards and referrals

6. **Mobile Application**
   - React Native conversion
   - iOS/Android native apps
   - Mobile-optimized UI

### Adding New Features

1. Create new component in `src/components/`
2. Define types in `src/lib/types.ts`
3. Add new KV storage keys in App.tsx if needed
4. Integrate with existing state management
5. Add UI components from `src/components/ui/`
6. Update navigation/tabs in App.tsx

---

## 11. Summary

StorageNet is a comprehensive React/TypeScript application demonstrating decentralized storage concepts. Key points for success:

### Development Approach
- **Type-Safe**: Leverage TypeScript for robust code
- **Component-Based**: Build modular, reusable components
- **State-Focused**: Understand GitHub Spark KV storage patterns
- **Responsive**: Design for mobile and desktop with Tailwind CSS

### Key Resources
- Documentation: `docs/PROJECT_ONBOARDING.md` (this file)
- Requirements: `PRD.md`
- Security: `SECURITY.md`
- Code Types: `src/lib/types.ts`
- Components: `src/components/`

### Quick Command Reference
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run lint         # Check code quality
npm run preview      # Preview production build
npm run optimize     # Optimize dependencies
```

### Getting Help
1. Check the PRD.md for feature specifications
2. Review component examples in `src/components/`
3. Examine UI components in `src/components/ui/`
4. Check TypeScript types in `src/lib/types.ts`
5. Review Tailwind CSS documentation for styling

---

## Contact & Support

For issues, questions, or contributions:
1. Review existing documentation and code comments
2. Check GitHub Issues for similar problems
3. Refer to dependency documentation:
   - [React Documentation](https://react.dev)
   - [TypeScript Handbook](https://www.typescriptlang.org/docs/)
   - [Tailwind CSS Docs](https://tailwindcss.com/docs)
   - [Vite Guide](https://vitejs.dev/guide/)
   - [Radix UI Documentation](https://www.radix-ui.com/docs/primitives/overview/introduction)

---

**Last Updated**: 2025-10-22  
**Version**: 1.0.0  
**Status**: Production Ready