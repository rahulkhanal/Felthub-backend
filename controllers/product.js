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
    categoryId: category,
    companyId: loginedUser,
    feature: feature,
  });
  const descriptionData = await db.description.create({
    description: description,
    productId: productData.id,
  });
  let arr = await attribute.map((item) => ({
    attributeId: item.id,
    productId: productData.id,
    value: item.value,
  }));
  const attributeValueData = await db.attributeValue.bulkCreate(arr);
  const newArray = [];
  await attributeValueData.map(async (item1) => {
    newArray.push(item1.dataValues.id);
  });
  arr = await attribute.map((item, index) => ({
    price: item.price,
    discount: item.discount,
    attributeValueId: newArray[index],
  }));

  const pricing = await db.pricing.bulkCreate(arr);
  resp.status(200).json({ message: "product inserted successfully" });
  // .json({ productData, descriptionData, attributeValueData, prcing });
});

//read api
const getProduct = catchAsyncError(async (req, resp, next) => {
  const loginedUser = req.loginedUser;
  const data = await db.product.findAll({
    include: [
      {
        model: db.category,
        attributes: ["Name"],
      },
      {
        model: db.description,
        attributes: ["description"],
      },
      {
        model: db.attributeValue,
        attributes: ["value"],
        include: [
          {
            model: db.attribute,
            attributes: ["type"],
          },
          {
            model: db.pricing,
            attributes: ["price", "discount"],
          },
        ],
      },
    ],
    attributes: ["id", "Name", "image", "status", "feature"],
    where: {
      companyId: loginedUser,
    },
  });
  // Process the data to flatten it
  const flattenedData = data.map((item) => ({
    id: item.id,
    Name: item.Name,
    image: item.image,
    status: item.status,
    feature: item.feature,
    category: item["category.Name"], // Extract the category name
    description: item["description.description"], // Extract the description
    attributeInformation: item["attributeValues"].map((subItem) => {
      return {
        type: subItem.attribute.type,
        value: subItem.value,
        pricing: subItem.pricings[0],
      };
    }),
  }));

  resp.status(200).json({ message: "success", data: flattenedData });
});

const deleteProduct = catchAsyncError(async (req, resp, next) => {
  const loginedUser = req.loginedUser;
  const { id } = req.params;
  const existingUser = await db.product.findAll({
    where: {
      id,
      companyId: loginedUser,
    },
  });
  if (!existingUser) {
    return next(new ErrorHandler("Invalid Product", 400));
  }
  const data = await db.product.destroy({
    where: {
      id,
      companyId: loginedUser,
    },
  });
  if (data > 0) {
    resp.status(200).json({ message: "Deleted successfully", data });
  } else {
    next(new ErrorHandler("Invalid product", 400));
  }
});
module.exports = { addProduct, getProduct, deleteProduct };
