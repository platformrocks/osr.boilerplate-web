# Contributing to OSR Boilerplate Web

Thank you for your interest in contributing to the OSR Boilerplate Web AIF (AI-Friendly) project! This document provides guidelines and information for contributors.

## Project Overview

OSR Boilerplate Web is a production-ready web boilerplate specifically designed with AI-Friendly Architecture (AIF) principles. It's built to maximize compatibility with AI-assisted development
workflows, featuring clear semantics, explicit boundaries, and predictable patterns.

**Key Technologies:**

- Next.js 15 with App Router
- React 19 and TypeScript 5
- Tailwind CSS 4 with Shadcn/UI
- Internationalization with next-intl
- E2E Testing with Playwright
- AI-optimized development workflows

## Getting Started

### Prerequisites

- Node.js 18+ (LTS recommended)
- pnpm 10+ (required package manager)
- Git for version control

### Initial Setup

1. **Fork and Clone**

   ```bash
   git clone https://github.com/YOUR_USERNAME/boilerplate-web.git
   cd boilerplate-web
   ```

2. **Install Dependencies**

   ```bash
   pnpm install
   ```

3. **Install E2E Test Browsers**

   ```bash
   pnpm test:e2e:install
   ```

4. **Start Development Server**

   ```bash
   pnpm dev
   ```

5. **Verify Setup**
   - Open http://localhost:3000
   - Run tests: `pnpm test:e2e`
   - Check linting: `pnpm lint`

## Development Workflow

### Branch Naming Convention

Use descriptive branch names with prefixes:

- `feat/description` - New features
- `fix/description` - Bug fixes
- `docs/description` - Documentation changes
- `refactor/description` - Code refactoring
- `test/description` - Test improvements
- `chore/description` - Maintenance tasks

**Examples:**

```
feat/add-user-authentication
fix/resolve-mobile-navigation
docs/update-api-documentation
refactor/improve-utils-performance
```

### Commit Messages

