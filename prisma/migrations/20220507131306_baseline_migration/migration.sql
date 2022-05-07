-- CreateTable
CREATE TABLE "Meja" (
    "idRestoran" INTEGER NOT NULL,
    "slotBangku" INTEGER NOT NULL,
    "hargaMeja" INTEGER NOT NULL,
    "id" SERIAL NOT NULL,

    CONSTRAINT "Meja_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "idUser" INTEGER NOT NULL,
    "idMeja" INTEGER NOT NULL,
    "bookDate" TIMESTAMP(3) NOT NULL,
    "bookHourStart" TIMESTAMP(3) NOT NULL,
    "bookHourEnd" TIMESTAMP(3) NOT NULL,
    "bookStatus" TEXT,
    "id" SERIAL NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Restoran" (
    "namaRestoran" TEXT NOT NULL,
    "lokasiRestoran" TEXT,
    "gambarRestoran" TEXT,
    "gambarMenu" TEXT,
    "slotMeja" INTEGER,
    "id" SERIAL NOT NULL,

    CONSTRAINT "Restoran_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "email" TEXT NOT NULL,
    "namaUser" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "resetToken" TEXT,
    "tokenExpire" TIMESTAMP(3),
    "id" SERIAL NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Admin" (
    "id" SERIAL NOT NULL,
    "namaAdmin" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Meja_id_key" ON "Meja"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Order_id_key" ON "Order"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Restoran_id_key" ON "Restoran"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_id_key" ON "Admin"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- AddForeignKey
ALTER TABLE "Meja" ADD CONSTRAINT "Meja_idRestoran_fkey" FOREIGN KEY ("idRestoran") REFERENCES "Restoran"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_idMeja_fkey" FOREIGN KEY ("idMeja") REFERENCES "Meja"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
