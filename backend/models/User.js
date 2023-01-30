const mongoose = require('mongoose');
const validator = require('validator');
const { URL_REGEXP } = require('../utils/statusError');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    minlength: [2, 'Строка должна содержать как минимум 2 символа'],
    maxlength: [30, 'Строка не должна первышать 30 символов'],
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: [2, 'Строка должна содержать как минимум 2 символа'],
    maxlength: [30, 'Строка не должна первышать 30 символов'],
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator: (v) => URL_REGEXP.test(v),
      message: 'Не правильный формат ссылки',
    },
  },
  email: {
    type: String,
    required: [true, 'Поле email должно быть заполнено!'],
    unique: true,
    validate: {
      validator: (email) => { validator.isEmail(email); },
      message: 'Указан не корректный email',
    },
  },
  password: {
    type: String,
    select: false,
    required: true,
  },
});
module.exports = mongoose.model('user', userSchema);
