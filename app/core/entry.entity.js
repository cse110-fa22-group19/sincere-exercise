
  /**
   * Populate the entry page with a defalut-value entry
   */
   function createEntry() {

    let retrieveStorage = getEntry();           // Retrieve the array format of local storage entries
    let storageLength=retrieveStorage.length;   // Get the length of the total number of entries
    if (storageLength==0){                      // If the local storage is empty
        let uniqueIndex = 0;                    // Set the unique index to 0
    }else{                                      // If the local Storage is not empty
        let uniqueIndex = retrieveStorage[storageLength-1]+1;   // Set the unique index to the last index increment by 1
    }
   
    let newEntry = {
        [uniqueIndex]: {
            "workoutType": "workoutType",
            "location": "location",
            "startTime": new Date(Date.parse("2012-04-30T02:15:12.356Z")),
            "endTime": new Date(Date.parse("2012-04-30T02:15:12.356Z")),
            "intensity": -1,
            "note": "note"
        }
    }                                             // Create the dummy value for new entry

    retrieveStorage.push(newEntry);               // Push the dummy value into the original array retrieved from local storage
    localStorage.setItem('Entry', JSON.stringify(retrieveStorage)); // Set the array with new entry into the local storage 
  }

  /**
   * Retrive the entry from localStorage
   */
  function getEntry() {
    if (localStorage.getItem('Entry')===null) {     // If there are no Entries in localStorage
      return [];                                    // Return empty array
    } else {                                        // If the local storage is not empty
      return JSON.parse(localStorage.getItem('Entry')); // return the Entries
    }
    
  }

  /**
   * Delete the entry component with the key of the index
   * @param {integer} index - The unique key for the entry component in the localStorage
   */
  function deleteEntry(index){
    let Entry = getEntry();                     // Get the Entries from localStorage
    for (let i = 0 ; i < Entry.length; i++){    // Loop through the Entries to find the entry we wnat to delete
        if (Entry[i]==index){                   // If it is the Entry we want to delete
            localStorage.removeItem(Entry[i])   // We remove it from localStorage
        }
    }
    
  }