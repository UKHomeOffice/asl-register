const page = require('@asl/pages/lib/page');
const form = require('@asl/pages/pages/common/routers/form');
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
    const { Establishment } = req.models;
    Promise.resolve()
      .then(() => Establishment.query()
        .findById(req.model.establishmentId)
        .select('name')
      )
      .then(establishment => {
        res.locals.establishmentName = establishment.name;
      })
      .then(() => next())
      .catch(next);
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

  // TODO: Add middleware which polls the database to check permission has been set

  app.post('/', (req, res, next) => {
    res.redirect(`${settings.client}?establishment=${req.model.establishmentId}`);
  });

  return app;
};
