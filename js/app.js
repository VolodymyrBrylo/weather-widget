$(document).ready(function () {

    var city, weatheaIcoId, locationsLat, locationLon, countryCode;
    function getWeather(city) {
        var api = '555b9c27e29c4f5cbdb93fa9a5dcbcc6',
            baseUrl = 'http://api.openweathermap.org/data/2.5/weather';

        $.ajax({
            type: "GET",
            url: baseUrl,
            data: {q: city, appid: api, units: 'metric'},
            success: function (data) {
                weatheaIcoId = data.weather[0].id;
                var curentCity = data.name;
                var temp = Math.round(data.main.temp);
                var temp_max = data.main.temp_max;
                var temp_min = data.main.temp_min;
                var humidity = data.main.humidity;
                var pressure = data.main.pressure;
                var windSpeed = data.wind.speed;
                locationsLat = data.coord.lat;
                locationLon = data.coord.lon;
                countryCode = data.sys.country;

                $('.curentCity span, title').text(curentCity);
                $('title').text('Weather in city ' + curentCity);
                $('.temp span').text(temp + '°');
                $('.temp_max span').text('max ' + temp_max + '°');
                $('.temp_min span').text('min ' + temp_min + '°');
                $('.wind .wi').addClass('wi-wind-beaufort-'+ windSpeed);

                getIcon(weatheaIcoId);
                googleMaps();
                getTimeZone(countryCode);

                console.log(data);
            }
        });
    }  // API Get weather information

    function getTimeZone(country) {
        var key = 'ZU85C6IM2YNW',
            baseUrl = 'http://api.timezonedb.com/v2/list-time-zone';

        $.ajax({
            type: "GET",
            url: baseUrl,
            data: {
                country: country,
                key: key,
                format: 'json',
                units: 'metric'
            },
            success: function (zone) {
                var time = zone.zones[0].timestamp;
                var newTime = new Date(time * 1000);

                var hour;
                if (newTime.getUTCHours() < 10) {
                    hour = '0' + newTime.getUTCHours();
                } else {
                    hour = newTime.getUTCHours();
                }

                var min;
                if (newTime.getUTCMinutes() < 10) {
                    min = '0' + newTime.getUTCMinutes();
                } else {
                    min = newTime.getUTCMinutes();
                }


                $('.time span').text(hour + ":" + min);
            }
        });
    }

    function getIcon(icoId) {
        console.log(weatheaIcoId);
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
    } // Get weather icon and weather label

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
            map: map,
            icon: 'map-marker.png',
            title: 'This is city ' + city
        });
    }

    function Autocomplete() {

        TeleportAutocomplete.init('.my-input', {
            maxItems: 3,
            geoLocate: false,
            itemTemplate: function (item) {
                return this.wrapMatches(item.name);
            }
        }).on('change', function (value) {
            city = value.name;
            getWeather(city);
        });
    }

    Autocomplete();



});

window.onload = function() {
    $(".my-input").focus();
};
