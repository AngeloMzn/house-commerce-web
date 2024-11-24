'use server';
import axios from 'axios';
import NextAuth from 'next-auth/next';
import bcrypt from "bcrypt"

const handler = NextAuth({
    providers: [
        {
            id: 'credentials',
            name: 'Credentials',
            type: 'credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },
            authorize: async (credentials) => {
                console.log('Credentials received:', credentials);
            
                try {
                    const response = await axios.post(
                        'http://localhost:3001/login',
                        {
                            email: credentials?.email,
                            password: credentials?.password,
                        },
                        {
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
                            },
                        }
                    );
            
                    console.log('API Response:', response.data);
            
                    if (response.data) {
                        const user = {
                            id: response.data.id,
                            name: response.data.name,
                            email: response.data.email,
                        };
                        console.log('User:', user);
                        return user;
                    } else {
                        return null;
                    }
                } catch (error) {
                    console.error('Error during authorization:', error);
                    return null;
                }
            },
        },
    ],
    pages: {
        signIn: '/login',
        signOut: '/',
    },
});

export default handler;