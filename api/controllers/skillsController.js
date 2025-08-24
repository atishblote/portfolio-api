const mongoose = require("mongoose");
const Skills = require("../models/skillsModel");

exports.postSkills = async (req, res) => {

    
  try {
    const slug =  req.body.title
    .toString()                     // convert to string
    .toLowerCase()                  // convert to lowercase
    .trim()                         // remove spaces from start & end
    .replace(/\s+/g, '-')           // replace spaces with -
    .replace(/[^\w\-]+/g, '')       // remove all non-word chars
    .replace(/\-\-+/g, '-')         // replace multiple - with single -
    .replace(/^-+/, '')             // trim - from start
    .replace(/-+$/, ''); 

    const skills = new Skills({
      title: req.body.title,
      slug: slug
    });

    await skills.save();

    res.status(201).json({
      code: 1,
      message: "✅ Skills created successfully",
      skills,
    });
  } catch (error) {
    res.status(500).json({
      code: 0,
      message: error.message || "Something went wrong",
    });
  }
};

exports.getSkills = async (req, res) => {
  try {
    const skills = await Skills.find();
    res.status(200).json({
      code: 1,
      skills,
    });
  } catch (error) {
    res.status(500).json({
      code: 0,
      message: error.message || "Something went wrong",
    });
  }
};


exports.deleteSkills = async (req , res) =>{
    try {

        const result = await Skills.deleteOne({ _id: req.params.id });

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