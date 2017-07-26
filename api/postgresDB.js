import pool from '../database/index';
import admind from '../database/firebase'

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


    //         .then(response => {
    //             return renameID(response.rows)[0];
    //             admin.auth().getUserByEmail(email)
    //                 .then(function (userRecord) {
    //                     // See the UserRecord reference doc for the contents of userRecord.
    //                     console.log("Successfully fetched user data:", userRecord.toJSON());
    //                 })
    //                 .catch(function (error) {
    //                     console.log("Error fetching user data:", error);
    //                 });
    //         })
    //         .catch(errors => console.log(errors));
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