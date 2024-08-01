"use strict";
import { firebaseConfig } from "./secrets.js";  // avoid exposing api keys on public repo
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { 
    getDatabase,
    ref,
    push,
    update,
    set,
    get
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-database.js";


// ----- Initialize Firebase & Database -----
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const dataLocation = ref(database, "shopList/");


// ----- Get references to working parts -----
const inputFieldEl = document.getElementById("input-field");
const addButtonEl = document.getElementById("add-button");
const clearAllButton = document.getElementById("clearall-button");
const clearSelectedButton = document.getElementById("clearselect-button");
const inputList = document.getElementById("input-list");


// ----- Declare Functionality -----
function selectItem(){
    // Special event function for "list-item" elements
    // Toggles the "selected" class
    this.classList.toggle("selected");
}

function addToInputList(text, UUID){
    // Add text to "Shopping List" display
    
    let listItem = document.createElement("p");
    listItem.classList.add("list-item");
    listItem.setAttribute("data-uuid", UUID);
    listItem.textContent = text;
    listItem.addEventListener("click", selectItem);

    inputList.appendChild(listItem);
}

function clearSelected(){
    // Remove elements with the "selected" class
    let unwanted = Array.from(document.getElementsByClassName("selected"));
    let batch = {};

    for (let node of unwanted) {
        batch[node.getAttribute("data-uuid")] = null;
    }
    
    // Do batch delete operation
    update(dataLocation, batch).then(
        () => { 
            for (let node of unwanted) { node.remove(); }
        }
    ).catch(
        (error) => {
            window.alert("Failed to remove data from server. Check console log.");
            console.log("Failed to remove Data", error);
        }
    );
}

function clearInputList(){
    // Clear all items in "Shopping List" display
    set(dataLocation, null).then(
        () => { inputList.innerHTML = ""; }
    ).catch(
        (error) => {
            window.alert("Failed to remove data from server. Check console log.");
            console.log("Failed to remove Data", error);
        }
    );
}
    
function handleUserInput(){
    let inputValue = inputFieldEl.value;
    
    // -- Edge Cases --
    // String is white space only, or has redundant white space.
    inputValue = inputValue.trim();

    // Finally, if empty or null string, do nothing.
    if (inputValue === "" || inputValue === null){ return; }

    // -- end of edge case handling --


    // Add to server DB
    push(dataLocation, inputValue).then(
        (value) => {
            console.log("Success", inputValue);     // Keep for legacy "Challenge: console.log user input"
            inputFieldEl.value = null;              // reset input field
            addToInputList(inputValue, value.key);  // Create UI display of item with UUID
        }
    ).catch(
        (error) => {
            window.alert("Failed to add data to server. Check console log.");
            console.log("Failed to add Data", error);
        }
    );
}

function loadServerData(){
    // Get Data from server

    // Set helpful message
    let loadMessage = document.createElement("p");
    loadMessage.textContent = "Loading data . . .";
    inputList.appendChild(loadMessage);
    
    // Retrieve from server
    get(dataLocation).then(
        (snapshot) => {
            const data = snapshot.val();
            for (let key in data){ addToInputList(data[key], key); }

        }).catch(
            (error) => {
                window.alert("Failed to retrieve data from server. Check console log.");
                console.log("Failed to get Data", error);
            }
        ).finally(
            // Always remove loadMessage
            () => { loadMessage.remove(); }
    );
}


// ----- Hook up functionality -----
addButtonEl.addEventListener("click", handleUserInput);
inputFieldEl.addEventListener("keypress", function(event){
    if (event.key === "Enter"){ handleUserInput(); }
});
clearAllButton.addEventListener("click", clearInputList);
clearSelectedButton.addEventListener("click", clearSelected);


// ----- Init program -----
loadServerData();
