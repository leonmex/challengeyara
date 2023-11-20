import { faker } from '@faker-js/faker';

// Generate random data for Warehouse type
const generateWarehouse = () => ({
    id: faker.string.uuid(),
    Name: faker.company.name(),
    endpoint: faker.internet.url(),
    status: [faker.word.sample(), faker.word.sample()],
    maxstock: faker.number.float(),
    hazardousallow: faker.number.int(),
    porcentagefree: faker.number.float(),
    statustime: faker.date.past().toISOString(),
});

// Generate random data for Warehouse_1 type
const generateWarehouse1 = () => ({
  warehouse_id: faker.string.uuid(),
  productId: faker.number.int(),
  category: faker.number.int(),
  ean: faker.string.alphanumeric(10),
  stock_qty: faker.number.float(),
  max_mq: faker.number.float(),
  date_arrive: faker.date.past().toISOString(),
  date_depart: faker.date.future().toISOString(),
  Warehouses: generateWarehouse(),
});

// Generate random data for Products type
const generateProduct = () => ({
  id: faker.string.uuid(),
  ean: faker.string.alphanumeric(13),
  comment: faker.lorem.sentence(),
  type: [faker.lorem.word(), faker.lorem.word()],
  tot_mq: faker.number.float(),
});

// Generating 6 random examples for each type
const warehouses = Array.from({ length: 6 }, generateWarehouse);
const warehouse1 = Array.from({ length: 6 }, generateWarehouse1);
const products = Array.from({ length: 6 }, generateProduct);

export default {
  warehouses,
  warehouse1,
  products,
};
