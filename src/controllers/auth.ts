import { Request, Response, NextFunction } from 'express'
import { generatePassword } from '../lib/passwordUtils'
import User from '../models/User'

const postLogin = (err: any, req: Request, res: Response, next: NextFunction) => {
    if (err) next(err)
}

const postRegister = async (req: Request, res: Response, next: NextFunction) => {
    const { salt, hash } = generatePassword(req.body.password)
    const { username } = req.body

    const user = new User({ username, hash, salt })

    try {
        const result = await user.save()
        console.log('Saved user:', result)
    } catch (e: any) {
        console.log('Error saving user:', e.message)
    }

    res.redirect('/auth/login')
}

const getIndex = (req: Request, res: Response, next: NextFunction) => {
    const html = `<h1>Home</h1>
        <a href="/auth/register">Register</a>`

    res.send(html)
}

const getLogin = (req: Request, res: Response, next: NextFunction) => {
    const html = `s<h1>Login</h1>
        <form method="POST" action="/auth/login">
            Username: <input name="username" />
            Password: <input type="password" name="password" />
            <input type="Submit" value="Submit" />
        </form>`

    res.send(html)
}

const getRegister = (req: Request, res: Response, next: NextFunction) => {
    const html = `<h1>Register</h1>
        <form method="POST" action="/auth/register">
            Username: <input name="username" />
            Password: <input type="password" name="password" />
            <input type="Submit" value="Submit" />
        </form>`

    res.send(html)
}

const getProtected = (req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated()) return res.send('<h1>Welcome!</h1><a href="/auth/logout">Logout</a>')
    res.send('<h1>Failed to authenticate!</h1><a href="/auth/login">Login</a>')
}

const getLogout = (req: Request, res: Response, next: NextFunction) => {
    req.logout()
    res.redirect('/auth/protected')
}

const getLoginSuccess = (req: Request, res: Response, next: NextFunction) => {
    res.send('<h1>Successfully logged in</h1><a href="/auth/protected">Protected</a>')
}

const getLoginFailure = (req: Request, res: Response, next: NextFunction) => {
    res.send('<h1>Wrong credentials</h1><a href="/auth/login">Login</a>')
}

export default {
    postLogin,
    postRegister,
    getIndex,
    getLogin,
    getRegister,
    getProtected,
    getLogout,
    getLoginSuccess,
    getLoginFailure
}
