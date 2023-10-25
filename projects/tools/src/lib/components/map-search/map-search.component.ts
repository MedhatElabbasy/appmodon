import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

export let mapTheme = [
  {
    elementType: 'geometry',
    stylers: [
      {
        color: '#f5f5f5',
      },
    ],
  },
  {
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#616161',
      },
    ],
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#f5f5f5',
      },
    ],
  },
  {
    featureType: 'administrative.land_parcel',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#bdbdbd',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'geometry',
    stylers: [
      {
        color: '#eeeeee',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#757575',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [
      {
        color: '#e5e5e5',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#9e9e9e',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [
      {
        color: '#ffffff',
      },
    ],
  },
  {
    featureType: 'road.arterial',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#757575',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [
      {
        color: '#dadada',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#616161',
      },
    ],
  },
  {
    featureType: 'road.local',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#9e9e9e',
      },
    ],
  },
  {
    featureType: 'transit.line',
    elementType: 'geometry',
    stylers: [
      {
        color: '#e5e5e5',
      },
    ],
  },
  {
    featureType: 'transit.station',
    elementType: 'geometry',
    stylers: [
      {
        color: '#eeeeee',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [
      {
        color: '#c9c9c9',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#46bced',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#9e9e9e',
      },
    ],
  },
];

@Component({
  selector: 'projects/tools/src/public-api-map-search',
  templateUrl: './map-search.component.html',
  styleUrls: ['./map-search.component.scss'],
})
export class MapSearchComponent implements OnInit {
  @ViewChild('search') searchElementRef!: ElementRef<any>;
  @Input('addressControl') addressControl!: FormControl;
  @Input('latControl') latControl!: FormControl;
  @Input('lngControl') lngControl!: FormControl;
  @Input() searchTerm: string = "";
  @Output() coordinates = new EventEmitter<any>();

  zoom = 12;
  center!: google.maps.LatLngLiteral;
  geoCoder = new google.maps.Geocoder();
  autoComplete!: google.maps.places.Autocomplete;
  markerOptions!: google.maps.MarkerOptions;
  coordinatesSnapshot = {
    formatted_address: '',
    latLng: { lat: 0, lng: 0 },
  };

  lang!: string;
  coordinatesSubject!: BehaviorSubject<{
    formatted_address: string;
    latLng: google.maps.LatLngLiteral;
  }>;
  mapOption!: google.maps.MapOptions;

  constructor(private ngZone: NgZone) {
    this.coordinatesSubject = new BehaviorSubject(this.coordinatesSnapshot);
    this.onEventListener();
    // this.getCurrentPosition();
    this.markerOptions = {
      draggable: true,
    };
  }

  ngOnInit() {}

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.

    this.generateAutoComplete();
    this.autoCompleteListener();
  }

  getCurrentPosition() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };

      this.getAddress(position.coords.latitude, position.coords.longitude);
    });
  }

  generateAutoComplete() {
    this.autoComplete = new google.maps.places.Autocomplete(
      this.searchElementRef?.nativeElement
    );
  }

  autoCompleteListener() {
    this.autoComplete.addListener('place_changed', () => {
      this.ngZone.run(() => {
        //get the place result
        let place: google.maps.places.PlaceResult =
          this.autoComplete.getPlace();

        //verify result
        if (place.geometry === undefined || place.geometry === null) {
          return;
        }

        this.center = {
          lat: place.geometry.location?.lat()!,
          lng: place.geometry.location?.lng()!,
        };

        this.coordinatesSnapshot.latLng = this.center;
        this.coordinatesSnapshot.formatted_address =
          this.searchElementRef.nativeElement.value;
        this.coordinatesSubject.next(this.coordinatesSnapshot);
      });
    });
  }

  markerDragListener(event: any) {
    this.center = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };

    this.getAddress(this.center.lat, this.center.lng);
  }

  getAddress(_lat: number, _lng: number) {
    this.geoCoder.geocode(
      { location: { lat: _lat, lng: _lng } },
      (results: any, status: any) => {
        if (status === 'OK') {
          if (results[0]) {
            this.zoom = 12;
            this.searchElementRef.nativeElement.value =
              results[0].formatted_address;
            this.coordinatesSnapshot.latLng = { lat: _lat, lng: _lng };
            this.coordinatesSnapshot.formatted_address =
              results[0].formatted_address;

            this.coordinatesSubject.next(this.coordinatesSnapshot);
          } else {
            window.alert('No results found');
          }
        } else {
          window.alert('Geocoder failed due to: ' + status);
        }
      }
    );
  }

  onEventListener() {
    this.coordinatesSubject.subscribe((data) => {
      this.coordinates.next(data);
      if (this.addressControl) {
        if (data.formatted_address.trim().length != 0) {
          this.addressControl.setValue(data.formatted_address);
        } else {
          this.addressControl.setValue(null);
        }
      }

      if (this.latControl) {
        this.latControl.setValue(data.latLng.lat);
      }

      if (this.lngControl) {
        this.lngControl.setValue(data.latLng.lng);
      }
    });
  }
}
