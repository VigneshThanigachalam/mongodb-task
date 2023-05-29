import mongoose from 'mongoose';

const conn = mongoose.connect('mongodb://127.0.0.1:27017/mongodb')
    .then(() => console.log('Connected!'));


const productSchema = mongoose.Schema({
    id: { type: String, unique: true, required: true, },
    product_name: { type: String, required: true, },
    product_price: { type: Number, required: true, },
    product_material: { type: String, required: true, },
    product_color: { type: String, required: true, }
});

const productModel = mongoose.model('products', productSchema);

// Find all the information about each products

const allProducts= await productModel.find({})

// console.log(allProducts);


// Find the product price which are between 400 to 800

const productBetween = await productModel.find({product_price:{$gte: 400, $lte:800}});

// console.log(productBetween);


// Find the product price which are not between 400 to 600

const productNotBetween = await productModel.find({product_price:{ $not: {$gte: 400, $lte:800}}});

// console.log(productNotBetween);

// List the four product which are grater than 500 in price 

const productFour = await productModel.find({product_price:{$gt: 500}}).limit(4);

// console.log(productFour);

// Find the product name and product material of each products

const productNameAndMaterial = await productModel.find({}).select("product_name product_material");

// console.log(productNameAndMaterial);


// Find the product with a row id of 10

const productWithId = await productModel.find({id:"10"});

// console.log(productWithId);


// Find only the product name and product material

const productNameAndMaterialOnly = await productModel.find({}).select("product_name product_material -_id");

// console.log(productNameAndMaterialOnly);

// Find all products which contain the value of soft in product material

const productMaterialSoft = await productModel.find({product_material: "Soft"});

// console.log(productMaterialSoft);

// Find products which contain product color indigo  and product price 492.00

const productIndigoAndPrice = await productModel.find({$and: [{product_color: "indigo"}, {product_price: 492.00}]});

// console.log(productIndigoAndPrice);

// Delete the products which product price value are same

const allProductsList= await productModel.find({})

const collectSamePriceProduct =[];

for(let obj of allProductsList){
	for(let ele of allProductsList){
		if(obj==ele)
			continue;
		if(ele.product_price===obj.product_price){
			collectSamePriceProduct.push(ele.id);
			break;
		}
	}
}

const productDelect = await productModel.deleteMany({id: {$in: collectSamePriceProduct}});
