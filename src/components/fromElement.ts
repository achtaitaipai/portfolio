export class FromElement extends HTMLSpanElement {
  constructor() {
    super();
  }
  connectedCallback() {
    const dataFrom = this.getAttribute("data-from")?.toString();
    if (!dataFrom) return;
    const dateFrom = new Date(dataFrom);
    const diff =
      Math.round((100 * (Date.now() - dateFrom.getTime())) / 31536000000) / 100;
    const text = diff.toString() + " an" + (diff > 1 ? "s" : "");
    this.textContent = text;
  }
}
