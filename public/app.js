const toCurrency = price=>{
  return  new Intl.NumberFormat('ru-RU', {
    currency: 'eur',
    style: 'currency'
  }).format(price)
}

document.querySelectorAll('.price').forEach(node=>{
  node.textContent = toCurrency(node.textContent)
})

let $card = document.querySelector('#card')
if ($card) {
  $card.addEventListener('click', event => {
    if (event.target.classList.contains('js-remove')) {
      const id = event.target.dataset.id
      fetch('/card/remove/' + id, { //отпрвили на сервер запрос
        method: 'delete',
      }).then(res => res.json())
        .then(card => {
          if(card.courses.length){ // то тогда будем обновлять таблицу
            const html = card.courses.map(c=>{
              return `
                         <tr>
                             <td>${c.title}</td>
                             <td>${c.count}</td>
                             <td>
                                <button class="btn btn-small js-remove" data-id="${c.id}">Удалить</button>
                             </td>
                         </tr>
                      `
            }).join('')
            $card.querySelector('tbody').innerHTML = html
            // пересчитаем цену
            $card.querySelector('.price').textContent = toCurrency(card.price)
          }else{
            $card.innerHTML='<p>Корзина пуста</p>'
          }
        })
      //динамический запрос, then-ответ от promise принимаем в методе then 
    }

  })
}
