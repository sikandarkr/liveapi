module.exports = {
    requireApiKey: (req, res, next) => {
        console.log(process.env.API_KEY, req.header("x-api-key"));
        const apiKey = req.header("x-api-key");
        // return next(res.json({ "api-key": apiKey }));
        if (!apiKey) {
            return next(res.status(403).json({ "auth/invalid-api-key": "Api key is required " }));
        }
        if (!(apiKey === process.env.API_KEY)) {
            return next(res.status(403).json({ "auth/invalid-api-key": "Access denied" }));
        }
        return next();
    }
};