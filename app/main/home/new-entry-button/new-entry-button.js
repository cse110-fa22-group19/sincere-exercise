class NewEntryButton extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
      <head>
        <link rel="stylesheet" href="/app/main/home/new-entry-button/new-entry-button.css">
      </head>
      <button class="new-entry-button">
        Add New Entry
      </button>
    `;
  }
}

customElements.define('new-entry-button', NewEntryButton);