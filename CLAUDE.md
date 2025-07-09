# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

TabletopGame.org is a React-based web application for tabletop gaming revenue generation. It features campaign management, retailer integration, certification systems, and network/recruiting capabilities.

## Development Commands

```bash
# Install dependencies
npm install

# Start development server (port 8090)
npm run dev

# Build for production
npm run build

# Build for development
npm run build:dev

# Run linter
npm run lint

# Preview production build
npm run preview
```

## Architecture Overview

### Tech Stack
- **Frontend**: React 18.3 + TypeScript
- **Build Tool**: Vite
- **UI Components**: shadcn/ui (Radix UI + Tailwind CSS)
- **Backend**: Supabase (PostgreSQL + Auth)
- **State Management**: TanStack Query (React Query) for server state
- **Routing**: React Router v6
- **Forms**: React Hook Form + Zod validation

### Key Architectural Patterns

1. **Feature-Based Organization**: Code is organized by features (campaigns, retailers, auth, etc.) rather than technical layers
2. **Server-First State**: Uses React Query for all server state management - no Redux/Zustand
3. **Protected Routes**: Custom `ProtectedRoute` wrapper handles authentication
4. **Modular Routing**: Routes split by domain in `src/routes/`
5. **Custom Hooks Pattern**: Data fetching logic encapsulated in hooks (`src/hooks/`)

### Directory Structure

```
src/
├── components/          # UI components organized by feature
│   ├── ui/             # Primitive shadcn/ui components
│   ├── campaigns/      # Campaign-related components
│   ├── auth/           # Authentication components
│   └── [feature]/      # Other feature-specific components
├── pages/              # Route page components
├── routes/             # Route configurations by domain
├── hooks/              # Custom React hooks for data fetching
├── contexts/           # React contexts (primarily auth)
├── integrations/       # Supabase client and configuration
├── types/              # TypeScript type definitions
└── utils/              # Utility functions
```

### Authentication Flow

- Uses Supabase Auth with email/password
- Auth state managed via React Context (`src/contexts/auth/`)
- Protected routes check authentication status
- User profiles stored in `profiles` table with additional metadata

### Data Fetching Pattern

All data operations use custom hooks that wrap React Query:

```typescript
// Example pattern used throughout:
const { data, isLoading, error } = useCampaigns();
const mutation = useMutation({
  mutationFn: updateCampaign,
  onSuccess: () => queryClient.invalidateQueries(['campaigns'])
});
```

### Component Patterns

1. **Form Components**: Use React Hook Form + Zod schemas
2. **UI Components**: Based on shadcn/ui with Radix UI primitives
3. **Layout**: All pages wrapped in `PageLayout` component
4. **Loading States**: Consistent use of loading skeletons

### Type Safety & Domain Modeling Pattern

- **Database Types**: Comprehensive types in `src/types/db-schema.ts` generated from Supabase schema
  - All database types prefixed with 'DB' (e.g., `DBCampaign`, `DBRetailer`)
  - All enums and status types centrally defined
  - Raw database structure without any domain logic
  
- **Domain Model Pattern** (IMPORTANT - follow this for all new features):
  1. **DB Types** (`db-schema.ts`): Raw database tables with ALL fields
  2. **Domain Types** (`[feature].ts`): Business models that:
     - Extend or pick from DB types
     - Hide internal/system fields
     - Add computed properties and relationships
     - Include only fields relevant to the domain
  
  Example:
  ```typescript
  // db-schema.ts - Raw database type (30+ fields)
  export interface DBRetailer {
    id: string;
    name: string;
    // ... 30+ fields including import_*, system fields, etc.
  }
  
  // retailer.ts - Domain model (curated fields)
  export interface Retailer extends Pick<DBRetailer, 
    'id' | 'name' | 'address' | 'city' | 'state' // only needed fields
  >, BaseEntity {
    // Additional domain properties
  }
  ```

- **Type Organization**:
  - `db-schema.ts`: All DB types (prefixed with 'DB') and enums
  - `relationships.ts`: Types with foreign key relationships
  - `[feature].ts`: Domain models for each feature
  - `type-mappers.ts`: Utilities to convert between DB and domain types
  
- **Benefits of this pattern**:
  - Clean separation between storage and business concerns
  - Internal/migration fields stay hidden from application code
  - Easy to evolve domain models without changing DB schema
  - Type safety maintained throughout

- **Legacy Types**: Some types still in `src/integrations/supabase/types.ts` (consider migrating)
- Strict TypeScript usage throughout (though some strict checks disabled)
- Form validation with Zod schemas

## Database Migration Workflow

### IMPORTANT: Type Updates After SQL Migrations

**Every time you create or modify SQL migrations, you MUST update the TypeScript types to match.**

1. **After creating a new migration file** in `supabase/migrations/`:
   - If creating new tables: Add corresponding `DB[TableName]` interfaces to `src/types/db-schema.ts`
   - If adding columns: Update the relevant `DB[TableName]` interface
   - If creating enums: Add them to the enums section at the top of `db-schema.ts`

2. **Update domain types** in `src/types/[feature].ts`:
   - Import the new DB types from `db-schema.ts`
   - Create domain interfaces that extend or pick from DB types
   - Add any domain-specific methods or computed properties

3. **Example workflow**:
   ```sql
   -- Migration: create_products_table.sql
   CREATE TABLE products (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     name TEXT NOT NULL,
     price DECIMAL(10,2) NOT NULL,
     status TEXT DEFAULT 'active'
   );
   ```

   Then update types:
   ```typescript
   // db-schema.ts
   export type ProductStatus = 'active' | 'inactive' | 'discontinued';
   export interface DBProduct {
     id: string;
     name: string;
     price: number;
     status: ProductStatus;
   }

   // product.ts
   import { DBProduct, ProductStatus } from './db-schema';
   export interface Product extends DBProduct, BaseEntity {
     // domain-specific additions
   }
   ```

## Important Notes

- No test framework configured - consider adding tests before major changes
- Uses Vite path alias: `@/` maps to `./src/`
- Development server runs on port 8090
- ESLint configured but `@typescript-eslint/no-unused-vars` is disabled
- Git status shows many modified files - be careful with commits
# important-instruction-reminders
Do what has been asked; nothing more, nothing less.
NEVER create files unless they're absolutely necessary for achieving your goal.
ALWAYS prefer editing an existing file to creating a new one.
NEVER proactively create documentation files (*.md) or README files. Only create documentation files if explicitly requested by the User.