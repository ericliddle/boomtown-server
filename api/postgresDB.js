import pool from '../database/index';
import admin from '../database/firebase';

// export function getUser(id) {
//     return pool.query(`SELECT * FROM user_profiles WHERE userid='${id}'`)
//         .then(response => {
//             return response.rows[0];
//         })
//         .catch(errors => console.log(errors));
// };
// Remove above getUser function
export function getUser(id) {
    return new Promise(async (res, rej) => {
        try {
            let user = await pool.query(`SELECT * FROM user_profiles WHERE userid='${id}'`)
            const fbuser = await admin.auth().gerUser(id)
            user = renameId(user)[0];
            user = { ...user, email: fbuser.email };
            res(user);
        } catch (e) {
            console.log(e);
            rej(e);
        }
    })
};

export function createUser(args) {

    return new Promise(async (resolve, reject) => {
        try {
            let fbuser = await admin.auth().createUser({
                email: args.email,
                password: args.password
            })
            const query = {
                text: 'INSERT INTO user_profiles(fullname, bio, userid) VALUES($1, $2, $3) RETURNING *',
                values: [args.fullname, args.bio, fbUser.uid],
            }
            let pgUser = await pool.query(query)
            let user = { ...pgUser.rows[0], email: fbUser.email, id: fbUser.uid }
            context.response.set('Firebase-Token', context.token)
            resolve(user)
        } catch (error) {
            reject(error)
        }
    })
};

export const getUsers = () => {
    return pool.query(`SELECT * from user_profiles`)
        .then(response => {
            // return response.rows
            return repsonse.rows.map((row) => row.reduce((acc, usr) => {
                acc = { ...usr, id: usr.userid }
                delete acc.userid
                return acc
            }), {})
        })
        .catch(errors => {
            console.log(errors)
        })
}

// export function getUsers();


// TODO: Valentines helper function.  Will need this eventually.
function renameId(rows) {
    return rows.map((row) => Object.keys(row)((acc, usr) => {
        acc = { ...row, id: row.userid }
        delete acc.userid;
        return acc
    })), {};
}