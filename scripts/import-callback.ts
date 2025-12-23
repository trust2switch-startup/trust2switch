import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const rawData = {
        "_id": { "$oid": "69452658c279e2e0adf655e4" },
        "name": "Harshit",
        "phone": "8787025742",
        "preferredTime": "morning",
        "message": "demo",
        "status": "pending",
        "createdAt": { "$date": "2025-12-19T10:18:00.603Z" },
        "updatedAt": { "$date": "2025-12-19T10:18:00.603Z" },
        "__v": 0
    }

    console.log('Importing callback request...')

    const callbackRequest = await prisma.callbackRequest.create({
        data: {
            name: rawData.name,
            phone: rawData.phone,
            preferredTime: rawData.preferredTime,
            message: rawData.message,
            status: rawData.status,
            createdAt: new Date(rawData.createdAt.$date),
            updatedAt: new Date(rawData.updatedAt.$date),
        },
    })

    console.log('Successfully imported callback request:', callbackRequest)
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
