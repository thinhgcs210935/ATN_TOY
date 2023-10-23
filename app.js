const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const { result } = require('lodash');
const Product = require('./models/product');


//express app
const app = express();

// connect to mongodb
const dbURI = 'mongodb+srv://thinhnpgcs210935:will11900@cluster0.4j1ro2j.mongodb.net/ATN_TOY?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(3003, () => console.log('Connect to db')))
    .catch((err) => console.log(err));

// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));



// mongoose and mongo sandbox routes


app.get('/', (req, res) => {
    res.render('index', { title: 'Dashboard' });
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});


// blogs route 
app.get('/product-list', (req, res) => {
    Product.find().sort({ createdAt: -1 })
        .then((result) => {
            res.render('productlist', { products: result, title: "productlist" });
        })
        .catch((err) => {
            console.log(err);
        });
});

// app.post('/addproduct', (req, res) => {
//     const pro = new Product(req.body)

//     pro.save()
//     .then((result) => {
//         res.redirect('/addproduct' );
//     })
//     .catch((err) => {
//         console.log(err);
//     });
// });

app.post('/addproduct', (req, res) => {
    const pro = new Product(req.body);

    pro.save()
    .then((result) => {
        res.redirect('/addproduct?successMessage=Product added successfully');
    })
    .catch((err) => {
        console.log(err);
    });
});


app.delete('product-list/:id', (req, res) => {
    const id = req.params.id;
    Product.findByIdAndDelete(id)
        .then(result => {
            res.json({redirect: '/product-list'})
        })
        .catch(err => {
            console.log(err)
        })
})

app.get('/addproduct', (req, res) => {
    res.render('addproduct', { title: 'Add Product' });
});

// redirects
app.get('/about-us', (req, res) => {
    res.redirect('./views/about.ejs');
});



// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});