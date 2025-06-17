const express= require('express');
const {ApolloServer} = require('apollo-server-express');
const cors = require('cors');
const dotenv= require('dotenv');


dotenv.config();

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use("/",(req,res,next)=>{
    res.send("Hello World");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

