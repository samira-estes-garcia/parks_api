"use strict";

console.log("i work!")

const apiKey = "xywz2g8yhjAiLI8F0EfoP1zLHfmiHUAL75oPydjO";
const searchURL = "https://developer.nps.gov/api/v1/parks";

function watchSubmitForm() {
    $(".parks-list").submit(event => {
        event.preventDefault();
        let searchState = $('#state').val();
        let numParks = $('#numberParks').val() -1;
        getParkList(searchState, numParks);
    });
}

function formatQueryParams(params) {
    const queryItems = Object.keys(params).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
    return queryItems.join('&');
}

function getParkList(query, limit = 10) {
    const params = {
        stateCode: query,
        limit,
        api_key: apiKey
    };
    
    const queryString = formatQueryParams(params);
    const url = searchURL + "?" + queryString;
    
    console.log(url);
    console.log(limit);

    fetch(url)
    .then((response) => {
        console.log(response)
        return response.json();
    })
    .then((myJSON) => {
        displayResults(myJSON);
    })
    .catch((error) => {
        console.log(error);
        alert('Something went wrong, try again later');
    });
}

function displayResults(myJSON) {
    console.log(myJSON);
    console.log(myJSON.data);
    console.log("displayResults works");
    $('.display-parksList').empty();

    for (let i = 0; i < myJSON.data.length; i++) {
        $('.display-parksList').append(`
        <h2>${myJSON.data[i].fullName}</h2>
        <div><b>Park Description</b></div>
        <div>${myJSON.data[i].description}</div>
        <div><a href="${myJSON.data[i].url}">Visit Park Website</a></div>
        `);
    }
}

watchSubmitForm();
