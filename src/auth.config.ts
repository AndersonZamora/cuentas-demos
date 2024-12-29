import NextAuth, { type NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import { credentialLogin } from './actions';

export const authConfig: NextAuthConfig = {
    pages: {
        signIn: '/auth/login'
    },

    callbacks: {
        async jwt({ token, user }) {

            if (user) {
                token.data = user;
            }

            return token;
        },

        session: ({ session, token }) => {
            session.user = token.data as any;
            return session;
        }
    },

    providers: [
        Credentials({
            async authorize(credentials) {

                const parsedCredentials = z
                    .object({ email: z.string().email().min(4), password: z.string().min(6) })
                    .safeParse(credentials);

                if (!parsedCredentials.success) return null;

                const { email, password } = parsedCredentials.data;

                const user = await credentialLogin(email, password);

                if (!user) return null;

                return user;
            },
        }),
    ]
};

export const { signIn, signOut, auth, handlers } = NextAuth(authConfig);
