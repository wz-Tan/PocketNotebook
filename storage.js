// CRUD Operations 

// For Saving and For Updating
async function saveItem(id, entryTitle, entryDescription) {
    try {
        const dataPair = { title: entryTitle, description: entryDescription }
        await chrome.storage.local.set({ [id]: dataPair })
    }
    catch (error) {
        console.log("Error saving item", error)
    }
}

// Getting Data
async function getAllData() {
    try {
        const allData = await chrome.storage.local.get(null);
        // Flatten Data for Mapping
        const processedData = Object.entries(allData).map(([id, { title, description }]) => {
            return { id, title, description }
        })

        return processedData.reverse()
    }
    catch (error) {
        console.log("Error retrieving data", data)
        return null
    }
}

// Deleting Data
async function removeItem(id) {
    // Convert to String As Key
    id = String(id)

    try {
        await chrome.storage.local.remove([id]);
    }
    catch (error) {
        console.log("Error removing item", error)
    }

}

const storage = { saveItem, getAllData, removeItem }
export default storage