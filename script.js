// Get and Decode Encoded Data
const urlParams = new URLSearchParams(window.location.search);
const total = urlParams.get('Total');
const subTotal = urlParams.get('SubTotal');
const encodedPeople = urlParams.get('people');
const people = JSON.parse(decodeURIComponent(encodedPeople));

// Display Results
const resultsDiv = document.getElementById('results');

// Display total
resultsDiv.innerHTML = `<p>Total: $${total}</p>`;

// Display optional subtotal
if (subTotal) {
    resultsDiv.innerHTML += `<p>SubTotal: $${subTotal}</p>`;
}

// Display people
people.forEach(person => {
    // Extract name and amount from the person object
    const name = Object.keys(person)[0];
    const amount = person[name];

    resultsDiv.innerHTML += `<p>${name} Owes: $${amount / 100}</p>`; // Divide by 100 for display
}); 
