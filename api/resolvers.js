import fetch from 'node-fetch';
import { getUser, getItem, getItemsShared, getBorrowed, addNewItem } from './jsonServer';
import pool from '../database/index';
import { getUsers, getItems, createUser  } from './postgresDB';

const resolveFunctions = {
    Query: {
        users() {
            return getUsers()
        },

        user: (root, { id }, context) => {
            return context.loaders.getUser.load(id)
        },
        items() {
            return getItems()
        },
        item: (root, { id }, context) => {
            return context.loaders.getItem.load(id)
        }
    },

    Item: {
        itemOwner(item) {
            return getUser(item.itemOwner)
        },
        borrower(item) {
            if (!item.borrower) return null
            return getUser(item.borrower)
        }
    },

    User: {
        items: (user, args, context) => {
            return context.loaders.getItemsShared.load(user.id)
        },
        borrowed: (user, args, context) => {
            return context.loaders.getBorrowed.load(id)
        }
    },

    Mutation: {
        addNewItem(root, args) {
            const newItem = {
                title: args.title,
                imageUrl: args.imageUrl,
                itemOwner: args.itemOwner,
                description: args.description,
                tags: args.tags,
                created: Math.floor(Date.now() / 1000),
                available: true,
                borrower: null
            }

            return fetch('http://localhost:3001/items/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newItem)
            })
                .then(response => response.json())
                .catch(errors => console.log(errors));
        },
            addUser: (root, args, context) => {
            return createUser(args, context)
        }
    }

};

export default resolveFunctions;
