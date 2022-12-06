class InputEntry extends HTMLElement {
  constructor() {
    super();
  }

  // Entry Entity object to be stored here
  entryData = {};

  /**
   * Grabs all inputted data from HTML elements and returns the entry data object
   * @returns {Entry} - entry object with the new data grabbed from HTML
   */
  collectInputData() {
    const workoutType = document.getElementById('workout-name').value.trim();
    const locationName = document.getElementById('location-name').value.trim();
    const exercisedate = document.getElementById('exercise-date').value.trim(); // yyyy-mm-dd
    const startTime = document.getElementById('start-time').value.trim(); // hh:mm
    const endTime = document.getElementById('end-time').value.trim(); // hh:mm
    const intensity = document.getElementById('intensity').value.trim();
    const note = document.getElementById('note').value.trim();

    // For each property, if the entry inputted is empty, don't save value
    return {
      __id: this.entryData.__id,
      workoutType: workoutType || this.entryData.workoutType,
      location: locationName || this.entryData.location,
      startTime: startTime
        ? new Date(`${exercisedate} ${startTime}`).toJSON()
        : this.entryData.startTime,
      endTime: endTime
        ? new Date(`${exercisedate} ${endTime}`).toJSON()
        : this.entryData.endTime,
      intensity: this.allowCorrectIntensity(
        this.entryData.intensity,
        intensity
      ),
      note: note || this.entryData.note,
    };
  }

  /**
   * Checks if a number is a number from 1 to 5. If it is, the new value returned
   * else the original intensity is returned
   * @param {number} intensity - original intensity value
   * @param {string} newValue - new intensity value
   */
  allowCorrectIntensity(intensity, newValue) {
    return !isNaN(newValue) && 1 <= +newValue && +newValue <= 5
      ? +newValue
      : intensity;
  }

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
                id="workout-name"
                placeholder="Enter Workout"
                value="${this.entryData?.workoutType}"
              />
            </div>
            <div class = "main_flexbox_child">
              <h3 id = "location_heading">Location</h3>
              <input
                type="text"
                id="location-name"
                placeholder="Enter location"
                value="${this.entryData?.location}"
              />
            </div>
            <div id = "time_flexbox" class = "main_flexbox_child">
              <div>
                <h3 class = "time_title">Exercise Date</h3>
                <input
                  class = "time_input"
                  type="date"
                  id="exercise-date"
                  value="${this.formatDate(this.entryData?.startTime)}"
                />
              </div>
              <div>
                <h3 class = "time_title">Start Time</h3>
                <input
                  class = "time_input"
                  type="time"
                  id="start-time"
                  value="${this.formatTime(this.entryData?.startTime)}"
                />
              </div>
              <div>
                <h3 class = "time_title">End Time</h3>
                <input
                  class = "time_input"
                  type="time"
                  id="end-time"
                  value="${this.entryData?.endTime}"
                />
              </div>
            </div>
            <div class = "main_flexbox_child">
              <h3 id = "intensity_title">Intensity (1 to 5)</h3>
              <input
                type="number"
                id = "intensity"
                min="1"
                max="5"
                value="${this.entryData?.intensity}"
              />
            </div>
            <div class = "main_flexbox_child">
              <h3 id = "note_title">Note</h3>
              <textarea id="note"></textarea>
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
      const cancelInputEntry = new Event('cancelInputEntry');
      cancelInputEntry.data = this.entryData;
      this.dispatchEvent(cancelInputEntry);
    });

    this.querySelector('#save-button').addEventListener('click', () => {
      // grab all data
      const newEntry = this.collectInputData();
      const saveEntry = new Event('saveEntry');
      saveEntry.data = newEntry;
      this.dispatchEvent(saveEntry);
    });
  }
}

customElements.define('input-entry-page', InputEntry);
