// declare some objects to put the CSV data into before we begin to load
// the geojson file for the boundaries and the CSV fille with all the attributes
// for each area in the geojson file.
// each object will hold ONE attribute in a key/value pair wher the key will be
// the borough code and the value will be ONE attribute. So there will be one of these
// objects for every column in the CSV. In this example I am loading
var random = {},
code = {},
name = {},
total = {},
workforce2010 = {},
workforce2017 = {}
policeofficers2017 = {}
policestaff2017 = {}
pcsos2017 = {}
designatedofficers2017 = {}
policeofficers2016 = {}
policestaff2016 = {}
pcsos2016 = {}
designatedofficers2016 = {}
policeofficers2015 = {}
policestaff2015 = {}
pcsos2015 = {}
designatedofficers2015 = {}
policeofficers2014 = {}
policestaff2014 = {}
pcsos2014 = {}
designatedofficers2014 = {}
policeofficers2013 = {}
policestaff2013 = {}
pcsos2013 = {}
designatedofficers2013 = {}
policeofficers2012 = {}
policestaff2012 = {}
pcsos2012 = {}
designatedofficers2012 = {}
policeofficers2011 = {}
policestaff2011 = {}
pcsos2011 = {}
designatedofficers2011 = {}
policeofficers2010 = {}
policestaff2010 = {}
pcsos2010 = {}
designatedofficers2010 = {}
workforcePercentageChange2010to2017 = {}



// use jQuery ready() function to wait until all our source files are loaded before attempting
// to do anything see https://learn.jquery.com/using-jquery-core/document-ready/
$( document ).ready(function() {
  queue()
    .defer(d3.json, "london_ward.geojson")
    .defer(d3.csv, "finaldata9.csv", function(d) {

        random[d['code']] = d['random'];
        code[d['code']] = d['name'];
        name[d['code']] = d['name'];
        total[d['code']] = d['total'];
        workforce2010[d['code']] = d['workforce2010'];
        workforce2017[d['code']] = d['workforce2017'];
        policeofficers2017[d['code']] = d['policeofficers2017'];
        policestaff2017[d['code']] = d['policestaff2017'];
        pcsos2017[d['code']] = d['pcsos2017'];
        designatedofficers2017[d['code']] = d['designatedofficers2017'];
        policeofficers2016[d['code']] = d['policeofficers2016'];
        policestaff2016[d['code']] = d['policestaff2016'];
        pcsos2016[d['code']] = d['pcsos2016'];
        designatedofficers2016[d['code']] = d['designatedofficers2016'];
        policeofficers2015[d['code']] = d['policeofficers2015'];
        policestaff2015[d['code']] = d['policestaff2015'];
        pcsos2015[d['code']] = d['pcsos2015'];
        designatedofficers2015[d['code']] = d['designatedofficers2015'];
        policeofficers2014[d['code']] = d['policeofficers2014'];
        policestaff2014[d['code']] = d['policestaff2014'];
        pcsos2014[d['code']] = d['pcsos2014'];
        designatedofficers2014[d['code']] = d['designatedofficers2014'];
        policeofficers2013[d['code']] = d['policeofficers2013'];
        policestaff2013[d['code']] = d['policestaff2013'];
        pcsos2013[d['code']] = d['pcsos2013'];
        designatedofficers2013[d['code']] = d['designatedofficers2013'];
        policeofficers2012[d['code']] = d['policeofficers2012'];
        policestaff2012[d['code']] = d['policestaff2012'];
        pcsos2012[d['code']] = d['pcsos2012'];
        designatedofficers2012[d['code']] = d['designatedofficers2012'];
        policeofficers2011[d['code']] = d['policeofficers2011'];
        policestaff2011[d['code']] = d['policestaff2011'];
        pcsos2011[d['code']] = d['pcsos2011'];
        designatedofficers2011[d['code']] = d['designatedofficers2011'];
        policeofficers2010[d['code']] = d['policeofficers2010'];
        policestaff2010[d['code']] = d['policestaff2010'];
        pcsos2010[d['code']] = d['pcsos2010'];
        designatedofficers2010[d['code']] = d['designatedofficers2010'];
        workforcePercentageChange2010to2017[d['code']] = d['workforcePercentageChange2010to2017'];

      })
      .await(drawMap);
});

