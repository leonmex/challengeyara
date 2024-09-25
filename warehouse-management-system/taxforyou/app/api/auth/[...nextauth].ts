// app/api/auth/[...nextauth].ts
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from '../../../lib/prisma'; // Assuming prisma is in lib

export default NextAuth({
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                // Find user in the database by email
                const user = await prisma.user.findUnique({
                    where: { email: credentials?.email },
                });

                // If user exists and passwords match, return the user object
                if (user && credentials?.password === user.password) {
                    return {
                        id: String(user.id), // Convert the ID to a string
                        email: user.email,
                        // You can include other fields if needed, but avoid returning sensitive info like passwords.
                    };
                }

                // Return null if authentication fails
                return null;
            },
        }),
    ],
    pages: {
        signIn: '/auth/signin', // Custom sign-in page (optional)
    },
});
