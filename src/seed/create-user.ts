import prisma from "@/lib/prisma";
import bcryptjs from 'bcryptjs';

export const createUser = async () => {

    await prisma.user.deleteMany();

        await prisma.user.create({
            data: {
                name: 'admin',
                email:'alex@gmail.com',
                password: bcryptjs.hashSync('123456'),
                role: 'admin'
            }
        })
}