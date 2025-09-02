const mongoose = require('mongoose')
const Skills = require('../models/skillsModel')
const Projects = require('../models/projectModel')


exports.getSkills = async (req , res)=>{
  try {
    const skills = await Skills.find();
    res.status(200).json({
      code: 1,
      skills,
    });
  } catch (error) {
    res.status(500).json({
      code: 0,
      message: error.message || "No Skills found",
    });
  }
};


exports.getProjects = async (req , res)=>{
  try {
    const limit = parseInt(req.query.limit) || 3; // default 10 if not provided
    const projects = await Projects.find().limit(limit);
    res.status(200).json({
      code: 1,
      projects,
    });
  } catch (error) {
    res.status(500).json({
      code: 0,
      message: error.message || "No Projects found",
    });
  }
};


exports.getFilterProjects = async (req , res)=>{
  try {

    const id = req.params.id
    console.log(id)
    const projects = await Projects.find({
      technologySlug: {$in: id}
    });
    res.status(200).json({
      code: 1,
      projects,
    });
  } catch (error) {
    res.status(500).json({
      code: 0,
      message: error.message || "No Projects found",
    });
  }
};

exports.getQueryProjects = async (req, res) => {
  try {
    const { technologySlug } = req.query; // get value from query
    console.log('Query:', technologySlug);

    let projects = [];

    if (!technologySlug || technologySlug === 'all') {
      projects = await Projects.find();
    } else {
      // handle multiple slugs like "wordpress-wix"
      const slugsArray = technologySlug.split('-');
      projects = await Projects.find({
        technologySlug: { $in: technologySlug }
      });
    }

    res.status(200).json({
      code: 1,
      projects,
    });
  } catch (error) {
    res.status(500).json({
      code: 0,
      message: error.message || "No Projects found",
    });
  }
};
