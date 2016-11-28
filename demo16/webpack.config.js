var path = require("path");

var DEV = path.resolve(__dirname, "src");
var OUTPUT = path.resolve(__dirname, "build");

var config = {
    entry: DEV + "/App.js",
    output: {
        path: OUTPUT,
        filename: "bundle.js"
    },
    module: {
        loaders: [{
            include: DEV,
            loader: "babel",
        }]
    }
};

module.exports = config;