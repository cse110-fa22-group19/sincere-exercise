import { dateHelper } from '../date-helper.js';

class ViewEntry extends HTMLElement {
  constructor() {
    super();
  }

  entryData = {};

  connectedCallback() {
    // Switch view mode to input mode
    this.entryData = JSON.parse(this.getAttribute('data'));

    this.innerHTML = `
    <head>
        <meta charset="UTF-8" />
        <title>View Mode</title>
        <link rel="stylesheet" href="./app/main/view-entry/view-entry.css" />
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
            <h2 id="back-button"><</h2>
            <h2 id="title">View Entry</h2>
            <img src="assets/edit-entry-icon.svg" alt="Edit Mode" id="edit-button">
          </div>
          <div class = "main_flexbox_child">
            <h3>Workout Type</h3>
            <h4 id = "workout_value" class = "entry_data">${
              this.entryData?.workoutType
            }</h4>
          </div>
          <div class = "main_flexbox_child">
            <h3 id = "location_heading">Location</h3>
            <h4 id = "location_value" class = "entry_data">${
              this.entryData?.location
            }</h4>
          </div>
          <div id = "time_flexbox" class = "main_flexbox_child">
            <div>
              <h3 class = "time_title">Exercise Date</h3>
              <h4 id = "dates_value" class = "time_flexbox_value entry_data">${dateHelper.formatDate(
                this.entryData?.startTime
              )}</h4>
            </div>
              <div>
                <h3 class = "time_title">Start Time</h3>
                <h4 id="start_time" class = "time_flexbox_value entry_data">${dateHelper.formatTime(
                  this.entryData?.startTime
                )}</h4>
              </div>
              <div>
                <h3 class = "time_title">End Time</h3>
                <h4 id="end_time" class = "time_flexbox_value entry_data">${dateHelper.formatTime(
                  this.entryData?.endTime
                )}</h4>
              </div>
            </div>
            <div class = "main_flexbox_child">
              <h3 id = "intensity_title">Intensity (1 to 5)</h3>
              <h4 id="intensity_value" class = "entry_data">${
                this.entryData?.intensity
              } </h4>
            </div>
            <div class = "main_flexbox_child">
              <h3 id = "note_title">Note</h3>
              <h4 id="note_value" class = "entry_data">${
                this.entryData?.note
              }</h4>
            </div>
          </div>
        </main>
      </body>
    `;

    const viewEntryPageLoaded = new Event('viewEntryPageLoaded');
    window.dispatchEvent(viewEntryPageLoaded);

    this.querySelector('#edit-button').addEventListener('click', () => {
      const editEntry = new Event('editEntry');
      editEntry.data = this.entryData;
      this.dispatchEvent(editEntry);
    });

    this.querySelector('#back-button').addEventListener('click', () => {
      console.log('clicked');
      const backHome = new Event('backHome');
      this.dispatchEvent(backHome);
    });
  }
}

customElements.define('view-entry-page', ViewEntry);
