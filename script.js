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

window.open("splitMGCF1://")

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
    label.textContent = `${name}\t: $${amount / 100}`;

    listItem.classList.add('no-bullet');
    listItem.appendChild(checkbox);
    listItem.appendChild(label);
    peopleList.appendChild(listItem);
});

// Venmo Link Generation
// Venmo Link Generation (Updated)
//const venmoLinkDiv = document.getElementById('venmo-link');
const generateButton = document.getElementById('generate-venmo-link');

generateButton.addEventListener('click', () => {
    const venmoUsername = urlParams.get('venmo');
    if (venmoUsername) {
//        venmoLinkDiv.innerHTML = '';
        const venmoLink = generateVenmoLink(venmoUsername); // Get the link

        // Open the link in a new window or tab
        window.open(venmoLink);
    } else {
        // Handle the case where there's no Venmo username in the URL
    }
});



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
    let venmoUrl = 'https://venmo.com/' + venmoUsername + '?txn=pay';
    
    let totalAmount = 0;
    for (let i = 0; i < payments.length; i++) {
        totalAmount += payments[i].amount;
    }
    
    venmoUrl += '&amount=' + totalAmount;
    
    console.log(venmoUrl)
    
    return venmoUrl
}
