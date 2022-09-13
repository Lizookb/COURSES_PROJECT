const { Router } = require('express')
const Course = require('../models/corse')
const router = Router()

router.get('/', function (req, res) {
  res.render('add', {
    title: 'Добавить товар',
    isAdd: true
  })
  // res.sendFile(path.join(__dirname, "views", "about.html"))
})

router.post('/', async function (req, res) {
  const course = new Course(req.body.title, req.body.price, req.body.img, req.body.textArea)
  await course.save()
  //async, await-так как функиця асинхронная 
  //мы создаёи новый экземпляр из 4 строки
  res.redirect('/corses')
  // console.log(req.body)
  //из body отлавливаем данные из формы
})
module.exports = router

