
const session = require('express-session');

const MongoStore = require('connect-mongo')(session);
 

const mongoose = require('mongoose');

//queremos cookies en front y back por seguridad y experiencia de usuario
//

module.exports = app => {
  app.use(
    session({
      secret: process.env.SESS_SECRET,
      resave: true,
      saveUninitialized: false,
      cookie: {
        sameSite: false,
        httpOnly: true,
        maxAge: 60000 
      },
      store: new MongoStore({
       
        mongooseConnection: mongoose.connection,
        // ttl => time to live
        ttl: 60 * 60 * 24 // 60sec * 60min * 24h => 1 day ///tiempo de vida en el back
      })
    })
  );
};
