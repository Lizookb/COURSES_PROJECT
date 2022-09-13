const { Routers, Router } = require('express')
const Card = require('../models/card')
const { getById } = require('../models/corse')
const Corse = require('../models/corse') // по id получаем товар
const router = Router()


router.post('/add', async function (req, res) {
  //получаем id товара, который хотим положить в корзину
  const corse = await Corse.getById(req.body.id)
  await Card.add(corse)
  res.redirect('/card')
})
router.get('/', async function (req, res) {
  const card = await Card.fetch()
  res.render('card', {
    title: 'Корзина',
    isCard: true, //для подсвечивания слова Корзина
    courses: card.courses, //образаемся к конкретному полю
    price: card.price
  }) //объект конфигурации
})
router.delete('/remove/:id', async function (req, res) {
  const course = await Card.remove(req.params.id)//получаем id товара через адресную строку и сразу передаём в метод getById
  res.status(200).json(course)
})
module.exports = router


