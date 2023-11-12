import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const mutations = {
  createWarehouse: async (_, { input }) => {
    const newWarehouse = await prisma.warehouses.create({
      data: input,
    });
    return newWarehouse;
  },
  createProduct: async (_, { input }) => {
    const newProduct = await prisma.products.create({
      data: input,
    });
    return newProduct;
  },
  importProduct: async (_, { warehouseId, productId, qty, date }) => {
    return importedProduct;
  },
  exportProduct: async (_, { warehouseId, productId, qty, date }) => {
    return exportedProduct;
  },
};