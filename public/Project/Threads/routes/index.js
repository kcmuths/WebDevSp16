
/* GET/posts : return all the posts for user */

var mongoose = require('mongoose');
var Post = mongoose.model('Post');
var Comment = mongoose.model('Comment');

/* url route for posts */
router.get('/posts', function(req, res, next){
    Post.find(function(err, posts){
        if(err) {
            return next(err);
        }
        res.json(posts);
    });
});

/* POST : Post request to server */

router.post('/posts', function(req, res, next){
    var post = new Post(req.body);
    post.save(function(err, post){
        if(err){
            return next(err);
        }
        res.json(post);
    });
});

/* preload post Objects (no redundancy) */

router.param('post', function(req, res, next, id){
    var query = Post.findById(id);
    query.exec(function(err, post){
        if(err)
        {
            return next(err);
        }
        if(!post)
        {
            return next(new Error('cannot find any posts'));
        }
        req.post = post;
        return next();
    });
});

/*return a Single POST */
router.get('/posts/:post', function(req,res, next){
    req.post.populate('comments', function(err, post){
        if(err){
            return next(err);

        }
        res.json(req.post);
    });
});

router.put('/posts/:post/upvote', function(req, res, next){
    req.post.upvote(function(err, post){
        if(err){
            return next(err);
        }
        res.json(post);
    });
});

/* COMMENTS */
router.post('/posts/:post/comments', function(req,res, next){
    var comment = new Comment(req.body);
    comment.post = req.post;
    comment.save(function(err, comment){
        if(err)
        {
            return next(err);
        }
        req.post.comments.push(comment);
        req.post.save(function(err, post){
            if(err)
            {
                return next(err);
            }
            res.json(comment);
        });
    });
});

router.param('comment', function(req, res, next, id){
    var query = Comment.findById(id);
    query.exec(function(err, comment){
        if(err)
        {
            return next(err);
        }
        if(!comment)
        {
            return next(new Error('cannot find any comments'));
        }
        req.comment = comment;
        return next();
    });
});

router.put('/posts/:post/comments/:comment/upvote', function(req, res, next){
    req.comment.upvote(function(err, comment){
        if(err){
            return next(err);
        }
        res.json(comment);
    });
});

/* populate posts with comments */


