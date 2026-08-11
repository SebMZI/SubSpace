import {AuthService} from "../services/auth.service";

export class AuthController {
    constructor(private authService: AuthService) {}

    /**
     * Handles user sign-in request
     * @param req - Request
     * @param res - Response
     */
    signin = async (req: any, res: any) => {
        try {
            const RESULT = await this.authService.signin(req.body);
            return res.status(200).json(RESULT);
        } catch (e) {
            return res.status(500).json({
                message: "Failed to signin, please try again in a few minutes."
            })
        }
    }

    /**
     * Handles user sign-up request
     * @param req - Request
     * @param res - Response
     */
    signup = async (req: any, res: any) => {
        try {
            const RESULT = await this.authService.signup(req.body);
            return res.status(201).json(RESULT)
        } catch (e) {
            return res.status(500).json({
                message: "Failed to signup, please try again in a few minutes."
            })
        }
    }
}