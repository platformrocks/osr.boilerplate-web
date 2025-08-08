# GitHub Copilot Instructions for OSR Boilerplate Web AIF

## Project Overview

This is an AI-Friendly Architecture (AIF) boilerplate designed for maximum compatibility with AI assistants. When generating code, prioritize clarity, predictability, and explicit patterns that enable
both humans and AI tools to understand and extend the codebase efficiently.

**Key Principles:**

- Semantic clarity in naming and structure
- Predictable patterns and conventions
- Explicit boundaries and separation of concerns
- Documentation-first approach
- Type safety and comprehensive TypeScript usage

## Tech Stack

- **Framework:** Next.js 15 with App Router
- **Language:** TypeScript 5 with strict configuration
- **Styling:** Tailwind CSS 4 with Shadcn/UI components
- **Package Manager:** pnpm 10+
- **Node Version:** 18+
- **Internationalization:** next-intl
- **Code Quality:** ESLint 9 (flat config), Prettier, Husky
- **Commit Convention:** Conventional Commits with Commitizen

## File Structure & Organization

### Core Directory Structure

```
src/
├── app/                    # Next.js App Router (pages, layouts, route handlers)
│   ├── [locale]/          # Internationalized routes
│   ├── globals.css        # Global styles
│   ├── favicon.ico        # App favicon
│   ├── robots.ts          # SEO robots configuration
│   └── sitemap.ts         # SEO sitemap generation
├── components/            # Reusable UI components
│   ├── ui/                # Shadcn/UI component library
│   ├── forms/             # Form-specific components
│   └── layout/            # Layout components
├── i18n/                  # Internationalization configuration
│   ├── messages/          # Translation files (JSON)
│   ├── navigation.ts      # Localized navigation utilities
│   ├── request.ts         # Server-side i18n configuration
│   └── routing.ts         # Locale routing configuration
├── lib/                   # Shared utilities and configurations
├── hooks/                 # Custom React hooks
├── types/                 # TypeScript type definitions
├── constants/             # Application constants
└── middleware.ts          # Next.js middleware
```

### Configuration Files

```
.guided/                   # AI-Friendly documentation and automation
├── assessment/           # Architecture assessments
├── architecture/         # Architecture documentation
└── prompts/              # Guided development prompts
.vscode/                  # VS Code workspace settings
.github/                  # GitHub workflows and templates
```

## Naming Conventions

### Files and Directories

- **Components:** PascalCase (`CustomButton.tsx`, `UserProfile.tsx`)
- **Pages:** kebab-case for App Router (`page.tsx`, `layout.tsx`, `loading.tsx`)
- **Utilities:** camelCase (`utils.ts`, `apiHelpers.ts`)
- **Types:** PascalCase with descriptive names (`UserProfileProps`, `ApiResponse`)
- **Constants:** UPPER_SNAKE_CASE (`MAX_RETRY_ATTEMPTS`, `API_ENDPOINTS`)
- **Hooks:** camelCase with `use` prefix (`useLocalStorage`, `useApi`)

### Variables and Functions

- **Variables:** camelCase (`userName`, `isLoading`, `fetchUserData`)
- **Functions:** camelCase, descriptive verbs (`handleSubmit`, `validateInput`, `formatCurrency`)
- **Components:** PascalCase (`<CustomButton />`, `<UserProfile />`)
- **Props interfaces:** ComponentName + Props (`CustomButtonProps`, `UserProfileProps`)

## Component Patterns

### Component Structure

````typescript
/**
 * @fileoverview Brief description of component purpose
 * @author Open Source Rocks
 * @since 1.0.0
 */

import { ComponentType } from 'react';
import { cn } from '@/lib/utils';

/**
 * Props interface for ComponentName
 */
interface ComponentNameProps {
  /** Brief description of prop */
  propName: string;
  /** Optional prop with default value */
  optionalProp?: boolean;
  /** Children elements */
  children?: React.ReactNode;
}

/**
 * ComponentName - Brief description of what this component does
 *
 * @param props - Component props
 * @returns JSX element
 *
 * @example
 * ```tsx
 * <ComponentName propName="value" optionalProp={true}>
 *   Content
 * </ComponentName>
 * ```
 */
export function ComponentName({
  propName,
  optionalProp = false,
  children
}: ComponentNameProps) {
  return (
    <div className={cn("base-classes", { "conditional-classes": optionalProp })}>
      {children}
    </div>
  );
}
````

### Page Structure (App Router)

```typescript
/**
 * @fileoverview Page description and purpose
 * @author Open Source Rocks
 * @since 1.0.0
 */

import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';

type Props = {
  params: Promise<{ locale: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};

/**
 * Generate metadata for the page
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations('PageName');

  return {
    title: t('title'),
    description: t('description'),
  };
}

/**
 * PageName - Description of page purpose
 */
export default async function PageName({ params, searchParams }: Props) {
  const { locale } = await params;
  const t = await getTranslations('PageName');

  return (
    <div>
      <h1>{t('title')}</h1>
      {/* Page content */}
    </div>
  );
}
```

## Styling Guidelines

### Tailwind CSS Usage

- Use utility classes for styling
- Prefer semantic class combinations over arbitrary values
- Use `cn()` utility for conditional classes
- Follow mobile-first responsive design
- Use CSS variables for consistent theming

