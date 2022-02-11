import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import User from '../models/User'

const getIndex = (_req: Request, res: Response) => {
    const html = `<h1>Home</h1>
        <a href="/auth/register">Register</a>
        <p>Already registered?</p>
        <a href="/auth/login">Login</a>`

    res.send(html)
}

const getRegister = (_req: Request, res: Response) => {
    const html = `<h1>Register</h1>
        <form method="POST" action="/auth/register">
            Username: <input name="username" />
            Password: <input type="password" name="password" />
            <input type="Submit" value="Submit" />
        </form>`

    res.send(html)
}

const postRegister = async (req: Request, res: Response) => {
    const { username, password } = req.body
    const hash = bcrypt.hashSync(password, 10)
    const user = new User({ username, hash, isAdmin: false })

    try {
        const found = await User.findOne({ username })
        if (found) throw new Error('User already exists.')

        await user.save()
        res.status(200).json({ error: false, message: 'Successfully saved new user' })
    } catch (e: any) {
        res.status(200).json({ error: true, message: e.message })
    }
}

const getLogin = (_req: Request, res: Response) => {
    const html = `<h1>Login</h1>
        <form method="POST" action="/auth/login">
            <input name="username" />
            <input type="password" name="password" />
            <input type="Submit" value="Submit" />
        </form>`

    res.send(html)
}

const postLogin = (req: Request, res: Response) => {
    if (!req.isAuthenticated()) return res.status(401).json({ error: true, message: 'Failed to log in' })
    res.status(200).json({ error: false, message: 'Successfully logged in' })
}

const getProtected = (_req: Request, res: Response) => {
    res.status(200).json({ error: false, message: 'Protected data' })
}

const getLogout = (req: Request, res: Response) => {
    req.logout() // only deletes req.session.passport.user property
    res.status(200).json({ error: false, message: 'Successfully logged out' })
}

export default {
    postLogin,
    postRegister,
    getIndex,
    getLogin,
    getRegister,
    getProtected,
    getLogout
}
