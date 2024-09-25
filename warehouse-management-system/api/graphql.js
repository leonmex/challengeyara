import { gql, ApolloServer } from 'apollo-server-micro'
import { prismaClient } from '@/lib/prisma';

const typeDefs = gql`
    
    type Warehouse {
    id: ID!
    Name: String!
    endpoint: String!
    status: Int!
    maxstock: Float!
    hazardousallow: Int!
    porcentagefree: Float!
    statustime: String!
    Warehouse_1: [Warehouse_1!]!
    Warehouse_2: [Warehouse_2!]!
  }

  type Warehouse_1 {
    warehouse_id: Int!
    productId: ID!
    category: Int!
    ean: String!
    stock_qty: Float!
    max_mq: Float!
    date_arrive: String!
    date_depart: String
    Warehouses: Warehouses
  }
022177157770
  type Warehouse_2 {
    warehouse_id: Int!
    productId: ID!
    category: Int!
    ean: String!
    stock_qty: Float!
    max_mq: Float!
    date_arrive: String!
    date_depart: String
    Warehouses: Warehouses
  }

  type Warehouse_products_activity {
    id: ID!
    ean: String!
    date_activity: String!
    type_activity: Int!
    comment: String!
    qty: Float!
    warehouse_id: Int!
  }

  type Products {
    id: ID!
    ean: String!
    comment: String!
    type: Int!
    tot_mq: Float!
  }

  input CreateWarehouseInput {
    Name: String!
    endpoint: String!
    status: Int!
    maxstock: Float!
    hazardousallow: Int!
    porcentagefree: Float!
    statustime: String!
  }

  input CreateProductInput {
    ean: String!
    comment: String!
    type: Int!
    tot_mq: Float!
  }

  type Query {
    warehouses: [Warehouse!]!
    products: [Products!]!
  }

  type Mutation {
    createWarehouse(input: CreateWarehouseInput!): Warehouse!
    createProduct(input: CreateProductInput!): Products!
  }
  `;

const resolvers = {
      Query: {
        warehouses: () => warehousesData,
        products: () => productsData,
      },
      Mutation: {
        createWarehouse: (_, { input }) => {
          const newWarehouse = { ...input, id: warehousesData.length + 1 };
          warehousesData.push(newWarehouse);
          return newWarehouse;
        },
        createProduct: (_, { input }) => {
          const newProduct = { ...input, id: productsData.length + 1 };
          productsData.push(newProduct);
          return newProduct;
        },
      },
      Warehouse: {
        Warehouse_1: (warehouse) => {
          // Replace this with your logic to fetch Warehouse_1 data from the database
          return [];
        },
        Warehouse_2: (warehouse) => {
          // Replace this with your logic to fetch Warehouse_2 data from the database
          return [];
        },
      },
      Warehouse_1: {
        Warehouses: (warehouse_1) => {
          // Replace this with your logic to fetch Warehouses data from the database
          return null;
        },
      },
      Warehouse_2: {
        Warehouses: (warehouse_2) => {
          // Replace this with your logic to fetch Warehouses data from the database
          return null;
        },
      },
    };
    
const ApolloServer = new ApolloServer({ typeDefs, resolvers });

const handler = ApolloServer.createHandler({ path: "/api/graphql" });

export const config = { api: { bodyParser: false } };

export default handler;