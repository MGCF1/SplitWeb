// Get and Decode Encoded Data
const urlParams = new URLSearchParams(window.location.search);
const total = urlParams.get('Total');
const subTotal = urlParams.get('SubTotal');
const venmoUsername = urlParams.get('venmo');
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

// Conditional Venmo Button
if (venmoUsername) {
    const venmoUrl = 'https://venmo.com/' + venmoUsername; // Construct the Venmo URL
    const button = document.createElement('a');
    button.href = venmoUrl;
    button.textContent = 'Pay with Venmo';
    button.target = '_blank';
    resultsDiv.appendChild(button);
}

// Display people
people.forEach(person => {
    // Extract name and amount from the person object
    const name = Object.keys(person)[0];
    const amount = person[name];

    resultsDiv.innerHTML += `<p>${name} Owes: $${amount / 100}</p>`; // Divide by 100 for display
});




