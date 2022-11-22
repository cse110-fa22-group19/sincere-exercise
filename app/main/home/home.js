class Home extends HTMLElement {
  constructor() {
    super();
  }

  // functions = require('../../core/entry.entity');

  connectedCallback() {
    this.innerHTML = `
      <head>
        <link rel="stylesheet" href="/app/main/home/home.css">
        <script src="./app/main/home/home.script.js" type="module"></script>
        <script src="./app/main/home/new-entry-button/new-entry-button.js" type="text/javascript" defer></script>
      </head>
      <div id="entry-list">
        <new-entry-button></new-entry-button>
        <entry-item-component></entry-item-component>
      </div>
    `;
  }
}

customElements.define('home-page', Home);
