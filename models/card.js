const fs = require('fs')
const path = require('path');
const p = path.join('__dirname', '..', 'data', 'card.json')
class Card {

  static async fetch() { //метод для считывания корзины, в рамках данного класса
    return new Promise((resolve, reject) => {
      fs.readFile(
        p,
        'utf-8',//с какой кодировки хотим считать текст
        (err, content) => {
          if (err) {
            reject(err)
          } else {
            resolve(JSON.parse(content))
          }
        }
      )
    })
  }

  static async add(corse) {
    const card = await Card.fetch()
    const idX = card.courses.findIndex(c => c.id === corse.id)
    const candidate = card.courses[idX]
    if (candidate) {
      candidate.count++ //свойтво, отвечающее за кол-во товаров 
      card.courses[idX] = candidate
    } else {
      corse.count = 1
      card.courses.push(corse)
    }
    card.price += +corse.price

    return new Promise((resolve, reject) => {
      fs.writeFile(
        path.join(p),
        JSON.stringify(card),
        (err) => {
          if (err) {
            reject(err)
          } else {
            resolve()
          }
        }
      )
    })
  }

  static async remove(id) {
    const card = await Card.fetch()
    const idX = card.courses.findIndex(c => c.id === id)
    const course = card.courses[idX]//вернёт данный товар
    if (course.count == 1) {
      card.courses = card.courses.filter(c => c.id !== id)
      // console.log(course.count)
    } else {
      card.courses[idX].count--
    }
   // console.log(course)
    card.price -= course.price
    //console.log(card.price)
    return new Promise((resolve, reject) => {
      fs.writeFile(p, JSON.stringify(card), (err) => {
          if (err) {
            reject(err)
          } else {
            resolve(card)
          }
        })
    })
  }
}

module.exports = Card