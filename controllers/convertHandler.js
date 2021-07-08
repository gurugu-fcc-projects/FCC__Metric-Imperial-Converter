function ConvertHandler() {
  this.getNum = function (input) {
    let splitPoint = null;
    const splitPointRegex = new RegExp("[a-zA-Z]");

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

    return Number(numericalPart);
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

    if (unitPart === "l") {
      return "L";
    }

    return unitPart;
  };

  this.getReturnUnit = function (initUnit) {
    const pairs = {
      km: "mi",
      mi: "km",
      L: "gal",
      gal: "L",
      kg: "lbs",
      lbs: "kg",
    };

    return pairs[initUnit];
  };

  this.spellOutUnit = function (unit) {
    const pairs = {
      km: "kilometers",
      mi: "miles",
      L: "liters",
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
      km: num => (num / miToKm).toFixed(5),
      mi: num => (num * miToKm).toFixed(5),
      L: num => (num / galToL).toFixed(5),
      gal: num => (num * galToL).toFixed(5),
      kg: num => (num / lbsToKg).toFixed(5),
      lbs: num => (num * lbsToKg).toFixed(5),
    };

    return Number(conversions[initUnit](initNum));
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    const initUnitString = this.spellOutUnit(initUnit);
    const returnUnitString = this.spellOutUnit(returnUnit);

    return `${initNum} ${initUnitString} converts to ${returnNum} ${returnUnitString}`;
  };
}

module.exports = ConvertHandler;
