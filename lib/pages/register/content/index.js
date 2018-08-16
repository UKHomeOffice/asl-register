module.exports = {
  createAccount: 'Create account',
  fields: {
    password: {
      label: 'Select a password',
      hint: 'Must be at least 8 characters'
    },
    confirm: {
      label: 'Confirm your password'
    }
  },
  account: {
    setup: 'Your account will be created using {{email}}'
  },
  errors: {
    password: {
      required: 'Enter a password',
      minLength: 'Password must be at least 8 characters'
    },
    confirm: {
      required: 'Confirm password',
      matchesField: 'Enter the same password as above'
    }
  }
}
