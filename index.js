if (process.env.NODE_ENV != "production") {
    require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const ejsMate = require("ejs-mate");
const OpenAI = require("openai");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "/public")));
const { Configuration, OpenAIApi } = require("openai");

const PORT = 9002;

// user question, remaining part
app.get("/peacewithpeace/user-questions", async (req, res) => {

    let question = req.query;
    if (!question) {
        return res.redirect("/peacewithpeace");
    }

    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY, 
    });

    const openai = new OpenAIApi(configuration);

    try {
        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: question }],
            max_tokens: 100,
        });

        const answer = response.data.choices[0].message.content;
        res.send({ answer }); // Send the answer back as JSON
    } catch (error) {
        console.error("Error fetching response from OpenAI:", error);
        res.status(500).send("Error fetching response");
    }
    res.send("working");
});

app.get("/pacewithpeace/lessons", (req, res) => {
    res.render("./dashboard/pacelesson.ejs");
});

app.get("/pacewithpeace", (req, res) => {
    res.render("./dashboard/dashboard.ejs");
});


app.listen(PORT, () => {
    console.log("Server has been started...");
});