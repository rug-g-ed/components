import './style.css'
import typescriptLogo from './typescript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter'
import { Navigation } from './components/navigation/navigation'
import { Button } from './components/button/button'

// Main content
document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <h1>Rugged Components Demo</h1>
    <p>Responsive navigation menu with submenu support</p>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <div id="button-demo" style="margin-top: 2rem;"></div>
    <p class="read-the-docs">
      Resize the browser window to see the responsive navigation in action
    </p>
  </div>
`

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)

// Button example
const demoButton = new Button({
  label: 'Click me!',
  variant: 'primary',
  onClick: () => {
    alert('Button clicked!')
  }
})

demoButton.render(document.querySelector<HTMLDivElement>('#button-demo')!)

// Navigation example - render at the top of the page
const nav = new Navigation({
  logo: '<span style="font-weight: bold; color: #0066cc;">Rugged Components</span>',
  activePath: '/',
  items: [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    {
      label: 'Components',
      href: '/components',
      children: [
        { label: 'Button', href: '/components/button' },
        { label: 'Navigation', href: '/components/navigation' },
        { label: 'Forms', href: '/components/forms' }
      ]
    },
    {
      label: 'Resources',
      href: '/resources',
      children: [
        { label: 'Documentation', href: '/resources/docs' },
        { label: 'Examples', href: '/resources/examples' },
        { label: 'API Reference', href: '/resources/api' }
      ]
    },
    { label: 'Contact', href: '/contact' }
  ],
  onNavigate: (href) => {
    console.log('Navigating to:', href)
    // Update active state
    nav.setActivePath(href)
  }
})

// Insert navigation at the beginning of body
document.body.insertBefore(nav.getElement(), document.body.firstChild)
