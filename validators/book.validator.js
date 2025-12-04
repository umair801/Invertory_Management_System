const { body, validationResult, param } = require("express-validator");

const createBookValidation = [
  body("bookName")
    .notEmpty()
    .withMessage((value, { req }) => req.t("bookNameRequired"))
    .isLength({ min: 5, max: 100 })
    .withMessage((value, { req }) => req.t("bookNameValidation")),
  body("price")
    .notEmpty()
    .withMessage((value, { req }) => req.t("priceRequired"))
    .isFloat({ min: 0, max: 10000 })
    .withMessage((value, { req }) => req.t("priceValidation")),
  body("countInStock")
    .notEmpty()
    .withMessage((value, { req }) => req.t("countInStockRequired"))
    .isInt({ min: 0, max: 1000 })
    .withMessage((value, { req }) => req.t("countInStockValidation")),
  body("image")
    .optional()
    .isURL()
    .withMessage(( { req }) => req.t("imageValidation")),
];

const updateBookValidation = [
  body("bookName")
    .optional()
    .isLength({ min: 5, max: 100 })
    .withMessage(( { req }) => req.t("bookNameValidation")),
  body("price")
    .optional()
    .isFloat({ min: 0, max: 10000 })
    .withMessage(( { req }) => req.t("priceValidation")),
  body("countInStock")
    .optional()
    .isInt({ min: 0, max: 1000 })
    .withMessage(( { req }) => req.t("countInStockValidation")),
  body("image")
    .optional()
    .isURL()
    .withMessage(( { req }) => req.t("imageValidation")),
];

const idValidation = [
  param("id")
    .isMongoId()
    .withMessage((value, { req }) => req.t("idValidation"))
];

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  createBookValidation,
  updateBookValidation,
  idValidation,
  handleValidationErrors,
};
