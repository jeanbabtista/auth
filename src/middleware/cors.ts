import { Request, Response, NextFunction } from 'express'

const checkCors = (req: Request, res: Response, next: NextFunction) => {
    const allowedOrigins = ['*']
    const { origin } = req.headers
    if (!origin) return next()

    if (allowedOrigins.indexOf(origin) > -1)
        res.setHeader('Access-Control-Allow-Origin', origin)

    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    )

    res.header('Access-Control-Expose-Headers', 'Content-Disposition')

    next()
}

export { checkCors }
