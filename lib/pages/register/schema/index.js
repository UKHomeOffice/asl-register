module.exports = {
  password: {
    inputType: 'inputPassword',
    validate: [
      'required',
      { minLength: 8 }
    ]
  },
  confirm: {
    inputType: 'inputPassword',
    validate: [
      'required',
      { matchesField: 'password' }
    ]
  }
};
