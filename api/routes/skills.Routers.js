const express = require('express')
const router = express.Router()
const skills = require('../controllers/skillsController')


router.post("", skills.postSkills )
router.get("", skills.getSkills )
router.delete("/:id", skills.deleteSkills )


module.exports = router
