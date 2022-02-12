import passport from 'passport'
import { Router } from 'express'
import auth from '../../controllers/auth'
import { customJwtCheck } from '../../middleware/auth'

const router = Router()

router.get(
    '/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
)
router.get(
    '/google/callback',
    passport.authenticate('google', { session: false }),
    auth.getGoogleCallback
)
router.get('/protected', customJwtCheck, auth.getProtected)

export default router
