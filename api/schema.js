import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolvers'

// TODO: Add date string of time date + time in mutation

const typeDefs = `

    type Item {
        id: ID!
        title: String!
        description: String!
        imageurl: String
        tags: [Tag!]
        itemowner: User!
        created: Int!        
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

    input AssignedTag {
        id: Int! 
    }

    type Tag {
        id: Int!
        title: String!
    }

    # the schema allows the following queries:

    type Query {
        users: [User]
        user(id: ID!): User
        items: [Item]
        item(id: ID!): Item
        tags: [Tag]
        tag(id: ID!): Tag
    },

    # this schema allows for the following mutations:

    type Mutation {
        addItem(
            title: String!
            imageurl: String
            itemowner: ID!              
            description: String!
            tags: [AssignedTag]!
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