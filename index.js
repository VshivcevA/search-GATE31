const template = document.querySelector('#template')
  .content.querySelector('.card-list__item')
const cardList = document.querySelector('.card-list')
const input = document.getElementById('search')
const searchButton = document.getElementById('search-button')

window.addEventListener('DOMContentLoaded', () => {
  fetch('https://jsonplaceholder.typicode.com/posts/?_start=0&_limit=7')
    .then((response) => {
      return response.json();
    })
    .then((dataArray) => {
      search(dataArray)
    })
});

const getCheckbox = (item) => {
  const card = item.querySelector('.card')
  const checkbox = item.querySelector('#checkbox')
  checkbox.addEventListener('change', () => {
    if (checkbox.checked) {
      card.classList.add('checked');
    } else {
      card.classList.remove('checked');
    }
  })
}

const search = (dataArray) => {
  input.value = ''
  function renderList(dataArray,cardList){
    cardList.innerHTML='';
    dataArray.forEach(data => {
      const item = template.cloneNode(true);
      item.querySelector('.card__title').textContent = data.title;
      item.querySelector('.card__text').textContent = data.body;
      getCheckbox(item)
      cardList.appendChild(item)
    })
  }
  renderList(dataArray,cardList)

  function filter(val,dataArray){
    return dataArray.filter(data=>(~data.title.indexOf(val)))
  }

  searchButton.addEventListener('click', () => {
    renderList(filter(input.value, dataArray),cardList)
    location.href = '#search/' + input.value
    input.value = '';
  })
}
