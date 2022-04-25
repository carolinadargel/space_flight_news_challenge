import { MongoClient, ServerApiVersion } from 'mongodb';


async function insertInDb (newItems) {
    const uri = "mongodb+srv://spaceflightnews:sfnc1234@cluster0.dqzdt.mongodb.net/articlesDB?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

    try {
        await client.connect();

        const collection = await client.db().collection("articles");
            
        await collection.insertMany(newItems);
    }
    catch(err) {
        console.error(err);
    }
    finally {
        await client.close();
    }
}

async function findLastId (newItems) {
    const uri = "mongodb+srv://spaceflightnews:sfnc1234@cluster0.dqzdt.mongodb.net/articlesDB?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

    try {
        await client.connect();

        const collection = await client.db().collection("articles");
            
        const result = await collection.find({}).sort({ "id" : -1 }).collation({locale:"en_US", numericOrdering:true}).limit(10).toArray();
        
        return result[0].id
    }
    catch(err) {
        console.error(err);
    }
    finally {
        await client.close();
    }
}

export {insertInDb, findLastId};
