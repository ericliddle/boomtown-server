import fetch from 'node-fetch';

const resolveFunctions = {
    Query: {
        users() {
            return fetch(`http://localhost:3001/users`)
                .then(response => response.json())
                .catch(errors => console.log(errors));
        },
        user(root, { id }) {
            return fetch(`http://localhost:3001/users/${id}`)
                .then(response => response.json())
                .catch(errors => console.log(errors));
        },
        items() {
            return fetch(`http://localhost:3001/items`)
                .then(response => response.json())
                .catch(errors => console.log(errors));
        },
        item(root, { id }) {
            return fetch(`http://localhost:3001/items/${id}`)
                .then(response => response.json())
                .catch(errors => console.log(errors));
        }
    },

    Item: {
        itemOwner(item) {
            return fetch(`http://localhost:3001/users/${item.itemOwner}`)
                .then(response => response.json())
                .catch(errors => console.log(errors));
        },
        borrower(item) {
            if (!item.borrower) return null
            return fetch(`http://localhost:3001/users/${item.borrower}`)
                .then(response => response.json())
                .catch(errors => console.log(errors));
        }
    },

    User: {
        items(user) {
            return fetch(`http://localhost:3001/items/?itemOwner=${user.id}`)
                .then(response => response.json())
                .catch(errors => console.log(errors));
        },
        borrowed(user) {
            return fetch(`http://localhost:3001/items/?borrower=${user.id}`)
                .then(response => response.json())
                .catch(errors => console.log(errors));
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
                // createdOn: +new Date,
                createdOn: Math.floor(Date.now() / 1000),
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
        }
    }
};

export default resolveFunctions;
