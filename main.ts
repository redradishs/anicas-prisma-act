import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    try {

        const newAccount = await prisma.account.create({
            data: {
                email: "redanicas@gmail.com",
                username: "redanicas",
                password: "password123",
                profile: {
                    create: {
                        lastname: "Anicas",
                        firstname: "Red",
                        bio: "Allow yourself to shine without the desire to be seen"
                    }
                }
            },
            include: {
                profile: true
            }
        });

        const newModule = await prisma.modules.create({
            data: {
                accountCode: newAccount.id,
                moduleCode: "202210761",
                moduleDetails: "Introduction to Web Development",
                moduleDesc: "Learn the basic of Web Development with RedRadish"
            }
        });


        const findData = await prisma.account.findUnique({
            where: {
                id: newAccount.id
            },
            include: {
                profile: true,
                module: true
            }
        });

        console.log('All Data fetched', findData)

    } catch (error) {
        console.error('Error:', error)
    }
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })