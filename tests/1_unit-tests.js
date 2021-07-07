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
    const result1 = convertHandler.getNum("1/2mi");
    const result2 = convertHandler.getNum("4/2mi");
    const result3 = convertHandler.getNum("5/2mi");

    assert.equal(
      result1,
      0.5,
      'Given input of "1/2mi" should return a number: "0.5"'
    );
    assert.equal(
      result2,
      2,
      'Given input of "4/2mi" should return a number: "2"'
    );
    assert.equal(
      result3,
      2.5,
      'Given input of "5/2mi" should return a number: "2.5"'
    );
  });

  test("convertHandler should correctly read a fractional input with a decimal", function () {
    const result1 = convertHandler.getNum("1.2/2.1mi");
    const result2 = convertHandler.getNum("1.2/1mi");

    assert.equal(
      result1,
      0.5714285714285714,
      'Given input of "1.2/2.1mi" should return a decimal: "0.5714285714285714"'
    );
    assert.equal(
      result2,
      1.2,
      'Given input of "1.2/1mi" should return a decimal: "1.2"'
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
    const result2 = convertHandler.getNum("/2/mi");

    assert.equal(
      result1,
      "invalid number",
      'Given input of "3/2/3mi" should return an error: "invalid number"'
    );
    assert.equal(
      result2,
      "invalid number",
      'Given input of "/2/mi" should return an error: "invalid number"'
    );
  });

  test("convertHandler should correctly return an error on incorrect numbers", function () {
    const result1 = convertHandler.getNum("/2mi");
    const result2 = convertHandler.getNum("2/mi");
    const result3 = convertHandler.getNum("/mi");
    const result4 = convertHandler.getNum(",/,mi");
    const result5 = convertHandler.getNum("1,1/2,2mi");
    const result6 = convertHandler.getNum("-/-mi");
    const result7 = convertHandler.getNum("+/+mi");
    const result8 = convertHandler.getNum("=/=mi");

    assert.equal(
      result1,
      "invalid number",
      'Given input of "/2mi" should return an error: "invalid number"'
    );
    assert.equal(
      result2,
      "invalid number",
      'Given input of "2/mi" should return an error: "invalid number"'
    );
    assert.equal(
      result3,
      "invalid number",
      'Given input of "/mi" should return an error: "invalid number"'
    );
    assert.equal(
      result4,
      "invalid number",
      'Given input of ",/,mi" should return an error: "invalid number"'
    );
    assert.equal(
      result5,
      "invalid number",
      'Given input of "1,1/2,2mi" should return an error: "invalid number"'
    );
    assert.equal(
      result6,
      "invalid number",
      'Given input of "-/-mi" should return an error: "invalid number"'
    );
    assert.equal(
      result7,
      "invalid number",
      'Given input of "+/+mi" should return an error: "invalid number"'
    );
    assert.equal(
      result8,
      "invalid number",
      'Given input of "=/=mi" should return an error: "invalid number"'
    );
  });
});
