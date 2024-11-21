// Conversion rates for different land units to square meters
const conversionRates = {
    ropaniToSquareMeter: 508.72,
    aanaToSquareMeter: 31.80,
    paisaToSquareMeter: 7.95,
    damToSquareMeter: 1.99,
    bighaToSquareMeter: 6772.63,
    kathaToSquareMeter: 338.63,
    dhurToSquareMeter: 16.93,
    squareFeetToSquareMeter: 0.092903,
    squareMeterToSquareFeet: 10.7639,
};

// Show the right input boxes based on the selected type
function showInputs(type) {
    const sections = ['ropaniInputs', 'bighaInputs', 'squareFeetInputs', 'squareMeterInputs'];
    sections.forEach(section => {
        document.getElementById(section).style.display = section === type + 'Inputs' ? 'block' : 'none';
    });

    clearPreviousInputs(sections);

    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = ''; // Clear result before showing new one
    resultDiv.classList.remove('active'); // Hide result area

    displayConversionOptions(type);
}

// Clear all the input fields
function clearPreviousInputs(sections) {
    sections.forEach(section => {
        const inputs = document.querySelectorAll(`#${section} input`);
        inputs.forEach(input => {
            input.value = ''; // Clear input values
        });
    });
}

// Show the conversion options based on the selected type
function displayConversionOptions(type) {
    const conversionDiv = document.getElementById("conversionOptions");
    let conversionText = "";

    switch (type) {
        case 'ropani':
            conversionText = "बिगाहा प्रणाली: बिगाहा, कट्ठा, धुर<br>चौरस फुट<br>चौरस मिटर";
            break;
        case 'bigha':
            conversionText = "रोपानी प्रणाली: रोपानी, आना, पैसा, दाम<br>चौरस फुट<br>चौरस मिटर";
            break;
        case 'squareMeter':
            conversionText = "बिगाहा प्रणाली: बिगाहा, कट्ठा, धुर<br>रोपानी प्रणाली: रोपानी, आना, पैसा, दाम<br>चौरस फुट";
            break;
        case 'squareFeet':
            conversionText = "बिगाहा प्रणाली: बिगाहा, कट्ठा, धुर<br>रोपानी प्रणाली: रोपानी, आना, पैसा, दाम<br>चौरस मिटर";
            break;
    }

    conversionDiv.innerHTML = conversionText; // Update conversion options
}

// Main function to perform the conversion
function convert() {
    let totalInSqM = 0; // Start with 0 square meters
    let results = {};

    if (document.getElementById("ropaniInputs").style.display === "block") {
        const ropani = parseFloat(document.getElementById("ropani").value) || 0;
        const aana = parseFloat(document.getElementById("aana").value) || 0;
        const paisa = parseFloat(document.getElementById("paisa").value) || 0;
        const dam = parseFloat(document.getElementById("dam").value) || 0;

        totalInSqM = 
            (ropani * conversionRates.ropaniToSquareMeter) +
            (aana * conversionRates.aanaToSquareMeter) +
            (paisa * conversionRates.paisaToSquareMeter) +
            (dam * conversionRates.damToSquareMeter);

        results = convertFromSquareMeter(totalInSqM);
    } else if (document.getElementById("bighaInputs").style.display === "block") {
        const bigha = parseFloat(document.getElementById("bigha").value) || 0;
        const katha = parseFloat(document.getElementById("katha").value) || 0;
        const dhur = parseFloat(document.getElementById("dhur").value) || 0;

        totalInSqM = 
            (bigha * conversionRates.bighaToSquareMeter) +
            (katha * conversionRates.kathaToSquareMeter) +
            (dhur * conversionRates.dhurToSquareMeter);

        results = convertFromRopani(totalInSqM);
    } else if (document.getElementById("squareFeetInputs").style.display === "block") {
        const squareFeet = parseFloat(document.getElementById("squareFeet").value) || 0;
        totalInSqM = squareFeet * conversionRates.squareFeetToSquareMeter;

        results = convertFromSquareMeter(totalInSqM);
        const ropaniResults = convertFromRopani(totalInSqM);
        results.ropani = ropaniResults.ropani;
        results.aana = ropaniResults.aana;
        results.paisa = ropaniResults.paisa;
        results.dam = ropaniResults.dam;
    } else if (document.getElementById("squareMeterInputs").style.display === "block") {
        totalInSqM = parseFloat(document.getElementById("squareMeter").value) || 0;

        results = convertFromSquareMeter(totalInSqM);
        const ropaniResults = convertFromRopani(totalInSqM);
        results.ropani = ropaniResults.ropani;
        results.aana = ropaniResults.aana;
        results.paisa = ropaniResults.paisa;
        results.dam = ropaniResults.dam;
    }

    displayResults(results, totalInSqM);
}

// Convert square meters to other units
function convertFromSquareMeter(totalInSqM) {
    const bigha = Math.floor(totalInSqM / conversionRates.bighaToSquareMeter);
    const remainingAfterBigha = totalInSqM % conversionRates.bighaToSquareMeter;

    const katha = Math.floor(remainingAfterBigha / conversionRates.kathaToSquareMeter);
    const remainingAfterKatha = remainingAfterBigha % conversionRates.kathaToSquareMeter;

    const dhur = remainingAfterKatha / conversionRates.dhurToSquareMeter;
    const squareFeet = totalInSqM * conversionRates.squareMeterToSquareFeet;

    return { bigha, katha, dhur, squareFeet, totalInSqM };
}

// Convert square meters to Ropani system
function convertFromRopani(totalInSqM) {
    const ropani = Math.floor(totalInSqM / conversionRates.ropaniToSquareMeter);
    const remainingAfterRopani = totalInSqM % conversionRates.ropaniToSquareMeter;

    const aana = Math.floor(remainingAfterRopani / conversionRates.aanaToSquareMeter);
    const remainingAfterAana = remainingAfterRopani % conversionRates.aanaToSquareMeter;

    const paisa = Math.floor(remainingAfterAana / conversionRates.paisaToSquareMeter);
    const remainingAfterPaisa = remainingAfterAana % conversionRates.paisaToSquareMeter;

    const dam = remainingAfterPaisa / conversionRates.damToSquareMeter;
    const squareFeet = totalInSqM * conversionRates.squareMeterToSquareFeet;

    return { ropani, aana, paisa, dam, squareFeet, totalInSqM };
}

// Show the conversion results to the user
function displayResults(results, totalInSqM) {
    const resultDiv = document.getElementById("result");
    let resultHTML = "<h3>रूपान्तरण गरिएको क्षेत्रफल</h3>";

    if (results.bigha !== undefined) {
        resultHTML += `<p>बिगाहा प्रणाली: बिगाहा: ${results.bigha}  कट्ठा: ${results.katha}  धुर: ${results.dhur.toFixed(4)}</p>`;
    }
    
    if (results.ropani !== undefined) {
        resultHTML += `<p>रोपानी प्रणाली: रोपानी: ${results.ropani}  आना: ${results.aana}  पैसा: ${results.paisa}  दाम: ${results.dam.toFixed(4)}</p>`;
    }

    resultHTML += `<p>चौरस फुट: ${results.squareFeet.toFixed(2)}</p>`;
    resultHTML += `<p>चौरस मिटर: ${totalInSqM.toFixed(2)}</p>`;

    resultDiv.innerHTML = resultHTML; 
    resultDiv.classList.add('active'); // Show the result area
}
