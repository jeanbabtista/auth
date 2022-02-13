import { Router } from 'express'
import auth from '../../controllers/auth'
import { authenticateJWT } from '../../middleware/auth'

const router = Router()

router.post('/login', auth.postLogin)
router.post('/register', auth.postRegister)
router.get('/', auth.getIndex)
router.get('/protected', authenticateJWT, auth.getProtected)

export default router
