import { Router } from 'express';
import { celebrate, Segments } from 'celebrate';

import {
  loginUser,
  logoutUser,
  refreshUserSession,
  registerUser,
} from '../controllers/authController.js';

import {
  loginUserSchema,
  registerUserSchema,
} from '../validations/authValidation.js';

const router = Router();

router.post(
  '/auth/register',
  celebrate({
    [Segments.BODY]: registerUserSchema,
  }),
  registerUser,
);

router.post(
  '/auth/login',
  celebrate({
    [Segments.BODY]: loginUserSchema,
  }),
  loginUser,
);

router.post('/auth/refresh', refreshUserSession);

router.post('/auth/logout', logoutUser);

export default router;