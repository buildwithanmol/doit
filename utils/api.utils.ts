import { sign } from "jsonwebtoken";

export const jwt = (id: string) => {
    const jwtObject = sign({
        id
    }, process.env.JWT_SECRET as string, {
        expiresIn: '2h'
    })
    return jwtObject;
}