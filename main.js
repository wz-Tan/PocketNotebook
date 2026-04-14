import storage from "./storage.js";

// Structure: {id, title, description}
let dataset = [
    { id: 1, title: "Entry 1", description: "Description" },
    { id: 2, title: "Entry 2", description: "Description" },
];

// Currently Focused Element (Eliminate Others Who Are Not Focused)
let currentFocus = undefined;
let currentTitle = "";
let currentDescription = "";
let newEntryID = null;

storage.saveItem(1000, "Custom Title", "Custom Description")
storage.getAllData()

function MapData(provided_dataset) {
    const entryList = document.getElementById("entry-list");

    // Clear Out The List Before Adding In
    entryList.innerHTML = ``;

    // Use ID To Assign Each Input Field and Their Action Buttons
    provided_dataset.map((data, index) => {
        const currentID = data.id;
        const key = data.title;
        const value = data.description;

        // Create New Div for Each Data
        const entry = document.createElement("div");
        entry.className = "entry flex flex-col";
        entry.id = currentID;

        // As Input
        entry.innerHTML = `
        <p id="warning-title-"${currentID}" class="warning">Title is Empty!</p>
        <p id="warning-description-"${currentID}" class="warning">Description is Empty!</p>
        
        <!-- Entry Title with Garbage Icon -->
        <div class="title-header-row flex">
            <input id="input-title-${currentID}" class="input-title" type="text" placeholder="Enter Title" value="${key}"/>
            <p id="trash-delete-entry-${currentID}" class="action-button-shown">Delete</p>
        </div>

        <!-- Description with Tick -->

        <div class="flex">
            <input id="input-description-${currentID}" class="input-description" type="text" placeholder="Enter Description" value="${value}"/>
            <p id="tick-confirm-entry-${currentID}" class="action-button-hidden">/</p>
            <p id="cross-cancel-entry-${currentID}" class="action-button-hidden">X</p>
        </div>`;

        entryList.appendChild(entry);

        // Set Up UI Logic
        // Hide Warning, Show Action Button Once Focused
        handleInputFocused(currentID);

        // Delete Button (Filters out Item Index)
        const deleteButton = document.getElementById(
            `trash-delete-entry-${currentID}`,
        );

        deleteButton.addEventListener("click", () => {
            dataset = provided_dataset.filter((item) => item.id !== currentID);
            MapData(dataset);
            currentFocus = undefined
        });

        // Editing Logic
        // Cancel Edit
        const cancelButton = document.getElementById(`cross-cancel-entry-${currentID}`)
        cancelButton.addEventListener("click", () => {
            resetPreviousEditTarget(currentID)
        })

        // Confirm Edit
        const confirmButton = document.getElementById(`tick-confirm-entry-${currentID}`)

        confirmButton.addEventListener("click", () => {
            const newTitle = document.getElementById(`input-title-${currentID}`).value
            const newDescription = document.getElementById(`input-description-${currentID}`).value

            // Both Not Empty (Edit Valid) - Or Else We Just Ignore Really
            if (verifyNewEntry(currentID, newTitle, newDescription)) {
                dataset[index] = { id: currentID, title: newTitle, description: newDescription }

                // Reset And Remap
                resetPreviousEditTarget(currentID)
                MapData(dataset)

                // On Succesful Save, We Reset The Cycle
                currentFocus = undefined
            }
        })

    });
}

MapData(dataset);

// Adding New Entry (Spawn Input Boxes and OK and Cancel)
const addButton = document.getElementById("addButton");

addButton.addEventListener("click", () => {
    // Unique ID
    const entryID = Date.now() + Math.random();
    newEntryID = entryID;

    // Reset the Text, Buttons, Warnings on A Prior Edit (If Any)
    if (currentFocus !== undefined && currentFocus !== entryID) {
        resetPreviousEditTarget(currentFocus)
    }

    currentFocus = entryID
    currentTitle = null
    currentDescription = null

    // Remove Add New Entry Button
    addButton.style.display = "none";

    // Creating the Input Fields Once Clicked
    const entryInput = document.getElementById("entry-input");

    // Add Input Fields and Warning
    entryInput.innerHTML = `
        <!-- Warning -->
        <p id="warning-title-${entryID}" class="warning">Title is Empty!</p>
        <p id="warning-description-${entryID}" class="warning">Description is Empty!</p>

        <input id="input-title-${entryID}" class="input-title" type="text" placeholder="Enter Title"/>

        <!-- Description with Tick -->

        <div class="flex">
            <input id="input-description-${entryID}" class="input-description" type="text" placeholder="Enter Description"/>
            <p id="tick-confirm-entry-${entryID}" class="action-button-shown">/</p>
            <p id="cross-cancel-entry-${entryID}" class="action-button-shown">X</p>
        </div>
    `;

    handleInputFocused(entryID);

    // User Adds Entry
    const confirmButton = document.getElementById(
        `tick-confirm-entry-${entryID}`,
    );
    confirmButton.addEventListener("click", () => {
        // Acquire Field Input
        const entryTitle = document.getElementById(`input-title-${entryID}`).value;
        const entryDescription = document.getElementById(
            `input-description-${entryID}`,
        ).value;

        // Valid Entry
        if (verifyNewEntry(entryID, entryTitle, entryDescription)) {

            // Push Info In Based on Entry ID
            dataset.push({
                id: entryID,
                title: entryTitle,
                description: entryDescription,
            });

            MapData(dataset);

            resetAddEntry(entryID);
            currentFocus = undefined;
        }
    });

    // User Cancels Entry
    const cancelButton = document.getElementById(`cross-cancel-entry-${entryID}`);
    cancelButton.addEventListener("click", () => {
        resetAddEntry(entryID);
    });
});

