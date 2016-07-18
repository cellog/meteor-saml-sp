Package.describe({
  name: "cellog:meteor-saml-sp",
  version: "0.1.0",
  summary: "SAML 2.0 Service Provider Implementation for Meteor.",
  git: "https://github.com/cellog/meteor-saml-sp.git",
  documentation: "README.md"
});

Npm.depends({
  "connect" : "2.7.10",
  "passport-saml" : "0.14.0",
  "xml-crypto": "0.8.2",
  "xmldom": "0.1.19"
});
Package.onUse(function(api) {
  api.versionsFrom("1.2.1");
  var serverPackages = [
    "webapp@1.2.3",
    "routepolicy@1.0.6",
    "underscore@1.0.4",
    "service-configuration@1.0.5"
  ];
  api.use(serverPackages,"server");  var serverAndClientPackages = [
    "http@1.1.1",
    "accounts-base@1.2.2",
    "random@1.0.5"
  ];
  api.use(serverAndClientPackages,["client","server"]);
  api.use("tracker@1.0.9","client");

  api.addFiles(["src/client/samlClientHandler.js"],"client");
  api.addFiles(["src/server/config.js"],"server");
	api.addFiles(["src/server/samlServerHandler.js"],"server");
  api.export(["SAML"],["server"]);
});

Package.onTest(function(api) {
  api.use("ecmascript");
  api.use("tinytest");
  api.use("cellog:meteor-saml-sp");
  // api.addFiles("meteor-saml-sp-tests.js");
});
