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
    return new Promise(async (res, rej) => {
        try {
            let user = await pool.query(`SELECT * FROM items WHERE itemid='${id}'`)
            const fbuser = await admin.auth().gerUser(id)
            user = renameId(user)[0];
            user = { ...user, email: fbuser.email };
            res(user);
        } catch (error) {
            console.log(error);
            rej(error);
        }
    })
};

export const getUsers = () => {
    return pool.query(`SELECT * from user_profiles`)
        .then(response => {
            return renameId(response.rows);
        })
        .catch(errors => { console.log(errors) })
}

export function getUser(id) {
    return new Promise(async (res, rej) => {
        try {
            let user = await pool.query(`SELECT * FROM user_profiles WHERE userid = ${id}`)
            const fbuser = await admin.auth().gerUser(id)
            user = renameId(user)[0];
            user = { ...user, email: fbuser.email };
            res(user);
        } catch (error) {
            console.log(error);
            rej(error);
        }
    })
};

export function getItemsShared(id) {
    return pool.query(`SELECT * from items WHERE itemOwner = ${id}`)
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

export function getTags(itemId) {
    return pool.query(`SELECT * FROM tags 
                        INNER JOIN itemtags 
                        ON tags.id = itemtags.itemid 
                        WHERE itemtags.itemid = ${itemId}`
    )
}

export function getFilteredItems(tagId) {
    return pool.query(`SELECT * FROM items
                    INNER JOIN itemtags
                    ON items.itemid = itemtags.tagid
                    WHERE itemtags.tagid = ${tagId}`
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
                text: 'INSERT INTO user_profiles(fullname, bio, userid) VALUES($1, $2, $3) RETURNING *',
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




function renameId(item) {
    return rows.map((row) => Object.keys(row)((acc, usr) => {
        acc = { ...row, id: row.userid }
        delete acc.userid;
        return acc
    })), {};
}