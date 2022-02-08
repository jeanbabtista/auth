import { Router } from 'express'
import passport from 'passport'
import auth from '../../controllers/auth'

const router = Router()

router.get('/', auth.getIndex)
router.get('/login', auth.getLogin)
router.post(
    '/login',
    passport.authenticate('local', {
        failureRedirect: '/auth/login-failure',
        successRedirect: '/auth/login-success'
    }),
    auth.postLogin // this never gets executed, since we go to /login-failure or /login-success
)
router.get('/register', auth.getRegister)
router.post('/register', auth.postRegister)
router.get('/protected', auth.getProtected)
router.get('/logout', auth.getLogout)
router.get('/login-success', auth.getLoginSuccess)
router.get('/login-failure', auth.getLoginFailure)

export default router
