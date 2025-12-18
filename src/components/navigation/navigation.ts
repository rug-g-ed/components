import './navigation.css';

export interface NavigationMenuItem {
  label: string;
  href: string;
  children?: NavigationMenuItem[];
}

export interface NavigationOptions {
  items: NavigationMenuItem[];
  logo?: string;
  activePath?: string;
  onNavigate?: (href: string) => void;
}

export class Navigation {
  private element: HTMLElement;
  private hamburgerButton: HTMLButtonElement | null = null;
  private mobileMenu: HTMLElement | null = null;
  private options: NavigationOptions;

  constructor(options: NavigationOptions) {
    this.options = options;
    this.element = document.createElement('nav');
    this.element.className = 'rugged-nav';

    this.buildNavigation();
    this.attachEventListeners();
  }

  private buildNavigation(): void {
    const container = document.createElement('div');
    container.className = 'rugged-nav__container';

    // Logo section
    if (this.options.logo) {
      const logoSection = document.createElement('div');
      logoSection.className = 'rugged-nav__logo';
      logoSection.innerHTML = this.options.logo;
      container.appendChild(logoSection);
    }

    // Desktop menu
    const desktopMenu = this.createMenuList(this.options.items, 'rugged-nav__menu');
    container.appendChild(desktopMenu);

    // Hamburger button
    this.hamburgerButton = document.createElement('button');
    this.hamburgerButton.className = 'rugged-nav__hamburger';
    this.hamburgerButton.setAttribute('aria-label', 'Toggle menu');
    this.hamburgerButton.innerHTML = `
      <span class="rugged-nav__hamburger-line"></span>
      <span class="rugged-nav__hamburger-line"></span>
      <span class="rugged-nav__hamburger-line"></span>
    `;
    container.appendChild(this.hamburgerButton);

    // Mobile menu
    this.mobileMenu = this.createMenuList(this.options.items, 'rugged-nav__mobile-menu');
    container.appendChild(this.mobileMenu);

    this.element.appendChild(container);
  }

  private createMenuList(items: NavigationMenuItem[], className: string): HTMLElement {
    const menu = document.createElement('ul');
    menu.className = className;

    items.forEach(item => {
      const menuItem = this.createMenuItem(item);
      menu.appendChild(menuItem);
    });

    return menu;
  }

  private createMenuItem(item: NavigationMenuItem): HTMLLIElement {
    const li = document.createElement('li');
    li.className = 'rugged-nav__item';

    const hasSubmenu = item.children && item.children.length > 0;

    if (hasSubmenu) {
      li.classList.add('rugged-nav__item--has-submenu');
    }

    const link = document.createElement('a');
    link.href = item.href;
    link.textContent = item.label;
    link.className = 'rugged-nav__link';

    // Set active state based on activePath option
    if (this.options.activePath && item.href === this.options.activePath) {
      link.classList.add('rugged-nav__link--active');
    }

    // Handle click events
    link.addEventListener('click', (e) => {
      // If it has a submenu, toggle it on click/touch
      if (hasSubmenu) {
        e.preventDefault();

        // Close other open submenus at the same level
        const parentMenu = li.parentElement;
        if (parentMenu) {
          const siblings = parentMenu.querySelectorAll('.rugged-nav__item--has-submenu');
          siblings.forEach(sibling => {
            if (sibling !== li) {
              sibling.classList.remove('rugged-nav__item--open');
            }
          });
        }

        // Toggle current submenu
        li.classList.toggle('rugged-nav__item--open');
      } else if (this.options.onNavigate) {
        // No submenu, navigate
        e.preventDefault();
        this.options.onNavigate(item.href);
      }
    });

    li.appendChild(link);

    // Add submenu if children exist
    if (hasSubmenu) {
      const submenu = document.createElement('ul');
      submenu.className = 'rugged-nav__submenu';

      item.children!.forEach(child => {
        const submenuItem = this.createMenuItem(child);
        submenu.appendChild(submenuItem);
      });

      li.appendChild(submenu);
    }

    return li;
  }

  private attachEventListeners(): void {
    if (this.hamburgerButton && this.mobileMenu) {
      this.hamburgerButton.addEventListener('click', () => {
        this.toggleMobileMenu();
      });

      // Close mobile menu and submenus when clicking outside
      document.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;

        // Close mobile menu if clicking outside
        if (
          this.mobileMenu?.classList.contains('rugged-nav__mobile-menu--open') &&
          !this.element.contains(target)
        ) {
          this.closeMobileMenu();
        }

        // Close open submenus if clicking outside navigation
        if (!this.element.contains(target)) {
          const openSubmenus = this.element.querySelectorAll('.rugged-nav__item--open');
          openSubmenus.forEach(item => {
            item.classList.remove('rugged-nav__item--open');
          });
        }
      });

      // Close mobile menu on window resize
      window.addEventListener('resize', () => {
        if (window.innerWidth >= 768) {
          this.closeMobileMenu();
        }
      });
    }
  }

  private toggleMobileMenu(): void {
    this.mobileMenu?.classList.toggle('rugged-nav__mobile-menu--open');
    this.hamburgerButton?.classList.toggle('rugged-nav__hamburger--active');
  }

  private closeMobileMenu(): void {
    this.mobileMenu?.classList.remove('rugged-nav__mobile-menu--open');
    this.hamburgerButton?.classList.remove('rugged-nav__hamburger--active');
  }

  render(container: HTMLElement): void {
    container.appendChild(this.element);
  }

  destroy(): void {
    this.element.remove();
  }

  getElement(): HTMLElement {
    return this.element;
  }

  updateActiveItem(href: string): void {
    this.options.activePath = href;
    const allLinks = this.element.querySelectorAll('.rugged-nav__link');
    allLinks.forEach(link => {
      link.classList.remove('rugged-nav__link--active');
      if ((link as HTMLAnchorElement).getAttribute('href') === href) {
        link.classList.add('rugged-nav__link--active');
      }
    });
  }

  setActivePath(path: string): void {
    this.updateActiveItem(path);
  }
}
