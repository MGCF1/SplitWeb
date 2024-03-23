// Get and Decode Encoded Data
const urlParams = new URLSearchParams(window.location.search);
const encodedData = urlParams.get('data');
const decodedData = decodeURIComponent(encodedData);

// Parse into Results
const params = decodedData.split('&');
const results = {};
params.forEach(param => {
    const [key, value] = param.split('=');
    results[key] = value;
});

// Display Results
const resultsDiv = document.getElementById('results');
resultsDiv.innerHTML = `<p>Subtotal: $${results.s}</p>`;
resultsDiv.innerHTML += `<p>Paid: $${results.p}</p>`;

for (let i = 1; ; i++) {
    const nameKey = `p${i}n`;
    const amountKey = `p${i}a`;

    if (results[nameKey] && results[amountKey]) {
        resultsDiv.innerHTML += `<p>${results[nameKey]} Owes: $${results[amountKey]}</p>`;
    } else {
        break;
    }
}
