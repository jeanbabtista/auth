import { Router } from 'express'
import { authenticateJWT } from '../../middleware/auth'
import auth from '../../controllers/auth'

const router = Router()

router.get('/google', auth.getGoogleLogin)
router.get('/google/callback', auth.getGoogleCallback)
router.get('/', auth.getIndex)
router.get('/protected', authenticateJWT, auth.getProtected)

export default router
