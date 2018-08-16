const path = require('path');
const page = require('@asl/pages/lib/page');
const form = require('@asl/pages/pages/common/routers/form');
const jwt = require('jsonwebtoken');
const schema = require('./schema');
const existingTemplate = require('./views/existing');

module.exports = settings => {
  const app = page({
    ...settings,
    root: __dirname
  });

  app.use(form({
    schema,
    configure: (req, res, next) => {
      if (req.existingUser) {
        req.form.schema = {};
        res.template = existingTemplate.default || existingTemplate;
      }
      next();
    }
  }));

  app.use((req, res, next) => {
    res.locals.static.schema = req.form.schema;
    next();
  });

  app.post('/', (req, res, next) => {
    const { password } = req.session.form['register-user'].values;
    req.queue({
      model: 'invitation',
      action: 'resolve',
      data: {
        token: req.token,
        password
      }
    })
      .then(() => next())
      .catch(next);
  });

  // app.post('/', (req, res, next) => {
  //   // const checkProfileLinked = () => {
  //   //   Profile.query()
  //   //     .findById(profileId)
  //   //     .eager('establishments')
  //   //     .then(profile => profile)
  //   // }
  //   //
  //   // const timer = setTimeout(checkProfileLinked, 5000);
  // });

  app.post('/', (req, res, next) => {
    res.redirect(settings.client)
  });

  return app;
};
