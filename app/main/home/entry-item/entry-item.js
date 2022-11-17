class EntryItem extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
      <head>
        <link rel="stylesheet" href="/app/main/home/entry-item/entry-item.css">
      </head>
      <div>
        // Enter HTML code here
      </div>
    `;
  }
}

customElements.define('entry-item-component', EntryItem);