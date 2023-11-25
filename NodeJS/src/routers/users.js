const express = require("express");
const Course = require("../mongoose/models/courses");

//setting up the student router 
const usersRouter = new express.Router();

//write your code here 
usersRouter.get('/', (req, res) => {
    res.send("hi")
})

usersRouter.post('/courses/enroll/:id', async(req, res) => {
    const {id} = req.params // ----------------
    await Course.findById(id)
    .then( async(data, err) => {
        if(data.isApplied) {
            res.status(403).json({ 
                "error": "You have already applied for this course"
            })
        } else {
            data.isApplied = true;
            await data.save();
            res.status(200).json({
                "message": "You have successfully enrolled for the course"
            })
        } 
    } )
    .catch(e => {
        res.status(400).json({
            "error": "Error"
        })
    })
})

usersRouter.delete('/courses/drop/:id', async(req, res) => {
    const {id} = req.params // ----------------
    await Course.findById(id)
    .then( async(data, err) => {
        if(!data.isApplied) {
            res.status(403).json({ 
                "error": "You have not enrolled for this course"
            })
        } else {
            data.isApplied = false;
            await data.save();
            res.status(200).json({
                "message": "You have dropped the course"
            })
        } 
    } )
    .catch(e => {
        res.status(400).json({
            "error": "Error"
        })
    })
})

usersRouter.get('/courses/get', async(req, res) => {

    await Course.find()
    .then( async(data, err) => {
        res.status(200).send(data)
    } )
    .catch(e => {
        res.status(400).json({ 
            "error" : e
        })
    })
})

usersRouter.patch('/courses/rating/:id', async(req, res) => {
    const {id} = req.params
    const { rating } = req.body
    await Course.findById(id)
    .then( async(data, err) => {
        if( data.isRated) {
            return  res.status(403).json({ 
                "error": "You have already rated this course"
            })
        }
        if( !data.isApplied) {
            return res.status(403).json({ 
                "error": "You have not enrolled for this course"
            })
        }
        data.rating = (( data.noOfRatings*data.rating)+rating)/ (data.noOfRatings+1)
        data.noOfRatings = data.noOfRatings +1;
        data.isRated  = true;
        data.rating = Math.round(data.rating * 10) / 10;
        await data.save()
        res.status(200).json({ 
            "message": "You have rated this course"
        })
    } )
    .catch(e => {
        res.status(400).json({ 
            "error": e
        })
    })
})

module.exports = usersRouter;
