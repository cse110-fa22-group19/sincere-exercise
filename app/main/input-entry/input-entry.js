class InputEntry extends HTMLElement {
  constructor() {
    super();
  }

  // Entry Entity object to be stored here
  entryData = {};

  connectedCallback() {
    this.entryData = JSON.parse(this.getAttribute('data'));

    this.innerHTML = `
      <head>
        <meta charset="UTF-8" />
        <title>Input Mode</title>
        <link rel="stylesheet" href="./app/main/input-entry/input-entry.css" />
        <script src="./app/main/input-entry/input-entry.script.js" type="module"></script>
      </head>
      <body>
        <main>
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
                <button id="cancel-button">Cancel</button>
                <button id="save-button">Save</button>
              </div>
            </div>
          </div>
        </main>
      </body>
    `;

    const inputEntryPageLoaded = new Event('inputEntryPageLoaded');
    window.dispatchEvent(inputEntryPageLoaded);

    this.querySelector('#cancel-button').addEventListener('click', () => {
      const newEntry = this.entryData;
      const cancelInputEntry = new Event('cancelInputEntry');
      cancelInputEntry.data = newEntry;
      this.dispatchEvent(cancelInputEntry);
    })

    this.querySelector('#save-button').addEventListener('click', () => {
      const newEntry = this.entryData;
      const saveEntry = new Event('saveEntry');
      saveEntry.data = newEntry;
      this.dispatchEvent(saveEntry);
    });
  }
}

customElements.define('input-entry-page', InputEntry);
