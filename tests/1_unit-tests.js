const chai = require("chai");
let assert = chai.assert;
const ConvertHandler = require("../controllers/convertHandler.js");

let convertHandler = new ConvertHandler();

suite("Unit Tests", function () {
  test("convertHandler should correctly read a whole number input", function () {
    const result = convertHandler.getNum("12mi");
    assert.equal(
      result,
      12,
      'Given input of "12mi" should return a whole number "12"'
    );
  });

  test("convertHandler should correctly read a decimal number input", function () {
    const result = convertHandler.getNum("12.2mi");
    assert.equal(
      result,
      12.2,
      'Given input of "12.2mi" should return a decimal number "12.2"'
    );
  });

  test("convertHandler should correctly read a fractional input", function () {
    const result = convertHandler.getNum("1/2mi");
    assert.equal(
      result,
      "1/2",
      'Given input of "1/2mi" should return a fractional number "1/2"'
    );
  });

  test("convertHandler should correctly read a fractional input with a decimal", function () {
    const result1 = convertHandler.getNum("1.2/2.1mi");
    const result2 = convertHandler.getNum("1.2/1mi");

    assert.equal(
      result1,
      "1.2/2.1",
      'Given input of "1.2/2.1mi" should return a fractional input with a decimal "1.2/2.1"'
    );
    assert.equal(
      result2,
      "1.2/1",
      'Given input of "1.2/1mi" should return a fractional input with a decimal "1.2/1"'
    );
  });

  test("convertHandler should correctly default to a numerical input of 1 when no numerical input is provided", function () {
    const result1 = convertHandler.getNum("mi");

    assert.equal(
      result1,
      "1",
      'Given input of "mi" should return a default: "1"'
    );
  });

  test("convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3).", function () {
    const result1 = convertHandler.getNum("3/2/3mi");

    assert.equal(
      result1,
      "invalid number",
      'Given input of "3/2/3mi" should return an error: "invalid number"'
    );
  });
});
