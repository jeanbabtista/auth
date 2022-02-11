import auth from '../../controllers/auth'
import passport from 'passport'
import { Router } from 'express'

const router = Router()

router.post('/login', auth.postLogin)
router.post('/register', auth.postRegister)
router.get(
    '/protected',
    passport.authenticate('jwt', { session: false }),
    auth.getProtected
)

export default router
