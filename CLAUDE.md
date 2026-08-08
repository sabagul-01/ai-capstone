# Project Conventions

## Project
AI Capstone

## Language
JavaScript

## Runtime
Node.js

## Editor
Visual Studio Code

## Version Control
Git and GitHub

## Coding Style
- Write clean and readable code.
- Use meaningful variable names.
- Add comments where necessary.

## Commit Style
Use Conventional Commits.

Examples:
- feat:
- fix:
- docs:
- chore:
## AI Assistance

Use AI to:
- Explain code.
- Generate documentation.
- Suggest improvements.
## Project Rules

### 1. Keep the technology stack simple
Use vanilla HTML, CSS, and JavaScript for this project. Do not introduce a frontend framework or additional libraries unless explicitly requested.

### 2. Validate user input
All required form fields must be validated before saving. Name and email must contain valid values, and theme selection must be limited to the supported theme options.

### 3. Preserve user settings
User settings must be stored using `localStorage` under the `userSettings` key. Saved settings should be loaded when the page initializes, and invalid stored data should be handled gracefully.

### 4. Maintain accessibility
Form fields should have clear labels, accessible validation messages, appropriate focus states, and status messages should use suitable ARIA attributes where needed.

### 5. Test changes before committing
Run `npm test` after making functional changes. Do not commit changes while automated tests are failing.

### 6. Use Conventional Commits
Use Conventional Commit messages such as `feat:`, `fix:`, `test:`, `docs:`, or `refactor:` when committing changes.