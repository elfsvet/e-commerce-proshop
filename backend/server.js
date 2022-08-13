import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
// to use for colorful messages in CLI
import colors from 'colors'

import productRoutes from './routes/productRoutes.js'

dotenv.config()

connectDB()

const app = express();

app.get('/', (req, res) => {
    res.send('API is running....')
})

app.use('/api/products', productRoutes)

const PORT = process.env.PORT || 5000

app.listen(
    PORT,
    console.log(`Server running in ${process.env.NODE_ENV} mode on port http://localhost:${PORT}`.yellow.bold)
)
