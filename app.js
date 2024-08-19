
//packages


const express = require('express'); //express paketi importu middleware kullanmak için
const app = express(); //nesnesi
const bp = require('body-parser'); //parse işlem paketi

//pug packages
app.set('view engine', 'pug');//template engine kurulumu, view engini kullanılır, pug dosyalarını kullanır
app.set('views', './views'); //pug dosyalarının hangi dosyada saklanacağı 


const mongoConnect = require('./utility/database').mongoConnect;
const User = require('./models/user');
//routes
const adminRoutes = require('./routes/admin'); //admin route'u
const userRoutes = require('./routes/shop');//shop route'u 
const errorControllers = require('./controllers/error'); //error route
// const sequelize = require('./utility/database'); //db route


app.use((req, res, next) => {
  User.findByEmail('test@test.com')
    .then(user => {
      console.log("123");
      req.user = new User(user.name, user.email, user._id);
      console.log(req.user._id);
      next();

    })
    .catch(err => { console.log(err) });
})




app.use(bp.urlencoded({ extended: false })); //temel veri türlerini parse eder
app.use('/admin', adminRoutes); //middleware app use ile kullanılmalı //admin route'daki middlewareleri kullanmak için
app.use(userRoutes); //middleware app use ile kullanılmalı //shopdaki route'daki middlewareleri kullanmak için




// app.use((req, res, next) => {
//   User.findByEmail('test@test.com').then(user => {
//     req.user = new User(user.name, user.email, user._id);
//     console.log(req.user._id);
//     console.log("123");
//     next();
//   }).catch(e => console.log(e))
// })






mongoConnect(() => {

  User.findByEmail('test@test.com').then(user => {
    if (!user) {
      user = new User('test', 'test@test.com');
      return user.save();
    }
    else {
      return user;
    }
  }).then(result => {
    console.log(result)
    app.listen(3000);

  }).catch(e => console.log(e));
})


