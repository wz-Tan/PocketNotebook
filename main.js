// Map Data Onto Entry List
const entryList = document.getElementById("entry-list")

// Structure: {id, title, description}
let dataset = [
    { id: 1, title: "Entry 1", description:"Description"},
    { id: 2, title: "Entry 2", description:"Description"}
]

function MapData(dataset){
    // Clear Out The List Before Adding In
    entryList.innerHTML=``

    // Use ID To Assign Each Input Field and Their Action Buttons
    dataset.map((data)=>{
        const currentID = data.id
        const key = data.title
        const value = data.description

        // Create New Div for Each Data 
        const entry = document.createElement("div")
        entry.className= "entry flex flex-col"
        entry.id=currentID

        // As Input
        entry.innerHTML=`
        <p id="warning-title-"${currentID}" class="warning">Title is Empty!</p>
        <p id="warning-description-"${currentID}" class="warning">Description is Empty!</p>
        
        <!-- Entry Title with Garbage Icon -->
        <div class="title-header-row flex">
            <input id="input-title-${currentID}" class="input-title" type="text" placeholder="Enter Title" value="${key}"/>
            <p id="trash-delete-entry-${currentID}" class="action-button">Trash</p>
        </div>

        <!-- Description with Tick -->

        <div class="flex">
            <input id="input-description-${currentID}" class="input-description" type="text" placeholder="Enter Description" value="${value}"/>
            <p id="tick-confirm-entry-${currentID}" class="action-button">/</p>
            <p id="cross-cancel-entry-${currentID}" class="action-button">X</p>
        </div>`

        entryList.appendChild(entry)

        // Set Up Logic
        focusListenerForWarning(currentID)

        // Editing Logic Here (These Already Exist - Merely for Editing)
        const confirmButton = document.getElementById(`tick-confirm-entry-${currentID}`)

        // Delete Button (Filters out Item Index)
        const deleteButton = document.getElementById(`trash-delete-entry-${currentID}`)
        deleteButton.addEventListener("click",()=>{
            dataset = dataset.filter(item => item.id !== currentID)
            MapData(dataset)
        })
    })
}

MapData(dataset)

// Adding New Entry (Spawn Input Boxes and OK and Cancel)
const addButton = document.getElementById("addButton")

addButton.addEventListener("click",()=>{

    // Assign ID 0 for New Entry (TODO: Generate a Unique One Instead)
    const entryID = 0;

    // Remove Add New Entry Button 
    addButton.style.display="none"

    // Creating the Input Fields Once Clicked
    const entryInput = document.getElementById("entry-input")

    // Add Input Fields and Warning
    entryInput.innerHTML=`
        <!-- Warning -->
        <p id="warning-title-${entryID}" class="warning">Title is Empty!</p>
        <p id="warning-description-${entryID}" class="warning">Description is Empty!</p>

        <input id="input-title-${entryID}" class="input-title" type="text" placeholder="Enter Title"/>

        <!-- Description with Tick -->

        <div class="flex">
            <input id="input-description-${entryID}" class="input-description" type="text" placeholder="Enter Description"/>
            <p id="tick-confirm-entry-${entryID}" class="action-button">/</p>
            <p id="cross-cancel-entry-${entryID}" class="action-button">X</p>
        </div>
    `

    focusListenerForWarning(entryID)

    // User Adds Entry
    const confirmButton = document.getElementById(`tick-confirm-entry-${entryID}`)
    confirmButton.addEventListener("click",()=>{
        // Acquire Field Input
        const entryTitle = document.getElementById(`input-title-${entryID}`).value
        const entryDescription = document.getElementById(`input-description-${entryID}`).value

        // Valid Entry
        if (verifyNewEntry(entryID, entryTitle, entryDescription)){            
            // Push Info In Based on Entry ID
            dataset.push({id: entryID, title: entryTitle, description: entryDescription})
            MapData(dataset)

            resetAddEntry(entryID)
        }
    })

    // User Cancels Entry
    const cancelButton = document.getElementById(`cross-cancel-entry-${entryID}`)
    cancelButton.addEventListener("click",()=>{
        resetAddEntry(entryID)
    })
})

// Handles Focusing and Warning Logic
function focusListenerForWarning(id){

    // Input Field Focus Events Cancel Out Warning
    const titleField = document.getElementById(`input-title-${id}`)
    const descriptionField = document.getElementById(`input-description-${id}`)

    titleField.addEventListener("focus", ()=>{resetWarning(id)})
    descriptionField.addEventListener("focus", ()=>{resetWarning(id)})
}

// Check if Entry is Valid, If Not Throw Errors
function verifyNewEntry(id, title, description){
    // Trim Variables
    title = title.trim()
    description = description.trim()

    // Early Exit (Both Not Empty)
    if (title && description){
        return true
    }

    const warningTitle = document.getElementById(`warning-title-${id}`)
    const warningDescription = document.getElementById(`warning-description-${id}`)

    if (!title){
        warningTitle.style.display="block"
    }

    if (!description){
        warningDescription.style.display="block"
    }

    return false
}

// After Adding Entry or Cancel New Entry
function resetAddEntry(id){
    // Definitely Reset Warning on Click
    resetWarning(id)

    const entryInput = document.getElementById("entry-input")

    // Reset Input Fields
    entryInput.innerHTML=``

    // Show Add New Entry Button Again
    addButton.style.display="block"
}

// Input Warning Resets
function resetWarning(id){
    const warningTitle = document.getElementById(`warning-title-${id}`)
    const warningDescription = document.getElementById(`warning-description-${id}`)

    // Only Tweak When It's Available
    if (warningTitle){
        warningTitle.style.display="none"
    }

    if (warningDescription){
        warningDescription.style.display="none"
    }
}