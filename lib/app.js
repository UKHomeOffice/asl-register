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

  const { Profile } = db(settings.db);

  app.use(content);

  app.use((req, res, next) => {
    req.queue = Queue(settings.sqs);
    next();
  });

  app.use((req, res, next) => {
    res.locals.scripts = false;
    next();
  });

  app.param('token', (req, res, next, token) => {
    req.token = token;
    next();
  });

  app.use('/:token', (req, res, next) => {
    Promise.resolve()
      .then(() => jwt.verify(req.token, settings.jwt.secret))
      .then(model => {
        req.model = {
          ...model,
          id: 'register-user'
        };
        next();
      })
      .catch(next);
  });

  app.use('/:token', (req, res, next) => {
    Promise.resolve()
      .then(() => {
        return Profile.query()
          .findById(req.model.profileId)
          .eager('establishments');
      })
      .then(profile => {
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
