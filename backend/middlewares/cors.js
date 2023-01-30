const allowedCors = [
    'https://praktikum.tk',
    'http://praktikum.tk',
    'http://localhost:3000'
  ];
const DEFAULT_ALLOWED_METHODS = "GET,HEAD,PUT,PATCH,POST,DELETE"; 

  
  function cors (req, res, next) {
    const { method } = req;
    const { origin } = req.headers; 

    if (allowedCors.includes(origin)) {
        res.header('Access-Control-Allow-Origin', origin);
        res.header('Access-Control-Allow-Credentials', true);
    }

    const requestHeaders = req.headers['access-control-request-headers'];
    if (method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
        res.header('Access-Control-Allow-Headers', requestHeaders);
        return res.end();
    };

  
    next();
  };
  
  module.exports = cors;