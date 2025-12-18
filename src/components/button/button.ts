import './button.css';

export interface ButtonOptions {
  label: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
}

export class Button {
  private element: HTMLButtonElement;

  constructor(options: ButtonOptions) {
    this.element = document.createElement('button');
    this.element.className = `btn btn--${options.variant || 'primary'}`;
    this.element.textContent = options.label;
    
    if (options.onClick) {
      this.element.addEventListener('click', options.onClick);
    }
  }

  render(container: HTMLElement): void {
    container.appendChild(this.element);
  }

  destroy(): void {
    this.element.remove();
  }

  getElement(): HTMLButtonElement {
    return this.element;
  }
}