
const slug = require('../utils/slug')

const getCategories = db => async () => {
    const categories = await db('categories').select('*')
    const categoriesWithSlug = categories.map(category => {
        const newCategory = { ...category, slug: slug(category.category) }
        return newCategory
    })
    return categoriesWithSlug
}

const getProductsByCategoryId = db => async (id) => {
    const products = await db('products').select('*')
        .where('id', function () {
            this.select('categories_products.product_id')
                .from('categories_products')
                .whereRaw('categories_products.product_id')
                .where('categorie_id', id)
        })
    return products
}

module.exports = {
    getCategories,
    getProductsByCategoryId
}