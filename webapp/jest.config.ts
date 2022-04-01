export default {
    rootDir: './../',
    transform: {
        "^.+\\.tsx?$": "ts-jest"
    },
    setupFiles: [
        "<rootDir>/node_modules/react$1"
    ]
}