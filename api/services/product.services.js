const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');

class ProductsServices {
  constructor(){
    this.products = [];
    this.generate();
  }

  async generate(limit){
    for(let i = 0; i < (limit || 10) ; i++){
      this.products.push({
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.url(),
        isBlock: faker.datatype.boolean(),
      })
    }
  }

  async create(data) {
    const newProduct = {
      id: faker.string.uuid(),
      ...data
    }
    this.products.push(newProduct);
    return newProduct;
  }

  async find() {
    return new Promise((resolve, reject) => {
      setTimeout(()=>{
        resolve(this.products);
      }, 5000)
    })
  }

  async findOne(id) {
    const product = this.products.find((item)=> item.id === id);
    if (!product) {
      throw boom.notFound('Product not found');
    }
    if (product.isBlock) {
      throw boom.conflict('Product is blocked')
    }
    return product;
  }

  async update(id, changes) {
    const index = this.products.findIndex((item)=> item.id === id);

    if (index === -1) {
      throw boom.notFound('Product not found');
    }
    const product = this.products[index];
    this.products[index] = {
    //Esto se hace para no eliminar todo el elem por lo que se quiere cambiar, sino que quiero persistir todo lo que hay de las caracteristicas del producto y que le sumes los nuevos cambios.
      ...product,
      ...changes
    };
    return this.products[index];
  }

  async delete(id) {
    const index = this.products.findIndex((item)=> item.id === id);
    if (index === -1) {
      throw boom.notFound('Product not found');
    }
    this.products.splice(index, 1);
    return { id };

  }
}

module.exports = ProductsServices;
