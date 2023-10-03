const ErrorHandler = require("../errors/custom-err");
const catchAsyncError = require("../middlewares/err/async-err");
const db = require("../model/connection");

//create api
const addProduct = catchAsyncError(async (req, resp, next) => {
  const loginedUser = req.loginedUser;
  const { name, description, attribute, category, status, feature } = req.body;
  const productStaus = status || true;
  if (!category || !name || !attribute) {
    return next(new ErrorHandler("insufficient credential", 400));
  }
  const productData = await db.product.create({
    Name: name,
    status: productStaus,
    categoryID: category,
    companyID: loginedUser,
    feature: feature,
  });
  const descriptionData = await db.description.create({
    description: description,
    productID: productData.id,
  });
  let arr = await attribute.map((item) => ({
    attributeID: item.id,
    productID: productData.id,
    value: item.value,
  }));
  const attributeValueData = await db.attributeValue.bulkCreate(arr);
  arr = await attribute.map((item) => ({
    price: item.price,
    discount: item.discount,
    attributeValueID: attributeValueData[0].dataValues.id,
  }));
  console.log(arr);
  const prcing = await db.pricing.bulkCreate(arr);
  resp.status(200).json({ message: "product inserted successfully" });
  // .json({ productData, descriptionData, attributeValueData, prcing });
});

//read api

module.exports = { addProduct };
