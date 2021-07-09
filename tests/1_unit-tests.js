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
        { input: "1/2mi", expected: 0.5 },
        { input: "4/2mi", expected: 2 },
        { input: "5/2mi", expected: 2.5 },
      ];

      testData.forEach(item => {
        const result = convertHandler.getNum(item.input);
        assert.equal(
          result,
          item.expected,
          `Given input "${item.input}" should return "${item.expected}"`
        );
      });

      done();
    });

    test("should correctly read a fractional input with a decimal", done => {
      const testData = [
        { input: "1.2/2.1mi", expected: 0.5714285714285714 },
        { input: "1.2/1mi", expected: 1.2 },
      ];

      testData.forEach(item => {
        const result = convertHandler.getNum(item.input);
        assert.equal(
          result,
          item.expected,
          `Given input "${item.input}" should return "${item.expected}"`
        );
      });

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
      const inputs = ["3/2/3mi", "/2/mi"];

      inputs.forEach(input => {
        const result = convertHandler.getNum(input);
        assert.equal(
          result,
          "invalid number",
          `Given input "${input}" should return "invalid number"`
        );
      });

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
      const testData = [
        { input: "mi", expected: "mi" },
        { input: "12km", expected: "km" },
        { input: "1/2gal", expected: "gal" },
        { input: "2.2l", expected: "L" },
        { input: ".2lbs", expected: "lbs" },
        { input: "2.KG", expected: "kg" },
        { input: "&^()#&*(&*)(_+=MI", expected: "mi" },
        { input: "KM", expected: "km" },
      ];

      testData.forEach(item => {
        const result = convertHandler.getUnit(item.input);
        assert.equal(
          result,
          item.expected,
          `Given input "${item.input}" should return "${item.expected}"`
        );
      });

      done();
    });

    test("should correctly return an error for an invalid input unit", done => {
      const testData = [
        { input: "mil", expected: "invalid unit" },
        { input: "12kms", expected: "invalid unit" },
        { input: "1/2gallons", expected: "invalid unit" },
        { input: "2.2ligh", expected: "invalid unit" },
        { input: ".2lbs732", expected: "invalid unit" },
        { input: "2.KG-==", expected: "invalid unit" },
        { input: "&^()#&*(&*)(_+=MILE", expected: "invalid unit" },
        { input: "KMs", expected: "invalid unit" },
      ];

      testData.forEach(item => {
        const result = convertHandler.getUnit(item.input);
        assert.equal(
          result,
          item.expected,
          `Given input "${item.input}" should return "${item.expected}"`
        );
      });

      done();
    });
  });
  suite("convertHandler getReturnUnit method", () => {
    test("should return the correct return unit for each valid input unit", done => {
      const testData = [
        { input: "mi", expected: "km" },
        { input: "km", expected: "mi" },
        { input: "gal", expected: "L" },
        { input: "L", expected: "gal" },
        { input: "lbs", expected: "kg" },
        { input: "kg", expected: "lbs" },
      ];

      testData.forEach(item => {
        const result = convertHandler.getReturnUnit(item.input);
        assert.equal(
          result,
          item.expected,
          `Given input "${item.input}" should return "${item.expected}"`
        );
      });

      done();
    });
  });
  suite("convertHandler spellOutUnit method", () => {
    test("should correctly return the spelled-out string unit for each valid input unit", done => {
      const testData = [
        { input: "mi", expected: "miles" },
        { input: "km", expected: "kilometers" },
        { input: "gal", expected: "gallons" },
        { input: "L", expected: "liters" },
        { input: "lbs", expected: "pounds" },
        { input: "kg", expected: "kilograms" },
      ];

      testData.forEach(item => {
        const result = convertHandler.spellOutUnit(item.input);
        assert.equal(
          result,
          item.expected,
          `Given input "${item.input}" should return "${item.expected}"`
        );
      });

      done();
    });
  });
  suite("convertHandler convert method", () => {
    test("should correctly convert gal to L", done => {
      const testData = [
        { input: [1, "gal"], expected: 3.78541 },
        { input: [2, "gal"], expected: 7.57082 },
        { input: [2.5, "gal"], expected: 13.24894 },
      ];

      testData.forEach(item => {
        const result = convertHandler.convert(...item.input);
        assert.equal(
          result,
          item.expected,
          `Given input "${item.input}" should return "${item.expected}"`
        );
      });

      done();
    });
    test("should correctly convert L to gal", done => {
      const testData = [
        { input: [1, "L"], expected: 0.26417 },
        { input: [2, "L"], expected: 0.52834 },
        { input: [2.5, "L"], expected: 0.66043 },
      ];

      testData.forEach(item => {
        const result = convertHandler.convert(...item.input);
        assert.equal(
          result,
          item.expected,
          `Given input "${item.input}" should return "${item.expected}"`
        );
      });

      done();
    });
    test("should correctly convert mi to km", done => {
      const testData = [
        { input: [1, "mi"], expected: 1.60934 },
        { input: [2, "mi"], expected: 3.21868 },
        { input: [2.5, "mi"], expected: 4.02335 },
      ];

      testData.forEach(item => {
        const result = convertHandler.convert(...item.input);
        assert.equal(
          result,
          item.expected,
          `Given input "${item.input}" should return "${item.expected}"`
        );
      });

      done();
    });
    test("should correctly convert km to mi", done => {
      const testData = [
        { input: [1, "km"], expected: 0.62137 },
        { input: [2, "km"], expected: 1.24275 },
        { input: [2.5, "km"], expected: 1.55343 },
      ];

      testData.forEach(item => {
        const result = convertHandler.convert(...item.input);
        assert.equal(
          result,
          item.expected,
          `Given input "${item.input}" should return "${item.expected}"`
        );
      });

      done();
    });
    test("should correctly convert lbs to kg", done => {
      const testData = [
        { input: [1, "lbs"], expected: 0.45359 },
        { input: [2, "lbs"], expected: 0.90718 },
        { input: [2.5, "lbs"], expected: 1.13398 },
      ];

      testData.forEach(item => {
        const result = convertHandler.convert(...item.input);
        assert.equal(
          result,
          item.expected,
          `Given input "${item.input}" should return "${item.expected}"`
        );
      });

      done();
    });
    test("should correctly convert kg to lbs", done => {
      const testData = [
        { input: [1, "kg"], expected: 2.20462 },
        { input: [2, "kg"], expected: 4.40925 },
        { input: [2.5, "kg"], expected: 5.51156 },
      ];

      testData.forEach(item => {
        const result = convertHandler.convert(...item.input);
        assert.equal(
          result,
          item.expected,
          `Given input "${item.input}" should return "${item.expected}"`
        );
      });

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
