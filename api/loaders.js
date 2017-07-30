import DataLoader from 'dataloader';
import { getItemsShared, getBorrowed, getItem, getUser } from './postgresDB';

export default function () {
    return {
        getItemsShared: new DataLoader(ids => (
            Promise.all(ids.map(id => getItemsShared(id)))
        )),
        getBorrowed: new DataLoader(ids => (
            Promise.all(ids.map(id => getBorrowed(id)))
        )),
        getUser: new DataLoader(ids => {
            return Promise.all(ids.map(id => getUser(id)))
        }),
        getItem: new DataLoader(ids => (
            Promise.all(ids.map(id => getItem(id)))
            // Promise.all(ids.map(od => getFirebaseUser(id)))
        ))
    };
}