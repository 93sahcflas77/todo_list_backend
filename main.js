const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const port = 3000;


app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));


app.get("/", (req, res) => {

    fs.readdir("./files", (err, data) => {
        res.render("index", { fileName: data });
    });

});

app.get("/edit/:fileName", (req, res) => {

    fs.readFile(`./files/${req.params.fileName}.txt`, (err) => {
        res.render("edit", { fileName: req.params.fileName });
    });
});

app.get("/file/:fileName", (req, res) => {

    fs.readFile(`./files/${req.params.fileName}`, "utf-8", (err, data) => {
        res.render("show", { fileName: req.params.fileName, filedata: data });
    });

});

app.get("/delete/:fileName", (req, res) => {

    fs.unlink(`./files/${req.params.fileName}`, () => {
        res.redirect("/");
    });

});

app.post("/create", (req, res) => {

    fs.writeFile(`./files/${req.body.tittle.split(" ").join()}.txt`, req.body.message, (err) => {
        res.redirect("/");
    });

});

app.post("/edit", (req, res) => {

    fs.rename(`./files/${req.body.preview}`, `./files/${req.body.new}`, () => {
        res.redirect("/");
    });

});

app.listen(port, () => {
    console.log(`Server run this port ${port}`);
}); 