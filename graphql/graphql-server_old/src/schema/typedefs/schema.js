import { ApolloServer } from "@apollo/server";
import { gql } from 'graphql-tag';

export const typeDefs = `#graphql
    type Warehouse {
        id: ID!
        Name: String
        endpoint: String
        status: Int
        maxstock: Float
        hazardousallow: Int
        porcentagefree: Float
        statustime: String
#        Warehouse_1: [Warehouse_1]
#        Warehouse_2: [Warehouse_2]
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
        Warehouses: Warehouses
    }

    type Warehouse_2 {
        warehouse_id: ID!
        productId: Int
        category: Int
        ean: String
        stock_qty: Float
        max_mq: Float
        date_arrive: String
        date_depart: String
        Warehouses: Warehouses
    }

    type Warehouse_products_activity {
        id: ID
        ean: String!
        date_activity: String
        type_activity: Int
        comment: String
        qty: Float
        warehouse_id: Int
    }

    type Products {
        id: ID
        ean: string!
        comment: String
        type: Int
        tot_mq: Float
    }

    input CreateWarehouseInput {
        Name: String!
        endpoint: String!
        status: Int!
        maxstock: Float!
        hazardousallow: Int!
        porcentagefree: Float!
    }

    input CreateProductInput {
        ean: String!
        comment: String!
        type: Int!
        tot_mq: Float!
    }

    type Query {
        warehouses: [Warehouse]
        warehouse1: [Warehouse_1]
        warehouse2: [Warehouse_2]
        products: [Products]
#        stockAmount(warehouseId: Int!): Float
#        freeStockSpace(warehouseId: Int!): Float
#        stockHistory(startDate: String, endDate: String, warehouseId: Int): [Warehouse_products_activity]
    }

    type Mutation {
        createWarehouse(input: CreateWarehouseInput): Warehouse
        createProduct(input: CreateProductInput): Products
        importProduct(warehouseId: Int!, productId: Int!, qty: Float, date: String): Warehouse_products_activity
        exportProduct(warehouseId: Int!, productId: Int!, qty: Float, date: String): Warehouse_products_activity
    }
`;    