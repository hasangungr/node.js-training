 

const express = require('express'); //express paketi importu middleware kullanmak için
const app = express(); //nesnesi

const bp = require('body-parser'); //parse işlem paketi

app.set('view engine', 'pug');//template engine kurulumu, view engini kullanılır, pug dosyalarını kullanır
app.set('views', './views'); //pug dosyalarının hangi dosyada saklanacağı 

const adminRoutes = require('./routes/admin'); //admin route'u
const userRoutes = require('./routes/shop');//shop route'u 
const errorControllers = require('./controllers/error'); //error route

app.use(bp.urlencoded({ extended: false })); //temel veri türlerini parse eder
app.use('/admin', adminRoutes); //middleware app use ile kullanılmalı //admin route'daki middlewareleri kullanmak için
app.use(userRoutes); //middleware app use ile kullanılmalı //shopdaki route'daki middlewareleri kullanmak için
app.use(errorControllers.get404page);
 



 
// app.use((req, res, next) => {
//     console.log('internal mid');
//     next(); //bu middle bitip diğer middle'a geçer, bunu yazmazsan bir sonraki midd'e geçmez veya response döndürürse geçmez
// });



app.listen(3000, () => {
    console.log('listeining on port 3000');
})