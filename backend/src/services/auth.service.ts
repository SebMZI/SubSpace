import User from "../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface Register {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

interface Login {
    email: string;
    password: string;
}


export class AuthService {
    /**
     * Authenticate a user and returns a JWT
     * @param body
     */
    async signin(body: Login) {
        const { email, password } = body;
        this.validateEmail(email);
        this.validatePassword(password);

        const USER = await User.findOne({where: {email}});
        if(!USER) {
            throw new Error("Username or password invalid");
        }

        const HASHED_PASSWORD = USER.get("password") as string;
        const IS_MATCH = this.isPasswordAMatch(password, HASHED_PASSWORD ?? null)
        if(!IS_MATCH) {
            throw new Error("Username or password invalid");
        }

        const USER_DATA = USER.toJSON();
        delete USER_DATA.password;

        const TOKEN = this.generateToken(USER_DATA);

        return {
            message: "Sign in successfully",
            data: {
                token: TOKEN,
                user: USER_DATA
            }
        }
    }

    /**
     * Register a new user after validating their credentials
     * @param body
     */
    async signup(body: Register) {
        const { email, password, firstName, lastName } = body;
        this.validateEmail(email);
        this.validatePassword(password);
        this.validateFirstName(firstName);
        this.validateLastName(lastName);

        const USER_FOUND = await User.findOne({where: {email}});
        if(USER_FOUND) {
            throw new Error("An account already exists");
        }

        const HASHED_PASSWORD = await this.generateHashedPassword(password);
        const NEW_USER = await User.create({
            email,
            password: HASHED_PASSWORD,
            firstName,
            lastName
        })

        await NEW_USER.save();
        const USER_DATA = await NEW_USER.toJSON();
        delete USER_DATA.password;
        return {
            message: "Sign up successfully",
            data: {
                user: USER_DATA
            }
        };
    }

    /**
     * Check the email validity
     * @param email
     */
    private validateEmail(email: string) {
        if(!email) {
            throw new Error("email address is required");
        }

        if(!email.match("^[\\w\\-\\.]+@([\\w-]+\\.)+[\\w-]{2,}$")) {
            throw new Error("Invalid email address");
        }
    }

    /**
     * Check the password validity
     * @param password
     */
    private validatePassword(password: string) {
        if(!password || password.length < 8) {
            throw new Error("Password must be at least 8 characters");
        }
    }

    /**
     * Check the firstName validity
     * @param firstName
     */
    private validateFirstName(firstName: string) {
        if(!firstName) {
            throw new Error("First name is required");
        }
    }

    /**
     * Check the lastName validity
     * @param lastName
     */
    private validateLastName(lastName: string) {
        if(!lastName) {
            throw new Error("Last name is required");
        }
    }

    /**
     * Generate a hashed password using an encryption library
     * @param password
     * @returns The hashed password
     */
    private async generateHashedPassword(password: string) {
        if(!password) {
            throw new Error("Password must be at least 8 characters");
        }

        try {
            const SALT = bcrypt.genSaltSync(Number(process.env.PWD_SALT ?? 10));
            return await bcrypt.hash(password, SALT)
        }catch (e) {
            throw e
        }
    }

    /**
     * Check if current password matches the password in database
     * @param password
     * @param hashedPassword
     * @returns True if the password match
     */
    private async isPasswordAMatch(password: string, hashedPassword: string) {
        if(!hashedPassword || !password) {
            throw new Error("Password not found");
        }

        return await bcrypt.compare(password, hashedPassword);
    }

    /**
     * Generate a token containing user userId
     * @param user - User data containing the user id
     * @returns A signed JWT
     */
    private generateToken(user: any) {
        const SECRET = process.env.JWT_SECRET;
        if(!SECRET) {
            throw new Error("ENV JWT_SECRET IS NOT DECLARED");
        }

        const EXPIRES_IN = process.env.JWT_EXPIRES_IN;
        if(!EXPIRES_IN) {
            throw new Error("JWT_EXPIRES_IN is required");
        }

        return jwt.sign({
            userId: user.userId
        }, SECRET, {expiresIn: EXPIRES_IN as jwt.SignOptions["expiresIn"]})
    }
}