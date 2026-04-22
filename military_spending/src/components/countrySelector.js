import { html } from "htl";

export default function CountrySelector({
  countries,
  initial = [],
}) {
  let selected = [...initial];
  let query = "";

  const container = html`<div class="country-selector">
    <div class="country-search">
      <input
        type="text"
        placeholder="Search countries..."
        class="country-input"
        id="country-input"
      />

      <div class="suggestions"></div>
      <div class="all-container">
        <button id="select-all">Select all</button>
        <button id="deselect-all">Deselect all</button>
      </div>
    </div>
    <div class="badges"></div>
  </div>`;
  const input = container.querySelector("input");
  const suggestionsDiv = container.querySelector(".suggestions");
  const badgesDiv = container.querySelector(".badges");
  const selectButton = container.querySelector("#select-all");
  const deselectButton = container.querySelector("#deselect-all");
  function render() {
    const filtered = countries.filter(
      (c) =>
        c.toLowerCase().includes(query.toLowerCase()) &&
        !selected.includes(c)
    );

    // suggestions
    suggestionsDiv.innerHTML = "";
    if (filtered.length === 0) {
      const el = html`<div class="suggestion"">${"No matches"}</div>`;
      suggestionsDiv.appendChild(el);
    }
    filtered.forEach((country) => {
      const el = html`<div class="suggestion"">${country}</div>`;
      el.onclick = () => {
        selected = [...selected, country];
        input.value = "";
        query = "";
        update();
      };
      suggestionsDiv.appendChild(el);
    });

    // badges
    badgesDiv.innerHTML = "";
    selected.forEach((country, idx) => {
      const badge = html`<div class="badge">${country}</div>`;
      badge.onclick = () => {
        selected = selected.filter((c) => c !== country);
        update();
      };

      badgesDiv.appendChild(badge);
    });

    // all-buttons
    selectButton.onclick = () => {
      selected = countries;
      update();
    };

    deselectButton.onclick = () => {
      selected = [];
      update();
    };
  }

  function update() {
    render();
    container.value = selected;
    container.dispatchEvent(new Event("input"));
  }

  input.oninput = () => {
    query = input.value;
    render();
  };

  render();
  container.value = selected;

  return container;
}
