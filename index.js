"use strict";
import { firebaseConfig } from "./secrets.js";  // avoid exposing api keys on public repo
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { 
    getDatabase,
    ref,
    push,
    onValue,
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
function selectItem() {
    // Special event function for "list-item" elements
    // Toggles the "selected" class
    this.classList.toggle("selected");
}

function addToInputList(text){
    // Add text to "Shopping List" display
    
    let listItem = document.createElement("p");
    listItem.classList.add("list-item");
    listItem.textContent = text;
    listItem.addEventListener("click", selectItem);

    inputList.appendChild(listItem);
}

function clearSelected(){
    // Remove elements with the "selected" class
    let unwanted = Array.from(document.getElementsByClassName("selected"));

    for (let node of unwanted) { 
        node.remove();
    }
}

function clearInputList(){
    // Clear all items in "Shopping List" display
    inputList.innerHTML = "";
}

function handleUserInput() {
    let inputValue = inputFieldEl.value;
    inputFieldEl.value = null;  // reset input field
    
    // -- Edge Cases --
    // String is white space only, or has redundant white space.
    inputValue = inputValue.trim();

    // Finally, if empty or null string, do nothing.
    if (inputValue === "" || inputValue === null){ return; }

    // -- end of edge case handling --


    console.log(inputValue);

    addToInputList(inputValue);
}


// ----- Hook up functionality -----
addButtonEl.addEventListener("click", handleUserInput);
inputFieldEl.addEventListener("keypress", function(event){
    if (event.key === "Enter"){ handleUserInput(); }
});
clearAllButton.addEventListener("click", clearInputList);
clearSelectedButton.addEventListener("click", clearSelected);
