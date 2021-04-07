module.exports = function (data, path, req, res, next) {
  const errors = data.errors;
  if (errors.length > 0) return next.render(req, res, path, { apiErrors: errors });
};
