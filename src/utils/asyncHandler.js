import { ApiError } from "./ApiError.js"

// first way of writing asyncHandler
const asyncHandler = (requestHandler) => async (req, res, next) => {
    try {
        await requestHandler(req, res, next)
    } catch (error) {
        res.status(error.code || 500).json(new ApiError(500, error.message))
    }
}

// second way of creating asyncHandler
// const asyncHandlers = (requestHandler) => {
//     return (req, res, next) => {
//         Promise.resolve(requestHandler(req, res, next)).catch((error) => next(error))
//     }
// }

export { asyncHandler }