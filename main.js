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
        <input id="input-title-${currentID}" class="input-title" type="text" placeholder="Enter Title" value="${key}"/>

        <!-- Description with Tick -->

        <div class="flex">
            <input id="input-description-${currentID}" class="input-description" type="text" placeholder="Enter Description" value="${value}"/>
            <p id="tick-confirm-entry-${currentID}" class="tick-confirm-entry">/</p>
            <p id="cross-cancel-entry-${currentID}" class="cross-cancel-entry">X</p>
        </div>`

        entryList.appendChild(newEntry)

        // Set Up Event Listeners For Every Input Field (The Only Input Field Without ID is New Entry)
    })
}

MapData(dataset)

// Adding New Entry (Spawn Input Boxes and OK and Cancel)
const addButton = document.getElementById("addButton")
addButton.addEventListener("click",()=>{

    // Remove Add New Entry Button 
    addButton.style.display="none"

    // Creating the Input Fields Once Clicked
    const entryInput = document.getElementById("entry-input")

    // Add Input Fields and Warning
    entryInput.innerHTML=`
        <!-- Warning -->
        <p id="warning-title" class="warning">Title is Empty!</p>
        <p id="warning-description" class="warning">Description is Empty!</p>

        <input id="input-title" class="input-title" type="text" placeholder="Enter Title"/>

        <!-- Description with Tick -->

        <div class="flex">
            <input id="input-description" class="input-description" type="text" placeholder="Enter Description"/>
            <p id="tick-confirm-entry" class="tick-confirm-entry">/</p>
            <p id="cross-cancel-entry" class="cross-cancel-entry">X</p>
        </div>
    `

    // Input Field Focus Events Cancel Out Warning
    const titleField = document.getElementById("input-title")
    const descriptionField = document.getElementById("input-description")

    titleField.addEventListener("focus", resetWarning)
    descriptionField.addEventListener("focus", resetWarning)


    // User Adds Entry
    const confirmButton = document.getElementById("tick-confirm-entry")
    confirmButton.addEventListener("click",()=>{
        // Acquire Field Input
        const entryTitle = document.getElementById("input-title").value
        const entryDescription = document.getElementById("input-description").value

        // Make Sure Not Empty
        if (verifyNewEntry(entryTitle, entryDescription)){            
            // Push Info In
            dataset.push({ 8: {[entryTitle]: entryDescription}})
            MapData(dataset)

            reset()
        }
    })

    // User Cancels Entry
    const cancelButton = document.getElementById("cross-cancel-entry")
    cancelButton.addEventListener("click",()=>{
        reset()
    })
})

// Check if Entry is Valid, If Not Throw Errors
function verifyNewEntry(title, description){
    // Trim Variables
    title = title.trim()
    description = description.trim()

    // Early Exit (Both Not Empty)
    if (title && description){
        return true
    }

    const warningTitle = document.getElementById("warning-title")
    const warningDescription = document.getElementById("warning-description")

    if (!title){
        warningTitle.style.display="block"
    }

    if (!description){
        warningDescription.style.display="block"
    }

    return false
}

// After Adding Entry or Cancel New Entry
function reset(){
    // Definitely Reset Warning on Click
    resetWarning()

    const entryInput = document.getElementById("entry-input")

    // Reset Input Fields
    entryInput.innerHTML=``

    // Show Add New Entry Button Again
    addButton.style.display="block"
}

// Input Warning Resets
function resetWarning(){
    const warningTitle = document.getElementById("warning-title")
    const warningDescription = document.getElementById("warning-description")

    warningDescription.style.display="none"
    warningTitle.style.display="none"
}