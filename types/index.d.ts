declare namespace Express {
    interface Request {
        user: {
            username: String
            hash: String
            salt: String
            isAdmin: Boolean
        }
    }
}
