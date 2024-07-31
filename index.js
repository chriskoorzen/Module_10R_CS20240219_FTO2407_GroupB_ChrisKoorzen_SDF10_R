/*
Challenge:
Make it so that when you click the 'Add to cart' button, whatever is written in the input field should be console logged.
*/

const inputFieldEl = document.getElementById("input-field");
const addButtonEl = document.getElementById("add-button");

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value;
    
    // -- Edge Cases --
    // String is white space only, or has redundant white space.
    inputValue = inputValue.trim();

    // Finally, if empty or null string, do nothing.
    if (inputValue === "" || inputValue === null){ return; }

    // -- end of edge case handling --


    console.log(inputValue);
});