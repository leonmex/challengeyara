import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { gql } from 'graphql-modules';
//import { typeDefs } from './schema/typedefs/schema';
//import * as dataGenerator from './schema/resolvers/schema';
import { faker } from '@faker-js/faker';

// Generate random data for Warehouse type
const generateWarehouse = () => ({
  id: faker.number.int(),
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
warehouse_id: faker.number.int(),
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
id: faker.number.int(),
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

export const typeDefs = gql`
    type Warehouse {
        id: ID!
        Name: String
        endpoint: String
        status: [String]
        maxstock: Float
        hazardousallow: Int
        porcentagefree: Float
        statustime: String
    }
    type Warehouse_1 {
        warehouse_id: ID!
        productId: Int
        category: Int
        ean: String
        stock_qty: Float
        max_mq: Float
        date_arrive: String
        date_depart: String
    }
    type Products {
        id: ID!
        ean: String!
        comment: String
        type: [String]
        tot_mq: Float
    }
    type Query {
        warehouses: [Warehouse]
        warehouse1: [Warehouse_1]
        products: [Products]
    }
`
const resolvers = {
    Query: {
      warehouses() {
        return Array.from({ length: 6 }, generateWarehouse)
      },
      warehouse1: () => Array.from({ length: 6 }, generateWarehouse1),
      products: () => Array.from({ length: 6 }, generateProduct)
    },
  };  

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  
  const { url } = await startStandaloneServer(server, {
    listen: { port: 3000 },
  });
  
  console.log(`🚀  Server ready at: ${url}`);