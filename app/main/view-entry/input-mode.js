class InputEntry extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
    <head>
      <meta charset="UTF-8" />
      <title>Input Mode</title>
      <link rel="stylesheet" href="./app/main/view-entry/input-mode.css" />
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
          <h2 id="title">Input Entry</h2>
          <div class = "main_flexbox_child">
            <h3>Workout Type</h3>
            <input
              type="text"
              id="workout_name"
              placeholder="Enter Workout"
            />
          </div>
          <div class = "main_flexbox_child">
            <h3 id = "location_heading">Location</h3>
            <input
              type="text"
              id="location_input"
              placeholder="Enter location"
            />
          </div>
          <div id = "time_flexbox" class = "main_flexbox_child">
            <div>
              <h3 class = "time_title">Exercise Dates</h3>
              <input
                class = "time_input"
                type="date"
                id="date"
              />
            </div>
            <div>
              <h3 class = "time_title">Start Time</h3>
              <input
                class = "time_input"
                type="time"
                id="start_time"
              />
            </div>
            <div>
              <h3 class = "time_title">End Time</h3>
              <input
                class = "time_input"
                type="time"
                id="end_time"
              />
            </div>
          </div>
          <div class = "main_flexbox_child">
            <h3 id = "intensity_title">Intensity (1 to 5)</h3>
            <input
              type="number"
              id = "intensity_input"
              min="1"
              max="5"
            />
          </div>
          <div class = "main_flexbox_child">
            <h3 id = "note_title">Note</h3>
            <textarea>
            </textarea>
          </div>
          <div class = "main_flexbox_child">
            <div id = "buttons_div">
              <button id = "cancel_button">Cancel</button>
              <button id = "save_button">Save</button>
            </div>
          </div>
        </div>
      </main>
    </body>
      `;
  }
}

customElements.define('input-entry-page', InputEntry);
