const express = require('express');
const router = express.Router()

router.get('/', (req, res) => {
    // res.json([{ name: "Amit", scores: { score: [30, 40, 50] }}])
    res.json({ name: "Amit", scores: { score: [30, 40, 50] }})
})

module.exports = router