import { jwtVerify } from 'jose';
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { REDIRECT_URL } from './utils/constants';

const middleware = async (req: NextRequest) => {

    const { pathname } = req.nextUrl;

    if (pathname.startsWith('/api')) {
        try {
            const headers = new Headers(req.headers)

            const cookie = cookies().get('user-session')

            if (!cookie || !cookie.value) {
                return NextResponse.redirect(new URL(REDIRECT_URL, req.url))
            }

            const verifyToken: any = await jwtVerify(cookie.value, new TextEncoder().encode(process.env.JWT_SECRET as string))

            if (!verifyToken.payload.id) {
                return NextResponse.redirect(new URL(REDIRECT_URL, req.url))
            }

            headers.set('userId', verifyToken.payload.id)

            return NextResponse.next({
                request: {
                    headers
                }
            });
        } catch (error: any) {
            if (error.code === 'ERR_JWT_EXPIRED') {
                req.cookies.delete('user-session')
                return NextResponse.redirect(new URL(REDIRECT_URL, req.url))
            }
        }
    }
}

export const config = {
    matcher: ['/api/user', '/api/user/cart', '/api/user/favourite', '/api/user/order']
}

export default middleware;