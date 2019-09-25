var save_display_result
var count = 10
window.onload = function() {
  document.getElementById('title').addEventListener('onchange', function() {
    getScope()
  })
  document.getElementById('searchBtn').addEventListener('click', function() {
    getScope()
  })
  document.getElementById('title').addEventListener('input', function() {
    getScope()
  })
}

window.onscroll = async function(ev) {
  if (
    window.innerHeight + window.pageYOffset >=
    document.body.offsetHeight + 30
  ) {
    if (count < 30) {
      count = count + 5
      await showmore(count)
    }
  }
}
function getScope() {
  count = 10
  let title = document.getElementById('title').value
  let api = `https://cors-anywhere.glitch.me/https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=30&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=`
  let page = 'https://en.wikipedia.org/?curid='
  fetch(api + title, {
    method: 'GET'
  })
    .then(resp => {
      return resp.json()
    })
    .then(jsonObj => {
      let display_result = []
      let result = jsonObj.query.pages
      save_display_result = result
      for (let [key, element] of Object.entries(result)) {
        display_result.push({
          title: element.title,
          body: element.extract,
          page: page + element.pageid
        })
        if (display_result.length == count) break
      }
      return display_result
    })
    .then(display_result => {
      let output = ''
      display_result.forEach(item => {
        let title = `<li>${item.title}</li>`
        let body = `<li>${item.body}</li>`
        output +=
          `<div class="result"><a href="${item.page}">` +
          title +
          body +
          `</a><div class="box"><embed src="${item.page}" width = "100%" height = "400px"></div></div>`
      })
      document.getElementById('result').innerHTML = output
    })
    .catch(err => {
      document.getElementById('result').innerHTML =
        '<div class="result"> No RESULT</div>'
    })
}

async function showmore(my_count) {
  document.querySelector('.loading').style.display = 'flex'
  let display_result = await getdata(my_count)
  await sleep(1000)
  document.querySelector('.loading').style.display = 'none'
  display_result.forEach(item => {
    let title = `<li>${item.title}</li>`
    let body = `<li>${item.body}</li>`
    var child = document.createElement('div')
    child.setAttribute('class', 'result')
    child.innerHTML = `<a href="${item.page}">` + title + body + '</a>'
    document.getElementById('result').appendChild(child)
  })
}

function getdata(my_count) {
  let result = save_display_result
  let page = 'https://en.wikipedia.org/?curid='
  let num = 1
  display_result = []
  return new Promise(resolve => {
    for (let [key, element] of Object.entries(result)) {
      if (num > my_count - 5) {
        display_result.push({
          title: element.title,
          body: element.extract,
          page: page + element.pageid
        })
      }
      num++
      if (display_result.length == 5) resolve(display_result)
    }
  })
}

function sleep(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}
