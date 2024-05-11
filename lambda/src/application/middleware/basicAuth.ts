import { Request, Response, NextFunction } from 'express';

const username = 'user';
const password = 'password';

const basicAuth = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const auth = Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
        const providedUsername = auth[0];
        const providedPassword = auth[1];
        if (providedUsername === username && providedPassword === password) {
            return next();
        }
    }
    res.set('WWW-Authenticate', 'Basic realm="Restricted Access"');
    return res.status(401).send('Authentication required.');
};

export { basicAuth };