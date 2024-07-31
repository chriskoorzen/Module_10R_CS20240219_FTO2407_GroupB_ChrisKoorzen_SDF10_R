"use strict";

const inputFieldEl = document.getElementById("input-field");
const addButtonEl = document.getElementById("add-button");
const inputList = document.getElementById("inputList");

function addToInputList(text){
    // Add text to "Shopping List" display
    
    let listItem = document.createElement("p");
    listItem.classList.add("list-item");
    listItem.textContent = text;
    inputList.appendChild(listItem);
}

addButtonEl.addEventListener("click", function() {
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
});