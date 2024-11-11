class ProductDto {
    constructor(product) {
      this.id = product._id; // Transform _id to id
      this.name = product.name;
      this.description = product.description;
      this.stock = product.stock;
      this.price = product.price;
      this.category = product.category;
      this.images = product.images;
      this.sold = product.sold;
      this.link = product.link;
    }
  }
  
  module.exports = ProductDto;
  