import { Router } from 'express';
import * as Posts from './controllers/post_controller';
import * as UserController from './controllers/user_controller';
import { requireAuth, requireSignin } from './services/passport';

const router = Router();

router.post('/signin', requireSignin, UserController.signin);

router.post('/signup', UserController.signup);

router.get('/profile', requireAuth, UserController.getUser);

router.get('/', (req, res) => {
  res.json({ message: 'welcome to our blog api!' });
});

router.route('/posts/:id')
  .get((req, res) => {
    Posts.getPost(req, res);
  })
  .put(requireAuth, (req, res) => {
    Posts.updatePost(req, res);
  })
  .delete(requireAuth, (req, res) => {
    Posts.deletePost(req, res);
  });

router.route('/posts')
  .get((req, res) => {
    Posts.getPosts(req, res);
  })
  .post(requireAuth, (req, res) => {
    Posts.createPost(req, res);
  });

// /your routes will go here

export default router;
