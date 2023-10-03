const ErrorHandler = require("../errors/custom-err");
const catchAsyncError = require("../middlewares/err/async-err");
const db = require("../model/connection");

//create api
const addProduct = catchAsyncError(async (req, resp, next) => {
  const loginedUser = req.loginedUser;
  const { name, description, attribute, category, status } = req.body;
  const productStaus = status || true;
  if (!category || !name || !attribute) {
    return next(new ErrorHandler("insufficient credential", 400));
  }
  const productData = await db.product.create({
    Name: name,
    status: productStaus,
    categoryID: category,
    companyID: loginedUser,
  });
  const descriptionData = await db.description.create({
    description: description,
    productID: productData.id,
  });
  const arr = await attribute.map((item) => ({
    attributeID: item.id,
    productID: productData.id,
  }));
  const attributeValueData = await db.attributeValue.bulkCreate(arr);
  //   const attributeValueData = await db.attributeValue.bulkCreate({

  //   })
  resp.status(200).json({ productData, descriptionData, attributeValueData });
});

//read api

module.exports = { addProduct };
