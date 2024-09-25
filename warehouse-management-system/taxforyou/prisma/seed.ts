import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const user = await prisma.user.upsert({
        where: { email: 'test@test.com'},
        update: {},
        create: {
            email: 'test@test.com',
//            name: 'Test User',
            password: 'testuser'
        }
    })
    console.log({ user })
}
