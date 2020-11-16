import multer from 'multer';
import routes from './routes';

const multerVideo = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, 'uploads/videos/');
    },
  }),
});

export const uploadVideo = multerVideo.single('videoFile');

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = 'WeTube';
  res.locals.routes = routes;
  res.locals.user = {
    isAuthenticated: true,
    id: 1,
  };
  next();
};
