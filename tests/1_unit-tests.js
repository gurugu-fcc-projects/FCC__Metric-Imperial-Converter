const chai = require("chai");
let assert = chai.assert;
const ConvertHandler = require("../controllers/convertHandler.js");

let convertHandler = new ConvertHandler();

suite("Unit Tests", () => {
  suite("convertHandler getNum method", () => {
    test("should correctly read a whole number input", done => {
      const result = convertHandler.getNum("12mi");
      assert.equal(
        result,
        12,
        'Given input of "12mi" should return a whole number "12"'
      );

      done();
    });

    test("should correctly read a decimal number input", done => {
      const result = convertHandler.getNum("12.2mi");
      assert.equal(
        result,
        12.2,
        'Given input of "12.2mi" should return a decimal number "12.2"'
      );

      done();
    });

    test("should correctly read a fractional input", done => {
      const testData = [
        { input: "1/2mi", result: 0.5 },
        { input: "4/2mi", result: 2 },
        { input: "5/2mi", result: 2.5 },
      ];

      testData.forEach(item => {
        const result = convertHandler.getNum(item.input);
        assert.equal(
          result,
          item.result,
          `Given input "${item.input}" should return "${item.result}"`
        );
      });

      done();
    });

    test("should correctly read a fractional input with a decimal", done => {
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

      done();
    });

    test("should correctly default to a numerical input of 1 when no numerical input is provided", done => {
      const result1 = convertHandler.getNum("mi");

      assert.equal(
        result1,
        "1",
        'Given input of "mi" should return a default: "1"'
      );

      done();
    });

    test("should correctly return an error on a double-fraction (i.e. 3/2/3).", done => {
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

      done();
    });

    test("should correctly return an error on incorrect numbers", done => {
      const inputs = [
        "/2mi",
        "2/mi",
        "/mi",
        ",/,mi",
        "1,1/2,2mi",
        "-/-mi",
        "+/+mi",
        "=/=mi",
        "%mi",
      ];

      inputs.forEach(input => {
        const result = convertHandler.getNum(input);
        assert.equal(
          result,
          "invalid number",
          `Given input of "${input}" should return an error: "invalid number"`
        );
      });

      done();
    });
  });
  suite("convertHandler getUnit method", () => {
    test("should correctly read each valid input unit", done => {
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
      assert.equal(result4, "L", 'Given input "2.2l" should return "L"');
      assert.equal(result5, "lbs", 'Given input ".2lbs" should return "lbs"');
      assert.equal(result6, "kg", 'Given input "2.KG" should return "kg"');
      assert.equal(result7, "mi", 'Given input "MI" should return "mi"');
      assert.equal(result8, "km", 'Given input "KM" should return "km"');

      done();
    });

    test("should correctly return an error for an invalid input unit", done => {
      const result1 = convertHandler.getUnit("mil");
      const result2 = convertHandler.getUnit("12kms");
      const result3 = convertHandler.getUnit("1/2gallons");
      const result4 = convertHandler.getUnit("2.2ligh");
      const result5 = convertHandler.getUnit(".2lbs732");
      const result6 = convertHandler.getUnit("2.KG-==");
      const result7 = convertHandler.getUnit("&^()#&*(&*)(_+=MILE");
      const result8 = convertHandler.getUnit("KMs");

      assert.equal(
        result1,
        "invalid unit",
        'Given input "mil" should return "invalid unit"'
      );
      assert.equal(
        result2,
        "invalid unit",
        'Given input "12kms" should return "invalid unit"'
      );
      assert.equal(
        result3,
        "invalid unit",
        'Given input "1/2gallons" should return "invalid unit"'
      );
      assert.equal(
        result4,
        "invalid unit",
        'Given input "2.2ligh" should return "invalid unit'
      );
      assert.equal(
        result5,
        "invalid unit",
        'Given input ".2lbs732" should return "invalid unit"'
      );
      assert.equal(
        result6,
        "invalid unit",
        'Given input "2.KG-==" should return "invalid unit"'
      );
      assert.equal(
        result7,
        "invalid unit",
        'Given input "&^()#&*(&*)(_+=MILE" should return "invalid unit"'
      );
      assert.equal(
        result8,
        "invalid unit",
        'Given input "KMs" should return "invalid unit"'
      );

      done();
    });
  });
  suite("convertHandler getReturnUnit method", () => {
    test("should return the correct return unit for each valid input unit", done => {
      const result1 = convertHandler.getReturnUnit("mi");
      const result2 = convertHandler.getReturnUnit("km");
      const result3 = convertHandler.getReturnUnit("gal");
      const result4 = convertHandler.getReturnUnit("L");
      const result5 = convertHandler.getReturnUnit("lbs");
      const result6 = convertHandler.getReturnUnit("kg");

      assert.equal(result1, "km", 'Given input "mi" should return "km"');
      assert.equal(result2, "mi", 'Given input "km" should return "mi"');
      assert.equal(result3, "L", 'Given input "gal" should return "L"');
      assert.equal(result4, "gal", 'Given input "L" should return "gal"');
      assert.equal(result5, "kg", 'Given input "lbs" should return "kg"');
      assert.equal(result6, "lbs", 'Given input "kg" should return "lbs"');

      done();
    });
  });
  suite("convertHandler spellOutUnit method", () => {
    test("should correctly return the spelled-out string unit for each valid input unit", done => {
      const result1 = convertHandler.spellOutUnit("mi");
      const result2 = convertHandler.spellOutUnit("km");
      const result3 = convertHandler.spellOutUnit("gal");
      const result4 = convertHandler.spellOutUnit("L");
      const result5 = convertHandler.spellOutUnit("lbs");
      const result6 = convertHandler.spellOutUnit("kg");

      assert.equal(result1, "miles", 'Given input "mi" should return "miles"');
      assert.equal(
        result2,
        "kilometers",
        'Given input "km" should return "kilometers"'
      );
      assert.equal(
        result3,
        "gallons",
        'Given input "gal" should return "gallons"'
      );
      assert.equal(result4, "liters", 'Given input "L" should return "liters"');
      assert.equal(
        result5,
        "pounds",
        'Given input "lbs" should return "pounds"'
      );
      assert.equal(
        result6,
        "kilograms",
        'Given input "kg" should return "kilograms"'
      );

      done();
    });
  });
  suite("convertHandler convert method", () => {
    test("should correctly convert gal to L", done => {
      const result1 = convertHandler.convert(1, "gal");
      const result2 = convertHandler.convert(2, "gal");
      const result3 = convertHandler.convert(3.5, "gal");

      assert.equal(
        result1,
        3.78541,
        'Given input "1, gal" should return "3.78541"'
      );
      assert.equal(
        result2,
        7.57082,
        'Given input "2, gal" should return "7.57082"'
      );
      assert.equal(
        result3,
        13.24894,
        'Given input "2.5, gal" should return "13.24894"'
      );

      done();
    });
    test("should correctly convert L to gal", done => {
      const result1 = convertHandler.convert(1, "L");
      const result2 = convertHandler.convert(2, "L");
      const result3 = convertHandler.convert(2.5, "L");

      assert.equal(
        result1,
        0.26417,
        'Given input "1, L" should return "0.26417"'
      );
      assert.equal(
        result2,
        0.52834,
        'Given input "2, L" should return "0.52834"'
      );
      assert.equal(
        result3,
        0.66043,
        'Given input "2.5, L" should return "0.66043"'
      );

      done();
    });
    test("should correctly convert mi to km", done => {
      const result1 = convertHandler.convert(1, "mi");
      const result2 = convertHandler.convert(2, "mi");
      const result3 = convertHandler.convert(2.5, "mi");

      assert.equal(
        result1,
        1.60934,
        'Given input "1, mi" should return "1.60934"'
      );
      assert.equal(
        result2,
        3.21868,
        'Given input "2, mi" should return "3.21868"'
      );
      assert.equal(
        result3,
        4.02335,
        'Given input "2.5, mi" should return "4.02335"'
      );

      done();
    });
    test("should correctly convert km to mi", done => {
      const result1 = convertHandler.convert(1, "km");
      const result2 = convertHandler.convert(2, "km");
      const result3 = convertHandler.convert(2.5, "km");

      assert.equal(
        result1,
        0.62137,
        'Given input "1, km" should return "0.62137"'
      );
      assert.equal(
        result2,
        1.24275,
        'Given input "2, km" should return "1.24275"'
      );
      assert.equal(
        result3,
        1.55343,
        'Given input "2.5, km" should return "1.55343"'
      );

      done();
    });
    test("should correctly convert lbs to kg", done => {
      const result1 = convertHandler.convert(1, "lbs");
      const result2 = convertHandler.convert(2, "lbs");
      const result3 = convertHandler.convert(2.5, "lbs");

      assert.equal(
        result1,
        0.45359,
        'Given input "1, lbs" should return "0.45359"'
      );
      assert.equal(
        result2,
        0.90718,
        'Given input "2, lbs" should return "0.90718"'
      );
      assert.equal(
        result3,
        1.13398,
        'Given input "2.5, lbs" should return "1.13398"'
      );

      done();
    });
    test("should correctly convert kg to lbs", done => {
      const result1 = convertHandler.convert(1, "kg");
      const result2 = convertHandler.convert(2, "kg");
      const result3 = convertHandler.convert(2.5, "kg");

      assert.equal(
        result1,
        2.20462,
        'Given input "1, kg" should return "2.20462"'
      );
      assert.equal(
        result2,
        4.40925,
        'Given input "2, kg" should return "4.40925"'
      );
      assert.equal(
        result3,
        5.51156,
        'Given input "2.5, kg" should return "5.51156"'
      );

      done();
    });
  });
  suite("convertHandler getString method", () => {
    test("should return a proper string", done => {
      const result = convertHandler.getString(2, "km", 1.24275, "mi");

      assert.equal(
        result,
        "2 kilometers converts to 1.24275 miles",
        'Given input "2, km, 1.24275, mi" should return "2 kilometers converts to 1.24275 miles"'
      );

      done();
    });
  });
});
