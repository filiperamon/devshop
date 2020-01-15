const express = require('express')
const app = express()
const port = process.env.PORT || 3000

const category = require('./models/category')

const db = require('knex')({
    client: 'mysql2',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'devshop'
    }
})

const getAllByTable = async (table) => {
    const newTable = await db(table).select('*')
    return newTable
}

//Configuração do knex para mostrar as querys executadas
db.on('query', query => {
    console.log('SQL debug: ', query.sql)
})

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get('/', async (req, res) => {
    const categories = await category.getCategories(db)()

    res.render('home', {
        categories
    })
})

app.get('/categoria/:id/:slug', async (req, res) => {
    const categories = await getAllByTable('categories')
    const products = await category.getProductsByCategoryId(db)(req.params.id)

    res.render('category', {
        products,
        categories
    })
})

app.listen(port, err => {
    if (err)
        console.log('Loja Offline')
    else
        console.log('Loja Online')
})
