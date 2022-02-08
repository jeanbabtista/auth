import { Request, Response } from 'express'
import { generatePassword } from '../lib/passwordUtils'
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
    const { salt, hash } = generatePassword(req.body.password)
    const { username } = req.body
    const user = new User({ username, hash, salt, isAdmin: false })

    try {
        const result = await user.save()
        console.log('Saved user:', result)
    } catch (e: any) {
        console.log('Error saving user:', e.message)
    }

    res.redirect('/auth/login')
}

const getLogin = (_req: Request, res: Response) => {
    const html = `<h1>Login</h1>
        <form method="POST" action="/auth/login">
            Username: <input name="username" />
            Password: <input type="password" name="password" />
            <input type="Submit" value="Submit" />
        </form>`

    res.send(html)
}

const postLogin = () => {}

const getLoginSuccess = (_req: Request, res: Response) => {
    res.send('Successfully logged in, view protected route')
}

const getLoginFailure = (_req: Request, res: Response) => {
    res.send('Wrong credentials, log in again')
}

const getProtected = (req: Request, res: Response) => {
    if (req.isAuthenticated()) return res.send('Welcome! You can now log out.')
    res.send('Failed to authenticate!')
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
    getLogout,
    getLoginSuccess,
    getLoginFailure
}
