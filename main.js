const entryList = document.getElementById("entry-list")

const dataPoint = [
    {"Entry 1":"Description"},
    {"Entry 2":"Description"}
]

dataPoint.map((data)=>{
    const newEntry = document.createElement("div")
    newEntry.className= "entry flex flex-col"
    
    const [key, value] = Object.entries(data)[0]

    const keyElement = document.createElement("h2")
    keyElement.innerText = key

    const valueElement = document.createElement("p")
    valueElement.innerText = value

    console.log("Key element is", keyElement)
    console.log("Value element is", valueElement)

    newEntry.appendChild(keyElement)
    newEntry.appendChild(valueElement)

    entryList.appendChild(newEntry)
})


const addButton = document.getElementById("new-entry")
addButton.addEventListener("click",()=>{
    console.log("Add Button Has Been Clicked")
})