import User from "../models/user.model";

export class UserMiddleware {
    async verifyUser(req: any, res: any, next: any) {
        try {
            const USER_ID = req.userId;

            if (!USER_ID) {
                return res.status(401).send({
                    message: "Unauthorized"
                });
            }

            const user = await User.findOne({
                where: { USER_ID }
            });

            if (!user) {
                return res.status(401).send({
                    message: "Unauthorized"
                });
            }

            req.user = user;

            next();
        } catch (err) {
            return res.status(500).send({
                message: "Failed to retrieve user"
            });
        }
    }
}