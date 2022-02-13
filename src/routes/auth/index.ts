import { Router } from 'express'
import passport from 'passport'
import { authenticateJWT } from '../../middleware/auth'
import auth from '../../controllers/auth'

const router = Router()

router.get(
    '/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
)
router.get(
    '/google/callback',
    passport.authenticate('google', {
        session: false
    }),
    auth.getGoogleCallback
)
router.get('/', auth.getIndex)
router.get('/protected', authenticateJWT, auth.getProtected)

export default router
