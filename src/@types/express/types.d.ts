declare namespace Express {
    interface Request {
        user?: import('@modules/user/user-model').UserLean;
    }
}
