const logger = (req, res, next) => {
    const timestamp = new Date().toISOString();

    console.log("----- REQUEST LOG -----");
    console.log("Time:", timestamp);
    console.log("Method:", req.method);
    console.log("URL:", req.originalUrl);

    if (req.method === "POST" || req.method === "PUT") {
        console.log("Body:", req.body);
    }

    console.log("-----------------------");

    next();
};

module.exports = logger;
