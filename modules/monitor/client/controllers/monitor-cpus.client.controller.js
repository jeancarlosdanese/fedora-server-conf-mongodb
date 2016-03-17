(function () {
  'use strict';

  angular
    .module('monitor')
    .controller('MonitorCpusController', MonitorCpusController);

  MonitorCpusController.$inject = ['$http', '$interval'];

  function MonitorCpusController($http, $interval) {
    var vm = this;

    var index = 0;
    var intervaloSegundos = 1;

    vm.series = [];

    atualizaSeries();
    atualizaCpus();
    $interval(atualizaCpus, (1000 * intervaloSegundos));

    function atualizaCpus() {
      $http.get('/api/monitor/cpus')
      .then(function(dadosCpus) {
        dadosCpus.data.forEach(function(dado) {
          var i = dadosCpus.data.indexOf(dado);
          // vm.series[i].values.push([ index, dado.usoCpu ]);
          vm.series[i].values.push({ 'x': index, 'y': dado.usoCpu });

        });

        /*vm.series.forEach(function(serie) {
          vm.data.push({
            key: serie.cpu,
            values: serie.valores
          });
        });*/

        console.log(vm.series);

        index += intervaloSegundos;
      }, function(err) {
        console.log(err);
      });
    }

    function atualizaSeries() {
      $http.get('/api/monitor/cpus')
      .then(function(dadosCpus) {
        // console.log(dadosCpus);
        dadosCpus.data.forEach(function(dados) {
          vm.series.push({ 'key': dados.cpuNum, 'values': [] });
        });
      }, function(err) {
        console.log(err);
      });
    }

    // vm.data = vm.series;

    /*vm.data = vm.series.forEach(function(serie) {
      console.log(serie);
      {
        key: serie.cpu,
        values: serie.valores
      }
    });*/

    /*vm.data = [
      {
        key: 'CPU-1',
        values: [ [ 1, 20 ], [ 2, 15 ], [ 3, 35 ], [ 4, 25 ] ]
      },
      {
        key: 'CPU-2',
        values: [ [ 1, 40 ], [ 2, 55 ], [ 3, 25 ], [ 4, 15 ] ]
      }
    ];

    console.log(vm.data);*/

    /*vm.options = {
      chart: {
        type: 'cumulativeLineChart',
        height: 400,
        margin : {
          top: 20,
          right: 20,
          bottom: 60,
          left: 65
        },
        x: function(d){ return d[0]; },
        y: function(d){ return d[1]; },
        average: function(d) { return d.mean; },

        //color: d3.scale.category10().range(),
        transitionDuration: 1,
        useInteractiveGuideline: true,
        clipVoronoi: false,

        xAxis: {
         // axisLabel: 'X Axis',
          tickFormat: function(d) {
              //return d3.time.format('%m/%d/%y')(new Date(d))
          },
          showMaxMin: false,
          staggerLabels: true
        },
        yAxis: {
         // axisLabel: 'Y Axis',
          tickFormat: function(d){
              //return d3.format(',.1%')(d);
          },
          axisLabelDistance: 20
        }
      }
    };*/

    vm.options = {
      chart: {
        type: 'lineChart',
        // color: ['rgba(0, 0, 0, 0.10)', 'rgba(255, 87, 34, 0.50)', 'rgba(63, 81, 181, 0.50)'],
        height: 300,
        margin: {
          top: 32,
          right: 32,
          bottom: 32,
          left: 78
        },
        duration: 10,
        clipEdge: true,
        isArea: false,
        useInteractiveGuideline: true,
        clipVoronoi: false,
        interpolate: 'cardinal',
        x: function (d) {
          return d.x;
        },
        y: function (d) {
          return d.y;
        },
        yDomain: [0, 100],
        xAxis: {
          tickFormat: function (d) {
            return d + ' s';
          },
          showMaxMin: false
        },
        yAxis: {
          tickFormat: function (d) {
            return d + ' %';
          }
        },
        interactiveLayer: {
          tooltip: {
            gravity: 's',
            classes: 'gravity-s'
          }
        },
        legend: {
          margin: {
            top: 8,
            right: 0,
            bottom: 32,
            left: 0
          },
          rightAlign: true
        }
      }
    };

    vm.data = vm.series;

  }

})();
