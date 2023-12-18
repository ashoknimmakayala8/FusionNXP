const { config } = require("./wdio.shared.conf");

exports.config = {
  ...config,
  ...{
    capabilities: [
      {
        maxInstances: 3,
        browserName: "MicrosoftEdge",
        acceptInsecureCerts: true,
        "ms:edgeOptions": {
          args: ["--incognito", "--no-sandbox", "--headless", "--disable-dev-shm-usage"],
        },
      },
    ],
    services: ["selenium-standalone"],
  },
};
