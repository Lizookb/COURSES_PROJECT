const { v4: uuidv4 } = require('uuid');
const fs = require('fs')
const path = require('path');


class Course {
  constructor(title, price, img, textArea) {
    this.title = title,
      this.price = price,
      this.img = img
    this.id = uuidv4()
    this.textArea = textArea
  }
  toJson() {
    return {
      title: this.title,
      price: this.price,
      img: this.img,
      id: this.id,
      textArea: this.textArea
    }
  }
  async save() {
    const corses = await Course.getAll()
    //console.log(corses)
    corses.push(this.toJson())
    // console.log('Courses', corses);
    // corses.push(this.toJson())
    return new Promise((resolve, reject) => {
      fs.writeFile(
        path.join('__dirname', '..', 'data', 'courses.json'),
        JSON.stringify(corses),
        (err) => {
          if (err) {
            reject(err)
          } else {
            resolve()
          }
        }
      )
    })
    // Получаем все курсы из файла courses.json
  }

  static getAll() {
    return new Promise((resolve, reject) => {
      fs.readFile(
        path.join('__dirname', '..', 'data', 'courses.json'),
        'utf-8', //кодировка
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
  static async getById(id) {
    const corses = await Course.getAll()
    return corses.find(c => c.id === id)
  }
  //статическим методы класса(они отрабатывают только внутри класса)
  static async upDate(corse) {
    const course = await Course.getAll()
    const idX = course.findIndex(c => c.id === corse.id)
    console.log(idX)
    course[idX] = corse
    return new Promise((resolve, reject) => {
      fs.writeFile(
        path.join('__dirname', '..', 'data', 'courses.json'),
        JSON.stringify(course),
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

}


module.exports = Course