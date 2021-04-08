module.exports = async function (data, path, req, res, next) {
  const errors = data.errors;

  return new Promise((resolve, reject) => {
    if (errors.length > 0) return reject(next.render(req, res, path, { apiErrors: errors }));
    return resolve("done");
  });
};
