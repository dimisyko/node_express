const express = require("express")
const path = require("path")
const app = express()
const morgan = require('morgan')
var favicon = require('serve-favicon')
const fs = require('fs');
const fetch = fs.readFileSync(`./data/detail.json`);
const data = JSON.parse(fetch)

app.set('view engine', 'pug')
app.set('views', 'pages')

app
  .use(favicon(__dirname + '/assets/favicon/favicon.ico'))
  .use(express.static(__dirname + '/assets'))

app.get("/", (req, res) => {
    res.render('index', { data })
})

app.get("/about", (req, res) => {
    res.render('about')
})

app.get("/detail/:id", (req, res) => {
    const dataDetail = data.detailPage.find( data => data.id === req.params.id)
    const projectIndex = data.detailPage.indexOf(dataDetail)
    const next = data.detailPage[projectIndex + 1] ? data.detailPage[projectIndex + 1] : data.detailPage[0]
    res.render('detail', { dataDetail, next })
})
app.use((req, res) => {
    res.status(404).render('404')
})

app.listen(3000, () => console.log(`localhost:3000`))