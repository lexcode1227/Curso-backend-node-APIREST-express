const expres = require('express');
const { faker } = require('@faker-js/faker');

const router = expres.Router();

//GET
router.get('/', (req, res) =>{
  res.json(
    [
      {
        name: 'category 1',
        product: {
          name: 'product 1',
          brand: 'brand 1'
        }
      },
      {
        name: 'category 2',
        product: {
          name: 'product 2',
          brand: 'brand 1'
        }
      },
      {
        name: 'category 3',
        product: {
          name: 'product 1',
          brand: 'brand 3'
        }
    }
  ]
  )
});
router.get('/:categoryId', (req, res) => {
  const { categoriasId } = req.params;
   res.json({
    categoriasId,
    name: 'category 3',
    product: {
      name: 'product 1',
      brand: 'brand 3'
    }
   });
})

router.get('/:categoryId/products/:productId', (req, res) => {
  const { categoryId, productId } = req.params;
  res.json({
    categoryId,
    productId
  })
})

module.exports = router;
