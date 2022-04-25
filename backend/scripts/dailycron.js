import axios from 'axios';
import {insertInDb, findLastId} from './utils.js';


// 1. Consulta no DB Mongo por artigos ordenados por ID
// 2. Pega só o último (número mais alto) (função importada getLastId)
// 3. Consulta a api Space Flight News pegando os últimos 30 resultados
// 4. Inserir no DB Mongo artigos com Id maior que o último Id registrado


const api = axios.create({
    baseURL: 'https://api.spaceflightnewsapi.net/v3/'
});


async function getNewItems(lastId) {

    try{
        const response = await api.get("/articles", {
            params: {
                id_gt: lastId,
            }
        });
        return response.data
    
    } catch (error) {

    }
}

async function updateDb() {

    const lastId = await findLastId()

    let newList = await getNewItems(lastId)
    await insertInDb(newList)
    
}

export default updateDb;