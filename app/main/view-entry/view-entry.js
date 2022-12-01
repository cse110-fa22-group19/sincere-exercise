class ViewEntry extends HTMLElement {
  constructor() {
    super();
  }

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
    }).format(date);
  }

  /**
   * Takes in a JSON Stringified Date object and returns a formatted string
   * of a date
   * @param {string} dateString - JSONed string of the date object
   */
  formatTime(dateString) {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      timeStyle: 'short',
    }).format(date);
  }

  connectedCallback() {
    // Switch view mode to input mode
    this.entryData = JSON.parse(this.getAttribute('data'));

    this.innerHTML = `
    <head>
        <meta charset="UTF-8" />
        <title>View Mode</title>
        <link rel="stylesheet" href="./app/main/view-entry/view-mode.css" />
        <link
            href="https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;500;600;700&display=swap"
            rel="stylesheet"
        />
        <script src="./app/shared/navbar/navbar.js" type="text/javascript"></script>
    </head>
  
    <body>
      <main>
        <div id = "main_flexbox">
          <div id = "top_flexbox">
            <h2 id="back_button"><</h2>
            <h2 id="title">View Entry</h2>
            <img src="assets/edit-entry-icon.svg" alt="Edit Mode" id="edit_button">
          </div>
          <div class = "main_flexbox_child">
            <h3>Workout Type</h3>
            <h4 id = "workout_value" class = "entry_data">${this.entryData?.workoutType}</h4>
          </div>
          <div class = "main_flexbox_child">
            <h3 id = "location_heading">Location</h3>
            <h4 id = "location_value" class = "entry_data">${this.entryData?.location}</h4>
          </div>
          <div id = "time_flexbox" class = "main_flexbox_child">
            <div>
              <h3 class = "time_title">Exercise Date</h3>
              <h4 id = "dates_value" class = "time_flexbox_value entry_data">${this.formatDate(this.entryData?.startTime)}</h4>
            </div>
              <div>
                <h3 class = "time_title">Start Time</h3>
                <h4 id="start_time" class = "time_flexbox_value entry_data">${this.formatTime(this.entryData?.startTime)}</h4>
              </div>
              <div>
                <h3 class = "time_title">End Time</h3>
                <h4 id="end_time" class = "time_flexbox_value entry_data">${this.formatTime(this.entryData?.endTime)}</h4>
              </div>
            </div>
            <div class = "main_flexbox_child">
              <h3 id = "intensity_title">Intensity (1 to 5)</h3>
              <h4 id="intensity_value" class = "entry_data">${this.entryData?.intensity} </h4>
            </div>
            <div class = "main_flexbox_child">
              <h3 id = "note_title">Note</h3>
              <h4 id="note_value" class = "entry_data">${this.entryData?.note}</h4>
            </div>
          </div>
        </main>
      </body>
    `;
    let edit = document.getElementById('edit_button')
    edit.addEventListener('click', (event)=>{
     const viewPage = document.querySelector('view-entry-page');
     const inputPage = document.createElement('input-entry-page');
     inputPage.setAttribute('data', JSON.stringify(this.entryData));
     const parentNode = viewPage.parentNode;
     parentNode.replaceChild(inputPage, viewPage);

    });
    //Switch View mode to Home page
    let back = document.getElementById('back_button');
    back.addEventListener('click', () => {
      console.log('this button works');
      const viewPage = document.querySelector('view-entry-page');
      const homePage = document.createElement('home-page');
      viewPage.setAttribute("id","viewEntry");
      const parentNode = viewPage.parentNode;
      parentNode.replaceChild(homePage, viewPage);
      location.reload();
    });

  }


  // testing methods
  // 
  toView() {
    this.innerHTML = this.view;
  }
  toInput() {
    this.innerHTML = this.input;
  }
}

customElements.define('view-entry-page', ViewEntry);