// Hides Warning, Shows Tick and Cross for Editing
function handleInputFocused(id) {

    // Input Field Focus Events Cancel Out Warning
    const titleField = document.getElementById(`input-title-${id}`);
    const descriptionField = document.getElementById(`input-description-${id}`);

    // Reset Warning, And Show Confirm and Cancel on Focus
    titleField.addEventListener("focus", () => {

        // On New Target
        if (currentFocus !== id) {
            // If There Was A Target Before This, Reset It
            if (!isNaN(currentFocus)) {
                resetPreviousEditTarget(currentFocus)
            }

            // Initialise Values
            currentTitle = titleField.value
            currentDescription = descriptionField.value
        }

        // Reset Own Warning, Show Own Action Buttons
        resetWarning(id);
        showActionButtons(id);

        // Set Focused Element
        currentFocus = id;
    });

    descriptionField.addEventListener("focus", () => {

        // On New Target
        if (currentFocus !== id) {
            // If There Was A Target Before This, Reset It
            if (!isNaN(currentFocus)) {
                resetPreviousEditTarget(currentFocus)
            }

            // Initialise Values
            currentTitle = titleField.value
            currentDescription = descriptionField.value
        }

        // Reset Own Warning, Show Own Action Buttons
        resetWarning(id);
        showActionButtons(id);

        // Set Focused Element
        currentFocus = id;
    });
}

// Check if Entry is Valid, If Not Throw Errors
function verifyNewEntry(id, title, description) {
    // Trim Variables
    title = title.trim();
    description = description.trim();

    // Early Exit (Both Not Empty)
    if (title && description) {
        return true;
    }

    const warningTitle = document.getElementById(`warning-title-${id}`);
    const warningDescription = document.getElementById(
        `warning-description-${id}`,
    );

    if (!title) {
        warningTitle.style.display = "block";
    }

    if (!description) {
        warningDescription.style.display = "block";
    }

    return false;
}

// After Adding Entry or Cancel New Entry
function resetAddEntry(id) {
    // Definitely Reset Warning on Click
    resetWarning(id);

    const entryInput = document.getElementById("entry-input");

    // Reset Input Fields
    entryInput.innerHTML = ``;

    // Show Add New Entry Button Again
    addButton.style.display = "block";
}

// Input Warning Resets
function resetWarning(id) {
    const warningTitle = document.getElementById(`warning-title-${id}`);
    const warningDescription = document.getElementById(
        `warning-description-${id}`,
    );

    // Only Tweak When It's Available
    if (warningTitle) {
        warningTitle.style.display = "none";
    }

    if (warningDescription) {
        warningDescription.style.display = "none";
    }
}

// On Edits
function showActionButtons(id) {
    const confirmButton = document.getElementById(`tick-confirm-entry-${id}`);
    const cancelButton = document.getElementById(`cross-cancel-entry-${id}`);

    if (confirmButton) {
        confirmButton.style.visibility = "visible";
    }

    if (cancelButton) {
        cancelButton.style.visibility = "visible";
    }
}

// Reset The Previously Focused Item (Action Bar and Errors) - Reset Description and Title unless its a new Entry
function resetPreviousEditTarget(id) {

    const confirmButton = document.getElementById(`tick-confirm-entry-${id}`);
    const cancelButton = document.getElementById(`cross-cancel-entry-${id}`);

    // If the previous focus is newEntry We Dont Have To Revert
    if (newEntryID !== id) {
        const titleEntry = document.getElementById(`input-title-${id}`)
        const descriptionEntry = document.getElementById(`input-description-${id}`)

        if (currentTitle) {
            titleEntry.value = currentTitle
        }

        if (currentDescription) {
            descriptionEntry.value = currentDescription
        }

    }


    if (confirmButton) {
        confirmButton.style.visibility = "hidden";
    }

    if (cancelButton) {
        cancelButton.style.visibility = "hidden";
    }

    resetWarning(id)
}