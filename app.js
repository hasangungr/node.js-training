
//packages


const express = require('express'); //express paketi importu middleware kullanmak için
const app = express(); //nesnesi
const bp = require('body-parser'); //parse işlem paketi

//pug packages
app.set('view engine', 'pug');//template engine kurulumu, view engini kullanılır, pug dosyalarını kullanır
app.set('views', './views'); //pug dosyalarının hangi dosyada saklanacağı 


const mongoConnect = require('./utility/database').mongoConnect;

//routes
const adminRoutes = require('./routes/admin'); //admin route'u
const userRoutes = require('./routes/shop');//shop route'u 
const errorControllers = require('./controllers/error'); //error route
// const sequelize = require('./utility/database'); //db route




//middlewares
// app.use((req, res, next) => { //middleware istek olduğunda çalışır
//   User.findByPk(1).then(user => {
//     req.user = user;
//     next();   
//   })
//     .catch(e => {
//       console.log(e)
//     });
// });

app.use(bp.urlencoded({ extended: false })); //temel veri türlerini parse eder
app.use('/admin', adminRoutes); //middleware app use ile kullanılmalı //admin route'daki middlewareleri kullanmak için
app.use(userRoutes); //middleware app use ile kullanılmalı //shopdaki route'daki middlewareleri kullanmak için










// connection.execute('SELECT * FROM `node-app`.products')
//     .then((result) => {
//         console.log(result[0][0]);
//     }).catch((error) => {
//         console.log(error);
//     });

// app.use(errorControllers.get404page);






// const Category = require('./models/category');
// const Product = require('./models/product');
// const User = require('./models/user');
// const Cart = require('./models/cart');
// const CartItem = require('./models/cartItem');
// const Order = require('./models/order');
// const OrdertItem = require('./models/orderItem');


// Product.belongsTo(Category, {
//   foreignKey: { allowNull: false }
// });
// Category.hasMany(Product);


// Product.belongsTo(User);
// User.hasMany(Product);


// User.hasOne(Cart);
// Cart.belongsTo(User);

// Cart.belongsToMany(Product, { through: CartItem });
// Product.belongsToMany(Cart, { through: CartItem });

// Order.belongsTo(User);
// User.hasMany(Order);

// Order.belongsToMany(Product, { through: OrdertItem });
// Product.belongsToMany(Order, { through: OrdertItem });



// let _user;
// sequelize
//   // .sync({ force: true })
//   .sync()
//   .then(
//     () => {

//       User.findByPk(1).then(user => {
//         if (!user) {
//           return User.create({
//             name: 'john dell',
//             email: 'john@gmail.com'
//           });

//         }
//         return user;
//       }).then(user => {
//         _user = user;

//         return user.getCart();
//       }).then(cart => {
//         if (!cart) {
//           return _user.createCart();
//         }
//         return cart;

//       }).then(() => {
//         Category.count().then(count => {
//           if (count === 0) {
//             Category.bulkCreate(
//               [
//                 { name: "Phone", description: "Smart Phone" },
//                 { name: "TV", description: "Smart TV" },
//                 { name: "PC", description: "Laptop" },
//               ]
//             );
//           }
//         })
//       })


//     }
//   ).catch(error => {
//     console.log(error);
//   });




mongoConnect((client) => {
  app.listen(3000, () => {
    // console.log(client);
  })
})


