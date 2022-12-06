class ViewEntry extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
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
        <navbar-component id = "navbar"></navbar-component>
        <div id = "main_flexbox">
          <div id = "top_flexbox">
            <h2 id="back_button"><</h2>
            <h2 id="title">Input Entry</h2>
            <img src="./app/main/view-entry/icons/edit_button.png" alt="Edit Mode" id="edit_button">
          </div>
          <div class = "main_flexbox_child">
            <h3>Workout Type</h3>
            <h4 id = "workout_value">Soccer</h4>
          </div>
          <div class = "main_flexbox_child">
            <h3 id = "location_heading">Location</h3>
            <h4 id = "location_value">John Muir Field</h4>
          </div>
          <div id = "time_flexbox" class = "main_flexbox_child">
            <div>
              <h3 class = "time_title">Exercise Dates</h3>
              <h4 id = "dates_value" class = "time_flexbox_value">11/16/2022</h4>
            </div>
            <div>
              <h3 class = "time_title">Start Time</h3>
              <h4 id="start_time" class = "time_flexbox_value">11:00 AM</h4>
              </div>
            <div>
              <h3 class = "time_title">End Time</h3>
              <h4 id="end_time" class = "time_flexbox_value">1:00 PM</h4>
            </div>
          </div>
          <div class = "main_flexbox_child">
            <h3 id = "intensity_title">Intensity (1 to 5)</h3>
            <h4 id="intensity_value">5 - Most Intense</h4>
          </div>
          <div class = "main_flexbox_child">
            <h3 id = "note_title">Note</h3>
            <h4 id="note_value">I feel like I was in great form today</h4>
          </div>
        </div>
      </main>
    </body>
      `;
  }
}

customElements.define('view-entry-page', ViewEntry);
