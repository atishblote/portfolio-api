const express = require('express')
const router = express.Router()

const frontend  = require('../controllers/frontendController')

router.get('/skills', frontend.getSkills)
router.get('/projects?limit=4', frontend.getProjects)
router.get('/projects/filter/:id', frontend.getFilterProjects)
router.get('/projects/filter', frontend.getQueryProjects)


module.exports = router
