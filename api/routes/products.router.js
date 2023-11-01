const expres = require('express');
const ProductsServices = require('../services/product.services');
const validatorHandler = require('../middlewares/validator.handler');
const { getProductSchema, createProductSchema, updateProductSchema } = require('../schema/product.schema');

const router = expres.Router();
const service = new ProductsServices();

//GET
router.get('/', async (req, res)=> {
  let { limit } = req.query;
  limit = limit || 10;
  const products = await service.find(limit);
  res.status(200).json({
    size: products.length,
    products
  });
})

router.get('/filter', (req, res)=>{
  res.send('I am a filter')
})

//rutas dinamicas por regla van despues de rutas especificas, sino genera bug en las rutas.

router.get('/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await service.findOne(id);
      res.json(product);
    } catch (error) {
      next(error);
      //Se agrega el next para atrapar de forma explicita el error con el Middleware.
    }
  })

//POST
router.post('/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res)=>{
    const body = req.body;
    const newProduct = await service.create(body);
    res.status(201).json(newProduct);
})

//PATCH
router.patch('/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next)=>{
    try {
      const { id } = req.params;
      const body = req.body;
      const product = await service.update(id, body)
      res.json(product);
    } catch (error) {
      next(error);
    }
  })

//DELETE
router.delete('/:id', async (req, res)=>{
  const { id } = req.params;
  const rta = await service.delete(id);
  res.json({
    message: 'deleted',
    rta
  });
})

module.exports = router;
