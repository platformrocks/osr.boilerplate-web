# OSR Boilerplate Web • AI-Friendly Architecture

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/) [![Next.js](https://img.shields.io/badge/Next.js-15.4-black.svg)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.1-38bdf8.svg)](https://tailwindcss.com/) [![pnpm](https://img.shields.io/badge/pnpm-10+-orange.svg)](https://pnpm.io/)

A production-ready web boilerplate specifically designed with AI-Friendly architecture principles. Built to maximize compatibility with AI-assisted development workflows, featuring clear semantics,
explicit boundaries, and predictable patterns that make it easy for LLMs, code agents, and AI assistants to understand, navigate, and extend.

## What is "AI-Friendly Architecture"?

AI-Friendly Architecture (AIFA) is a design philosophy that optimizes codebases for AI-assisted development. This boilerplate implements key AIFA principles:

- **Semantic Clarity** → Explicit naming conventions and self-documenting code structures
- **Predictable Patterns** → Consistent file organization and architectural decisions
- **Explicit Boundaries** → Clear separation of concerns with well-define interfaces
- **Convention-Driven** → Standard patterns that AI tools can easily recognizeand extend
- **Documentation-First** → Comprehensive inline documentation and structured metadata

This approach enables AI tools to: ⤷ Understand project structure instantly ⤷ Navigate dependencies and relationships efficiently ⤷ Generate context-aware code suggestions ⤷ Refactor and extend
functionality predictably ⤷ Maintain consistency across changes

## Features

- **Modern Tech Stack** → Next.js 15, React 19, TypeScript 5, Tailwind CSS 4
- **Internationalization** → Multi-language support with next-intl (EN/ES/PT-BR)
- **UI Components** → Pre-configured Shadcn/UI with Lucide icons
- **Type Safety** → Strict TypeScript configuration with comprehensive path mapping
- **Code Quality** → ESLint, Prettier, Husky, and Commitizen workflows
- **E2E Testing** → Playwright test suite with cross-browser coverage
- **Security Headers** → Production-ready security configurations
- **Performance** → Optimized builds, fonts, and caching strategies
- **Developer Experience** → Hot reload, error handling, and debugging tools

## Folder Structure

```
osr.boilerplate-web/
├── src/
│   ├── app/                    # Next.js App Router (route handlers)
│   │   ├── [locale]/          # Internationalized page routes
│   │   ├── globals.css        # Global styles and CSS variables
│   │   ├── favicon.ico        # Application favicon
│   │   ├── robots.ts          # SEO robots configuration
│   │   └── sitemap.ts         # SEO sitemap generation
│   ├── components/            # Reusable UI components
│   │   └── ui/                # Shadcn/UI component library
│   ├── i18n/                  # Internationalization configuration
│   │   ├── messages/          # Translation files (JSON)
│   │   ├── navigation.ts      # Localized navigation utilities
│   │   ├── request.ts         # Server-side i18n configuration
│   │   └── routing.ts         # Locale routing configuration
│   ├── lib/                   # Shared utilities and configurations
│   │   └── utils.ts           # Common utility functions
│   └── middleware.ts          # Next.js middleware for i18n routing
├── public/                    # Static assets
├── .env.example              # Environment variables template
├── components.json           # Shadcn/UI configuration
├── next.config.ts            # Next.js configuration
├── tailwind.config.js        # Tailwind CSS configuration
├── tsconfig.json             # TypeScript configuration
└── package.json              # Project dependencies and scripts
```

## Getting Started

### Prerequisites

- Node.js 18+ (LTS recommended)
- pnpm 10+ package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/platformrocks/osr.boilerplate-web.git
   cd osr.boilerplate-web
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Configure environment**

   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Start development server**

   ```bash
   pnpm dev
   ```

5. **Open application** Navigate to `http://localhost:3000`

### Environment Configuration

```bash
# Application Settings
NEXT_PUBLIC_APP_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_VERSION=1.0.0

# Internationalization
NEXT_PUBLIC_DEFAULT_LOCALE=en-US
NEXT_PUBLIC_SUPPORTED_LOCALES=en-US,es-ES,pt-BR

# Security
CSRF_SECRET=your-csrf-secret

# Optional: Analytics
NEXT_PUBLIC_GA_TRACKING_ID=G-XXXXXXXXXX
```

## Usage

### Basic Development Workflow

```bash
# Development
pnpm dev              # Start development server
pnpm build            # Build for production
pnpm start            # Start production server

# Code Quality
pnpm lint             # Run ESLint
pnpm format           # Format with Prettier
pnpm type-check       # TypeScript validation

# Testing
pnpm test:e2e         # Run E2E tests headlessly
pnpm test:e2e:headed  # Run E2E tests with browser UI
pnpm test:e2e:debug   # Debug E2E tests interactively
pnpm test:e2e:ui      # Open Playwright test UI
pnpm test:e2e:report  # View HTML test report

# Maintenance
pnpm clean            # Clean build artifacts
pnpm analyze          # Bundle size analysis
```

### Adding New Components

Using Shadcn/UI:

```bash
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add dialog
```

### Internationalization Example

```typescript
// src/app/[locale]/example/page.tsx
import { getTranslations } from 'next-intl/server';

export default async function ExamplePage({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;
  const t = await getTranslations('ExamplePage');

  return (
    <div>
      <h1>{t('title')}</h1>
      <p>{t('description')}</p>
    </div>
  );
}
```

### AI-Assisted Development Example

The codebase structure enables AI tools to easily:

```typescript
// AI can understand this pattern and extend consistently
// src/components/ui/custom-button.tsx
interface CustomButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export function CustomButton({
  variant = 'primary',
  size = 'md',
  children
}: CustomButtonProps) {
  // Implementation follows predictable patterns
  return (
    <button
      className={cn(
        buttonVariants({ variant, size })
      )}
    >
      {children}
    </button>
  );
}
```

### End-to-End Testing

The boilerplate includes comprehensive E2E testing with Playwright:

```typescript
// src/e2e/example.spec.ts
import { expect, test } from '@playwright/test';

test.describe('Home Page', () => {
  test('should load and display content correctly', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('h1')).toContainText('Open Source Rocks');
  });
});
```

**Test Coverage Includes:**

- Cross-browser testing (Chrome, Firefox, Safari)
- Mobile responsiveness
- Internationalization functionality
- Accessibility compliance
- User workflows and navigation

**Quick Testing Workflow:**

```bash
# Start development server
pnpm dev

# Run tests (in another terminal)
pnpm test:e2e

# Debug tests interactively
pnpm test:e2e:debug

# View test report
pnpm test:e2e:report
```

## Contributing

We welcome contributions that maintain the AI-Friendly architecture principles:

1. **Fork and clone** the repository
2. **Create a feature branch** (`git checkout -b feature/ai-friendly-component`)
3. **Follow conventions** → Maintain consistent patterns and documentation
4. **Test thoroughly** → Ensure TypeScript compliance and functionality
5. **Commit with convention** → Use `pnpm commit` for conventional commits
6. **Submit pull request** → Include clear description of AI-friendly improvements

### Contribution Guidelines

- Maintain semantic clarity in naming and structure
- Add comprehensive TypeScript types and interfaces
- Include inline documentation for complex logic
- Follow established folder and file naming conventions
- Ensure changes are compatible with AI code analysis tools

## Tech Stack Details

**Core Framework:**

- TypeScript 5 with strict configuration
- Next.js 15 with App Router
- React 19 with Server Components

**Styling & UI:**

- Tailwind CSS 4 with CSS variables
- Shadcn/UI component library
- Lucide React icons
- Geist font family

**Internationalization:**

- next-intl for server/client translations
- JSON-based message files
- Automatic locale routing

**Development Tools:**

- ESLint with Next.js and TypeScript rules
- Prettier with import sorting
- Husky for git hooks
- Commitizen for conventional commits

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

- **Issues:** [GitHub Issues](https://github.com/platformrocks/osr.boilerplate-web/issues)
- **Discussions:** [GitHub Discussions](https://github.com/platformrocks/osr.boilerplate-web/discussions)

---

**Open Source Rocks** • [opensource.rocks](https://opensource.rocks)

---
