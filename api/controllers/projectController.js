const mongoose = require("mongoose");
const Project = require("../models/projectModel");
const cloudinary = require("../helper/cloudinary");

exports.postProject = async (req, res) => {
  try {
    const slug =  req.body.technology
    .toString()                     // convert to string
    .toLowerCase()                  // convert to lowercase
    .trim()                         // remove spaces from start & end
    .replace(/\s+/g, '-')           // replace spaces with -
    .replace(/[^\w\-]+/g, '')       // remove all non-word chars
    .replace(/\-\-+/g, '-')         // replace multiple - with single -
    .replace(/^-+/, '')             // trim - from start
    .replace(/-+$/, ''); 
    // 1. Check if file exists
    if (!req.files || !req.files.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const file = req.files.file;

    // 2. Upload file to Cloudinary
    const uploaded = await cloudinary.uploader.upload(file.tempFilePath, {
      folder: "portfolio_projects",
      overwrite: true,
    });

    // 3. Create project document
    const project = new Project({
      title: req.body.title,
      shortDetails: req.body.short_details,
      technology: req.body.technology,
      technologySlug: slug,
      startProject: req.body.start_project,
      endProject: req.body.end_project,
      projectUrl: req.body.project_url,
      imageUrl: uploaded.secure_url, 
    });

    // 4. Save project
    await project.save();

    res.status(201).json({
      code: 1,
      message: "✅ Project created successfully",
      project,
    });
  } catch (error) {
    res.status(500).json({
      code: 0,
      message: error.message || "Something went wrong",
    });
  }
};


exports.getProjects = async (req, res) =>{
    try {

        // 4. Save project
    const project = await Project.find();

    res.status(200).json({
      code: 1,
      project,
    });
        
    } catch (error) {
        res.status(500).json({
            code: 0,
            message: error.message || "Something went wrong",
        });
    }
}


exports.deleteProject = async (req , res) =>{
    try {

        const result = await Project.deleteOne({ _id: req.params.id });

        res.status(200).json({
            code: 1,
            result,
        });
        
    } catch (error) {
        res.status(500).json({
            code: 0,
            message: error.message || "Something went wrong",
        });
    }
}