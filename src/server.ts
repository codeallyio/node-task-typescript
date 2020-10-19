import express, { NextFunction } from 'express'
import { catchErrorMiddleware, notFoundMiddleware } from './middleware'
import { myError } from './utils'


const app: express.Application = express()

app.get('/', (req: express.Request, res: express.Response) => {
    res.status(200).send('Hello World!')
})

app.get('/get-number', (req: express.Request, res: express.Response) => {
    res.send({ drawn: Math.floor(100 * Math.random()) })
})

app.get('/throw-error-with-status', (req: express.Request, res: express.Response, next: NextFunction) => {
    const err = new myError('some error message')
    err.status = 418

    next(err)
})

app.get('/throw-error', (req: express.Request, res: express.Response, next: NextFunction) => {
    const err = new myError('some error message')

    next(err)
})

app.use(notFoundMiddleware)
app.use(catchErrorMiddleware)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})