# Open Trivia Visualizer

> A mini visualization tool for trivia questions from the [Open Trivia Database API](https://opentdb.com/). Explore questions by category and difficulty with interactive bar chart visualizations.

<div align="center">

[![Live Demo](https://img.shields.io/badge/demo-live-success?style=flat-square)](https://mirko-125.github.io/open-trivia-visualizer/)
[![React](https://img.shields.io/badge/React-19.1.1-61dafb?style=flat-square&logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7.1.12-646cff?style=flat-square&logo=vite)](https://vitejs.dev/)

</div>

## Features

**The user is able to:**

- See the list of categories (e.g. Sport, Science, History)
- See the distribution of questions by category
- See the distribution of questions by difficulty
- Filter the data to see a single category

## Used tech

- **[React](https://react.dev/)** - JavaScript library for building user interfaces
- **[Vite](https://vitejs.dev/)** - Next-generation frontend build tool
- **[React Router DOM](https://reactrouter.com/)** - Client-side routing for React applications
- **[Recharts](https://recharts.org/)** - Composable charting library built on React components

## Installation

```bash
# Clone the repository
git clone https://github.com/Mirko-125/Open-Trivia-Visualizer.git

# Navigate to project directory
cd Open-Trivia-Visualizer

# Install dependencies
npm install
```

## Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## Directory Details:

```
src/
├── components/       # Reusable UI components
│   └── ui/          # Button, Dropdown, Navbar, Loader, Chart
├── config/          # Configuration files (API settings)
├── context/         # React Context for state management
├── helpers/         # Utility functions
├── hooks/           # Custom React hooks
├── pages/           # Page components
├── services/        # API service layer
└── main.jsx         # Application entry point
```

## API Reference

This project uses the [Open Trivia Database API](https://opentdb.com/api_config.php) to fetch trivia questions and categories.

**Endpoint Documentation:**

- **Categories:** `https://opentdb.com/api_category.php`
- **Questions:** `https://opentdb.com/api.php?amount={number}&category={id}&difficulty={level}&type={type}`

---

<div align="center">

**Made with ♥ by [Mirko-125](https://github.com/Mirko-125)**

Powered by [Vite](https://vitejs.dev/)

</div>
