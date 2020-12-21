const path = require('path')

// module.exports = {
//     entry: './index.js',
//     output: {
//         path: path.resolve(__dirname, 'public'),
//         filename: 'bundle.js'
//     },
//     experiments: {
//         syncWebAssembly: true
//     },
// }

const browserConfig = {
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'bundle.js'
    },
    experiments: {
        syncWebAssembly: true
    },
}

const workerConfig = {
    entry: "./my-worker.js",
    target: 'webworker',
    output: {
        path: path.resolve(__dirname, "public"),
        filename: "worker.js"
    },
    mode: "development",
    experiments: {
        syncWebAssembly: true
    },
}

module.exports = [browserConfig, workerConfig]