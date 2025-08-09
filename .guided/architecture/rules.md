<!--
Guided Engineering Canonical File
DO NOT REMOVE THIS HEADER
Purpose: Architecture rules and development conventions
-->

# Architecture Rules and Conventions

This document defines the architectural rules, conventions, and principles governing the Career Topologies v1 project.

## Fundamental Principles

### 1. AI-Friendly Architecture (AIF)

**Priority**: Mandatory **Description**: All code must prioritize clarity and predictability for AI assistant consumption.

**Rules**:

- Use explicit, semantic naming conventions
- Provide comprehensive TypeScript types
- Include JSDoc comments for all public APIs
- Maintain consistent patterns across similar components
- Structure code with clear, logical boundaries

### 2. Type Safety First

**Priority**: Mandatory **Description**: TypeScript must be used throughout with strict configuration.

**Rules**:

- All functions must have explicit parameter and return types
- Prefer interfaces over types for object shapes
- Use generic constraints appropriately
- No `any` types without explicit justification
- Enable strict TypeScript configuration

### 3. Component Composition

**Priority**: Mandatory **Description**: Favor composition over inheritance for component design.

**Rules**:

- Single responsibility principle for components
- Props interfaces defined for all components
- Use children props for flexible composition
- Avoid prop drilling beyond 2-3 levels
- Implement compound component patterns where appropriate

## Code Organization Rules

### File Structure Conventions

```typescript
// ✅ Correct: Descriptive, semantic naming
components / ui / Button.tsx; // PascalCase for components
CustomInput.tsx; // Clear, descriptive names
forms / ContactForm.tsx; // Domain-specific grouping

lib / utils.ts; // camelCase for utilities
apiHelpers.ts; // Descriptive function grouping

hooks / useLocalStorage.ts; // use prefix + camelCase
useApiClient.ts; // Clear purpose indication
```

### Import Organization

**Priority**: Mandatory

```typescript
// 1. React and Next.js imports
import { NextPage } from 'next';
import { useEffect, useState } from 'react';
// 5. Type-only imports (last)
import type { ComponentProps } from 'react';

// 2. Third-party libraries
import { clsx } from 'clsx';
import { z } from 'zod';

// 3. Internal imports (absolute paths)
import { Button } from '@/components/ui/button';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import type { ApiResponse } from '@/types/api';

// 4. Relative imports
import './component.css';
```

## Component Architecture Rules

### Component Structure Template

**Priority**: Mandatory for all new components

````typescript
/**
 * @fileoverview Brief component description
 */

import type { ComponentProps } from 'react';
import { cn } from '@/lib/utils';

/**
 * Props interface for ComponentName
 */
interface ComponentNameProps {
  /** Required prop description */
  requiredProp: string;
  /** Optional prop with default */
  optionalProp?: boolean;
  /** Children elements */
  children?: React.ReactNode;
}

/**
 * ComponentName - Brief description
 *
 * @param props - Component props
 * @returns JSX element
 *
 * @example
 * ```tsx
 * <ComponentName requiredProp="value">
 *   Content
 * </ComponentName>
 * ```
 */
export function ComponentName({
  requiredProp,
  optionalProp = false,
  children,
}: ComponentNameProps) {
  return (
    <div className={cn("base-classes", { "conditional": optionalProp })}>
      {children}
    </div>
  );
}
````

### Component Variant Patterns

**Priority**: Recommended for UI components

