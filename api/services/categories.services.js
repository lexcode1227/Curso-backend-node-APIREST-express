const { faker } = require('@faker-js/faker');

class CategoriesServices {
  constructor(){
    this.categories = [];
    this.generate();
  }

  generate(){
    const limit = 100;
    for(let i = 0; i < limit ; i++){
      this.products.push({
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
      })
    }
  }

  create() {

  }

  find() {
    return this.products;
  }

  findOne(id) {
    return this.products.find((item)=> item.id === id);
  }

  update() {

  }

  delete() {

  }
}

module.exports = CategoriesServices;
