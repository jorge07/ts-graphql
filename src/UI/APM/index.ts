export default () => {
    const apm = require("elastic-apm-node");
    // Add this to the VERY top of the first file loaded in your app
    apm.start({
        captureExceptions: false,
        serverUrl: "http://127.0.0.1:8200",
        serviceName: "demo",
    });
};
