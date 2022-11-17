class NavBar extends HTMLElement {
    constructor() {
      super();
    }
  
    connectedCallback() {
      this.innerHTML = `
        <head>
          <link rel="stylesheet" href="/app/main/navbar/navbar.css">
        </head>
        <div>
          <img id = "Logo" src="/assets/navbarLogo.png" alt="Logo">
        </div>
      `;
    }
  }
  
  customElements.define('navbar-component', NavBar);