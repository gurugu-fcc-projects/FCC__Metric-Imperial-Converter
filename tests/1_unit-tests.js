const chai = require("chai");
let assert = chai.assert;
const ConvertHandler = require("../controllers/convertHandler.js");

let convertHandler = new ConvertHandler();

suite("Unit Tests", function () {
  suite("convertHandler getNum method", function () {
    test("should correctly read a whole number input", function () {
      const result = convertHandler.getNum("12mi");
      assert.equal(
        result,
        12,
        'Given input of "12mi" should return a whole number "12"'
      );
    });

    test("should correctly read a decimal number input", function () {
      const result = convertHandler.getNum("12.2mi");
      assert.equal(
        result,
        12.2,
        'Given input of "12.2mi" should return a decimal number "12.2"'
      );
    });

    test("should correctly read a fractional input", function () {
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

    test("should correctly read a fractional input with a decimal", function () {
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

    test("should correctly default to a numerical input of 1 when no numerical input is provided", function () {
      const result1 = convertHandler.getNum("mi");

      assert.equal(
        result1,
        "1",
        'Given input of "mi" should return a default: "1"'
      );
    });

    test("should correctly return an error on a double-fraction (i.e. 3/2/3).", function () {
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

    test("should correctly return an error on incorrect numbers", function () {
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
  suite("convertHandler getUnit method", function () {
    test("should correctly read each valid input unit", function () {
      const result1 = convertHandler.getUnit("mi");
      const result2 = convertHandler.getUnit("12km");
      const result3 = convertHandler.getUnit("1/2gal");
      const result4 = convertHandler.getUnit("2.2l");
      const result5 = convertHandler.getUnit(".2lbs");
      const result6 = convertHandler.getUnit("2.KG");
      const result7 = convertHandler.getUnit("&^()#&*(&*)(_+=MI");
      const result8 = convertHandler.getUnit("KM");

      assert.equal(result1, "mi", 'Given input "mi" should return "mi"');
      assert.equal(result2, "km", 'Given input "12km" should return "km"');
      assert.equal(result3, "gal", 'Given input "1/2gal" should return "gal"');
      assert.equal(result4, "l", 'Given input "2.2l" should return "l"');
      assert.equal(result5, "lbs", 'Given input ".2lbs" should return "lbs"');
      assert.equal(result6, "kg", 'Given input "2.KG" should return "kg"');
      assert.equal(result7, "mi", 'Given input "MI" should return "mi"');
      assert.equal(result8, "km", 'Given input "KM" should return "km"');
    });
  });
});
