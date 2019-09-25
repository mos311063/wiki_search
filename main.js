window.onload = function() {
  document.getElementById('searchBtn').addEventListener('click', function() {
    getScope()
  })
}
function getScope() {
  var title = document.getElementById('title').value
  var api =
    'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch='
  var cb = '&callback=JSON_CALLBACK'
  var page = 'https://en.wikipedia.org/?curid='
  fetch(api + title + cb, {
    method: 'GET'
  }).then(resp => {
    console.log('here')
    var result = resp.query.pages
    console.log(result)
  })
}
