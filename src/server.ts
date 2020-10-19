import express, { NextFunction } from 'express'


const app: express.Application = express()

app.get('/', (req: express.Request, res: express.Response) => {
    res.status(200).send('Hello World!')
})

app.get('/get-number', (req: express.Request, res: express.Response) => {
    res.send({ drawn: Math.floor(100 * Math.random()) })
})

app.get('/throw-error', (req: express.Request, res: express.Response, next: NextFunction) => {
    const err = new Error('some error message')

    next(err)
})


const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})