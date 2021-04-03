var URI = require('urijs');

export default function routes(app, addon) {
  app.get('/', (req, res) => {
    res.redirect('/atlassian-connect.json');
  });

  app.get('/hello-world', addon.authenticate(), (req, res) => {
    res.render(
      'hello-world.hbs',
      {
        title: 'Atlassian Connect'
      }
    );
  });

  app.post('/cxdevops-proxy/:clientkey/:resource', (req, res) => {
    var httpClient = addon.httpClient({
      clientKey: req.params.clientkey
    });
    httpClient.post(
      {
        url: URI.expand('/rest/{resource}/0.1/bulk', req.params),
        json: req.body
      },
      function (e, r, body) {
        if (e) {
          return console.error('HTTP request failed:', e);
        }
        res.status(r.status).json(body);
      });
  })
}
