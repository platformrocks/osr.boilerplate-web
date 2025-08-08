# Project Structure

## Overview

OSR Boilerplate Web is a Next.js-based web application boilerplate designed with AI-Friendly Architecture (AIFA) principles. The project follows modern development practices with TypeScript,
internationalization, and comprehensive testing.

## Root Structure

```
careertopologies-v1/
├── .github/                 # GitHub workflows and templates
│   ├── copilot-instructions.md
│   └── workflows/
├── .guided/                 # Guided Engineering documentation
│   ├── architecture/        # AI-friendly architecture docs
│   ├── assessment/          # Technical assessments
│   ├── implementation/      # Implementation summaries
│   └── [other guided folders]
├── .vscode/                 # VS Code configuration
│   └── settings.json        # AI-optimized editor settings
├── .husky/                  # Git hooks for quality
├── src/                     # Application source code
│   ├── app/                 # Next.js App Router
│   ├── components/          # Reusable UI components
│   ├── e2e/                 # End-to-end tests
│   ├── i18n/                # Internationalization
│   ├── lib/                 # Utility libraries
│   └── middleware.ts        # Next.js middleware
├── public/                  # Static assets
├── i18n/                    # i18n configuration root
├── node_modules/            # Dependencies (auto-generated)
└── [config files]          # Various configuration files
```

## Source Code Organization (`src/`)

### App Router (`src/app/`)

- **Structure**: Next.js 15 App Router with layouts and pages
- **Internationalization**: `[locale]` dynamic routing
- **Features**:
  - SEO optimization (sitemap, robots)
  - Metadata generation
  - Global styles

### Components (`src/components/`)

- **Purpose**: Reusable UI components
- **Organization**:
  - `ui/` - Shadcn/UI components
  - `forms/` - Form-specific components
  - `layout/` - Layout components
- **Standards**: TypeScript interfaces, JSDoc headers

### End-to-End Tests (`src/e2e/`)

- **Framework**: Playwright
- **Coverage**: Cross-browser, mobile, internationalization
- **Structure**: Feature-based test organization

### Internationalization (`src/i18n/`)

- **Locales**: English (en-US), Spanish (es-ES), Portuguese (pt-BR)
- **Structure**:
  - `messages/` - Translation JSON files
  - `routing.ts` - Locale routing configuration
  - `request.ts` - Message loading configuration
  - `navigation.ts` - Internationalized navigation

### Libraries (`src/lib/`)

- **Purpose**: Shared utilities and configurations
- **Content**: Helper functions, type definitions, constants

## Configuration Files

### Core Configuration

- `package.json` - Dependencies and scripts
- `next.config.ts` - Next.js configuration with security headers
- `tsconfig.json` - TypeScript configuration (strict mode)
- `tailwind.config.ts` - Tailwind CSS configuration

### Development Tools

- `eslint.config.mjs` - ESLint 9 flat configuration
- `.prettierrc` - Code formatting rules
- `playwright.config.ts` - E2E testing configuration
- `commitlint.config.ts` - Commit message validation

### Deployment & CI

- `release.config.ts` - Automated release configuration
- `.husky/` - Git hooks for code quality
- `.github/workflows/` - CI/CD automation

## AI-Friendly Architecture Features

### Documentation Structure

- **JSDoc Headers**: All source files include standardized headers
- **Guided Engineering**: Comprehensive `.guided/` documentation
- **AI Instructions**: GitHub Copilot integration guidelines

### Code Organization

- **Semantic Naming**: Self-documenting code structure
- **Predictable Patterns**: Consistent file organization
- **Explicit Boundaries**: Clear separation of concerns
- **Type Safety**: Comprehensive TypeScript usage

### Development Workflow

- **AI Integration**: Copilot, Claude, and agent-friendly patterns
- **Quality Gates**: Automated linting, testing, and formatting
- **Conventional Commits**: Standardized commit messages
- **Prompt Engineering**: Structured prompts in `.guided/`

## Module Dependencies

### Core Dependencies

- **Next.js 15**: React framework with App Router
- **React 19**: User interface library
- **TypeScript 5**: Type safety and developer experience
- **Tailwind CSS 4**: Utility-first styling

### Feature Dependencies

- **next-intl**: Internationalization framework
- **class-variance-authority**: Component variant management
- **lucide-react**: Icon library
- **clsx & tailwind-merge**: Conditional styling utilities

### Development Dependencies

- **Playwright**: End-to-end testing framework
- **ESLint**: Code quality and consistency
- **Prettier**: Code formatting
- **Husky**: Git hooks automation
- **Commitizen**: Commit message standardization

## Build Output

### Production Build

- `.next/` - Next.js build output
- `out/` - Static export (if applicable)
- Optimized assets and bundles
- Server-side rendering preparation

### Development Assets

- Hot reload capabilities
- Source maps for debugging
- TypeScript compilation
- Real-time linting and formatting

## Scalability Patterns

### Horizontal Organization

- Feature-based folder structure
- Component library organization
- Utility function categorization
- Test co-location with features

### Vertical Integration

- Type definitions flow through layers
- Internationalization across all components
- Consistent error handling patterns
- Unified styling approach

This structure supports both human developers and AI assistants by providing clear, predictable patterns and comprehensive documentation at every level.
