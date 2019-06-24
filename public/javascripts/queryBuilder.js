var input = document.getElementById('SearchBar');

function submitQuery(){


    var name = document.getElementById('SearchBar').value;
    var category = document.getElementById('Category').value;

    window.location.href = 'http://localhost:3000/items/?name=~' + name + '&category=' + category;
}