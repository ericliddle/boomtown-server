import fetch from 'node-fetch';
import pool from '../database/index';
import {
    getUser, getUsers, newItem, getItem,
    getItems, getItemsShared, getBorrowed,
    createUser, getTags, getTagsFromItem,
    getItemsFromTags,
} from './postgresDB';

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
        tags: (item) => {
        return getTagsFromItem(item.id);
        },

        itemowner(item, args, context) {
            return context.loader.getUser.load(item.itemowner)
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
        addItem(root, args) {
            return newItem(args)
        },
        addUser: (root, args, context) => {
            return createUser(args, context)
        }
    }
};

export default resolveFunctions;
