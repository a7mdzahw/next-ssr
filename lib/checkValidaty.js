module.exports = async function (data, path, req, res, next) {
  const errors = data.errors;
  if (!errors.length > 0) return;
  return new Promise((resolve, reject) => {
    resolve(next.render(req, res, path, { apiErrors: errors, body: req.body }));
  });
};
