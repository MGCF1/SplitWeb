// Get and Decode Encoded Data
const urlParams = new URLSearchParams(window.location.search);
const total = urlParams.get('Total');
const subTotal = urlParams.get('SubTotal');
const encodedPeople = urlParams.get('people');
const people = JSON.parse(decodeURIComponent(encodedPeople));
const venmoUsername = urlParams.get('venmo');

// Display Results
const resultsDiv = document.getElementById('results');
resultsDiv.innerHTML = `<p>Total: $${total}</p>`;
if (subTotal) { resultsDiv.innerHTML += `<p>SubTotal: $${subTotal}</p>`; }

// Display People with Checkboxes
const peopleList = document.getElementById('people-list');
people.forEach(person => {
    const name = Object.keys(person)[0];
    const amount = person[name];

    const listItem = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.name = 'people';
    checkbox.value = name;
    checkbox.dataset.amount = amount; // Store the amount
    const label = document.createElement('label');
    label.textContent = `${name}: $${amount / 100}`;

    listItem.appendChild(checkbox);
    listItem.appendChild(label);
    peopleList.appendChild(listItem);
});

// Venmo Link Generation
const venmoLinkDiv = document.getElementById('venmo-link');
if (venmoUsername) {
    document.getElementById('venmo-link').innerHTML = ''; // Reset
    generateVenmoLink(venmoUsername);
}

function generateVenmoLink(venmoUsername) {
    const payments = [];

    // Get selected people
    const selectedPeople = document.querySelectorAll('input[name="people"]:checked');
    selectedPeople.forEach(personCheckbox => {
        payments.push({
          username: personCheckbox.value,
          amount: personCheckbox.dataset.amount / 100 // Get amount from dataset
        });
    });

    // Construct a basic Venmo URL (multiple payments may not be supported)
    let venmoUrl = 'https://venmo.com/' + venmoUsername + '?txn=charge';
    payments.forEach((payment, index) => {
        if (index === 0) {
            venmoUrl += '&amount=' + payment.amount;
        } else {
            // May alert the user that multiple payments might not work
            alert("Venmo may not support paying multiple people at once");
        }
    });

    // Display the Venmo link
    const button = document.createElement('a');
    button.href = venmoUrl;
    button.textContent = 'Pay with Venmo';
    button.target = '_blank';
    venmoLinkDiv.appendChild(button);
}  
