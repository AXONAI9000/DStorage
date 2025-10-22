# Planning Guide

A conceptual demonstration of a decentralized storage network where users can share storage space, earn points for contributions, and understand how distributed file systems work.

**Experience Qualities**:
1. **Trustworthy** - Clear visualization of storage metrics and rewards builds confidence in the system
2. **Educational** - Interactive elements help users understand decentralized storage concepts
3. **Gamified** - Point-based rewards and progress tracking make participation engaging

**Complexity Level**: Light Application (multiple features with basic state)
  - Demonstrates core concepts of P2P storage with simulated metrics, file management, and reward tracking without actual blockchain or distributed storage implementation

## Essential Features

### Storage Dashboard
- **Functionality**: Display storage contribution metrics, earnings, and network status
- **Purpose**: Give users visibility into their participation and value contribution
- **Trigger**: Automatic on app load
- **Progression**: App loads → Dashboard displays storage stats → Real-time metric updates → Visual rewards accumulation
- **Success criteria**: Users can see their storage contribution, earned points, and network health at a glance

### File Upload Simulation
- **Functionality**: Simulate uploading files to the distributed network with sharding visualization
- **Purpose**: Educate users on how files are distributed across the network
- **Trigger**: User clicks upload button or drags files
- **Progression**: Select file → File analyzed → Sharding visualization → Distribution animation → Confirmation with retrieval code
- **Success criteria**: Users understand file is "split" and "distributed" with visual feedback

### Storage Provider Setup
- **Functionality**: Allow users to allocate storage space and become network providers
- **Purpose**: Demonstrate the supply side of the storage marketplace
- **Trigger**: User navigates to "Become a Provider" section
- **Progression**: View benefits → Set storage allocation → Review earning potential → Activate provider status → Monitor contributions
- **Success criteria**: Users can toggle provider mode and see projected earnings based on allocation

### Points & Rewards System
- **Functionality**: Track and display point accumulation based on storage provision and usage
- **Purpose**: Gamify participation and demonstrate incentive mechanisms
- **Trigger**: Automatic based on storage actions
- **Progression**: Action performed → Points calculated → Animated counter update → Achievement unlocked (milestones) → Leaderboard update
- **Success criteria**: Clear correlation between actions and point rewards with satisfying feedback

### Network Visualization
- **Functionality**: Interactive visualization showing simulated network nodes and file distribution
- **Purpose**: Help users conceptualize the decentralized nature of the system
- **Trigger**: User clicks "View Network" tab
- **Progression**: Network map loads → User's node highlighted → File chunks shown distributed → Interactive hover shows details
- **Success criteria**: Users can visually understand how their files are distributed across multiple nodes

## Edge Case Handling

- **No storage allocated**: Show compelling onboarding with benefits and easy setup flow
- **Zero files uploaded**: Display example use cases and educational content about the system
- **Offline simulation**: Show cached data with indicator that live metrics are unavailable
- **Maximum capacity reached**: Suggest upgrading allocation or removing old files with visual warnings
- **First-time users**: Progressive disclosure with tooltips and guided tour of key features

## Design Direction

The design should feel cutting-edge and trustworthy, evoking the technical sophistication of Web3 while remaining approachable. A minimal interface with purposeful data visualization serves the educational goal better than decorative elements.

## Color Selection

Triadic color scheme to represent the distributed nature of the network (data, nodes, rewards) with high-tech energy.

- **Primary Color**: Deep Cyber Blue `oklch(0.45 0.15 250)` - Represents technology, trust, and the digital network foundation
- **Secondary Colors**: 
  - Electric Teal `oklch(0.65 0.12 200)` - For active nodes and data flow visualization
  - Slate Gray `oklch(0.25 0.02 250)` - For cards and subtle backgrounds
- **Accent Color**: Vibrant Magenta `oklch(0.65 0.22 330)` - For rewards, achievements, and CTAs to create excitement
- **Foreground/Background Pairings**:
  - Background (Deep Space `oklch(0.12 0.015 250)`): Light Gray text `oklch(0.95 0.01 250)` - Ratio 14.2:1 ✓
  - Card (Slate Gray `oklch(0.25 0.02 250)`): White text `oklch(0.98 0.005 250)` - Ratio 11.8:1 ✓
  - Primary (Cyber Blue `oklch(0.45 0.15 250)`): White text `oklch(1 0 0)` - Ratio 6.1:1 ✓
  - Secondary (Electric Teal `oklch(0.65 0.12 200)`): Deep Space text `oklch(0.12 0.015 250)` - Ratio 8.9:1 ✓
  - Accent (Vibrant Magenta `oklch(0.65 0.22 330)`): White text `oklch(1 0 0)` - Ratio 5.2:1 ✓
  - Muted (Dark Slate `oklch(0.35 0.02 250)`): Light Gray text `oklch(0.85 0.01 250)` - Ratio 6.8:1 ✓

