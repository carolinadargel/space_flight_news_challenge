import axios from 'axios';
import {insertInDb} from './utils.js';


const api = axios.create({
    baseURL: 'https://api.spaceflightnewsapi.net/v3/'
});


async function getItems(i) {

    const response = await api.get("/articles", {
        params: {
           _start: i,
        }
    });

    return response.data;

}


async function populateDb() {
    
    for (let i = 0; i < 200; i = i + 10) {
        let newItems = await getItems(i)
        await insertInDb(newItems)
    }
}

populateDb()