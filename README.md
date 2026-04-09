# DataStack API Documentation

A modern, interactive API documentation site built with Next.js. Features a clean documentation interface with live endpoint testing capabilities.

## Features

- **Interactive Documentation** - Browse API endpoints with syntax-highlighted examples
- **Live Endpoint Testing** - Test GET endpoints directly from the documentation
- **Responsive Design** - Works seamlessly on desktop and mobile
- **Dark Theme** - Easy on the eyes with a polished dark interface

## Tech Stack

- [Next.js 16](https://nextjs.org) - React framework with App Router
- [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS
- [shadcn/ui](https://ui.shadcn.com) - UI components
- [React Markdown](https://github.com/remarkjs/react-markdown) - Markdown rendering

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the documentation.

## Project Structure

```
app/
  api/          # API route handlers
  docs/         # Documentation pages
components/     # React components
docs/           # Markdown documentation files
```

## Build

```bash
npm run build
npm start
```

