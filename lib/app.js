const jwt = require('jsonwebtoken');
const ui = require('@asl/service/ui');
const { views, content } = require('@asl/pages');
const db = require('@asl/schema');
const Queue = require('./queue');

module.exports = settings => {
  const app = ui({
    ...settings,
    views,
    content: {
      siteTitle: 'Accept invitation'
    }
  });

  app.use(content);

  app.use((req, res, next) => {
    req.models = db(settings.db);
    next();
  });

  app.use((req, res, next) => {
    req.queue = Queue(settings.sqs);
    next();
  });

  app.use((req, res, next) => {
    res.locals.scripts = [];
    next();
  });

  app.param('token', (req, res, next, token) => {
    req.token = token;
    Promise.resolve()
      .then(() => jwt.verify(req.token, settings.jwt.secret))
      .then(model => {
        if (!model.profileId || !model.establishmentId || !model.role) {
          return next(new Error('malformed JWT token'));
        }
        req.model = {
          ...model,
          id: 'register-user'
        };
        next();
      })
      .catch(next);
  });

  app.use('/:token', (req, res, next) => {
    const { Profile } = req.models;
    Promise.resolve()
      .then(() => {
        return Profile.query()
          .findById(req.model.profileId)
          .eager('establishments');
      })
      .then(profile => {
        if (!profile) {
          return next(new Error(`Profile not found: ${req.model.profileId}`));
        }
        if (profile.establishments.length) {
          req.existingUser = true;
        }
        next();
      })
      .catch(next);
  });

  app.use('/:token', require('./pages/register')(settings));

  return app;
};
