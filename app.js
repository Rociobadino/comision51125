import express from 'express'
const app = express();

app.use(express.urlencoded({ extended: true }));

import ProductManager from './ProductManager.js'

const productManager = new ProductManager('./productos.json')

app.get('/', (req,res)=>{
    res.send('INICIO')

})
app.get('/productos', async (req,res)=>{
    // res.send('hola productos')
    try {
        const limit = req.query.limit;
        
        const products = await productManager.getProducts();
        if (limit) {
            const limitedProducts = products.slice(0, limit);
            res.json(limitedProducts);
        } else {
            res.json(products);
        }
    } catch (err) {
        console.error(err);
        res.json('Error al traer los productos') 
    }

})
app.get('/productos/:pid', async (req,res)=>{
    // res.send('hola productos')
    try {
        const productId = req.params.pid;

        const product = await productManager.getProductById(productId);

        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ error: 'Producto no encontrado' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al obtener el producto' });
    }

})


app.listen(8080,()=>{
    console.log('escuchando puerto');
})