```typescript
import { type VariantProps, cva } from 'class-variance-authority';

const buttonVariants = cva('inline-flex items-center justify-center rounded-md text-sm font-medium', {
  variants: {
    variant: {
      default: 'bg-primary text-primary-foreground hover:bg-primary/90',
      destructive: 'bg-destructive text-destructive-foreground',
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

## Next.js Specific Rules

### App Router Conventions

**Priority**: Mandatory

```typescript
// Page structure
type Props = {
  params: Promise<{ locale: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations('PageName');

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function PageName({ params }: Props) {
  const { locale } = await params;
  // Page implementation
}
```

### API Route Patterns

**Priority**: Mandatory

```typescript
import { NextRequest, NextResponse } from 'next/server';

import { z } from 'zod';

const requestSchema = z.object({
  field: z.string().min(1),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = requestSchema.parse(body);

    const result = await processData(validatedData);
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
```

## Styling Rules

### Tailwind CSS Conventions

**Priority**: Mandatory

```typescript
// ✅ Correct: Semantic class combinations
<button className={cn(
  "inline-flex items-center justify-center",
  "rounded-md px-4 py-2",
  "text-sm font-medium",
  "transition-colors",
  "hover:bg-accent hover:text-accent-foreground",
  { "opacity-50 cursor-not-allowed": disabled }
)}>

// ❌ Avoid: Arbitrary values without justification
<div className="w-[47px] h-[23px]" />

// ✅ Better: Use design tokens
<div className="w-12 h-6" />
```

### CSS Custom Properties

**Priority**: Recommended for theme values

```css
:root {
  --color-primary: 222.2% 84% 4.9%;
  --color-primary-foreground: 210 40% 98%;
  --radius: 0.5rem;
}
```

## Error Handling Rules

### Result Pattern Implementation

**Priority**: Recommended for async operations

```typescript
type Result<T, E = Error> = { success: true; data: T } | { success: false; error: E };

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

### Error Boundaries

**Priority**: Mandatory for production routes

```typescript
'use client';

import { Component, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <div>Something went wrong.</div>;
    }

    return this.props.children;
  }
}
```

## Performance Rules

### Code Splitting

**Priority**: Mandatory for non-critical components

```typescript
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const HeavyComponent = dynamic(
  () => import('@/components/HeavyComponent'),
  {
    loading: () => <div>Loading...</div>,
  }
);

// Usage with Suspense
<Suspense fallback={<LoadingSkeleton />}>
  <HeavyComponent />
</Suspense>
```

### Image Optimization

**Priority**: Mandatory for all images

```typescript
import Image from 'next/image';

<Image
  src="/image.jpg"
  alt="Descriptive alt text"
  width={800}
  height={600}
  priority={isAboveFold}
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>
```

## Testing Rules

### Component Testing Structure

**Priority**: Mandatory for UI components

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { ComponentName } from './ComponentName';

describe('ComponentName', () => {
  it('renders with required props', () => {
    render(<ComponentName requiredProp="test" />);
    expect(screen.getByText('test')).toBeInTheDocument();
  });

  it('handles user interactions', () => {
    const handleClick = jest.fn();
    render(<ComponentName onSubmit={handleClick} />);

    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledWith(/* expected args */);
  });
});
```

## Internationalization Rules

### Message Key Structure

**Priority**: Mandatory

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

## Security Rules

### Input Validation

**Priority**: Mandatory for all user inputs

```typescript
import { z } from 'zod';

const userInputSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2).max(50),
  age: z.number().int().min(0).max(150),
});

function validateInput(input: unknown) {
  return userInputSchema.safeParse(input);
}
```

### Environment Variables

**Priority**: Mandatory

```typescript
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']),
  NEXT_PUBLIC_API_URL: z.string().url(),
  DATABASE_URL: z.string(),
});

export const env = envSchema.parse(process.env);
```

## Deprecation Policy

### Rule Evolution

1. **New Rules**: Announced with 30-day adoption period
2. **Rule Changes**: Backward compatibility maintained for 90 days
3. **Rule Removal**: 6-month deprecation notice required
4. **Breaking Changes**: Major version increment required

### Enforcement Levels

- **Mandatory**: Must be followed, enforced by CI/CD
- **Recommended**: Should be followed, flagged in code review
- **Optional**: May be followed, team discretion

---

_Last Updated: August 9, 2025_
