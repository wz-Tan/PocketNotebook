// Map Data Onto Entry List
const entryList = document.getElementById("entry-list")

const dataset = [
    {"Entry 1":"Description"},
    {"Entry 2":"Description"}
]

function MapData(dataset){
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

// Adding New Entry
const addButton = document.getElementById("addButton")
addButton.addEventListener("click",()=>{
    // Creating the Input Fields Once Clicked
    const entryInput = document.getElementById("entry-input")

    entryInput.innerHTML=`
        <input class="input-title" type="text" placeholder="Enter Title"/>
        <!-- Description with Tick -->
        <div class="flex between">
            <input class="input-description" type="text" placeholder="Enter Description"/>
            <p id="tick-confirm-entry">/</p>
        </div>
    `
})