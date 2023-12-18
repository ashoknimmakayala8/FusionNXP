const { config, downloadDir } = require("./wdio.shared.conf");

exports.config = {
  ...config,
  ...{
    capabilities: [
      {
        maxInstances: 3,
        browserName: "firefox",
        acceptInsecureCerts: true,
        "moz:firefoxOptions": {
          args: ["-private", "-no-sandbox", "-headless", "-disable-dev-shm-usage"],
          prefs: {
            "browser.download.manager.showWhenStarting": false,
            "browser.download.folderList": 2,
            "browser.download.dir": downloadDir,
            "browser.download.useDownloadDir": true,
          },
        },
      },
    ],
    services: ["geckodriver"],
  },
};
