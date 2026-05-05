import { html } from "htl";

export function ToggleButtons({ options, initial }) {
  let selected = initial;

  const container = html`<div class="toggle-group"></div>`;

  function render() {
    container.innerHTML = "";

    options.forEach((opt) => {
      const btn = html`<button class=${selected === opt ? "active" : ""}>
        ${opt}
      </button>`;

      btn.onclick = () => {
        selected = opt;
        update();
      };

      container.appendChild(btn);
    });
  }

  function update() {
    render();
    container.value = selected;
    container.dispatchEvent(new Event("input"));
  }

  render();
  container.value = selected;

  return container;
}