const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json());

//ROUTES

//create place
app.post("/places", async(req, res) => {
    try {

        const{placename} = req.body;
        const newPlace = await pool.query("INSERT INTO clientplace (placeNAME) VALUES($1) RETURNING *", 
        [placename]
        );
        res.json(newPlace);
        
    } catch (err) {
        console.error(err.message)
    }
})

//get all places
app.get("/places", async(req,res) => {
    try {
        const allPlaces = await pool.query("SELECT * FROM clientplace")
        res.json(allPlaces.rows)
    } catch (err) {
        console.error(err.message)
    }
})

//get a place
app.get("/places/:id", async (req, res) => {
    try {
        const {id} = req.params
        const place = await pool.query("SELECT * FROM clientplace WHERE placeID = $1", [id])
        res.json(place.rows[0])
    } catch (err) {
        console.error(err.message)
    }
})

//update place
app.put("/places/:id", async (req,res) => {
    try {
        const {id} = req.params
        const {placeNAME} = req.body
        const updatePlace = await pool.query("UPDATE clientplace SET placename = $1 WHERE placeid = $2", 
        [placeNAME, id])

        res.json("Place was updated")
    } catch (err) {
        console.error(err.message)
    }
})

//delete place
app.delete("/places/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const deletePlace = await pool.query("DELETE FROM clientplace WHERE placeID = $1", 
        [id])
        res.json("Place deleted")
    } catch (err) {
        console.error(err.message)
    }
})

app.listen(5000, () => {
    console.log("server has started on port 5000")
})