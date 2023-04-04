import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import { Configuration, OpenAIApi } from 'openai'

dotenv.config() //load environment variables from a .env file into process.env in Node.js.

/*
This code is creating a new Configuration object with the OpenAI API key stored in the environment variable
process.env.OPENAI_API_KEY. The Configuration object is used to configure the OpenAI API and access its features.
*/
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const app = express() ///This line creates an Express application. Express is a web application framework for Node.js that provides a set of features to help build web applications.
app.use(cors()) // This line enables Cross-Origin Resource Sharing (CORS). CORS is a mechanism that allows restricted resources on a web page to be requested from another domain outside the domain from which the resource originated.
app.use(express.json()) //This line parses incoming requests with JSON payloads and is based on body-parser. It exposes various factories to create middlewares, allowing you to easily handle JSON, raw, text and URL encoded form data.
/*
This code is a route handler for an Express application. It is triggered when a user makes a GET request to the root URL 
of the application. When this route is triggered,it will send back an HTTP response with a status code of 200 
(indicating success) and a message of "Hello from CodeX!".
*/
app.get('/', async (req, res) => {
  res.status(200).send({ // Used for HTTP satus to indicate request is successful and the response contains the requested information.
    message: 'Ni gana na YEEHEY' // Outputs this if it is working
  })
})

app.post('/', async (req, res) => {
  try {
    const prompt = req.body.prompt;

    const response = await openai.createCompletion({
      model: "text-davinci-003", // Open AI model text-davinci-003
      prompt: `${prompt}`,
      temperature: 0, // Higher values means the model will take more risks.
      max_tokens: 3000, // The maximum number of tokens to generate in the completion. Most models have a context length of 2048 tokens (except for the newest models, which support 4096).
      top_p: 1, // alternative to sampling with temperature, called nucleus sampling
      frequency_penalty: 0.5, // Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model's likelihood to repeat the same line verbatim.
      presence_penalty: 0, // Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far, increasing the model's likelihood to talk about new topics.
    });

  /*
  It will Send a response to the user with a status of 200 (which indicates that the request was successful) and an 
 object containing the text of the bot's response. The response data is taken from the choices array at index 0.
 */   
      res.status(200).send({   
      bot: response.data.choices[0].text
    });
/* 
 Use to handle errors in a try/catch block. The try block contains code that may throw an error, and the catch block contains code that will be executed if an error is thrown. In this example, the catch
 block logs the error to the console and sends a status code of 500 (Internal Server Error) with the error message back to the client.
*/
  } catch (error) {
    console.error(error)
    res.status(500).send(error || 'Something went wrong'); 
  }
})

app.listen(5000, () => console.log('AI server started on http://localhost:5000'))