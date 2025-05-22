# League of Legends Account Dashboard

A dashboard for managing League of Legends accounts with features for tracking ranks, roles, and performance.

## Features

- Display account information with rank images
- Region labels with full names on hover
- Role icons with visual indicators
- Interactive username copying
- Account locking functionality
- Performance tracking

## Setup

1. Install dependencies:
```bash
npm install
```

2. Add rank images:
Place rank images in the `public/ranks` directory with the following naming convention:
- iron.png
- bronze.png
- silver.png
- gold.png
- platinum.png
- diamond.png
- master.png
- grandmaster.png
- challenger.png

3. Start the development server:
```bash
npm start
```

## Project Structure

- `/src/components/AccountTable` - Main table component
- `/public/ranks` - League rank images
- `/src/types` - TypeScript type definitions
- `/src/mocks` - Mock data for development

## Dependencies

- React Icons
- React Router
- Tailwind CSS

## Notes

- Rank images should be in PNG format
- Role icons are provided through React Icons
- Region labels include full names on hover
- Username copying includes visual feedback

## Tech Stack

- React 19
- TypeScript 5
- TailwindCSS 3
- Vite 6

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd lol-account-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## Project Structure

```
src/
├── components/         # React components
│   ├── AccountTable/  # Main account table component
│   ├── ChampionDrawer/# Champion details drawer
│   ├── LegendDrawer/  # Activity legend drawer
│   ├── Toast/         # Toast notifications
│   └── Header.tsx     # App header
├── types/             # TypeScript type definitions
├── mocks/             # Mock data for development
└── App.tsx           # Main application component
```

## Features

### Account Table
- Sort by region
- Copy account credentials
- Toggle account lock status
- View champion performance
- Track LP changes

### Activity Calendar
- 4-month view
- Color-coded LP changes
- Hover tooltips with details

### Champion Performance
- Win rate visualization
- Games played tracking
- Quick access to stats

## Accessibility

- WCAG 2.1 AA compliant
- Keyboard navigation
- Screen reader support
- Focus management
- Proper ARIA attributes

## Performance

- Lazy-loaded images
- Code splitting
- Optimized bundle size
- Efficient re-renders

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT
https://bejewelled-meringue-0ac95f.netlify.app/