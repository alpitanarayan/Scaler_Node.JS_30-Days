const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: String,
  description: String,
});

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
});

const Category = mongoose.model('Category', categorySchema);
const Product = mongoose.model('Product', productSchema);


async function getProductsPopulatedWithCategory() {
  try {
    const products = await Product.find().populate('category').exec();
    return products;
  } catch (error) {
    console.error('Error fetching products with populated category:', error);
    throw error;
  }
}

(async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/myapp');
    const category = await Category.create({ name: 'Electronics', description: 'Electronic products' });

    await Product.create([
      { name: 'Laptop', price: 999, category: category._id },
      { name: 'Smartphone', price: 599, category: category._id },
    ]);

    const products = await getProductsPopulatedWithCategory();
    console.log(products);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    mongoose.disconnect();
  }
})();
