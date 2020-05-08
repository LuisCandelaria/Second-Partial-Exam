const API_KEY = "1";
let input = document.getElementById('query');
let results = document.getElementsByClassName('js-search-results');

function fetch( searchTerm ) {
    let url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`;
    let settings = {
        method : 'GET'
    };
    fetch(url, settings)
        .then( response => {
            if( response.ok ) {
                return response.json();
            }
            throw new Error( response.statusText );
        })
        .then( responseJSON => {
            display( responseJSON )
        })
        .catch( err => {
            console.log(err);
        })
}

function display( data ) {
    console.log(data);
    let len = data.lenght;
    
    for(let i = 0; i < len; i++) {
        results[0].innerHTML += `
            <p>
                Name : ${data.name}
                Meal area : ${data.area}
                Meal instructions : ${data.instructions}
            </p>
            <imd src="${data.image}" />
            <br>
        `;
    }
} 

function search() {
    event.preventDefault();
    console.log(input.value);
    fetch(input.value);
}