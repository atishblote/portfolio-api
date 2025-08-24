const mongoose = require("mongoose");
const { Schema } = mongoose;

const skills = new Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  }
);



module.exports = mongoose.model('Skills', skills)