import express, { NextFunction, Request, Response } from 'express'
import { errorResponse, notFoundResponse, myError } from './utils'

// don't forget you're doing TYPE-script ;)


export const notFoundMiddleware = (req: express.Request, res: express.Response) => {
    const result: notFoundResponse = { status: 'path not found', path: req.originalUrl }

    res.status(404).send(result)
}

export const catchErrorMiddleware = (err: myError, req: Request, res: Response, next: NextFunction) => {
    const result: errorResponse = { status: 'error', message: err.message, path: req.originalUrl }

    res.statusCode = err.status || 500

    res.send(result)
}
