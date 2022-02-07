import { Router } from 'express'
import passport from 'passport'
import auth from '../../controllers/auth'

const router = Router()

router.get('/', auth.getIndex)
router.get('/login', auth.getLogin)
router.post(
    '/login',
    passport.authenticate('local', {
        failureRedirect: '/login-failure',
        successRedirect: '/login-success'
    }),
    auth.postLogin
)
router.get('/register', auth.getRegister)
router.post('/register', auth.postRegister)
router.get('/protected', auth.getProtected)
router.get('/logout', auth.getLogout)
router.get('/login-success', auth.getLoginSuccess)
router.get('/login-failure', auth.getLoginFailure)

export default router
