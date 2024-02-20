import { Component, ViewChild } from '@angular/core';
import { MapComponent } from 'src/app/components/map/map.component';
import { InfoComponent } from 'src/app/components/info/info.component';
import { FeatureWithLayerId } from 'src/app/model/layer/featureWithLayerId.model';
import { Layer } from 'src/app/model/layer/layer.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'starter-landing',
  standalone: true,
  imports: [CommonModule, MapComponent, InfoComponent],
  templateUrl: './landing.component.html',
  styles: ``,
})
export class LandingComponent {
  selectedFeatures: FeatureWithLayerId[] = [];
  layers: Layer[] = [];
  @ViewChild(MapComponent) mapComponent?: MapComponent;

  constructor() {
    this.setupLayers();
  }

  setupLayers() {
    this.layers.push({
      name: 'Native Vegetation',
      singularName: 'Native Vegetation',
      url: 'https://public-services.slip.wa.gov.au/public/rest/services/SLIP_Public_Services/Environment/MapServer/18/query?where=1%3D1&units=esriSRUnit_Kilometer&outFields=*&returnGeometry=true&featureEncoding=esriDefault&f=geojson',
      strokeColor: '#1660BF',
      fillColor: '#1B73E6',
      active: true,
    });
    this.layers.push({
      name: 'Pre-European Vegetation',
      singularName: 'Pre-European Vegetation',
      url: 'https://public-services.slip.wa.gov.au/public/rest/services/SLIP_Public_Services/Environment/MapServer/17/query/query?where=1%3D1&units=esriSRUnit_Kilometer&outFields=*&returnGeometry=true&featureEncoding=esriDefault&f=geojson',
      strokeColor: '#19BF13',
      fillColor: '#1FE617',
      active: true,
    });
    this.layers.push({
      name: 'Forest Disease Risk Areas',
      singularName: 'Forest Disease Risk Area',
      url: 'https://public-services.slip.wa.gov.au/public/rest/services/SLIP_Public_Services/Environment/MapServer/1/query/query?where=1%3D1&units=esriSRUnit_Kilometer&outFields=*&returnGeometry=true&featureEncoding=esriDefault&f=geojson',
      strokeColor: '#BF16A4',
      fillColor: '#E61BC5',
      active: true,
    });
  }

  selectFeatures(features: FeatureWithLayerId[]) {
    this.selectedFeatures = features;
  }

  deselectFeatures() {
    this.selectedFeatures = [];
    if (this.mapComponent) {
      this.mapComponent.clearMapMarker();
    }
  }
}
