import { Component, OnInit, AfterViewInit } from '@angular/core';
import html2canvas from 'html2canvas';
import * as jspdf from 'jspdf'; 

@Component({
  selector: 'pm-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, AfterViewInit {
  ngAfterViewInit(): void {
    this.LoadMap();
  }

  markers
  map
  mapOptions
  // google
  constructor() { }

  ngOnInit() {
    this.markers = [
      {
          "title": 'Aksa Beach',
          "lat": '19.1759668',
          "lng": '72.79504659999998',
          "description": 'Aksa Beach is a popular beach and a vacation spot in Aksa village at Malad, Mumbai.'
      },
      {
          "title": 'Juhu Beach',
          "lat": '19.0883595',
          "lng": '72.82652380000002',
          "description": 'Juhu Beach is one of favourite tourist attractions situated in Mumbai.'
      },
      {
          "title": 'Girgaum Beach',
          "lat": '18.9542149',
          "lng": '72.81203529999993',
          "description": 'Girgaum Beach commonly known as just Chaupati is one of the most famous public beaches in Mumbai.'
      },
      {
          "title": 'Jijamata Udyan',
          "lat": '18.979006',
          "lng": '72.83388300000001',
          "description": 'Jijamata Udyan is situated near Byculla station is famous as Mumbai (Bombay) Zoo.'
      },
      {
          "title": 'Sanjay Gandhi National Park',
          "lat": '19.2147067',
          "lng": '72.91062020000004',
          "description": 'Sanjay Gandhi National Park is a large protected area in the northern part of Mumbai city.'
      }
      ];
   
  }
//{lat: 31.917817, lng: -102.225537}
   LoadMap() {
    this.mapOptions = {
        center: new google.maps.LatLng(31.917817, 7-102.225537),
        // center: new google.maps.LatLng(19.0883595, 72.82652380000002),
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(document.getElementById("dvMap"), this.mapOptions);

    // for (var i = 0; i < this.markers.length; i++) {
    //     var data = this.markers[i];
    //     var myLatlng = new google.maps.LatLng(data.lat, data.lng);
    //     var marker = new google.maps.Marker({
    //         position: myLatlng,
    //         map: this.map,
    //         title: data.title
    //     });
    // }
//     var polyline = new google.maps.Polyline(new PolylineOptions()
//      .add(new LatLng(51.5, -0.1), new LatLng(40.7, -74.0))
//      .width(5)
//      .color(Color.RED));
}

Export() {
  //URL of Google Static Maps.
  var staticMapUrl = "https://maps.googleapis.com/maps/api/staticmap?key=AIzaSyDjQSgkLa0HgwS6EDih_JgXGVbGhe2aEq8";

  //Set the Google Map Center.
  staticMapUrl += "&center=" + this.mapOptions.center.lat() + "," + this.mapOptions.center.lng();

  //Set the Google Map Size.
  staticMapUrl += "&size=220x350";

  //Set the Google Map Zoom.
  staticMapUrl += "&zoom=" + this.mapOptions.zoom;

  //Set the Google Map Type.
  staticMapUrl += "&maptype=" + this.mapOptions.mapTypeId;

  //Loop and add Markers.
  for (var i = 0; i < this.markers.length; i++) {
      staticMapUrl += "&markers=color:red|" + this.markers[i].lat + "," + this.markers[i].lng;
  }

  //Display the Image of Google Map.
  var imgMap = document.getElementById("imgMap");
  imgMap.src = staticMapUrl;
  imgMap.style.display = "block";
}

toPDF(){
  var data = document.getElementById('content');
  html2canvas(data).then(canvas => {   
    var imgWidth = 208;   
    var pageHeight = 295;    
    var imgHeight = (canvas.height) * imgWidth / canvas.width;  
    var heightLeft = imgHeight;  
    const contentDataURL = canvas.toDataURL('image/png') ; 
    let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
    pdf.addImage(contentDataURL, 'PNG', 2, 2, imgWidth, imgHeight);
    pdf.output('dataurlnewwindow');
    // pdf.save('route map.pdf')
  });  
}

   
}
