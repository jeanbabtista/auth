import { Router } from 'express'
import auth from '../../controllers/auth'
import { customJwtCheck } from '../../middleware/auth'

const router = Router()

router.get('/', auth.getIndex)
router.get('/login', auth.getLogin)
router.post('/login', auth.postLogin)
router.get('/register', auth.getRegister)
router.post('/register', auth.postRegister)
router.get('/protected', customJwtCheck, auth.getProtected)

export default router
