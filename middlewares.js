import routes from './routes';
import multer from 'multer';

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
