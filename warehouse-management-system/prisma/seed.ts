import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const user = await prisma.user.upsert({
        where: { email: 'test@test.com'},
        update: {},
        create: {
            email: 'test@test.com',
            name: 'Test User',
            username: 'testuser'
        }
    })
    console.log({ user })
}

async function seedWarehouses() {
    const warehouseData = [
      {
        Name: 'Warehouse 1',
        endpoint: 'http://127.0.0.1/warehouses',
        status: 1,
        maxstock: 1000.0,
        hazardousallow: 1,
        porcentagefree: 100.0,
      },
      {
        Name: 'Warehouse 2',
        endpoint: 'http://127.0.0.1/warehouses',
        status: 1,
        maxstock: 1500.0,
        hazardousallow: 0,
        porcentagefree: 90.0,
      },
    ];
  
    for (const data of warehouseData) {
      const warehouse = await prisma.warehouses.upsert({
        where: { Name: data.Name },
        update: {},
        create: data,
      });
      console.log({ warehouse });
    }
  }

  async function seedProductsActivity() {
      const productsData = [
    {
        ean: '10030017',
        date_activity: new Date(),
        type_activity: 1,
        comment: 'test 1 move to another wh',
        qty: 100,
        warehouse_id: 1
      },
      {
        ean: '10030017',
        date_activity: new Date(),
        type_activity: 2,
        comment: 'test 1 sale',
        qty: 450,
        warehouse_id: 1
      },
      {
        ean: '10030017',
        date_activity: new Date(),
        type_activity: 3,
        comment: 'new move it',
        qty: 30,
        warehouse_id: 1
      },
      {
        ean: '10030019',
        date_activity: new Date(),
        type_activity: 1,
        comment: 'test 1 move to another wh',
        qty: 100,
        warehouse_id: 2
      },
      {
        ean: '10030019',
        date_activity: new Date(),
        type_activity: 1,
        comment: 'test 1 sale',
        qty: 200,
        warehouse_id: 2
      },
      {
        ean: '10030019',
        date_activity: new Date(),
        type_activity: 3,
        comment: 'new move it',
        qty: 400,
        warehouse_id: 2
      },
    ];
    for (const data of productsData) {
        const product = await prisma.warehouse_products_activity.upsert({
          where: { id: 100000 },
          update: {},
          create: data,
        });
        console.log({ product });
      }
  }

  async function seedProducts() {
    const productsData = [
    {
      ean: '10030017',
      comment: 'test 1',
      type: 1,
      tot_mq: 0.030,
    },
    {
      ean: '10030018',
      comment: 'test 2',
      type: 2,
      tot_mq: 0.10,
    },
    {
      ean: '10030019',
      comment: 'test 3',
      type: 3,
      tot_mq: 0.20,
    },
    {
      ean: '10030020',
      comment: 'test 4',
      type: 4,
      tot_mq: 1.20,
    },
    {
      ean: '10030021',
      comment: 'test 5',
      type: 4,
      tot_mq: 1.22,
    },
    {
      ean: '10030022',
      comment: 'test 6',
      type: 1,
      tot_mq: 0.056,
    },
  ];
  for (const data of productsData) {
      const products = await prisma.products.upsert({
        where: { ean: '10030000000000' },
        update: {},
        create: data,
      });
      console.log({ products });
    }
}

  async function seedWarehouse1() {
    const warehouse1 = await prisma.warehouse_1.upsert({
      where: { productId: 1 },
      update: {},
      create: {
        productId: 1,
        category: 1,
        ean: '10030017',
        stock_qty: 500.0,
        max_mq: 1000.0,
        date_arrive: new Date(),
        date_depart: new Date(),
        warehouse_id: 1, // Ensure this matches the corresponding Warehouse ID
      },
    });
    console.log({ warehouse1 });
  }
  
  async function seedWarehouse2() {
    const warehouse2 = await prisma.warehouse_2.upsert({
      where: { productId: 1 },
      update: {},
      create: {
        productId: 2,
        category: 2,
        ean: '10030019',
        stock_qty: 750.0,
        max_mq: 2000.0,
        date_arrive: new Date(),
        date_depart: new Date(),
        warehouse_id: 2, // Ensure this matches the corresponding Warehouse ID
      },
    });
    console.log({ warehouse2 });
  }
  
  async function seedData() {
    await seedProducts();
    await seedWarehouses();
    await seedWarehouse1();
    await seedWarehouse2();
    await seedProductsActivity();
  }

seedData()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

main()
    .then(() => prisma.$disconnect())
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })