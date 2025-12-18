# Rugged Components

A TypeScript component library with responsive navigation and button components.

## Installation

```bash
npm install @rugged-berlin/rugged-components
```

## Usage

### Importing Components

To use the components in your project, you need to import both the JavaScript and CSS:

```typescript
// Import the components
import { Navigation, Button } from '@rugged-berlin/rugged-components';
import type { NavigationOptions, ButtonOptions } from '@rugged-berlin/rugged-components';

// Import the styles
import '@rugged-berlin/rugged-components/style.css';
```

### Navigation Component

The Navigation component provides a responsive navigation menu with submenu support.

**Features:**
- Responsive design (top bar on desktop, hamburger menu on mobile)
- Touch-friendly submenu support
- Active page highlighting
- Nested submenus
- Click/touch to open submenus (works on all devices)

**Example:**

```typescript
import { Navigation } from '@rugged-berlin/rugged-components';
import '@rugged-berlin/rugged-components/style.css';

// Define your menu items once
const menuItems = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  {
    label: 'Products',
    href: '/products',
    children: [
      { label: 'Category 1', href: '/products/cat1' },
      { label: 'Category 2', href: '/products/cat2' }
    ]
  },
  { label: 'Contact', href: '/contact' }
];

const nav = new Navigation({
  logo: '<img src="logo.png" alt="Logo" />',
  activePath: '/', // Set the current active page
  items: menuItems,
  onNavigate: (href) => {
    // Handle navigation
    console.log('Navigating to:', href);
    // Update active state
    nav.setActivePath(href);
  }
});

// Render the navigation
nav.render(document.body);

// Or insert at a specific position
document.body.insertBefore(nav.getElement(), document.body.firstChild);

// Update active page dynamically on route change
nav.setActivePath('/about');
```

### Button Component

A customizable button component with variants.

**Example:**

```typescript
import { Button } from '@rugged-berlin/rugged-components';
import '@rugged-berlin/rugged-components/style.css';

const button = new Button({
  label: 'Click me!',
  variant: 'primary', // 'primary' | 'secondary'
  onClick: () => {
    alert('Button clicked!');
  }
});

button.render(document.querySelector('#button-container')!);
```

## TypeScript Support

This library is written in TypeScript and includes type declarations. All components and interfaces are fully typed.

```typescript
import type {
  NavigationOptions,
  NavigationMenuItem,
  ButtonOptions
} from '@rugged-berlin/rugged-components';
```

## API Reference

### Navigation

#### NavigationOptions

```typescript
interface NavigationOptions {
  items: NavigationMenuItem[];
  logo?: string;
  activePath?: string;
  onNavigate?: (href: string) => void;
}
```

- `items` - Array of menu items to display
- `logo` - Optional HTML string for the logo
- `activePath` - Optional path of the currently active page (e.g., '/', '/about')
- `onNavigate` - Optional callback function called when a menu item is clicked

#### NavigationMenuItem

```typescript
interface NavigationMenuItem {
  label: string;
  href: string;
  children?: NavigationMenuItem[];
}
```

- `label` - Display text for the menu item
- `href` - URL path for the menu item
- `children` - Optional array of child menu items for submenus

#### Methods

- `render(container: HTMLElement): void` - Renders the navigation to a container
- `destroy(): void` - Removes the navigation from the DOM
- `getElement(): HTMLElement` - Returns the navigation element
- `setActivePath(path: string): void` - Updates which menu item is marked as active based on the path
- `updateActiveItem(href: string): void` - Alias for `setActivePath()` (kept for backwards compatibility)

### Button

#### ButtonOptions

```typescript
interface ButtonOptions {
  label: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
}
```

#### Methods

- `render(container: HTMLElement): void` - Renders the button to a container
- `destroy(): void` - Removes the button from the DOM
- `getElement(): HTMLButtonElement` - Returns the button element

## License

MIT
