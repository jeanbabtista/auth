import { Router } from 'express'
import passport from 'passport'
import { customJwtCheck } from '../../middleware/auth'
import auth from '../../controllers/auth'

const router = Router()

router.get(
    '/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
)
router.get(
    '/google/callback',
    passport.authenticate('google', { session: false })
)
router.get('/', auth.getIndex)
router.get('/protected', customJwtCheck, auth.getProtected)

export default router
