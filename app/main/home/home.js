class Home extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
      <head>
        <link rel="stylesheet" href="./app/main/home/home.css">
        <script src="./app/main/home/home.script.js" type="module"></script>
        <script src="./app/main/home/new-entry-button/new-entry-button.js" type="text/javascript" defer></script>
      </head>
      <div class="home-page">
        <div class="entries" id="entry-list">
          <new-entry-button></new-entry-button>
        </div>
      </div>
    `;

    const homePageLoaded = new Event('homePageLoaded');
    window.dispatchEvent(homePageLoaded);
  }
}

customElements.define('home-page', Home);
