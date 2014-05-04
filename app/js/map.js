var map
    var speedometer;
    var tachometer;
    
    function getPoints(file, result) {

      $.ajax({
        url: file,
        success: function(data){
          var points = data.split(';');
          result(points)
        },
        cache: false
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
                show: true,
                backdrop: false
              })
            });
            
            //Set speed
            speedometer.update(speed);
          } else {
            setTimeout(function(marker, latlng, speed) {
              marker.setPosition(latlng)
              //Set speed
              speedometer.update(speed);
            }, 2000 * count, marker, latlng, speed)
          }
          count++;
        }
      });
    }

    function initialize() {
      var mapOptions = {
        center: new google.maps.LatLng(45.522626, -122.685839),
        zoom: 16
      };
      map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

      initSpeedometer();
    }
    google.maps.event.addDomListener(window, 'load', initialize);

    function initSpeedometer() {
      speedometer = new Speedometer ('speedometer', {theme: 'default'});
      speedometer.draw ();
      tachometer = new Speedometer ('tachometer', {theme: 'default-red'});
      tachometer.draw();
    }
