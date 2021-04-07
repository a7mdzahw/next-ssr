module.exports = function (apiErrors, field) {
  if (!apiErrors) return;
  return apiErrors.find((err) => err.fields.includes(field));
};
