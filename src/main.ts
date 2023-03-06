import "./style/index.css";
import { AccordionElement } from "./components/accordionElement";
import { FromElement } from "./components/fromElement";

customElements.define("from-element", FromElement, { extends: "span" });

customElements.define("animated-accordion", AccordionElement, {
  extends: "details",
});
