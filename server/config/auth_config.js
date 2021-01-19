const passport=require('passport');
const localStrategy=require('passport-local').Strategy;
const User=require('../models/user');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id,function(err,user){
      done(err,user)
  });
});

passport.use(new localStrategy((username,password,done)=>{
  User.findOne({ username: username }, function(err, user) {
    if (err) { return done(err); }
    if (!user) {
       return done(null, false, { message: 'Incorrect credential' });
    }
    if (user.password!==password) {
       return done(null, false, { message: 'Incorrect credential' });
    }
    return done(null, user);
  })
}))
