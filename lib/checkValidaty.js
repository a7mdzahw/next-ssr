import allerrors from "../errors.json";

export default function (req, res, data) {
  const errors = data.errors || allerrors.errors;

  req.session.apiErrors = errors;
  return req.session.apiErrors.length > 0;
}
