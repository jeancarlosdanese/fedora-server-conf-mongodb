'use strict';

angular.module('ambientes')

.factory('Dhcpd', ['AmbientesService', function (AmbientesService) {

  var dhcpd = {};

  var msg = 'ba tche';

  dhcpd.getMsg = function(message) {
    return message ? message : msg;
  };

  return dhcpd;

}]);
