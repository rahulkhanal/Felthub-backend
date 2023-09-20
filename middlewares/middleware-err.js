module.exports = (err, res, resp, next) => {
  err.statuscode = err.statuscode || 500;
  err.message = err.message || "Internal Server Error";
  resp.status(err.statuscode).json({
    success: false,
    message: err.message,
  });
};
