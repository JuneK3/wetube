import multer from 'multer';
import routes from './routes';

const multerVideo = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, 'uploads/videos/');
    },
  }),
});

const multerAvatar = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, 'uploads/avatars/');
    },
  }),
});

export const uploadVideo = multerVideo.single('videoFile');

export const uploadAvatar = multerAvatar.single('avatar');

export const onlyPublic = (req, res, next) => {
  if (req.user) {
    res.redirect(routes.home);
  } else {
    next();
  }
};

export const onlyPrivate = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect(routes.home);
  }
};

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = 'WeTube';
  res.locals.routes = routes;
  res.locals.loggedUser = req.user || {};
  next();
};
