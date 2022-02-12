import { Router } from 'express'
import authRoute from '../routes/auth'

const router = Router()

router.use('/auth', authRoute)

export = router
