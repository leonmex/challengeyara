-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Warehouses" (
    "id" SERIAL NOT NULL,
    "Name" TEXT NOT NULL,
    "endpoint" TEXT NOT NULL,
    "status" INTEGER NOT NULL,
    "maxstock" DOUBLE PRECISION NOT NULL,
    "hazardousallow" INTEGER NOT NULL,
    "porcentagefree" DOUBLE PRECISION NOT NULL,
    "statustime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Warehouses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Warehouse_1" (
    "warehouse_id" INTEGER NOT NULL,
    "productId" SERIAL NOT NULL,
    "category" INTEGER NOT NULL,
    "ean" TEXT NOT NULL,
    "stock_qty" DOUBLE PRECISION NOT NULL,
    "max_mq" DOUBLE PRECISION NOT NULL,
    "date_arrive" TIMESTAMP(3) NOT NULL,
    "date_depart" TIMESTAMP(3) NOT NULL,
    "warehousesId" INTEGER,

    CONSTRAINT "Warehouse_1_pkey" PRIMARY KEY ("productId")
);

-- CreateTable
CREATE TABLE "Warehouse_2" (
    "warehouse_id" INTEGER NOT NULL,
    "productId" SERIAL NOT NULL,
    "category" INTEGER NOT NULL,
    "ean" TEXT NOT NULL,
    "stock_qty" DOUBLE PRECISION NOT NULL,
    "max_mq" DOUBLE PRECISION NOT NULL,
    "date_arrive" TIMESTAMP(3) NOT NULL,
    "date_depart" TIMESTAMP(3),
    "warehousesId" INTEGER,

    CONSTRAINT "Warehouse_2_pkey" PRIMARY KEY ("productId")
);

-- CreateTable
CREATE TABLE "Warehouse_products_activity" (
    "id" SERIAL NOT NULL,
    "ean" TEXT NOT NULL,
    "date_activity" TIMESTAMP(3) NOT NULL,
    "type_activity" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "qty" DOUBLE PRECISION NOT NULL,
    "warehouse_id" INTEGER NOT NULL,

    CONSTRAINT "Warehouse_products_activity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Products" (
    "id" SERIAL NOT NULL,
    "ean" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "type" INTEGER NOT NULL,
    "tot_mq" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Products_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Warehouses_Name_key" ON "Warehouses"("Name");

-- CreateIndex
CREATE UNIQUE INDEX "Warehouse_1_ean_key" ON "Warehouse_1"("ean");

-- CreateIndex
CREATE UNIQUE INDEX "Warehouse_2_ean_key" ON "Warehouse_2"("ean");

-- CreateIndex
CREATE UNIQUE INDEX "Products_ean_key" ON "Products"("ean");

-- AddForeignKey
ALTER TABLE "Warehouse_1" ADD CONSTRAINT "Warehouse_1_warehousesId_fkey" FOREIGN KEY ("warehousesId") REFERENCES "Warehouses"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Warehouse_2" ADD CONSTRAINT "Warehouse_2_warehousesId_fkey" FOREIGN KEY ("warehousesId") REFERENCES "Warehouses"("id") ON DELETE SET NULL ON UPDATE CASCADE;
