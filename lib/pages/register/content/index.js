module.exports = {
  createAccount: 'Create account',
  existingUser: 'Accept invitation',
  fields: {
    password: {
      label: 'Enter a password',
      hint: 'Must be at least 8 characters'
    },
    confirm: {
      label: 'Confirm your password'
    }
  },
  account: {
    setup: 'Your account will be created using {{email}}.'
  },
  acceptInvitation: 'Create a password to accept this invitation and link your profile to this establishment.',
  errors: {
    password: {
      required: 'Enter a password',
      minLength: 'Passwords must be at least 8 characters.'
    },
    confirm: {
      required: 'Confirm your password',
      matchesField: 'These passwords do not match.'
    }
  }
};
