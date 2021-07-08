"use strict";

const expect = require("chai").expect;
const ConvertHandler = require("../controllers/convertHandler.js");

module.exports = function (app) {
  app.get("/api/convert", (req, res) => {
    const convertHandler = new ConvertHandler();

    const initNum = convertHandler.getNum(req.query.input);
    const initUnit = convertHandler.getUnit(req.query.input);

    if (initNum === "invalid number") {
      res.status(200).send(initNum);
    } else if (initUnit === "invalid unit") {
      res.status(200).send(initUnit);
    } else if (initNum === "invalid number" && initUnit === "invalid unit") {
      res.status(200).send("invalid number and unit");
    }

    const returnNum = convertHandler.convert(initNum, initUnit);
    const returnUnit = convertHandler.getReturnUnit(initUnit);
    const string = convertHandler.getString(
      initNum,
      initUnit,
      returnNum,
      returnUnit
    );

    res.status(200).send(string);
  });
};
