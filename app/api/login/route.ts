import { User } from "@/modals/user.modal";
import { connectDB } from "@/utils/database";
import { loginValidation } from "@/utils/validations";
import { sign } from "jsonwebtoken";
import { getServerSession } from "next-auth";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export const GET = async () => {
    try {
        const session = await getServerSession(authOptions);

        if (!loginValidation.safeParse(session?.user)) {
            return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 400 })
        }

        await connectDB();

        const names = String(session?.user?.name).split(" ")
        const name = {
            first_name: names[0],
            last_name: names[1]
        }

        const isUser = await User.find({ email: session?.user?.email });

        if (isUser.length > 0) {
            const cookie = jwt(String(isUser[0]._id));
            cookies().set('user-session', cookie);
            return NextResponse.json({ success: true, message: 'Success login' }, { status: 200 })
        }

        const user = await User.create({
            email: session?.user?.email,
            name: name,
            profile_icon: session?.user?.image
        })

        const cookie = jwt(String(user._id));
        cookies().set('user-session', cookie);
        return NextResponse.json({ success: true, message: 'Success login' }, { status: 200 })

    } catch (error) {
        console.log('[ERROR_LOGIN]', error)
        return NextResponse.json({ success: true, message: 'Server Error' }, { status: 500 })
    }
}

const jwt = (id: string) => {
    const jwtObject = sign({
        id
    }, process.env.JWT_SECRET as string, {
        expiresIn: '2h'
    })
    return jwtObject;
}