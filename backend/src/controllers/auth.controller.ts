import {AuthService} from "../services/auth.service";

export class AuthController {
    constructor(private authService: AuthService) {}

    signin = async (req: any, res: any) => {
        try {
            const result = await this.authService.signin(req.body);
            return res.status(200).json(result);
        } catch (e) {
            return res.status(500).json({
                message: "Failed to signin, please try again in a few minutes."
            })
        }
    }

    signup = async (req: any, res: any) => {
        try {
            const result = await this.authService.signup(req.body);
            return res.status(200).json(result)
        } catch (e) {
            return res.status(500).json({
                message: "Failed to signup, please try again in a few minutes."
            })
        }
    }
}