// we do setup to call openai
//get API key from openai to .env Ann Z

import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import { Configuration, OpenAIApi } from 'openai'

dotenv.config()

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

// create instance of openai
const openai = new OpenAIApi(configuration);


//initialise express app
const app = express()
    // allow server to call from forntend
app.use(cors())
    // allow us to pass json form frontend to backend
app.use(express.json())

app.get('/', async(req, res) => {
    res.status(200).send({
        message: 'Hello from CodeX!'
    })
})