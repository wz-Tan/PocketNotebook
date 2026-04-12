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

    entryInput.innerHTML=`
        <input id="input-title" class="input-title" type="text" placeholder="Enter Title"/>
        <!-- Description with Tick -->
        <div class="flex">
            <input id="input-description" class="input-description" type="text" placeholder="Enter Description"/>
            <p id="tick-confirm-entry">/</p>
            <p id="cross-cancel-entry">X</p>
        </div>
    `

    // User Adds Entry
    const confirmButton = document.getElementById("tick-confirm-entry")
    confirmButton.addEventListener("click",()=>{
        // Acquire Field Input
        const entryTitle = document.getElementById("input-title").value
        const entryDescription = document.getElementById("input-description").value

        // Make Sure Not Empty
        if (verifyNewEntry(entryTitle, entryDescription)){
            console.log("Entry Title is", entryTitle)
            
            // Push Info In
            dataset.push({[entryTitle]: entryDescription})
            MapData(dataset)
            entryInput.innerHTML=``

            // Add Back Button
            addButton.style.display="block"
        }

        else{
            console.log('Invalid entry')
        }
    })

    // User Cancels Entry
    const cancelButton = document.getElementById("cross-cancel-entry")
    cancelButton.addEventListener("click",()=>{
        // Reset Input Fields
        entryInput.innerHTML=``

        // Show Add New Entry Button Again
        addButton.style.display="block"
    })
})

function verifyNewEntry(title, description){
    if (!title){
        console.log("Title is empty!")
        return false
    }

    if (!description){
        console.log("Description is empty!")
        return false
    }

    // All Checks Pass
    return true
}