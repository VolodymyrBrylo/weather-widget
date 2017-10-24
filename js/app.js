$(document).ready(function () {
    var city = "london";

    var weatheaIcoId;
    var locationsLat,
        locationLon;

    var countryCode;


    function getWeather(city) { // API Get weather information
        var api = '555b9c27e29c4f5cbdb93fa9a5dcbcc6',
            baseUrl = 'http://api.openweathermap.org/data/2.5/weather';

        $.ajax({
            type: "GET",
            url: baseUrl,
            data: {q: city, appid: api, units: 'metric'},
            success: function (data) {
                weatheaIcoId = data.weather[0].id;
                var curentCity = data.name;
                var temp = data.main.temp;
                var temp_max = data.main.temp_max;
                var temp_min = data.main.temp_min;
                var humidity = data.main.humidity;
                var pressure = data.main.pressure;
                var windSpeed = data.wind.speed;
                locationsLat = data.coord.lat;
                locationLon = data.coord.lon;
                countryCode = data.sys.country;


                $('.curentCity').text(curentCity);

                $('.temp').text(temp + '°');
                $('.temp_max').text('max ' + temp_max + '°');
                $('.temp_min').text('min ' + temp_min + '°');


                getIcon(weatheaIcoId);

                googleMaps();

            }
        });
    }


    function getIcon(icoId) { // Get weather icon and weather label

        $.ajax({
            type: "POST",
            url: 'js/icon.json',
            success: function (ico) {
                var weatheaIcoClassName = ico[icoId].icon;
                var weatheaIcoLabel = ico[icoId].label;

                $('.weatheaIco').addClass('wi-day-' + weatheaIcoClassName);
                $('.weatheaIcoLabel').text(weatheaIcoLabel);
            }
        });
    }

    function googleMaps() {
        var styles = [
            {
                "featureType": "water",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#d3d3d3"
                    }
                ]
            },
            {
                "featureType": "transit",
                "stylers": [
                    {
                        "color": "#808080"
                    },
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "color": "#b3b3b3"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#ffffff"
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "color": "#ffffff"
                    },
                    {
                        "weight": 1.8
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#d7d7d7"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "color": "#ebebeb"
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#a7a7a7"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#ffffff"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#ffffff"
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "color": "#efefef"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#696969"
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "color": "#737373"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "labels",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#d6d6d6"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {},
            {
                "featureType": "poi",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#dadada"
                    }
                ]
            }
        ];

        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 12,
            center: new google.maps.LatLng(locationsLat, locationLon),
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            styles: styles
        });

        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(locationsLat, locationLon),
            map: map
        });
    }

    function Autocomplete () {
        // new TeleportAutocomplete({
        //     el: '.my-input',
        //     maxItems: 5,
        //     itemTemplate: function (item) {
        //         return this.wrapMatches(item.name);
        //     }
        // });
        TeleportAutocomplete.init('.my-input', {itemTemplate: function (item) {
            return this.wrapMatches(item.name);
        }}).on('change', function(value) { console.log(value); });
    };

    Autocomplete();


    getWeather(city);

});