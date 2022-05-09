/**
 * Created by Looker Data Applications Team
 * 2021
 * This file is not used by this repo, it's the source for the cloud function
 * for reference purposes only
 */

const {
  Looker40SDK,
  Looker31SDK,
  NodeSession,
  NodeSettingsIniFile,
  NodeSettings
} = require("@looker/sdk");
// const { createSignedUrl, accessToken } = require('../server_utils/auth_utils')
const settings = new NodeSettings(); //NodeSettingsIniFile()
const session = new NodeSession(settings);
const sdk = new Looker40SDK(session);
exports.helloWorld = (req, res) => {
  let message = req.query.message || req.body.message || "Hello World!";
  res.status(200).send(message);
};
exports.retrieveAccessToken = async (req, res) => {
  console.log("retrieveAccessToken");
  // let me = await sdk.ok(sdk.me())
  const new_token = await sdk.ok(sdk.login_user(36)); //user with specific permissions created by Bryan
  // console.log('me', me)
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET, POST");
  res.status(200).send(new_token);
};
