import pool from '../database/index';
import admin from '../database/firebase';

//READ HELPERS

export function getItems() {
    return pool.query(`SELECT * from items`)
        .then(response => {
            return response.rows
        }).catch(errors => console.log(errors));
};

export function getItem(id) {
    return new Promise(async (resolve, reject) => {
        try {
            let item = await pool.query(`SELECT * FROM items WHERE id = '${id}'`)
            item = (item.rows)[0];
            resolve(item);
        } catch (error) {
            console.log(error);
            reject(error);
        }
    })
};

export const getUsers = () => {
    return pool.query(`SELECT * from user_profiles`)
        .then(response => {
            return response.rows;
        }).catch(errors => console.log(errors))
}

export function getUser(id) {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await pool.query(`SELECT * FROM user_profiles WHERE id = ${id}`)
            const fbuser = await admin.auth().gerUser(id)
            user = { ...user, email: fbuser.email };
            resolve(user);
        } catch (error) {
            console.log(error);
            reject(error);
        }
    })
};

export function getItemsShared(id) {
    return pool.query(`SELECT * from items WHERE itemowner = '${id}'`)
        .then(response => {
            return response.rows
        }).catch(errors => console.log(errors));
};


export function getBorrowed(id) {
    return pool.query(`SELECT * from items WHERE borrower= ${id}`)
        .then(response => {
            return response.rows
        }).catch(errors => console.log(errors));
};

export function getTags() {
    return pool.query(`SELECT * FROM tags`)
        .then(response => response.rows)
        .catch(errors => console.log(errors));
}

export function getTagsFromItem(id) {
    return pool.query(`
        SELECT tags.title FROM tags
        INNER JOIN itemtags
        ON itemtags.tagid = tags.id
        WHERE itemtags.itemid = ${id}`
    )
}

export function getItemsFromTags(id) {
    return pool.query(`
        SELECT * FOR items
        INNER JOIN itemtags
        ON itemstags.itemid = item.idtags
        WHERE itemtags.tagid = ${id}`
    )
}

// WRITE HELPERS

export function createUser(args, context) {
    return new Promise(async (resolve, reject) => {
        try {
            const fbuser = await admin.auth().createUser({
                email: args.email,
                password: args.password
            })
            const query = {
                text: 'INSERT INTO user_profiles(fullname, bio, id) VALUES($1, $2, $3) RETURNING *',
                values: [args.fullname, args.bio, fbuser.uid],
            }
            let pgUser = await pool.query(query)
            let user = { ...pgUser.rows[0], email: fbuser.email, id: fbuser.uid }
            resolve(user)
        } catch (error) {
            console.log(error);
            reject(error);
        }
    })
};
// TODO: New Item
export function newItem(args, context) {
    return new Promise(async (resolve, reject) => {
        try {
            const itemQuery = {
                text: `INSERT INTO items(title, description, imageurl, itemowner) VALUES($1, $2, $3, $4) RETURNING *`,
                values: [args.title, args.description, args.imageurl, args.itemowner],
            }
            const newItem = await pool.query(itemQuery)
            function insertTag(tags) {
                return tags.map(tag => {
                    return `(${newItem.rows[0].id}, ${tag.id})`
                }).join(',')
            }

            const tagQuery = {
                text: `INSERT INTO itemtags(itemid, tagid) VALUES ${insertTag(args.tags)}`
            }
            const tags = await pool.query(tagQuery)
            resolve({ id: newItem.rows[0].id })
        } catch (error) {
            reject(error)
        }
    })
}