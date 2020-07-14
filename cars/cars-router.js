const express = require('express');
const knex = require('knex');

const db = require('../data/connections')

const router = express.Router()

router.get("/", (req, res) => {
    db('cars')
    .then(cars => {
        res.status(200).json(cars);
    })
    .catch(error => {
        res.status(500).json(error.message)
    })
})

router.get("/:id", (req,res) => {
    const {id} = req.params

    db('cars')
        .where({id})
        .first()
        .then(car => {
            if (car != null) {
                res.status(200).json(car)
            }
            else {
                res.status(400).json({message: "Car not found"})
            }
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({message: error.message})
        })
})

router.post("/", (req, res) => {
    const carData = req.body

    db('cars')
        .insert(carData, "id")
        .then((ids) => {
            db('cars')
                .where({id: ids[0]})
                .first()
                .then(car => {
                    res.status(201).json({car})
                })
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({message: error.message})
        })

})

module.exports = router;
