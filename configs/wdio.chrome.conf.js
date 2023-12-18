const { config, downloadDir } = require("./wdio.shared.conf");

exports.config = {
  ...config,
  ...{
    capabilities: [
      {
        maxInstances: 3,
        browserName: "chrome",
        acceptInsecureCerts: true,
        "goog:chromeOptions": {
          args: ["--incognito", "--no-sandbox", /* "--headless", */ "--disable-dev-shm-usage"],
          prefs: {
            directory_upgrade: true,
            prompt_for_download: false,
            "download.default_directory": downloadDir,
          },
        },
      },
    ],
    services: ["chromedriver"],
  },
};
