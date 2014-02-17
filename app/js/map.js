  var speedometer;
    $( document ).ready(function() {
      speedometer = new Speedometer ('speedometer', {theme: 'default'});
      speedometer.draw ();
      speedometer.addEventListener ('speedometer:animateend', function () {
        controls.start ();
      });
    });


  function getPoints(file, result) {
      $.get(file, function(data) {
        var points = data.split(';');
        result(points)
      });  
    }
    function plotPoints(file) {
      getPoints(file, function(points){
        var marker
        var count = 0
        for (key in points) {
          arr = $.trim(points[key]).split(','); 
          latlng = new google.maps.LatLng(arr[0], arr[1])
          speed = arr[2];
          //Set speed
          speedometer.animatedUpdate (50, 5000);

          if (count == 0) {
            marker = new google.maps.Marker({
                position: latlng,
                map: map,
                title:"2001 BMW X5",
                icon: "img/green_car.png"
            });
            // Click event
            google.maps.event.addListener(marker, 'click', function() {
              //Pop modal window.
              $('#myModal').modal({
                keyboard: true,
                show: true
              })
            });
          } else {
            setTimeout(function(marker, latlng) {
              marker.setPosition(latlng)
            }, 3000 * count, marker, latlng)
          }
          count++;
        }
      });
    }
  
    var map
    function initialize() {
      var mapOptions = {
        center: new google.maps.LatLng(45.52, -122.6819),
        zoom: 14
      };
      map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
    }
    google.maps.event.addDomListener(window, 'load', initialize);