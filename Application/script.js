import { config } from "dotenv";
config();

import { OpenAI } from "openai";
import readline from "readline";

//This function wraps the initialization of the openai object through which communication
//with the LLM model is performed
var openai;
var userInterface;
function Initialize()
{
    //constructing the object through which we can call model functions
    //the generated API_KEY is passed to the constructor
    openai = new OpenAI({
        apiKey: process.env.API_KEY
    });

    //define what the user interface will look like, it will have input and output
    userInterface = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
}

//This function encapsulates the functionality for user and model interaction via the console
function StartChat()
{
    // create a new prompt that is displayed to the user
    userInterface.prompt();

    // event handler when a new message is entered in the user interface
    userInterface.on("line", async (input) => {
            // here the function for exchanging messages openai.chat.completions.create is called
            // specify the model used and the message format
            // the message contains who sent it and its content
            const res = await openai.chat.completions.create({
                model: "gpt-3.5-turbo-1106",
                messages: [{role:"user", content: input }],
            });
            
            // in the console, only the part of the return value that represents
            // the textual content of the model's response is displayed
            console.log(res.data.choices[0].message.content);

            // then the prompt is called again so that the next message can be entered
            userInterface.prompt();
    });
}

Initialize()
StartChat()

