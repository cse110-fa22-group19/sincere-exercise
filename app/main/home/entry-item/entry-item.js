/**
 * An item component that displays preview information about a single Entry
 * Displays: activityType, startTime
 */
class EntryItem extends HTMLElement {
  constructor() {
    super();
  }

  // Entry Entity object to be stored here
  entryData = {};

  /**
   * Takes in a JSON Stringified Date object and returns a formatted string
   * of a date
   * @param {string} dateString - JSONed string of the date object
   */
  formatDate(dateString) {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      dateStyle: 'long',
      timeStyle: 'short',
    }).format(date);
  }

  connectedCallback() {
    this.entryData = JSON.parse(this.getAttribute('data'));

    this.innerHTML = `
      <head>
        <link rel="stylesheet" href="./app/main/home/entry-item/entry-item.css">
      </head>
      <div class="entry-component">
        <div class="inner-padding">
          <header class="entry-info">
            <h3 class="entry-label">${this.entryData?.workoutType}</h3>
            <h5 class="date-label">${this.formatDate(
              this.entryData?.startTime
            )}</h5>
            </header>
          <button class="delete-entry">
            <img src="./assets/entry-delete.svg">
          </button>
        </div>
      </div>
    `;

    /**
     * When the X button is clicked, entry should get deleted
     */
    this.querySelector('button').addEventListener('click', () => {
      const deleteEntry = new Event('deleteEntry');
      this.dispatchEvent(deleteEntry);
      event.stopPropagation();
    });

    /**
     * When entire entry is clicked, user to be taken to view entry page
     */
    this.querySelector('div').addEventListener('click', () => {
      const viewEntry = new Event('viewEntry');
      this.dispatchEvent(viewEntry);
    });
  }
}

customElements.define('entry-item-component', EntryItem);
