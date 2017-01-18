var express = require('express');
var router = express.Router();

var db = require('monk')('localhost/porkstain');
var posts = db.get('posts');

/* GET home page. */
router.get('/', function(req, res, next) {
  posts.find({}, function(err, docs){
    res.render('index', { posts: docs });
  });
});

router.get('/new', function(req, res, next){
  res.render('new');
});

router.post('/', function(req, res, next){
  posts.insert(req.body);
    res.redirect('/');
});

router.get('/:id', function(req, res, next){
  posts.findOne({_id: req.params.id}, function(err, doc){
    res.render('showPost', {posts: doc});
  });
});

router.get('/:id/editPost', function(req, res, next){
  posts.findOne({_id: req.params.id}, function (err, doc){
    res.render('editPost', doc);
  });
});

router.post('/:id/update', function(req, res, next){
  posts.update({_id: req.params.id}, req.body, function(err, doc){
    res.redirect('/');
  });
});

router.post('/:id/delete', function(req, res, next){
  posts.remove({_id: req.params.id}, function(err, doc){
    res.redirect('/');
  });
});

module.exports = router;
