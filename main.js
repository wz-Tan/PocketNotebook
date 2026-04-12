// Map Data Onto Entry List
const entryList = document.getElementById("entry-list")

// Structure: ID : {key:value}
const dataset = [
    { 1 : {"Entry 1":"Description"}},
    { 2 : {"Entry 2":"Description"}}
]

function MapData(dataset){
    // Clear Out The List Before Adding In
    entryList.innerHTML=``

    // Use ID To Assign Each Input Field and Their Action Buttons
    dataset.map((data)=>{
        const currentID = Object.entries(data)[0][0]
        const currentPair = Object.entries(data)[0][1]
        
        
        const [key, value] = Object.entries(currentPair)[0]

        // Create New Div for Each Data 
        const newEntry = document.createElement("div")
        newEntry.className= "entry flex flex-col"
        newEntry.id=currentID

        // As Input
        newEntry.innerHTML=`
        <p id="warning-title-"${currentID}" class="warning">Title is Empty!</p>
        <p id="warning-description-"${currentID}" class="warning">Description is Empty!</p>
        <input id="input-title-${currentID}" class="input-title" type="text" placeholder="Enter Title" value="${key}"/>

        <!-- Description with Tick -->

        <div class="flex">
            <input id="input-description-${currentID}" class="input-description" type="text" placeholder="Enter Description" value="${value}"/>
            <p id="tick-confirm-entry-${currentID}" class="tick-confirm-entry">/</p>
            <p id="cross-cancel-entry-${currentID}" class="cross-cancel-entry">X</p>
        </div>`

        entryList.appendChild(newEntry)

        // Set Up Logic
        focusListenerForWarning(currentID)

        // Editing Logic Here (These Already Exist - Merely for Editing)
        const confirmButton = document.getElementById(`tick-confirm-entry-${currentID}`)
        
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
            <p id="tick-confirm-entry-${entryID}" class="tick-confirm-entry">/</p>
            <p id="cross-cancel-entry-${entryID}" class="cross-cancel-entry">X</p>
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
            dataset.push({[entryID]: {[entryTitle]: entryDescription}})
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

    warningDescription.style.display="none"
    warningTitle.style.display="none"
}