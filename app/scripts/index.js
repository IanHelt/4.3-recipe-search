console.log("Hello World!");
(function(){

  let $ = require('jquery');
  let handlebars = require('handlebars');
  let searchButton = document.getElementById('searchBtn');

init();

function displayRecipe(recipeInfo){
  var source = $('#template').html();
  var template = handlebars.compile(source);
  var recipeArray = recipeInfo.results;
  //console.log(titles);
  console.log(template(recipeArray));
  console.log(recipeArray);
  recipeArray.forEach(function(item, counter) {
    var recipes = recipeArray[counter];
  $('.row').html(template(recipes));
  })
}

function buildRecipe(i){
    return (`
    <div class="col-md-3">

        <img src="${i.thumbnail}" alt="No image provided">
        <h3> ${i.title} </h3>
        <a href="${i.href}"> ${i.href} </a>
        <p> ${i.ingredients} </p>
    </div>
    `)
}

function init() {
  fetch(
  "http://recipepuppyproxy.herokuapp.com/api/?i=onions,garlic&q=omelet&p=3"
).then(function(response) {
  return response.json()
}).then(function(data) {
  document.querySelector('.row').innerHTML = data.results.map(buildRecipe).reduce(function(sum,value) {return sum+value;})
})
}

searchButton.addEventListener('click', recipeSearch);

function recipeSearch() {
  var searchGet = document.getElementById('searchInput');
  var searchTerm = searchGet.value;

  searchTerm = 'q=' + searchTerm;
  fetch(
  "http://recipepuppyproxy.herokuapp.com/api/?" + searchTerm
).then(function(response){
  return response.json()
}).then(function(data) {
  document.querySelector('.row').innerHTML = data.results.map(buildRecipe).reduce(function(sum,value) {return sum+value;})
  console.log(searchTerm);
})
}

}());
