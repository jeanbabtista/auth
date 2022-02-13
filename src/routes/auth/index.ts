import { Router } from 'express'
import passport from 'passport'
import auth from '../../controllers/auth'

const router = Router()

router.post('/login', auth.postLogin)
router.post('/register', auth.postRegister)
router.get('/', auth.getIndex)
router.get(
    '/protected',
    passport.authenticate('jwt', { session: false }),
    auth.getProtected
)

export default router
