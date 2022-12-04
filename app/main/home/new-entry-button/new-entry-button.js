/**
 * Button component to add a new entry to the list
 * Dispatches an 'addNewEntry' event if button is clicked
 */
class NewEntryButton extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
      <head>
        <link rel="stylesheet" href="./app/main/home/new-entry-button/new-entry-button.css">
      </head>
      <button class="new-entry-button">
        Add New Entry
      </button>
    `;

    // When add new entry button is clicked, dispatch add event to create entry
    document.querySelector('button').addEventListener('click', () => {
      const addNewEntry = new Event('addNewEntry');
      this.dispatchEvent(addNewEntry);
    });
  }
}

customElements.define('new-entry-button', NewEntryButton);
