const express = require("express")
const path = require("path")
const app = express()
const fs = require('fs');

const fetch = fs.readFileSync(`./data/detail.json`);
const data = JSON.parse(fetch)

app.set('view engine', 'pug')
app.set('views', 'pages')

app.use("/img", express.static(path.resolve(__dirname, "./assets", "img")))

app.use("/js", express.static(path.resolve(__dirname, "./assets", "js")))
app.use("/style", express.static(path.resolve(__dirname, "./assets", "style")))

app.get("/", (req, res) => {
    res.render('index', { data })
})

app.get("/about", (req, res) => {
    res.render('about')
})

app.get("/detail/:id", (req, res) => {
    data.detailPage.forEach(element => {
        if (req.params.id === element.id) {
            res.render('detail', { element })
        }
    })
})
app.use((req, res) => {
    res.status(404).render('404')
})

app.listen(3000, () => console.log(`localhost:3000`))