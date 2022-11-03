const template = document.querySelector('#template')
  .content.querySelector('.card-list__item')
const cardList = document.querySelector('.card-list')

window.addEventListener('DOMContentLoaded', () => {
  fetch('https://jsonplaceholder.typicode.com/posts/?_start=0&_limit=7')
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(response.statusText);
      }
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
  renderList(dataArray,cardList)

  function filter(val,dataArray){
    return dataArray.filter(data=>(~data.title.indexOf(val)))
  };

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
  document.getElementById('search')
    .addEventListener('input',e=>renderList(filter(e.target.value,dataArray),cardList))
}
