# OpenSpec Workflow Guide

## Overview
OpenSpec is a specification management system for planning and tracking changes to your project. It provides a structured approach to proposing, discussing, and implementing features.

## When to Use OpenSpec

You should open `@/openspec/AGENTS.md` when the request:
- Mentions planning or proposals (words like proposal, spec, change, plan)
- Introduces new capabilities, breaking changes, architecture shifts, or big performance/security work
- Sounds ambiguous and you need the authoritative spec before coding

## Directory Structure

```
openspec/
├── project.md          # Project overview, tech stack, and conventions
├── changes/            # All change proposals
│   ├── change-name/    # Individual change directory
│   │   ├── change.md   # High-level change description
│   │   └── specs/      # Detailed specifications
│   │       └── feature/
│   │           └── spec.md
│   └── archive/        # Completed or rejected changes
└── specs/              # Global specifications (if needed)
```

## Creating a Change Proposal

### 1. Create the Change Directory
Create a new directory under `openspec/changes/` with a descriptive name:
```
openspec/changes/add-feature-name/
```

### 2. Write the Change Document
Create `change.md` with:
- **Description**: Brief overview of the change
- **Rationale**: Why this change is needed
- **Impact**: What components/features are affected
- **Dependencies**: Any external requirements
- **Timeline**: Estimated implementation schedule
- **Owner**: Who is responsible for the change
- **Status**: Current state (Proposed, In Progress, Completed, Rejected)
- **Related Specs**: Links to detailed specifications

### 3. Write Detailed Specifications
Create `specs/feature-name/spec.md` with:
- **Summary**: One-sentence description
- **Problem**: What issue this solves
- **Solution**: How it will be implemented
- **Success Criteria**: How to know it's working
- **Implementation Plan**: Step-by-step approach
- **UI Changes**: Interface modifications needed
- **Technical Details**: Code-level considerations
- **Considerations**: Edge cases, security, performance

## Workflow Process

### 1. Proposal Phase
- Create change proposal with clear problem statement
- Define success criteria
- Get feedback from stakeholders

### 2. Specification Phase
- Write detailed technical specifications
- Define implementation phases
- Identify dependencies and risks

### 3. Implementation Phase
- Update status to "In Progress"
- Implement according to specifications
- Track progress against phases

### 4. Review Phase
- Test against success criteria
- Gather feedback
- Make necessary adjustments

### 5. Completion Phase
- Update status to "Completed"
- Move change to archive
- Update documentation

## Best Practices

### Specification Format
- Use clear, concise language
- Include code examples for technical changes
- Define measurable success criteria
- Consider edge cases and error handling

### Collaboration
- Tag relevant team members in discussions
- Use the comment system for feedback
- Keep specifications up to date as decisions change

### Maintenance
- Archive completed changes to keep the active directory clean
- Update project.md when tech stack or conventions change
- Review and update specifications as the project evolves

## Integration with Development

### Before Coding
1. Check if a spec exists for the feature
2. If not, create a proposal
3. Wait for approval before implementation

### During Development
1. Reference the spec for implementation details
2. Update the spec if requirements change
3. Track progress in the change document

### After Implementation
1. Verify all success criteria are met
2. Update change status to "Completed"
3. Move to archive directory

## Commands and Shortcuts

### AI Assistant Prompts
- "Create a change proposal for [feature]"
- "Help me fill out the project.md with details"
- "Explain the OpenSpec workflow"

### Quick Templates
Use the existing change proposals as templates for new ones:
- Reference `add-file-sharing` for feature additions
- Reference `add-dashboard-mock-data` for data changes