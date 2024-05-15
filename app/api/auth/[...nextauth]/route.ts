import { User } from "@/modals/user.modal";
import { jwt } from "@/utils/api.utils";
import { connectDB } from "@/utils/database";
import { AuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google';
import { cookies } from "next/headers";

export const authOptions: AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        })
    ],
    callbacks: {
        async signIn({ account, user }) {
            if (!account || !user) {
                return false
            };

            const { name, email, image } = user;
            if (!name || !email || !image) {
                return false
            }

            await connectDB();

            const split_names = String(name).split(" ");
            const new_name = {
                first_name: split_names[0],
                last_name: split_names[1]
            }

            const isUser = await User.find({ email });

            if (isUser.length > 0) {
                const cookie = jwt(String(isUser[0]._id));
                cookies().set('user-session', cookie, {maxAge: 2 * 60 * 60, secure: true});
                return true;
            }

            const data = await User.create({
                email,
                name: new_name,
                profile_icon: image
            });

            const cookie = jwt(String(data._id));
            cookies().set('user-session', cookie, {maxAge: 2 * 60 * 60, secure: true});
            return true
        }
    }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }