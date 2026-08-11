import User from "../models/user.model";

export class UserMiddleware {
    /**
     * Verify the validity of the user from token's payload and pass the user to the controller
     * @param req
     * @param res
     * @param next
     */
    verifyUser = async (req: any, res: any, next: any) => {
        try {
            const USER_ID = req.userId;

            if (!USER_ID) {
                return res.status(401).send({
                    message: "Unauthorized"
                });
            }

            const USER = await User.findOne({
                where: { userId: USER_ID }
            });

            if (!USER) {
                return res.status(401).send({
                    message: "Unauthorized"
                });
            }

            req.user = USER;

            next();
        } catch (err) {
            return res.status(500).send({
                message: "Failed to retrieve user"
            });
        }
    }
}