const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
  bookName: {
    type: String,
    required: [true, "Book name is required"],
    minlength: [5, "Book name must be at least 5 characters long"],
    maxlength: [100, "Book name must be at most 100 characters long"],
  },
  countInStock: {
    type: Number,
    required: [true, "Count in stock is required"],
    min: [0, "Count in stock cannot be negative"],
    max: [1000, "Count in stock cannot exceed 1000"],
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
    min: [0, "Price cannot be negative"],
    max: [10000, "Price cannot exceed 10000"],
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  image: {
    type: String,
    default: "",
    validate: {
      validator: function (value) {
        if (!value) return true;
        return /^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(value);
      },
      message: (props) => `${props.value} is not a valid image URL`,
    },
  },
});

bookSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

bookSchema.set("toJSON", {
  virtuals: true,
});

module.exports = mongoose.model("Book", bookSchema);
