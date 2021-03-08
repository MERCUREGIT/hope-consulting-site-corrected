'use strict';

function handleChange( url) {
    const searchFieldValue = document.getElementById("searchField").value;
    console.log(searchFieldValue);
    
    searchData(searchFieldValue, url);
};


function searchData(searchTerm,url)
{
    let searchDisplayElement = document.getElementById("searchDisplayElement");
    fetch(`${url}/${searchTerm}`)
        .then(res => {
            window.location.href = `${url}${searchTerm}`;
            window.location.replace = `${url}`;
        })
        .catch(err => {
            // Output to user that what he or she i searching for does not exist
        });
} 
