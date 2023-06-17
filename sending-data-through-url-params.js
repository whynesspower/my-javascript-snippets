// ----------------------------------------------------------
// IN SOURCE PAGE 
const a = 25;

// Construct the URL with the query parameter
const url = `www.example.com/join?a=${a}`;

<button onclick={()=>{window.location.hred=url}}> Click here to react Destination page
<button>



// ----------------------------------------------------------
// IN DESTINATION PAGE
// Access the data in the destination page- 

const urlParams = new URLSearchParams(window.location.search);
const a = urlParams.get('a');

    // Use the value as needed
console.log('Value of a:', a);