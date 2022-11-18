class EntryItem extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
      <head>
        <link rel="stylesheet" href="/app/main/home/entry-item/entry-item.css">
      </head>
      <div class="entry-component">
        <div class="inner-padding">
          <header class="entry-info">
            <h3 class="entry-label">Entry</h3>
            <h5 class="date-label">September 30, 2022</h5>
          </header>
          <img class="delete-entry default" src="/assets/entry-delete.svg">
        </div>
      </div>
    `;
  }
}

customElements.define('entry-item-component', EntryItem);
