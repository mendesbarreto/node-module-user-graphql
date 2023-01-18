declare namespace Express {
    interface Request {
        user?: import('@modules/user/model-user').UserLean;
    }
}