We use [Conventional Commits](https://conventionalcommits.org/) with Commitizen:

```bash
# Use the interactive commit tool
pnpm commit

# Or follow the format manually:
# type(scope): description
#
# [optional body]
# [optional footer]
```

**Commit Types:**

- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `style:` Code formatting (no logic changes)
- `refactor:` Code refactoring
- `test:` Adding or updating tests
- `chore:` Maintenance tasks
- `perf:` Performance improvements
- `ci:` CI/CD changes
- `build:` Build system changes

**Examples:**

```
feat(components): add CustomButton component with variants
fix(i18n): resolve locale routing edge case
docs(readme): update installation instructions
test(e2e): add mobile responsiveness tests
```

## Coding Guidelines

### TypeScript Standards

- **Strict Mode**: All code must pass TypeScript strict checks
- **Explicit Types**: Prefer explicit over inferred types for public APIs
- **JSDoc Headers**: All `.ts` and `.tsx` files must include standardized headers:

```typescript
/**
 * File: src/path/to/file.ts
 * Purpose: Brief description of file functionality
 * Author: platform.rocks
 * License: MIT
 */
```

- **Interface Naming**: Use descriptive names with Props suffix for component props
- **Function Documentation**: Include JSDoc for all exported functions

### Code Style

- **Formatting**: Use Prettier (configured in `.prettierrc`)
- **Linting**: Follow ESLint rules (configured in `eslint.config.mjs`)
- **Import Order**: Follow the configured import sorting
- **Naming Conventions**:
  - Components: PascalCase (`CustomButton.tsx`)
  - Functions/Variables: camelCase (`handleSubmit`)
  - Constants: UPPER_SNAKE_CASE (`MAX_RETRIES`)
  - Files: kebab-case for pages, PascalCase for components

### AI-Friendly Patterns

This project follows AI-Friendly Architecture principles:

1. **Semantic Clarity**: Use descriptive, self-documenting names
2. **Predictable Patterns**: Follow consistent file structure and conventions
3. **Explicit Boundaries**: Clear separation of concerns with defined interfaces
4. **Documentation First**: Comprehensive inline and structural documentation
5. **Convention Driven**: Standard patterns that AI tools can recognize

**Example AI-Friendly Component:**

```typescript
/**
 * File: src/components/ui/custom-button.tsx
 * Purpose: Reusable button component with variant support
 * Author: platform.rocks
 * License: MIT
 */
import { type VariantProps, cva } from 'class-variance-authority';
import { ButtonHTMLAttributes, forwardRef } from 'react';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
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
  },
);

interface CustomButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Button content */
  children: React.ReactNode;
}

/**
 * CustomButton - Reusable button component with consistent styling
 */
export const CustomButton = forwardRef<HTMLButtonElement, CustomButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);

CustomButton.displayName = 'CustomButton';
```

## Testing Requirements

### End-to-End Tests

All new features must include E2E tests:

```bash
# Run tests
pnpm test:e2e

# Debug tests
pnpm test:e2e:debug

# Run with UI
pnpm test:e2e:ui
```

**Test Structure:**

```typescript
/**
 * File: src/e2e/feature-name.spec.ts
 * Purpose: E2E tests for specific feature functionality
 * Author: platform.rocks
 * License: MIT
 */
import { expect, test } from '@playwright/test';

test.describe('Feature Name', () => {
  test('should perform expected behavior', async ({ page }) => {
    await page.goto('/feature-path');
    await expect(page.locator('[data-testid="element"]')).toBeVisible();
  });
});
```

### Test Coverage Guidelines

- **Cross-browser**: Tests must pass in Chrome, Firefox, and Safari
- **Mobile**: Include mobile viewport testing
- **Internationalization**: Test all supported locales (EN, ES, PT-BR)
- **Accessibility**: Include basic accessibility checks
- **Performance**: Consider loading and interaction performance

## Pull Request Process

### Before Submitting

1. **Code Quality Checks**

   ```bash
   pnpm lint          # Fix any linting issues
   pnpm format        # Format code
   pnpm type-check    # Verify TypeScript
   pnpm test:e2e      # Ensure tests pass
   ```

2. **Documentation Updates**
   - Update README.md if needed
   - Add/update JSDoc comments
   - Update type definitions

3. **Internationalization**
   - Add translations for new text content
   - Test with different locales

### PR Template

When creating a pull request, include:

```markdown
## Description

Brief description of changes and motivation.

## Type of Change

- [ ] Bug fix (non-breaking change that fixes an issue)
- [ ] New feature (non-breaking change that adds functionality)
- [ ] Breaking change (fix or feature that causes existing functionality to change)
- [ ] Documentation update
- [ ] Performance improvement
- [ ] Refactoring (no functional changes)

## Testing

- [ ] I have added tests that prove my fix is effective or feature works
- [ ] All new and existing tests pass
- [ ] I have tested across different browsers
- [ ] I have tested mobile responsiveness

## AI-Friendly Compliance

- [ ] Code follows AI-Friendly Architecture principles
- [ ] Semantic naming conventions used
- [ ] Proper JSDoc headers added
- [ ] Documentation updated accordingly

## Checklist

- [ ] My code follows the project's coding standards
- [ ] I have performed a self-review of my code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] My changes generate no new warnings
- [ ] I have updated the documentation accordingly
```

### Review Process

1. **Automated Checks**: All CI checks must pass
2. **Code Review**: At least one maintainer review required
3. **Testing**: Manual testing may be requested
4. **Documentation**: Ensure all changes are documented

## AI-Assisted Development Guidelines

This project embraces AI-assisted development. Here's how to effectively use AI tools:

### Recommended AI Tools

- **GitHub Copilot**: Integrated with VSCode settings
- **Claude/ChatGPT**: For architecture discussions and code reviews
- **AI Code Agents**: Follow the PromptOps structure in `.guided/`

### Best Practices with AI

1. **Context Awareness**: AI tools work best with our standardized patterns
2. **Code Generation**: Use consistent naming and structure
3. **Documentation**: AI can help generate JSDoc and documentation
4. **Testing**: AI can suggest test cases and edge cases
5. **Refactoring**: AI excels at pattern-based refactoring

### PromptOps Integration

The project includes a `.guided/` directory with:

- Architecture assessments
- Development prompts
- Implementation guides
- AI-friendly documentation

Use these resources when working with AI assistants to maintain consistency.

### AI Code Review Checklist

When using AI for code reviews:

- [ ] Verify AI suggestions align with project patterns
- [ ] Check that generated code includes proper TypeScript types
- [ ] Ensure JSDoc headers are added
- [ ] Validate internationalization considerations
- [ ] Confirm test coverage suggestions

## Project Structure Understanding

```
src/
├── app/                    # Next.js App Router (pages & layouts)
│   ├── [locale]/          # Internationalized routes
│   ├── globals.css        # Global styles
│   └── ...                # SEO and metadata files
├── components/            # Reusable UI components
│   └── ui/                # Shadcn/UI component library
├── e2e/                   # End-to-end tests
├── i18n/                  # Internationalization
│   ├── messages/          # Translation files
│   └── ...                # i18n configuration
├── lib/                   # Shared utilities
└── middleware.ts          # Next.js middleware

.guided/                   # AI-Friendly documentation
├── assessment/           # Architecture assessments
├── architecture/         # Architecture documentation
└── prompts/              # Development prompts
```

## Internationalization Guidelines

### Adding New Translations

1. **Add Keys**: Update all locale files in `src/i18n/messages/`
2. **Consistent Structure**: Follow existing JSON structure
3. **Context**: Provide meaningful context for translators
4. **Testing**: Test all locales before submitting

### Translation Files

- `en-US.json` - English (US)
- `es-ES.json` - Spanish (Spain)
- `pt-BR.json` - Portuguese (Brazil)

## Performance Guidelines

- **Bundle Size**: Monitor with `pnpm analyze`
- **Core Web Vitals**: Maintain good performance metrics
- **Image Optimization**: Use Next.js Image component
- **Font Loading**: Optimize font loading strategies
- **Code Splitting**: Use dynamic imports appropriately

## Security Considerations

- **Dependencies**: Keep dependencies updated
- **Input Validation**: Validate all user inputs
- **CSP**: Maintain Content Security Policy headers
- **Environment Variables**: Use proper environment variable management

## Questions and Support

- **Issues**: Create GitHub issues for bugs or feature requests
- **Discussions**: Use GitHub Discussions for questions
- **Documentation**: Check `.guided/` directory for AI-friendly guides
- **Community**: Follow our Code of Conduct in all interactions

## Code of Conduct

This project follows the [Contributor Covenant Code of Conduct](https://www.contributor-covenant.org/version/2/1/code_of_conduct/). By participating, you are expected to uphold this code.

### Our Standards

**Positive behavior includes:**

- Using welcoming and inclusive language
- Being respectful of differing viewpoints
- Gracefully accepting constructive criticism
- Focusing on what's best for the community
- Showing empathy towards other community members

**Unacceptable behavior includes:**

- Harassment, trolling, or derogatory comments
- Public or private harassment
- Publishing others' private information
- Other conduct inappropriate in a professional setting

---

Thank you for contributing to OSR Boilerplate Web! Your efforts help make AI-assisted development more accessible and effective for the entire community.
