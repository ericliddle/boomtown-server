import fetch from 'node-fetch';


// export function getUsers() {
//     return fetch(`http://localhost:3001/users`)
//         .then(response => response.json())
//         .catch(errors => console.log(errors));
// };


// export function getUser(id) {
//     return fetch(`http://localhost:3001/users/${id}`)
//         .then(response => response.json())
//         .catch(errors => console.log(errors));
// };

// export function getAllItems() {
//     return fetch(`http://localhost:3001/items`)
//         .then(response => response.json())
//         .catch(errors => console.log(errors));
// };

// export function getItem(id) {
//     return fetch(`http://localhost:3001/items/${id}`)
//         .then(response => response.json())
//         .catch(errors => console.log(errors));
// };

// export function getItemsShared(user) {
//     return fetch(`http://localhost:3001/items/?itemowner=${user}`)
//         .then(response => response.json())
//         .catch(errors => console.log(errors));
// };
// export function getBorrowed(user) {
//     return fetch(`http://localhost:3001/items/?borrower=${user}`)
//         .then(response => response.json())
//         .catch(errors => console.log(errors));
// };

// export function addItem(root, args) {
//     const newItem = {
//         title: args.title,
//         imageurl: args.imageurl,
//         itemowner: args.itemowner,
//         description: args.description,
//         tags: args.tags,
//         created: Math.floor(Date.now() / 1000),
//         available: true,
//         borrower: null
//     }

//     return fetch('http://localhost:3001/items/', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(newItem)
//     })
//         .then(response => response.json())
//         .catch(errors => console.log(errors));
// };
