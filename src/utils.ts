export interface errorResponse {
    status: string,
    message: string,
    path: string
}

export interface notFoundResponse {
    status: string,
    path: string
}

export class myError extends Error {
    status?: number

    constructor(message?: string | undefined) {
        super(message || undefined)
    }
}