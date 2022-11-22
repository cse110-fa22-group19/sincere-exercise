/**
 * An item component that displays preview information about a single Entry
 * Displays: activityType, startTime
 */
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
          <button class="delete-entry">
            <img src="/assets/entry-delete.svg">
          </button>
        </div>
      </div>
    `;

    this.querySelector('button').addEventListener('click', () => {
      const deleteEntry = new Event('deleteEntry');
      this.dispatchEvent(deleteEntry);
    });
  }
}

customElements.define('entry-item-component', EntryItem);
