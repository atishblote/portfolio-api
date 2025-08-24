const mongoose = require("mongoose");
const { Schema } = mongoose;

const projectSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    shortDetails: { type: String, required: true, trim: true },
    technology: { type: String, required: true, trim: true },
    technologySlug: { type: String, required: true, uniqe: true },
    startProject: { type: Date },
    endProject: { type: Date },
    projectUrl: { type: String, trim: true },
    imageUrl: { type: String, required: true, trim: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Projects", projectSchema);
