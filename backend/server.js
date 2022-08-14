import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
// to use for colorful messages in CLI
import colors from 'colors'
// to make our routes work in server we need to import them
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'

import { notFound, errorHandler} from './middleware/errorMiddleware.js'

dotenv.config()

connectDB()

const app = express();
// middleware to accept json in the body request
app.use(express.json())

/*          CUSTOM MIDDLEWARE
 app.use((req, res, next) => {
    console.log(req.originalUrl)
    next();
}) */

app.get('/', (req, res) => {
    res.send('API is running....')
})

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)



app.use(notFound)
app.use(errorHandler)



const PORT = process.env.PORT || 5000

app.listen(
    PORT,
    console.log(`Server running in ${process.env.NODE_ENV} mode on port http://localhost:${PORT}`.yellow.bold)
)
