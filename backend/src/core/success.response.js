export default class SuccessResponse {
    static ok = (res, payload) => {
        return res.status(200).json({
            status: 'Success',
            MC: 1,
            MS: 'OK!',
            data: payload,
        })
    }

    static created = (res, payload) => {
        return res.status(201).json({
            status: 'Success',
            MC: 1,
            data: payload,
            MS: 'Created!'
        })
    }
}