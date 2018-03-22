function getMiniChartData(properties) {
    var values = [
        ['Police officers for every 100,000 people', policeofficers2010[properties['gss_code']],
        policeofficers2011[properties['gss_code']],
        policeofficers2012[properties['gss_code']],
        policeofficers2013[properties['gss_code']],
        policeofficers2014[properties['gss_code']],
        policeofficers2015[properties['gss_code']],
        policeofficers2016[properties['gss_code']],
        policeofficers2017[properties['gss_code']]
        ],
        ['Police staff for every 100,000 people', policestaff2010[properties['gss_code']],
        policestaff2011[properties['gss_code']],
        policestaff2012[properties['gss_code']],
        policestaff2013[properties['gss_code']],
        policestaff2014[properties['gss_code']],
        policestaff2015[properties['gss_code']],
        policestaff2016[properties['gss_code']],
        policestaff2017[properties['gss_code']],
      ],
        ['PCSOs for every 100,000 people', pcsos2010[properties['gss_code']],
        pcsos2011[properties['gss_code']],
        pcsos2012[properties['gss_code']],
        pcsos2013[properties['gss_code']],
        pcsos2014[properties['gss_code']],
        pcsos2015[properties['gss_code']],
        pcsos2016[properties['gss_code']],
        pcsos2017[properties['gss_code']]
      ],
      ['Designated officers for every 100,000 people', designatedofficers2010[properties['gss_code']],
      designatedofficers2011[properties['gss_code']],
      designatedofficers2012[properties['gss_code']],
      designatedofficers2013[properties['gss_code']],
      designatedofficers2014[properties['gss_code']],
      designatedofficers2015[properties['gss_code']],
      designatedofficers2016[properties['gss_code']],
      designatedofficers2017[properties['gss_code']],
      ]
    ]
      return values;
}

var chart;


function drawMiniChart(properties) {
    console.log('drawing mini chart');
    var data = getMiniChartData(properties);
    console.log(data)

    chart = c3.generate({
        bindto: '#minichart',
        size: {
          height: 350,
          width: 350
        },
        color: {
                  pattern: ['#1b9e77','#e7298a','#66a61e', '#d95f02']
                },
        point: {
                 show: false
                  },
        tooltip: {
                  grouped: false // Default true
                },
                //tooltip: {
          //position: function () {
              //var position = c3.chart.internal.fn.tooltipPosition.apply(this, arguments);
              //position.top = 0;
              //return position;
          //}
          //},
          data: {
              columns: data,// data is the variable holding the data
              type: 'spline',
              order: null
            },
          axis: {
              y: {
                  max:450,
                  min:0
              },
              x: {
                type: 'category',
                categories: ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017']
              }
          },
          grid: {
              y: {
                  lines: [{
                      value: 0
                  }]
            }
        }
      })
    };

// This changes the order of the columns (I don't want this)
//setTimeout(function () {
    //chart.groups([['workforce2010', 'workforce2017', 'policeofficers2017']])
//}, 1000);

// In her code this is not commented out:
//var originalHideTooltip = chart.internal.hideTooltip
//chart.internal.hideTooltip = function () {
    //setTimeout(originalHideTooltip, 100)
//};

function updateMiniChartData(properties) {
    console.log('updating mini chart');
    var data = getMiniChartData(properties);
    chart.load({
            columns: data
        });
}
