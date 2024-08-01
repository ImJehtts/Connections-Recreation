const express = require('express')
const {
    get_current_wb,
    createWb,
    delete_wordbank
} = require('../controllers/word_bankcontroller')

const router = express.Router()

router.get('/', get_current_wb)

router.post('/', createWb)

router.delete('/', delete_wordbank)


module.exports = router