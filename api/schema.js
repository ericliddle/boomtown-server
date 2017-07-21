import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolvers'

// TODO: Add date string of time date + time in mutation

const typeDefs = `
    type User {
        id: ID!
        fullName: String!
        email: String!
        bio: String
        items: [Item]
        borrowed: [Item]
    }

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

    type Query {
        users: [User]
        user(id: ID!): User
        items: [Item]
        item(id: ID!): Item
    },

    type Mutation {
        addNewItem(
            title: String
            imageUrl: String
            itemOwner: ID              
            description: String
            tags: [String]
                   
            available: Boolean
            borrower: ID    
        ): Item
    }

`;

//  TODO: place between open slot between tags and available - createdOn: Int! 


export default makeExecutableSchema({
    typeDefs,
    resolvers
})