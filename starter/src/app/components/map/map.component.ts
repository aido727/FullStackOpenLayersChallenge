import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { useGeographic } from 'ol/proj';
import proj4 from 'proj4';
import { register } from 'ol/proj/proj4';
import { Map as OpenMap, View } from 'ol';
import OSM from 'ol/source/OSM.js';
import TileLayer from 'ol/layer/Tile';
import Vector from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import { Pixel } from 'ol/pixel';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import Icon from 'ol/style/Icon';
import { Point } from 'ol/geom';
import Style from 'ol/style/Style';
import { Coordinate } from 'ol/coordinate';
import { LayersButtonComponent } from '../layers-button/layers-button.component';
import { Layer } from 'src/app/model/layer/layer.model';
import { getUid } from 'ol/util';
import { FeatureWithLayerId } from 'src/app/model/layer/featureWithLayerId.model';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'starter-map',
  standalone: true,
  imports: [CommonModule, LayersButtonComponent, MatButtonModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css',
})
export class MapComponent implements OnInit, AfterViewInit {
  @Input() layers: Layer[] = [];
  @Output() setFeatures = new EventEmitter<FeatureWithLayerId[]>();
  @ViewChild('mapContainer', { static: true })
  mapContainer!: ElementRef<HTMLElement>;
  mapComponent!: OpenMap | undefined;
  minX: number = 112.5;
  minY: number = -35.5;
  maxX: number = 129.5;
  maxY: number = -13;
  mapFirstLoadComplete: boolean = false;

  iconFeature = new Feature({
    geometry: new Point([0, 0]),
  });

  iconStyle = new Style({
    image: new Icon({
      anchor: [0.5, 1],
      anchorXUnits: 'fraction',
      anchorYUnits: 'fraction',
      src: 'assets/map-marker.svg',
      scale: 0.5,
    }),
  });

  rasterLayer = new TileLayer({
    source: new OSM(),
  });

  iconLayer = new VectorLayer({
    source: new VectorSource({
      features: [this.iconFeature],
    }),
  });

  ngOnInit() {
    this.iconFeature.setStyle(this.iconStyle);
    this.configLayers();
    useGeographic();
    this.registerProjections();
  }

  ngAfterViewInit() {
    this.initMap();
  }

  private configLayers() {
    this.layers.forEach((layer) => {
      layer.objRef = new VectorLayer({
        source: new Vector({
          format: new GeoJSON(),
          url: layer.url,
        }),
        opacity: 0.6,
        style: {
          'stroke-color': layer.strokeColor,
          'fill-color': layer.fillColor,
        },
      });
      layer.objId = getUid(layer.objRef);
    });
  }

  private initMap() {
    var layers: any[] = [];
    layers.push(this.rasterLayer);
    this.layers.forEach((layer) => {
      layers.push(layer.objRef);
    });
    layers.push(this.iconLayer);

    this.mapComponent = new OpenMap({
      layers: layers,
      target: this.mapContainer.nativeElement,
      maxTilesLoading: 64,
      view: new View({
        center: [
          (this.maxX - this.minX) / 2 + this.minX,
          (this.maxY - this.minY) / 2 + this.minY,
        ],
        zoom: 5,
        // extent: [
        //   this.minX - Math.abs(this.maxX - this.minX) / 2,
        //   this.minY - Math.abs(this.maxY - this.minY) / 2,
        //   this.maxX + Math.abs(this.maxX - this.minX) / 2,
        //   this.maxY + Math.abs(this.maxY - this.minY) / 2,
        // ], // lock scrolling/zooming
      }),
    });

    this.mapComponent.once('loadend', () => {
      this.zoomToExtent();
      this.mapFirstLoadComplete = true;
    });

    this.mapComponent.on('click', (evt) => {
      if (this.mapFirstLoadComplete) {
        this.setMarker(evt.coordinate);
        this.displayFeatureInfo(evt.pixel);
      }
    });

    this.mapComponent.on('loadstart', () => {
      this.mapComponent!.getTargetElement().classList.add('spinner');
    });
    this.mapComponent.on('loadend', () => {
      this.mapComponent!.getTargetElement().classList.remove('spinner');
    });
  }

  public setMarker(coordinate: Coordinate) {
    this.iconFeature.getGeometry()?.setCoordinates(coordinate);
  }

  public displayFeatureInfo(pixel: Pixel) {
    var features: FeatureWithLayerId[] = [];
    this.mapComponent!.forEachFeatureAtPixel(pixel, function (feature, layer) {
      features.push({ feature: feature, layerId: getUid(layer) });
    });

    if (features) {
      this.setFeatures.emit(features);
    } else {
      this.setFeatures.emit([]);
    }
  }

  public zoomToExtent() {
    // zoom in to nice fit on load
    var map = this.mapComponent!;
    map.getView().fit([this.minX, this.minY, this.maxX, this.maxY]);
  }

  registerProjections() {
    register(proj4);
  }

  onLayerChange() {
    if (this.mapFirstLoadComplete) {
      this.layers.forEach((layer) => {
        if (layer.objRef) {
          if (layer.active === true) {
            if (layer.objRef.getVisible() === false) {
              layer.objRef.setVisible(true);
            }
          } else if (layer.objRef.getVisible() === true) {
            layer.objRef.setVisible(false);
          }
        }
      });
    }
  }

  clearMapMarker() {
    this.iconFeature.setGeometry(new Point([0, 0]));
  }
}
