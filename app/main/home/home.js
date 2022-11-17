class Home extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
      <head>
        <link rel="stylesheet" href="/app/main/home/home.css">
        <script src="/app/main/home/new-entry-button/new-entry-button.js" type="text/javascript" defer></script>
      </head>
      <div>
        <new-entry-button></new-entry-button>
        <entry-item-component></entry-item-component>
      </div>
    `;
  }
}

customElements.define('home-page', Home);
