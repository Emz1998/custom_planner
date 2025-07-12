# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start Vite development server with hot module replacement
- `npm run start` - Start both frontend dev server and Express API server concurrently
- `npm run api-server` - Run only the Express API server (port 3001)
- `npm run build` - Build production bundle
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint checks
- `npm run export-pdf` - Generate PDF using standalone script

## Project Architecture

This is a **Custom Planner Generator** built with React and Vite that creates printable PDF planners with customizable layouts.

### Core Technology Stack
- **Frontend**: React 19.1 + Vite 7.0 + TailwindCSS 4.1
- **Backend API**: Express 5.1 (port 3001) 
- **PDF Generation**: Puppeteer 24.11 with A5 format optimization
- **Routing**: React Router DOM 7.6

### Key Architecture Components

#### Planner Generation System (`/src/config/plannerConfig.js`)
- Generates monthly and weekly planner layouts
- Configurable duration: 3, 6, 10, or 12 months
- Week start options: Monday or Sunday
- Uses utility functions from `/src/utils/` for calendar calculations

#### PDF Export Pipeline
1. **Frontend**: Dashboard triggers PDF generation request
2. **API Server**: Express server at port 3001 handles requests
3. **Puppeteer**: Renders React components to PDF with A5 page format
4. **Progress Tracking**: Server-Sent Events (SSE) for real-time progress updates
5. **File Serving**: Static file serving from `/output` directory

#### Component Structure
- **Navigation & Routing**: `/src/custom-components/Navigation.jsx` and `Routers.jsx`
- **Main Interface**: `Dashboard.jsx` (primary user interface)
- **Print System**: `PrintPreview.jsx` and `PDFExport.jsx`
- **UI Components**: Button, Dialog, ColorPicker, Notes, etc. in `/src/custom-components/`

### TailwindCSS Configuration
- **Version**: 4.1.11 with Vite plugin integration
- **Custom Theme**: CSS variables defined in `src/index.css` for colors, fonts, spacing, borders
- **Typography**: Inter and Lato fonts with custom font size scale
- **Print Optimization**: Specialized CSS for A5 format with `@page` rules

### File Organization
```
/src/
├── config/           # Core planner logic and UI configurations
├── custom-components/ # React components and UI elements
└── utils/            # Calendar utilities and property generators
```

## Development Notes

### API Server Requirements
The Express server must be running (port 3001) for PDF generation functionality. Use `npm run start` to run both frontend and backend together.

### Print Preview System
The application has a dedicated print preview route that renders planner pages optimized for A5 paper format. Print styles are defined with specific margins and page breaks.

### Configuration Files
- **Planner Logic**: `/src/config/plannerConfig.js` contains the core planner generation algorithms
- **UI Configs**: Button and dialog configurations in `/src/config/`
- **Vite Setup**: Standard React + TailwindCSS configuration

### No TypeScript
This is a pure JavaScript project with React type definitions for development support only. All files use `.js` and `.jsx` extensions.