### Component Variants (using CVA)

```typescript
import { type VariantProps, cva } from 'class-variance-authority';

const buttonVariants = cva('inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors', {
  variants: {
    variant: {
      default: 'bg-primary text-primary-foreground hover:bg-primary/90',
      destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
      ghost: 'hover:bg-accent hover:text-accent-foreground',
    },
    size: {
      default: 'h-10 px-4 py-2',
      sm: 'h-9 rounded-md px-3',
      lg: 'h-11 rounded-md px-8',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});
```

## Import Organization

### Import Order (enforced by Prettier)

1. React and Next.js imports
2. Third-party libraries
3. Internal imports (using `@/` alias)
4. Relative imports
5. Type-only imports (using `type` keyword)

```typescript
import { NextPage } from 'next';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import type { ComponentProps } from 'react';

import { clsx } from 'clsx';

import { Button } from '@/components/ui/button';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { ApiResponse } from '@/types/api';

import './component.css';
```

## TypeScript Guidelines

### Type Definitions

- Use explicit types for all function parameters and return values
- Prefer interfaces over types for object shapes
- Use union types for constrained values
- Always type async functions with Promise return type
- Use generic constraints when appropriate

### Error Handling

```typescript
/**
 * Result type for API operations
 */
type Result<T, E = Error> = { success: true; data: T } | { success: false; error: E };

/**
 * Safe async operation wrapper
 */
async function safeAsync<T>(operation: () => Promise<T>): Promise<Result<T>> {
  try {
    const data = await operation();
    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error : new Error(String(error)),
    };
  }
}
```

## Documentation Standards

### JSDoc Requirements

- All exported functions and components must have JSDoc comments
- Include `@param` for all parameters
- Include `@returns` for return values
- Include `@example` for complex components
- Use `@since` for version tracking
- Use `@deprecated` when applicable

### Code Comments

- Explain complex business logic
- Document non-obvious performance optimizations
- Clarify browser compatibility workarounds
- Explain regex patterns and complex algorithms

## Internationalization Patterns

### Message Key Structure

```json
{
  "ComponentName": {
    "title": "Component Title",
    "description": "Component description",
    "actions": {
      "submit": "Submit",
      "cancel": "Cancel"
    },
    "errors": {
      "required": "This field is required",
      "invalid": "Invalid input"
    }
  }
}
```

### Usage Pattern

```typescript
const t = await getTranslations('ComponentName');

return (
  <div>
    <h1>{t('title')}</h1>
    <p>{t('description')}</p>
    <button>{t('actions.submit')}</button>
  </div>
);
```

## Testing Patterns

### Component Testing

```typescript
/**
 * @fileoverview Tests for ComponentName
 */

import { render, screen } from '@testing-library/react';
import { ComponentName } from './ComponentName';

describe('ComponentName', () => {
  it('renders with required props', () => {
    render(<ComponentName propName="test" />);
    expect(screen.getByText('test')).toBeInTheDocument();
  });

  it('handles optional props correctly', () => {
    render(<ComponentName propName="test" optionalProp={true} />);
    expect(screen.getByRole('button')).toHaveClass('active');
  });
});
```

## API Route Patterns

### Route Handler Structure

```typescript
/**
 * @fileoverview API route description
 */
import { NextRequest, NextResponse } from 'next/server';

import { z } from 'zod';

const requestSchema = z.object({
  field: z.string().min(1),
});

/**
 * Handle POST request
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = requestSchema.parse(body);

    // Process request
    const result = await processData(validatedData);

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
```

## Git Commit Guidelines

### Commit Message Format

```
type(scope): description

[optional body]

[optional footer]
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Formatting, missing semicolons, etc.
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Examples

```
feat(components): add CustomButton component with variants
fix(api): handle edge case in user authentication
docs(readme): update installation instructions
refactor(hooks): improve useLocalStorage type safety
```

## Performance Considerations

### Next.js Optimizations

- Use dynamic imports for code splitting
- Implement proper loading states
- Optimize images with next/image
- Use Server Components when possible
- Implement proper caching strategies

### React Patterns

- Use React.memo for expensive components
- Implement useCallback for stable references
- Use useMemo for expensive calculations
- Avoid inline object/array creation in props

## Security Best Practices

### Input Validation

- Always validate and sanitize user input
- Use schema validation libraries (Zod, Yup)
- Implement proper CSRF protection
- Use environment variables for sensitive data

### API Security

- Implement rate limiting
- Use proper authentication and authorization
- Sanitize database queries
- Validate request origins

## AI-Friendly Patterns

### Code Generation Guidelines

- Always include comprehensive TypeScript types
- Provide clear prop interfaces with JSDoc
- Use consistent naming across similar components
- Include usage examples in component documentation
- Structure code with clear, predictable patterns

### Context for AI Tools

- Maintain consistent file structure across features
- Use descriptive variable and function names
- Include inline comments for complex logic
- Provide clear error messages and handling
- Structure data flows with explicit types

---

**Remember:** This project prioritizes AI-assisted development. When generating code, focus on clarity, consistency, and comprehensive documentation that helps both human developers and AI tools
understand and extend the functionality effectively.
