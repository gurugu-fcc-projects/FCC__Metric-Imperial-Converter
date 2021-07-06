const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
  
  test('convertHandler should correctly read a whole number input', function() {
    const result = convertHandler.getNum('12mi');
    assert.equal(result, 12, 'Given input of "12mi" should return a whole number "12"');
  });

  test('convertHandler should correctly read a decimal number input', function() {
    const result = convertHandler.getNum('12.2mi');
    assert.equal(result, 12.2, 'Given input of "12.2mi" should return a decimal number "12.2"');
  });

});