"use strict";

const expect = require("chai").expect;
const ConvertHandler = require("../controllers/convertHandler.js");

module.exports = function (app) {
  let convertHandler = new ConvertHandler();

  let splitIdx = null;

  for (let i = 0; i <= input.length; i++) {
    const match = input.charAt(i).toLowerCase().match(/[a-z]/);

    if (match) {
      splitIdx = i;
      break;
    }
  }
};
