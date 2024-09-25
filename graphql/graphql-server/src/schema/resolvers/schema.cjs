"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var faker_1 = require("@faker-js/faker");
console.log('here');
// Generate random data for Warehouse type
var generateWarehouse = function () { return ({
    id: faker_1.faker.string.uuid(),
    Name: faker_1.faker.company.name(),
    endpoint: faker_1.faker.internet.url(),
    status: [faker_1.faker.word.sample(), faker_1.faker.word.sample()],
    maxstock: faker_1.faker.number.float(),
    hazardousallow: faker_1.faker.number.int(),
    porcentagefree: faker_1.faker.number.float(),
    statustime: faker_1.faker.date.past().toISOString(),
}); };
// Generate random data for Warehouse_1 type
var generateWarehouse1 = function () { return ({
    warehouse_id: faker_1.faker.string.uuid(),
    productId: faker_1.faker.number.int(),
    category: faker_1.faker.number.int(),
    ean: faker_1.faker.string.alphanumeric(10),
    stock_qty: faker_1.faker.number.float(),
    max_mq: faker_1.faker.number.float(),
    date_arrive: faker_1.faker.date.past().toISOString(),
    date_depart: faker_1.faker.date.future().toISOString(),
    Warehouses: generateWarehouse(),
}); };
// Generate random data for Products type
var generateProduct = function () { return ({
    id: faker_1.faker.string.uuid(),
    ean: faker_1.faker.string.alphanumeric(13),
    comment: faker_1.faker.lorem.sentence(),
    type: [faker_1.faker.lorem.word(), faker_1.faker.lorem.word()],
    tot_mq: faker_1.faker.number.float(),
}); };
// Generating 6 random examples for each type
var warehouses = Array.from({ length: 6 }, generateWarehouse);
var warehouse1 = Array.from({ length: 6 }, generateWarehouse1);
var products = Array.from({ length: 6 }, generateProduct);
exports.default = {
    warehouses: warehouses,
    warehouse1: warehouse1,
    products: products,
};
console.log('test');
