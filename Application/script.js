import { config } from "dotenv";
config();

import { OpenAI } from "openai";
import readline from "readline";

var openai;
var userInterface;
//funkcija u koju je upakovano inicijalizovanje openai objekta preko kog se vrsti komunikacija
//sa LLM modelom
function Initialize()
{
    //konstruisanje objekta preko koga mozemo da pozivamo funkije modela
    //generisani API_KEY prosledjujemo u konstruktoru
    openai = new OpenAI({
        apiKey: process.env.API_KEY
    });

    //definisemo kako ce da izgleda user interface, imace ulaz i izlaz
    userInterface = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
}

//funkcija u koju je upakovana funkcionalnost interakcija korisnika i modela putem konzole
function StartChat()
{
    //kreiramo novi prompt koji se prikazuje korisniku
    userInterface.prompt();

    //obrada dogadjaja kada se upise nova poruka u user interface
    userInterface.on("line", async (input) => {
            //ovde se poziva funkcija za razmenu poruka openai.chat.completions.create
            //navodi se model koji se koristi i format poruke
            //poruka sadrzi ko je poslao i njen sadrzaj
            const res = await openai.chat.completions.create({
                model: "gpt-3.5-turbo-1106",
                messages: [{role:"user", content: input }],
            });
            
            //u koznoli se prikazuje samo onaj podatak povratne vrednosti koji predstavlja
            //tekstualni sadrzaj odgovora modela
            console.log(res.data.choices[0].message.content);

            //zatim se prompt ponovo poziva kako bi mogla da se unese sledeca poruka
            userInterface.prompt();
    });
}

Initialize()
StartChat()

