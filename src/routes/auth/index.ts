import { Router } from 'express'
import passport from 'passport'
import auth from '../../controllers/auth'
import { isAuthenticated, isAdmin } from '../../middleware/auth'
import User from '../../models/User'

const router = Router()

router.get('/', auth.getIndex)
router.get('/login', auth.getLogin)
router.post('/login', passport.authenticate('local'), auth.postLogin)
router.get('/register', auth.getRegister)
router.post('/register', auth.postRegister)
router.get('/protected', isAuthenticated, isAdmin, auth.getProtected)
router.get('/logout', auth.getLogout)

export default router
