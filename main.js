// Map Data Onto Entry List
const entryList = document.getElementById("entry-list")

const dataset = [
    {"Entry 1":"Description"},
    {"Entry 2":"Description"}
]

function MapData(dataset){
    // Clear Out The List Before Adding In
    entryList.innerHTML=``

    dataset.map((data)=>{
    const newEntry = document.createElement("div")
    newEntry.className= "entry flex flex-col"
    
    const [key, value] = Object.entries(data)[0]

    const keyElement = document.createElement("h3")
    keyElement.innerText = key

    const valueElement = document.createElement("p")
    valueElement.innerText = value

    newEntry.appendChild(keyElement)
    newEntry.appendChild(valueElement)

    entryList.appendChild(newEntry)
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
            <p id="tick-confirm-entry">/</p>
            <p id="cross-cancel-entry">X</p>
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
            dataset.push({[entryTitle]: entryDescription})
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