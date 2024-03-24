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
people.forEach(person => { const name = Object.keys(person)[0];  const amount = person[name]; resultsDiv.innerHTML += `<p>${name} Owes: $${amount / 100}</p>`; });

// Payment Selection Logic
const personSelect = document.getElementById('person-select');
const amountInput = document.getElementById('amount');
const addPaymentButton = document.getElementById('add-payment');
const paymentList = document.getElementById('payment-list');
people.forEach(person => { const name = Object.keys(person)[0];  const option = document.createElement('option'); option.value = name;  option.textContent = name; personSelect.appendChild(option);  });
addPaymentButton.addEventListener('click', () => { const selectedPerson = personSelect.value; const amount = parseFloat(amountInput.value); if (selectedPerson && amount) { addPaymentToList(selectedPerson, amount); amountInput.value = ''; }});
function addPaymentToList(person, amount) { const listItem = document.createElement('li'); listItem.textContent = `${person}: $${amount.toFixed(2)}`; paymentList.appendChild(listItem);}

// Venmo Link Generation
if (venmoUsername) {
    const venmoUrl = generateVenmoLink(venmoUsername);
    const button = document.createElement('a');
    button.href = venmoUrl;
    button.textContent = 'Pay with Venmo';
    button.target = '_blank';
    resultsDiv.appendChild(button);
}

function generateVenmoLink(venmoUsername) {
    const payments = [];

    // Get payments from the list
    paymentList.querySelectorAll('li').forEach(listItem => {
        const [person, amountStr] = listItem.textContent.split(': $');
        const amount = parseFloat(amountStr);
        payments.push({ username: person, amount: amount });
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

    return venmoUrl;
}  
