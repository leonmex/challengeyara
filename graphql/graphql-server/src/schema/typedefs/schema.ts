import { gql } from 'graphql-modules';

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
        Warehouses: Warehouses
    }
    type Products {
        id: ID!
        ean: string!
        comment: String
        type: [string]
        tot_mq: Float
    }
    type Query {
        warehouses: [Warehouse]
        warehouse1: [Warehouse_1]
        products: [Products]
    }
`