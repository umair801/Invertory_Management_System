const express = require("express");
const BookModel = require("../models/Book.model");
const {
  createBookValidation,
  updateBookValidation,
  idValidation,
  handleValidationErrors,
} = require("../validators/book.validator");

const router = express.Router();

router.post(
  "/",
  createBookValidation,
  handleValidationErrors,
  async (req, res) => {
    try {
      const newBook = await BookModel.create(req.body);

      res.status(201).json(newBook);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);

router.get("", async (req, res) => {
  try {
    const bookList = await BookModel.find();
    res.status(200).json(bookList);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/:id", idValidation, handleValidationErrors, async (req, res) => {
  try {
    const { id } = req.params;
    const book = await BookModel.findById(id);

    if (!book) {
      return res.status(404).json({ message: req.t("bookNotFound") });
    }

    res.status(200).json(book);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete(
  "/:id",
  idValidation,
  handleValidationErrors,
  async (req, res) => {
    try {
      const { id } = req.params;
      const book = await BookModel.findByIdAndDelete(id);

      if (!book) {
        return res.status(404).json({ message: req.t("bookNotFound") });
      }
      res.status(200).json({ message: req.t("bookDeletedSuccessfully") });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);

// full update
router.put(
  "/:id",
  idValidation,
  updateBookValidation,
  handleValidationErrors,
  async (req, res) => {
    try {
      const { id } = req.params;
      const updatedBook = await BookModel.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });

      if (!updatedBook) {
        return res.status(404).json({ message: req.t("bookNotFound") });
      }
      res.status(200).json({
        message: req.t("bookUpdatedSuccessfully"),
        book: updatedBook,
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);

// partial update
router.patch(
  "/:id",
  idValidation,
  updateBookValidation,
  handleValidationErrors,
  async (req, res) => {
    try {
      const { id } = req.params;
      const updatedBook = await BookModel.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });

      if (!updatedBook) {
        return res.status(404).json({ message: req.t("bookNotFound") });
      }
      res.status(200).json(req.t("bookUpdatedSuccessfully"), updatedBook);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);

module.exports = router;
