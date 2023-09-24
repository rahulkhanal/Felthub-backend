const catchAsyncError = require("../middlewares/err/async-err");

const addBanner = catchAsyncError(async (req, resp, next) => {});

module.exports = { addBanner };
