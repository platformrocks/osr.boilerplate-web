# Setup Instructions

## Prerequisites

### System Requirements

- **Node.js**: Version 18+ (LTS recommended)
- **Package Manager**: pnpm 10+ (required, not npm or yarn)
- **Operating System**: Windows, macOS, or Linux
- **Git**: For version control
- **Browser**: Modern browser for testing (Chrome, Firefox, Safari)

### Development Tools

- **Code Editor**: VS Code (recommended with extensions)
- **Terminal**: PowerShell (Windows) or Bash (Unix-like)
- **AI Tools**: GitHub Copilot, Claude, or similar (optional but recommended)

## Quick Start

### 1. Clone Repository

```bash
git clone https://github.com/platformrocks/boilerplate-web.git
cd boilerplate-web
```

### 2. Install Dependencies

```bash
# Install project dependencies
pnpm install

# Install Playwright browsers for E2E testing
pnpm test:e2e:install
```

### 3. Start Development Server

```bash
pnpm dev
```

The application will be available at http://localhost:3000

### 4. Verify Setup

```bash
# Run linting
pnpm lint

# Run type checking
pnpm type-check

# Run E2E tests (optional, requires dev server)
pnpm test:e2e
```

## Detailed Setup

### Environment Configuration

1. **Node.js Installation**

   ```bash
   # Check current version
   node --version

   # Should return v18+ or higher
   # If not, install from https://nodejs.org
   ```

2. **pnpm Installation**

   ```bash
   # Install pnpm globally
   npm install -g pnpm

   # Verify installation
   pnpm --version

   # Should return 10.0.0 or higher
   ```

3. **VS Code Setup** (Recommended)
   - Install recommended extensions from `.vscode/extensions.json`
   - Extensions include: ESLint, Prettier, TypeScript, Tailwind CSS
   - AI extensions: GitHub Copilot, GitHub Copilot Chat

### Project Configuration

1. **Environment Variables**

   ```bash
   # Copy environment template (if exists)
   cp .env.example .env.local

   # Edit with your values
   # NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

2. **Husky Git Hooks**

   ```bash
   # Install git hooks (runs automatically with pnpm install)
   pnpm prepare

   # Verify hooks are installed
   ls .husky/
   ```

3. **Playwright Configuration**

   ```bash
   # Install browsers for all projects
   pnpm test:e2e:install

   # Install specific browser
   npx playwright install chromium
   ```

## Development Workflow

### Daily Workflow

1. **Pull Latest Changes**

   ```bash
   git pull origin main
   pnpm install  # Update dependencies if needed
   ```

2. **Start Development**

   ```bash
   pnpm dev      # Start Next.js dev server
   ```

3. **Code Quality Checks**

   ```bash
   pnpm lint           # Check linting
   pnpm format         # Format code
   pnpm type-check     # TypeScript validation
   ```

4. **Testing**
   ```bash
   pnpm test:e2e       # Run E2E tests
   pnpm test:e2e:ui    # Interactive test development
   ```

### Commit Workflow

```bash
# Stage changes
git add .

# Use conventional commits
pnpm commit  # Interactive commit tool

# Or manually
git commit -m "feat: add new component"

# Push changes
git push origin feature-branch
```

## Available Scripts

### Development

```bash
pnpm dev              # Start development server
pnpm build            # Build for production
pnpm start            # Start production server
pnpm clean            # Clean build artifacts
```

### Code Quality

```bash
pnpm lint             # Run ESLint
pnpm format           # Format with Prettier
pnpm format:check     # Check formatting
pnpm type-check       # TypeScript validation
```

### Testing

```bash
pnpm test:e2e         # Run E2E tests headlessly
pnpm test:e2e:headed  # Run with browser UI
pnpm test:e2e:debug   # Debug tests interactively
pnpm test:e2e:ui      # Playwright test UI
pnpm test:e2e:report  # View test reports
```

### Utilities

```bash
pnpm analyze          # Bundle size analysis
pnpm commit           # Interactive commit tool
pnpm release          # Create release (maintainers)
```

## IDE Configuration

### VS Code Settings

The project includes optimized VS Code settings in `.vscode/settings.json`:

- AI-specific configurations
- TypeScript integration
- ESLint and Prettier integration
- File associations and formatting

### Recommended Extensions

- **ESLint**: Real-time code quality
- **Prettier**: Code formatting
- **TypeScript**: Enhanced TS support
- **Tailwind CSS**: Utility class IntelliSense
- **GitHub Copilot**: AI-powered code completion
- **Playwright**: Test debugging and recording

## Internationalization Setup

### Supported Locales

- **English**: `en-US` (default for development)
- **Spanish**: `es-ES`
- **Portuguese**: `pt-BR`

### Testing Locales

```bash
# Access different locales during development
http://localhost:3000/en-US
http://localhost:3000/es-ES
http://localhost:3000/pt-BR
```

### Adding New Locales

1. Add locale files in `src/i18n/messages/`
2. Update `src/i18n/routing.ts`
3. Add translations for all existing keys

## Troubleshooting

### Common Issues

1. **pnpm not found**

   ```bash
   npm install -g pnpm
   ```

2. **Port 3000 in use**

   ```bash
   # Kill process using port 3000
   npx kill-port 3000

   # Or use different port
   pnpm dev -- -p 3001
   ```

3. **TypeScript errors**

   ```bash
   # Clear TypeScript cache
   rm -rf .next
   pnpm type-check
   ```

4. **Playwright browser issues**

   ```bash
   # Reinstall browsers
   pnpm test:e2e:install

   # Clear Playwright cache
   npx playwright cache clear
   ```

5. **ESLint/Prettier conflicts**
   ```bash
   # Fix formatting issues
   pnpm format
   pnpm lint --fix
   ```

### Performance Issues

- Clear `.next` build cache: `rm -rf .next`
- Clear node_modules: `rm -rf node_modules && pnpm install`
- Check Node.js memory usage: `node --max-old-space-size=8192`

### AI Integration Issues

- Verify GitHub Copilot is enabled in VS Code
- Check `.vscode/settings.json` for AI configurations
- Review `.github/copilot-instructions.md` for usage guidelines

## Next Steps

After successful setup:

1. Read `CONTRIBUTING.md` for contribution guidelines
2. Review `.guided/architecture/` for system design
3. Explore example components and patterns
4. Run the full test suite to ensure everything works
5. Start building your features!

For questions or issues, check:

- Project documentation in `.guided/`
- GitHub Issues for known problems
- Contributing guidelines for development patterns

Generated: 2025-08-08