function drawMap(error, data) {
    console.log(workforcePercentageChange2010to2017);
    var map = L.map('map').setView([50.62, 2.10], 6);

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoicm9zYWUiLCJhIjoiY2pidW5rdHo3MXIyczJ4bnh2cWp1OWEwZSJ9.Nj-OKYdjBRXNs50cbPGBDA', {
            maxZoom: 18,
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
                '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                'Imagery © <a href="http://mapbox.com">Mapbox</a>',
            id: 'mapbox.streets'
        }).addTo(map);

    // control that shows state info on hover
    var info = L.control();

    // read the docs a bit more here as maybe I should be subclassing a control http://leafletjs.com/reference.html#icontrol
    info.onAdd = function (map) {
        this._div = L.DomUtil.create('div', 'info point');
        this.update();  // call this when we first draw the map to get the starting message
        return this._div;
    };

    // MOBILE DEVICES read this https://github.com/mourner/Leaflet.TouchHover
    info.update = function (props,e) {
        // check to see if the additional div is there, if so we update info and chart
        // if not we draw the whole thing from scratch
        // console.log('info update called');
        //console.log(props)
        if (!props) return;
        if ($('#minichart').length>0) {
            updateMiniChartData(props);
            updateInfoWindow(props)
        } else {
            this._div.innerHTML = drawInfo(props);
            drawMiniChart(props);
        }
    };

    info.addTo(map);

    // concatenate the elements of the basic info window and return the HTML
    function drawInfo (properties) {
        if (!properties) return;
        // console.log(properties);
        // note the sneaky if statement http://stackoverflow.com/questions/1771786/question-mark-in-javascript
        var html = (properties ? "<h3><span id='pfa'>" + properties['name']
        + '</span></h3>'
        + "Since 2010, the total police workforce has dropped by: <span id='workforcePercentageChange2010to2017'>"
        + workforcePercentageChange2010to2017[properties['gss_code']]
        + "</span>" + "% <br/>" + "<p>How the police workforce has changed:</p>"+ "<div id='minichart'></div>"
            : 'Point to an area');

        return html;
    }

    // update the values in the info window
    function updateInfoWindow(properties) {
        $('#pfa').html(properties['name']),
        $('#workforcePercentageChange2010to2017').html(workforcePercentageChange2010to2017[properties['gss_code']])
    }

    var colours = ['#f7fbff','#deebf7','#c6dbef','#9ecae1','#6baed6','#4292c6','#2171b5','#08519c','#08306b'];

    function getColour(d,colours) {
        return d > 32 ? colours[8] :
               d > 28 ? colours[7] :
               d > 24 ? colours[6] :
               d > 20 ? colours[5] :
               d > 16 ? colours[4] :
               d > 12 ? colours[3] :
               d > 8 ? colours[2] :
               d > 4 ? colours[1] :
                        colours[0];
    }

    function style(feature) {
        //console.log(feature['properties']['gss_code']);
        return {
            weight: 1,
            opacity: 1,
            color: 'white',
            dashArray: '1',
            fillOpacity: 0.7,
            fillColor: getColour((workforcePercentageChange2010to2017[feature['properties']['gss_code']]),colours)
        };
    }

    function highlightFeature(e) {
        var layer = e.target;

        layer.setStyle({
            weight: 2,
            color: '#666',
            dashArray: '',
            fillOpacity: 0.7
        });

        if (!L.Browser.ie && !L.Browser.opera) {
            layer.bringToFront();
        }

        info.update(layer.feature.properties,e);
    }

    var geojson;

    function resetHighlight(e) {

        geojson.resetStyle(e.target);
        //info.update();
    }

    function zoomToFeature(e) {
        map.fitBounds(e.target.getBounds());
    }

    function onEachFeature(feature, layer) {
        layer.on({
            mouseover: highlightFeature,
            mouseout: resetHighlight,
            click: zoomToFeature
        });
    }

    geojson = L.geoJson(data, {
        style: style,
        onEachFeature: onEachFeature
    }).addTo(map);

    map.attributionControl.addAttribution('Crime data &copy; <a href="http://police.gov.uk/">Source</a>');


      var legend = L.control({position: 'bottomright'});

        legend.onAdd = function (map) {

            var div = L.DomUtil.create('div', 'info legend'),
                buckets = [4, 8, 12, 16, 20, 24, 28, 32],
                labels = ['The percentage drop in the police workforce, from 2010 to 2017'],
                from, to;

            for (var i = 0; i < buckets.length; i++) {
                from = buckets[i];
                to = buckets[i + 1];

                labels.push(
                    '<i style="background:' + getColour(from+1,colours) + '"></i> ' +
                    from + (to ? '&ndash;' + to : '+'));
            }

            div.innerHTML = labels.join('<br>');
            return div;
        };
    legend.addTo(map);
}
