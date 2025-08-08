# Guided Engineering Structure

This document defines the canonical `.guided/` folder structure for this project following Guided Engineering principles.

## Folder Structure

```
.guided/
├── base/                    # Project foundation and setup
│   ├── project.structure.md # Overall project organization
│   ├── setup.instructions.md# Development environment setup
│   └── structure.md         # This file - canonical structure
├── product/                 # Product definition and scope
│   ├── prd.md              # Product Requirements Document
│   ├── roadmap.md          # Product roadmap and milestones
│   └── personas.md         # User personas and target audience
├── architecture/            # Technical architecture and design
│   ├── adr/                # Architecture Decision Records
│   ├── stack.md            # Technology stack documentation
│   ├── rules.md            # Architectural rules and principles
│   ├── context.md          # System boundaries and contexts
│   ├── entities.md         # Domain entities and relationships
│   ├── guided.md           # AI-friendly architecture guidelines
│   ├── guardrails.md       # Technical guardrails and constraints
│   └── plugins.md          # Plugin architecture and extensions
├── assessment/              # Technical and product assessments
│   ├── summary.md          # Global assessment overview
│   ├── structure.md        # Project structure analysis
│   ├── stack.md            # Technology stack evaluation
│   ├── entities.md         # Domain model assessment
│   ├── plugins.md          # Extension mechanism analysis
│   ├── risks.md            # Risk assessment and mitigation
│   └── personas.md         # User persona validation
├── testing/                 # Testing strategy and coverage
│   ├── strategy.md         # Overall testing approach
│   ├── playbook.md         # Testing procedures and playbooks
│   ├── coverage.md         # Test coverage analysis
│   └── risks.md            # Testing gaps and risks
├── operation/               # Operational documentation
│   ├── worklog.md          # Development worklog and history
│   ├── changelog.md        # Version history and changes
│   ├── troubleshooting.md  # Common issues and solutions
│   └── faq.md              # Frequently asked questions
├── personas/                # AI and user persona definitions
│   ├── personas.yml        # Persona registry
│   └── template.persona.yml# Persona template
├── prompts/                 # Guided engineering prompts
│   └── template.prompt.yml # Prompt template
├── schema/                  # Schema definitions
│   ├── prompt.schema.json  # Prompt schema validation
│   └── persona.schema.json # Persona schema validation
├── context/                 # Environmental context
│   ├── local.md            # Local development context
│   └── env.md              # Environment-specific settings
└── tmp/                     # Temporary working files
    └── system.context.md   # System environment details
```

## File Naming Conventions

| Pattern         | Purpose                       | Example                        |
| --------------- | ----------------------------- | ------------------------------ |
| `*.md`          | Documentation files           | `project.structure.md`         |
| `*.yml`         | Configuration and data        | `personas.yml`                 |
| `*.json`        | Schema and structured data    | `prompt.schema.json`           |
| `adr-NNNN-*.md` | Architecture Decision Records | `adr-0001-framework-choice.md` |

## Folder Purposes

### `/base` - Project Foundation

- **Purpose**: Core project documentation and setup
- **Audience**: New developers, maintainers
- **Content**: Structure, setup instructions, project overview

### `/product` - Product Definition

- **Purpose**: Product scope, requirements, and strategy
- **Audience**: Product managers, stakeholders, developers
- **Content**: PRD, roadmap, user personas

### `/architecture` - Technical Design

- **Purpose**: System design, technology choices, patterns
- **Audience**: Developers, architects, AI assistants
- **Content**: Stack, patterns, decisions, constraints

### `/assessment` - Analysis & Evaluation

- **Purpose**: Current state analysis and recommendations
- **Audience**: Technical leads, auditors, AI assistants
- **Content**: Assessments, risks, evaluation results

### `/testing` - Quality Assurance

- **Purpose**: Testing strategy, coverage, quality metrics
- **Audience**: QA engineers, developers, CI/CD systems
- **Content**: Test strategy, coverage reports, risk analysis

### `/operation` - Runtime & Maintenance

- **Purpose**: Operational procedures, troubleshooting, history
- **Audience**: DevOps, support teams, maintainers
- **Content**: Runbooks, troubleshooting, changelogs

### `/personas` - Stakeholder Definitions

- **Purpose**: AI personas and user archetypes
- **Audience**: AI systems, product teams
- **Content**: Persona definitions, templates, registry

### `/prompts` - Guided Engineering

- **Purpose**: Structured prompts for AI-assisted development
- **Audience**: AI assistants, developers
- **Content**: Prompt templates, engineering workflows

### `/schema` - Data Structures

- **Purpose**: Schema definitions for validation
- **Audience**: AI systems, validation tools
- **Content**: JSON schemas, data structures

### `/context` - Environment Context

- **Purpose**: Environment-specific documentation
- **Audience**: Deployment systems, developers
- **Content**: Environment configs, local setup

### `/tmp` - Working Files

- **Purpose**: Temporary files and work-in-progress
- **Audience**: Current session, debugging
- **Content**: System context, temporary analysis

## Maintenance Guidelines

1. **Consistency**: All files should follow the established naming conventions
2. **Completeness**: Empty files should contain at least a header and TODO
3. **Traceability**: All changes should be logged in the worklog
4. **Validation**: Schema files should be used to validate structure
5. **AI-Friendly**: Documentation should be optimized for AI consumption

## Integration Points

- **CI/CD**: Testing and operation files integrate with automation
- **AI Tools**: Personas and prompts guide AI assistant behavior
- **Documentation**: Base and architecture files support developer onboarding
- **Quality**: Assessment and testing files drive quality metrics

Generated: 2025-08-08 Last Updated: 2025-08-08
