export class AccordionElement extends HTMLDetailsElement {
  private _isClosing = false;
  private _isExpanding = false;
  private _summaryElement: HTMLElement | null = null;
  private _contentElements: HTMLElement[] | null = null;
  private _animation: Animation | null = null;

  constructor() {
    super();
  }

  connectedCallback() {
    this._summaryElement = this.querySelector("summary");
    this._contentElements = Array.from(this.children ?? []).filter(
      (el) => el !== this._summaryElement
    ) as HTMLElement[];
    this.addEventListener("click", this._handleClick);
  }

  disconnectedCallback() {
    this.removeEventListener("click", this._handleClick);
    this._animation?.cancel();
  }

  private _handleClick(e: MouseEvent) {
    const target = e.target as HTMLElement;
    if (
      target !== this._summaryElement &&
      !this._summaryElement?.contains(target)
    )
      return;
    e.preventDefault();
    if (!this.open || this._isClosing) this._toggle(true);
    else if (this.open || this._isExpanding) this._toggle(false);
  }

  private _toggle(expanding: boolean) {
    if (!this._contentElements || !this._summaryElement) return;
    this.style.setProperty("height", `${this.offsetHeight}px`);
    if (expanding) this.open = true;
    this._isExpanding = expanding;
    this._isClosing = !expanding;
    this._animation?.cancel();
    const height = expanding
      ? this._summaryElement.offsetHeight +
        this._contentElements.reduce((cur, el) => cur + el.offsetHeight, 0)
      : this._summaryElement.offsetHeight;
    this.style.setProperty("overflow", "hidden");
    window.requestAnimationFrame(() => this._animate(height, expanding));
  }

  private _animate(height: number, open: boolean) {
    this._animation = this.animate(
      {
        height: [`${height}px`],
      },
      {
        duration: parseInt(this.getAttribute("duration") ?? "300"),
        easing: this.getAttribute("easing") ?? "linear",
      }
    );
    this._animation.onfinish = () => this._onAnimationFinish(open);
    this._animation.oncancel = () => {
      if (open) this._isExpanding = false;
      else this._isClosing = false;
    };
  }

  private _onAnimationFinish(open: boolean) {
    this.open = open;
    this._animation = null;
    this._isClosing = false;
    this._isExpanding = false;
    this.style.setProperty("height", "");
    this.style.setProperty("overflow", "");
  }
}
