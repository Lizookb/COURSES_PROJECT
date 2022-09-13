const mongoose = require('mongoose')
const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars')
const homeRoutes = require('./routes/home')
const addRoutees = require('./routes/add')
const coursesRouters = require('./routes/corses')
const cardRouters = require('./routes/card')
// express-handlebars-движок для рендеринга страниц
// /Подключили модуль expresss
const app = express()
// в переменной хранится результат работы функции express
app.listen(3000, () => {
  console.log('server')
})
const hbs = exphbs.create({
  //  конфигурируем метод create
  defaultLayout: 'main', //дефолтный слой 
  extname: 'hbs'//расширение
})
//зарегистрируем hbs как движое для html страницы
// app объект от express
app.engine('hbs', hbs.engine)
// позволяет производить рендер в html файлах
// какой движок хотим зарегестрировтаь для нашего js 
app.set('view engine', 'hbs')
// чтобы указать - какой engine мы будем использовать - обратимся к полю: view engine
// и указіваем название engine - hbs
app.set('views', 'views')
//  указываем название папки и в ней сами шаблоны
app.use(express.static('public'))
//use -метод для добавления middlewair-доп функциональность
app.use(express.urlencoded({ extended: true }))
//декодируем форму после её отправки
app.use('/', homeRoutes)
app.use('/add', addRoutees)
app.use('/corses', coursesRouters)
app.use('/card', cardRouters)

async function start() {
  try {
    const url = 'mongodb+srv://Liza_b:Strikeodessa20$@nodejsshop.ctdqq.mongodb.net/?retryWrites=true&w=majority'
    await mongoose.connect(url, { useNewUrlParser: true })
    app.listen(3000, () => {
      console.log('server')
    })
  } catch (e) {
    console.log(e)
  }
}

start()

// для изменения title-передаём 2-м параметром объект с ключом title
// 'указываем на какой url' cтучимся
// res-send ( метод) отсылаем информацию на сайт
// Для запуска сервера
//"scripts": {
//   "start": "node index.js",
//   "dev": "nodemon index.js"
// },-одна из возможностей запуска проекта, чтобы отработал, то пишем 2 скрипта
// npm run dev-отработает скрипт dev
