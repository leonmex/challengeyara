import { faker } from '@faker-js/faker';

// Generate random data for Warehouse type
const generateWarehouse = () => ({
  id: faker.datatype.uuid(),
  Name: faker.company.name(),
  endpoint: faker.internet.url(),
  status: [faker.random.word(), faker.random.word()],
  maxstock: faker.datatype.float(),
  hazardousallow: faker.datatype.number(),
  porcentagefree: faker.datatype.float(),
  statustime: faker.date.past().toISOString(),
});

// Generate random data for Warehouse_1 type
const generateWarehouse1 = () => ({
  warehouse_id: faker.datatype.uuid(),
  productId: faker.datatype.number(),
  category: faker.datatype.number(),
  ean: faker.random.alphaNumeric(10),
  stock_qty: faker.datatype.float(),
  max_mq: faker.datatype.float(),
  date_arrive: faker.date.past().toISOString(),
  date_depart: faker.date.future().toISOString(),
  Warehouses: generateWarehouse(),
});

// Generate random data for Products type
const generateProduct = () => ({
  id: faker.datatype.uuid(),
  ean: faker.random.alphaNumeric(13),
  comment: faker.lorem.sentence(),
  type: [faker.random.word(), faker.random.word()],
  tot_mq: faker.datatype.float(),
});

// Generating 6 random examples for each type
const warehouses = Array.from({ length: 6 }, generateWarehouse);
const warehouse1 = Array.from({ length: 6 }, generateWarehouse1);
const products = Array.from({ length: 6 }, generateProduct);

export default {  
  warehouses,
  warehouse1,
  products,
}
