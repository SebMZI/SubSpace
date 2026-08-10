import jwt, {JwtPayload} from "jsonwebtoken";

interface Payload extends  JwtPayload {
    userId: string;
}

export class AuthMiddleware {
    verify = (request: any, response: any, next: any) => {
        try {
            const HEADERS = request.headers
            if(!HEADERS.authorization) {
                response.status(401).send({message: "Unauthorized"});
                return;
            }

            if(!HEADERS.authorization.startsWith("Bearer ")) {
               return response.status(401).send({message: "Unauthorized"});
            }

            const TOKEN = HEADERS.authorization.split("Bearer ")[1];

            if(!TOKEN) {
               return response.status(401).send({message: "Unauthorized"});
            }
            const PAYLOAD = this.getTokenPayload(TOKEN);

            request.userId = PAYLOAD.userId;
            next();
        } catch (e) {
            response.status(500).send({message: "Failed to authenticate" + e});
        }
    }

    private getTokenPayload(token: string): Payload {
        const SECRET = process.env.JWT_SECRET;
        if(!SECRET) {
            throw new Error('ENV JWT_SECRET IS NOT DECLARED');
        }

        const DECODED = jwt.verify(token, SECRET);

        if(typeof DECODED === "string") {
            throw new Error("Invalid token payload");
        }

        return DECODED as Payload;
    }
}