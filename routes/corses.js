const { Router } = require('express')
const router = Router()
const Course = require('../models/corse')

router.get('/', async function (req, res) {
  const courses = await Course.getAll()
  res.render('courses', { //в адресной строке, когда мы перейдём в courses=>отработает callback
    title: 'Выбрать курс',
    isCourses: true,
    courses
  })
})
router.get('/:id', async function (req, res) {
  const corse = await Course.getById(req.params.id)
  res.render('corse', {
    title: `Курс ${corse.title}`,
    corse
  })

})
router.get('/:id/edit', async function (req, res) {
  if (!req.query.allow) { // с помощью allow=true понимаем был ли передан параметр, если да, то переходим на страницу
    return res.redirect('/')
  }
  const corse = await Course.getById(req.params.id) //req.params-отлавливаем query параметр id
  res.render('course-edit', {
    title: `Курс ${corse.title}`,
    corse
  })
})
router.post('/edit', async function (req, res) {
  console.log(req.body)
  await Course.upDate(req.body)
  res.redirect('/corses')
})
module.exports = router