const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const restaurants = [
    {
        namaRestoran: 'Trattoria',
        lokasiRestoran: 'Jakarta',
        gambarRestoran: 'https://cdn.discordapp.com/attachments/949659606852976640/975352711279177788/images_28.jpeg',
        gambarMenu: 'https://cdn.discordapp.com/attachments/949659606852976640/975350981858590760/images_23.jpeg',
        slotMeja: 2,
        Meja: {
        create: [
            {
                slotBangku: 4,
                hargaMeja: 25000
            },
            {
                slotBangku: 4,
                hargaMeja: 25000
            },
        ],
        },
    },
    {
        namaRestoran: 'Blankburg',
        lokasiRestoran: 'Bekasi',
        gambarRestoran: 'https://cdn.discordapp.com/attachments/949659606852976640/975352711488872489/images_27.jpeg',
        gambarMenu: 'https://cdn.discordapp.com/attachments/949659606852976640/975350981858590760/images_23.jpeg',
        slotMeja: 2,
        Meja: {
            create: [
                {
                    slotBangku: 4,
                    hargaMeja: 25000
                },
                {
                    slotBangku: 4,
                    hargaMeja: 25000
                },
            ],
        },
    },
    {
        namaRestoran: 'Leineken',
        lokasiRestoran: 'Tangerang',
        gambarRestoran: 'https://cdn.discordapp.com/attachments/949659606852976640/975352711488872489/images_25.jpeg',
        gambarMenu: 'https://cdn.discordapp.com/attachments/949659606852976640/975350981858590760/images_23.jpeg',
        slotMeja: 2,
        Meja: {
            create: [
                {
                    slotBangku: 4,
                    hargaMeja: 25000
                },
                {
                    slotBangku: 4,
                    hargaMeja: 25000
                },
            ],
        },
    },
    {
        namaRestoran: 'Brock',
        lokasiRestoran: 'Bandung',
        gambarRestoran: 'https://cdn.discordapp.com/attachments/949659606852976640/975352711488872489/images_24.jpeg',
        gambarMenu: 'https://cdn.discordapp.com/attachments/949659606852976640/975350981858590760/images_23.jpeg',
        slotMeja: 2,
        Meja: {
        create: [
            {
                slotBangku: 4,
                hargaMeja: 25000
            },
            {
                slotBangku: 4,
                hargaMeja: 25000
            },
        ],
        },
    }
]

async function main() {
    const createRestaurants = await prisma.restoran.createMany({
        data: restaurants
    })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })