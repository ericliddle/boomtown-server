import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolvers'

// TODO: Add date string of time date + time in mutation

const typeDefs = `

    type Item {
        id: ID!
        title: String
        description: String!
        imageUrl: String
        tags: [String]
        itemOwner: User!
        createdOn: Int!        
        available: Boolean!
        borrower: User
    }

    type User {
        id: ID!
        fullname: String!
        email: String!
        bio: String
        items: [Item]
        borrowed: [Item]
    }

    # the schema allows the following queries:

    type Query {
        users: [User]
        user(id: ID!): User
        items: [Item]
        item(id: ID!): Item
    },

    # this schema allows for the following mutations:

    type Mutation {
        addNewItem(
            title: String!
            imageUrl: String
            itemOwner: ID!              
            description: String!
            tags: [String!]
            available: Boolean
            borrower: ID    
        ): Item

        addUser(
            fullname: String!
            email: String!
            bio: String
            password: String!
        ): User
    }

`;

export default makeExecutableSchema({
    typeDefs,
    resolvers
})