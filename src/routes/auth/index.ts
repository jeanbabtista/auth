import { Router } from 'express'
import passport from 'passport'
import auth from '../../controllers/auth'
import { isAuthenticated, isAdmin } from '../../middleware/auth'

const router = Router()

router.get('/', auth.getIndex)
router.get('/protected', isAuthenticated, isAdmin, auth.getProtected)
router.post('/register', auth.postRegister)
router.post('/login', passport.authenticate('local'), auth.postLogin)
router.get('/logout', auth.getLogout)

export default router
