const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

const cors = require('cors');
app.use(cors());
app.use(express.json());
require('dotenv').config();


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://dbUser1:mYgTqO1PRqZmjRQR@cluster0.ppycm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("juwellary").command({ ping: 1 });
        const database = client.db("juwellary");
        const productsCollection = database.collection("juwellaries");

        console.log('db connected');
        console.log(productsCollection)

        //get products
        app.get('/products', async (req, res) => {
            const result = await productsCollection.find({}).toArray();
            res.send(result)
        })
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);





app.get("/", (req, res) => {

    res.send("node server");
});


app.listen(port, () => {
    console.log("hello", port)
})