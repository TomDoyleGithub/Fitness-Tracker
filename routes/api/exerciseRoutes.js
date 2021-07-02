// The front-end api file will give you a large hint to what back-end request you will have to do here
const router = require('express').Router();
const db = require('../../models');

// Async function that is used in the following get routes
async function getWorkouts(req, res) {
    try {
        const workoutData = await db.Workout.find({})
        res.status(200).json(workoutData)
    } catch (err) {
        res.status(400).json(err)
    }
}

// Route to get workouts
router.get('/', getWorkouts)

// Route to get workouts
router.get('/range', getWorkouts)

// Route to create workouts
router.post('/', async (req, res) => {
    try {
        const newWorkout = await db.Workout.create(req.body)
        res.status(200).json(newWorkout)
    } catch (err) {
        res.status(400).json(err)
    }
})

// Route to create exercises
router.put('/:id', async (req, res) => {
    try{
        const addExercise = await db.Workout.findByIdAndUpdate(req.params.id,
            {
                $push: { 
                    exercises: req.body 
                }
            },
        );
        res.status(200).json(addExercise)
    } catch (err) {
        res.status(400).json(err)
    }
})

module.exports = router;