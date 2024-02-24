//CRUD operation in mongoose
const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/E-COMMERCE");

const ProductSchema = new mongoose.Schema({
      name: String,
      price:Number,
      category:String,
      brand:String,
});

//updateIdDB();
const updateIdDB = async ()=>{
    const Product = mongoose.model('products',ProductSchema);
    let data = await Product.updateOne(
        {name: "note 5"},
        {
            $set:{price:7000}
        }
    )
    console.log(data);
}

//deleteInDB();
const deleteInDB = async ()=>{
    const Product = mongoose.model('products',ProductSchema);
    let data = await Product.deleteOne({name:'m8'});
    console.log(data);
}


//saveInDB();
const saveInDB = async()=>{
  const Product  = mongoose.model('product',ProductSchema);
  let data = new Product({ name: "m8",
        price:1000,
        brand:"max", 
        category:"Mobile"
    });
  const result = await data.save();
  console.log(result);

}

const findInDB = async ()=>{
    const Product = mongoose.model('products',ProductSchema);
    let data = await Product.find();

    //for any specific data --->     Product.find({name:'m8'})
    console.log(data);
}
findInDB();