import { Pool } from 'pg';

const pool = new Pool({
    host: 'localhost',
    //TODO: Might not need this
    // After commenting this out it now postgres now times out
    // user: 'ericl',
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
})

// pool.query('SELECT * FROM user_profiles').then((response)=> {
//     console.log(response);
// }).catch(console.log)

export default pool;
