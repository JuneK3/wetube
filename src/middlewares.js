import path from 'path';
import multer from 'multer';
import multerS3 from 'multer-s3';
import aws from 'aws-sdk';
import routes from './routes';

aws.config.loadFromPath(path.join(__dirname, 'awsconfig.json'));

const s3 = new aws.S3();

const multerVideo = multer({
  storage: multerS3({
    s3,
    bucket: 'wetube-v1/videos',
    acl: 'public-read',
  }),
});

const multerAvatar = multer({
  storage: multerS3({
    s3,
    bucket: 'wetube-v1/avatars',
    acl: 'public-read',
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
  res.locals.loggedUser = req.user || null;
  next();
};
