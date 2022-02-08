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

        const saved = await user.save()
        console.log('Saved user', saved.username)
        res.redirect('/auth/login')
    } catch (e: any) {
        const { message } = e
        console.log(message)
        res.redirect('/auth')
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
    console.log('POST login')

    if (req.isAuthenticated()) {
        console.log('Login successful')
        return res.redirect('/auth/protected')
    }

    console.log('Login failed')
    res.redirect('/auth/login')
}

const getProtected = (_req: Request, res: Response) => {
    res.send('Welcome! You can now log out.')
}

const getLogout = (req: Request, res: Response) => {
    req.logout() // only deletes req.session.passport.user property
    res.redirect('/auth')
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
