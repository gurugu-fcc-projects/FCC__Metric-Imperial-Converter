function ConvertHandler() {
  this.getNum = function (input) {
    let splitPoint = null;
    const splitPointRegex = new RegExp("[a-z]");

    for (let i = 0; i < input.length; i++) {
      const isFound = splitPointRegex.test(input.charAt(i));

      if (isFound) {
        splitPoint = i;
        break;
      }
    }

    const numericalPart = input.slice(0, splitPoint);

    if (!numericalPart) {
      return 1;
    }

    if (numericalPart.includes("/")) {
      const fractionalParts = numericalPart.split("/");

      if (fractionalParts.length > 2) {
        return "invalid number";
      }

      const allNumbers = fractionalParts.every(Number);

      if (!allNumbers) {
        return "invalid number";
      }

      return Number(fractionalParts[0]) / Number(fractionalParts[1]);
    }

    return numericalPart;
  };

  this.getUnit = function (input) {
    let splitPoint = null;
    const splitPointRegex = new RegExp("[a-z]");
    const inputToLowerCase = input.toLowerCase();

    for (let i = 0; i < input.length; i++) {
      const isFound = splitPointRegex.test(inputToLowerCase.charAt(i));

      if (isFound) {
        splitPoint = i;
        break;
      }
    }

    const unitPart = inputToLowerCase.slice(splitPoint);

    const unitIsValid = /^(mi|km|gal|l|kg|lbs)$/.test(unitPart);

    if (!unitIsValid) {
      return "invalid unit";
    }

    return unitPart;
  };

  this.getReturnUnit = function (initUnit) {
    const pairs = {
      km: "mi",
      mi: "km",
      l: "gal",
      gal: "l",
      kg: "lbs",
      lbs: "kg",
    };

    return pairs[initUnit];
  };

  this.spellOutUnit = function (unit) {
    const pairs = {
      km: "kilometers",
      mi: "miles",
      l: "liters",
      gal: "gallons",
      kg: "kilograms",
      lbs: "pounds",
    };

    return pairs[unit];
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;

    const conversions = {
      l: num => (num / galToL).toFixed(5),
      gal: num => (num * galToL).toFixed(5),
    };

    return conversions[initUnit](initNum);
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    let result;

    return result;
  };
}

module.exports = ConvertHandler;
