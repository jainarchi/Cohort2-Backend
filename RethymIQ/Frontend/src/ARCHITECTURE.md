/**
 * 4-LAYER FEATURE-BASED ARCHITECTURE
 * 
 * This project follows a scalable 4-layer architecture organized by features.
 * Each feature is self-contained with clear separation of concerns.
 * 
 * FOLDER STRUCTURE:
 * 
 * src/features/
 * ├── shared/                          # Shared across features
 * │   ├── components/                  # Shared UI components
 * │   │   ├── Layout.jsx              # Main layout wrapper
 * │   │   └── Sidebar.jsx             # Navigation sidebar
 * │   └── styles/
 * │       └── layout.scss             # Layout styles
 * │
 * ├── home/                           # Home feature
 * │   ├── pages/
 * │   │   └── Home.jsx                # Route-level component
 * │   ├── components/                 # Feature-specific components
 * │   ├── services/                   # API calls (optional)
 * │   └── hooks/                      # Custom hooks (optional)
 * │
 * ├── auth/                           # Authentication feature
 * │   ├── pages/
 * │   │   ├── Login.jsx
 * │   │   └── Register.jsx
 * │   ├── components/                 # Auth-specific components
 * │   ├── services/
 * │   │   └── authService.js          # Auth API calls
 * │   └── hooks/
 * │       └── useAuth.js              # Auth logic hook
 * │
 * ├── profile/                        # Profile feature
 * │   ├── pages/
 * │   │   └── Profile.jsx
 * │   ├── components/
 * │   ├── services/
 * │   └── hooks/
 * │
 * └── songs/                          # Songs feature
 *     ├── pages/
 *     │   ├── LatestSongs.jsx
 *     │   ├── FavoriteSongs.jsx
 *     │   ├── RecentPlay.jsx
 *     │   └── MoodDetect.jsx
 *     ├── components/                 # Song-specific components
 *     ├── services/
 *     │   └── songService.js          # Song API calls
 *     └── hooks/
 *         └── useSongs.js             # Songs logic hook
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * 4 LAYERS EXPLAINED:
 * 
 * 1. PAGES LAYER (Route Level)
 *    - Components that represent complete pages/routes
 *    - Only connected to router
 *    - Orchestrate feature components
 *    - Example: src/features/auth/pages/Login.jsx
 * 
 * 2. COMPONENTS LAYER (Reusable UI)
 *    - Presentational/Smart components
 *    - Isolated, reusable, feature-specific
 *    - Can be shared within the feature
 *    - Example: src/features/songs/components/SongCard.jsx
 * 
 * 3. SERVICES LAYER (Business Logic & API)
 *    - Handle API calls
 *    - Business logic separation
 *    - Data transformation
 *    - Example: src/features/songs/services/songService.js
 * 
 * 4. HOOKS & UTILS LAYER (Logic Reusability)
 *    - Custom React hooks
 *    - Utility functions
 *    - Shared logic between components
 *    - Example: src/features/songs/hooks/useSongs.js
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * BENEFITS:
 * ✓ Scalability: Features are isolated and independently deployable
 * ✓ Maintainability: Each feature is self-contained
 * ✓ Clear boundaries: Separation of concerns at each layer
 * ✓ Testability: Each layer can be tested independently
 * ✓ Code splitting: Features can be lazy-loaded independently
 * ✓ Team collaboration: Multiple teams can work on different features
 * 
 * USAGE GUIDE:
 * 1. Create new features in src/features/
 * 2. Each feature should have pages/, components/, services/, hooks/ folders
 * 3. Import from services, not API endpoints, in components
 * 4. Use custom hooks for state management and logic
 * 5. Keep components pure and focused on UI rendering
 */
