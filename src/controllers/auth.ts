import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import User from '../models/User'
import { issueJWT, getJsonMessage } from '../lib/utils'
import { RequestPostLogin } from '../@types/index'

const tokens: string[] = []

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

        const savedUser = await user.save()
        const { token, expiresIn } = issueJWT(savedUser)
        tokens.push(token)
        console.log(tokens.length)

        res.json(
            getJsonMessage(false, 'Successfully saved user', {
                token,
                expiresIn
            })
        )
    } catch (e: any) {
        res.json(getJsonMessage(true, e.message))
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

const postLogin = async (req: Request, res: Response) => {
    const { username, password } = req.body as RequestPostLogin

    try {
        const user = await User.findOne({ username })
        if (!user) throw new Error('Failed to fetch user in database')

        const isValid = bcrypt.compareSync(password, user.hash.toString())
        if (!isValid) throw new Error('Wrong password was provided')

        const { token, expiresIn } = issueJWT(user)
        tokens.push(token)
        console.log(tokens.length)

        res.status(200).json(
            getJsonMessage(false, 'Successfully logged in', {
                token,
                expiresIn
            })
        )
    } catch (e: any) {
        res.status(400).json(getJsonMessage(true, e.message))
    }
}

const getProtected = (_req: Request, res: Response) => {
    res.status(200).json(
        getJsonMessage(false, 'Successfully fetched protected route')
    )
}

export default {
    postLogin,
    postRegister,
    getIndex,
    getLogin,
    getRegister,
    getProtected
}
