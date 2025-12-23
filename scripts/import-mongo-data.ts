import { PrismaClient } from '@prisma/client'
import fs from 'fs'
import path from 'path'

const prisma = new PrismaClient()

function parseArgs() {
    const args: Record<string, string> = {}
    for (let i = 2; i < process.argv.length; i++) {
        const arg = process.argv[i]
        if (arg.startsWith('--')) {
            const key = arg.slice(2)
            const value = process.argv[i + 1]
            if (value && !value.startsWith('--')) {
                args[key] = value
                i++
            }
        }
    }
    return args
}

function transformMongoData(obj: any): any {
    if (Array.isArray(obj)) {
        return obj.map(transformMongoData)
    } else if (obj !== null && typeof obj === 'object') {
        // Handle MongoDB extended JSON date format
        if ('$date' in obj) {
            return new Date(obj.$date)
        }
        // Handle MongoDB ObjectId
        if ('$oid' in obj) {
            return obj.$oid
        }

        const newObj: any = {}
        for (const key in obj) {
            if (key === '_id' || key === '__v') continue // Skip MongoDB internal fields at root or nested levels

            const value = obj[key]
            newObj[key] = transformMongoData(value)
        }
        return newObj
    }
    return obj
}

async function main() {
    const args = parseArgs()
    const modelName = args.model
    const filePath = args.file

    if (!modelName || !filePath) {
        console.error('Usage: npx tsx scripts/import-mongo-data.ts --model <ModelName> --file <PathToJson>')
        process.exit(1)
    }

    // Normalize model name (prisma client uses lowercase camelCase for models, typically)
    // e.g. User -> user, Course -> course
    const prismaModelName = modelName.charAt(0).toLowerCase() + modelName.slice(1)

    // @ts-ignore
    const prismaDelegate = prisma[prismaModelName]

    if (!prismaDelegate) {
        console.error(`Error: Model "${modelName}" (mapped to "${prismaModelName}") not found in Prisma Client.`)
        console.log('Available models:', Object.keys(prisma).filter(k => !k.startsWith('$') && !k.startsWith('_')))
        process.exit(1)
    }

    const absolutePath = path.resolve(process.cwd(), filePath)
    if (!fs.existsSync(absolutePath)) {
        console.error(`Error: File not found at ${absolutePath}`)
        process.exit(1)
    }

    console.log(`Reading data from ${filePath}...`)
    const fileContent = fs.readFileSync(absolutePath, 'utf-8')
    let rawData = JSON.parse(fileContent)

    if (!Array.isArray(rawData)) {
        rawData = [rawData]
    }

    console.log(`Found ${rawData.length} records. Transformation and import started...`)

    let successCount = 0
    let errorCount = 0

    for (const item of rawData) {
        try {
            const transformedData = transformMongoData(item)

            // We rely on Prisma to generate default IDs (Since we removed `_id` which was an objectId)
            // IF the schema expects a UUID and defaults it, this is fine.
            // If the user wants to preserve the ID, they might need to adjust, but standard UUID != ObjectId.

            await prismaDelegate.create({
                data: transformedData,
            })
            successCount++
        } catch (error: any) {
            errorCount++
            console.error(`Failed to import record:`, JSON.stringify(item).slice(0, 100) + '...')
            console.error(`Reason: ${error.message}`)
        }
    }

    console.log(`\nImport Summary:`)
    console.log(`Successfully imported: ${successCount}`)
    console.log(`Failed: ${errorCount}`)
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
