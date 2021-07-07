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
    }

    return numericalPart;
  };

  this.getUnit = function (input) {
    let result;

    return result;
  };

  this.getReturnUnit = function (initUnit) {
    let result;

    return result;
  };

  this.spellOutUnit = function (unit) {
    let result;

    return result;
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;

    return result;
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    let result;

    return result;
  };
}

module.exports = ConvertHandler;
