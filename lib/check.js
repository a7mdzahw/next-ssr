module.exports = async function (validationFn, path, req, res, next) {
  const { error } = validationFn(req.body);
  if (error) {
    return next.render(req, res, path, { error, body: req.body });
  }
};
