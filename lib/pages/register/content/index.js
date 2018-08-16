module.exports = {
  createAccount: 'Create account',
  existingUser: 'Accept invitation',
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
  acceptInvitation: 'Click the button below to accept this invitation and to link your profile to this establishment',
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
};
