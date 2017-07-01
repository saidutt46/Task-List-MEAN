var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://saidutt46:hunk46@ds143342.mlab.com:43342/mytasklist46', ['tasks']);

//this will get all tasks from db
router.get('/tasks', function(req, res, next) {
    db.tasks.find(function(err, tasks) {
        if (err) {
            res.send(err);
        }
        res.json(tasks);
    });
});

//this will get single task from db according to id
router.get('/tasks/:id', function(req, res, next) {
    db.tasks.findOne({ _id: mongojs.ObjectId(req.params.id) }, function(err, task) {
        if (err) {
            res.send(err);
        }
        res.json(task);
    });
});

//Save Task

router.post('/task', function(req, res, next) {
    var task = req.body;
    if (!task.title || !(task.isDone + '')) {
        res.status(400);
        res.json({
            "error": "Bad data entry"
        });
    } else {
        db.tasks.save(task, function(err, task) {
            if (err) {
                res.send(err);
            }
            res.json(task);
        });
    }
});

//Delete task
router.delete('/tasks/:id', function(req, res, next) {
    db.tasks.remove({ _id: mongojs.ObjectId(req.params.id) }, function(err, task) {
        if (err) {
            res.send(err);
        }
        res.json(task);
    });
});

//Update task
router.put('/tasks/:id', function(req, res, next) {
    var task = req.body;
    var updTask = {};

    if (task.isDone) {
        updTask.isDone = task.isDone;
    }
    if (task.title) {
        updTask.title = task.title;
    }

    if (!updTask) {
        res.status(400);
        res.json({
            "error": "Bad data again"
        });
    } else {
        db.tasks.update({ _id: mongojs.ObjectId(req.params.id) }, updTask, {}, function(err, task) {
            if (err) {
                res.send(err);
            }
            res.json(task);
        });

    }

});

module.exports = router;