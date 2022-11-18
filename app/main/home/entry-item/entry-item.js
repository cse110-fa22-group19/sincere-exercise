class EntryItem extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
      <head>
        <link rel="stylesheet" href="/app/main/home/entry-item/entry-item.css">
      </head>
      <section class="entry-component">
        <label class="entry-label">Entry</label>
        <label class="date-label">September 30, 2022</label>
      </section>
    `;
  }
}

customElements.define('entry-item-component', EntryItem);