## Font Selection

The typeface should convey modern technical precision while maintaining excellent readability for data-heavy interfaces. Inter provides the geometric clarity and extensive weights needed for a data dashboard.

- **Typographic Hierarchy**:
  - H1 (Page Title): Inter Bold / 32px / -0.02em letter spacing / 1.2 line height
  - H2 (Section Headers): Inter Semibold / 24px / -0.01em letter spacing / 1.3 line height
  - H3 (Card Titles): Inter Medium / 18px / normal letter spacing / 1.4 line height
  - Body (Primary Text): Inter Regular / 15px / normal letter spacing / 1.6 line height
  - Caption (Metrics/Labels): Inter Medium / 13px / 0.01em letter spacing / 1.4 line height
  - Data Display (Large Numbers): Inter Bold / 28px / -0.02em letter spacing / 1.2 line height

## Animations

Animations should emphasize data flow and network activity, creating a sense of living, breathing technology. Subtle constant motion (data flowing, nodes pulsing) conveys system activity without distraction.

- **Purposeful Meaning**: 
  - Data transfer animations reinforce the concept of distributed storage
  - Point accumulation uses satisfying counter animations
  - Node pulse effects show active participation
  - Card hover effects with subtle depth changes suggest interactivity

- **Hierarchy of Movement**:
  1. Critical: Point rewards (celebratory, noticeable)
  2. Important: File upload progress (informative, smooth)
  3. Ambient: Network visualization pulse (subtle, continuous)
  4. Supporting: Hover states and transitions (refined, quick)

## Component Selection

- **Components**: 
  - **Card** (with Tailwind additions: backdrop-blur for glassmorphic effect, border glow on hover) - Dashboard metrics and feature sections
  - **Progress** - Storage allocation, file upload status, earning milestones
  - **Tabs** - Switch between Dashboard, Upload, Network, Provider views
  - **Button** (Primary variant for CTAs, Ghost for secondary actions) - All interactive elements
  - **Dialog** - File upload flow, provider setup wizard
  - **Badge** - Status indicators (Active Provider, Network Health)
  - **Separator** - Visual section breaks
  - **Slider** - Storage allocation control
  - **Table** - File list, transaction history
  - **Tooltip** - Contextual help for technical terms

- **Customizations**: 
  - Network visualization canvas component using basic DOM/CSS animations
  - Animated counter component for point accumulation
  - File shard visualization component showing distributed chunks
  - Glowing border effect for active cards

- **States**: 
  - Buttons: Default (solid with subtle shadow), Hover (slight scale + glow), Active (pressed inset), Disabled (40% opacity)
  - Cards: Default (subtle border), Hover (glow border + slight lift), Active (highlight border)
  - Inputs: Default (border), Focus (ring + border color change), Error (red border + shake), Success (green border + checkmark)

- **Icon Selection**: 
  - Upload/Download: CloudArrowUp, CloudArrowDown
  - Storage: HardDrives, Database
  - Network: Globe, Graph
  - Rewards: Coins, TrendUp
  - Provider: ShareNetwork, BroadcastTower
  - Files: File, Folder, FileArrowUp
  - Success: CheckCircle, Sparkle

- **Spacing**: 
  - Section padding: p-6 (24px) on mobile, p-8 (32px) on desktop
  - Card gaps: gap-4 (16px) for related content, gap-6 (24px) for distinct sections
  - Component spacing: space-y-4 for forms, gap-2 for inline elements
  - Page margins: Container max-w-7xl with px-4

- **Mobile**: 
  - Tabs convert to dropdown selector on mobile
  - Grid layouts: 2-column on desktop → 1-column on mobile
  - Network visualization: Simplified view with fewer nodes on small screens
  - Navigation: Bottom tab bar on mobile, sidebar on desktop
  - Data tables: Horizontal scroll with sticky first column
