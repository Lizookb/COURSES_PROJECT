//Подлкючим routes от express
// const express.Router = require('express')
const { Router } = require('express')
//{}-деструктуризация объекта
//унаследовали класс router
const router = Router()
router.get('/', function (req, res) {
  res.render('index', {
    title: 'Главная страница',
    isHome: true
  })
})
// res.sendFile(path.join(__dirname, 'views', 'index.html'))
// res.send('Hello World')
module.exports = router

