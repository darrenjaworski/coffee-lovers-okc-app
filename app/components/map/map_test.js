'use strict';

describe('okcCoffee.version module', function() {
  beforeEach(module('okcCoffee.version'));

  describe('version service', function() {
    it('should return current version', inject(function(version) {
      expect(version).toEqual('0.1');
    }));
  });
});
