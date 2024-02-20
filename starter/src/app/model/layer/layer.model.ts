import { Feature } from 'ol';
import { Geometry } from 'ol/geom';
import VectorLayer from 'ol/layer/Vector';
import Vector from 'ol/source/Vector';

export interface Layer {
  name: string;
  singularName: string;
  url: string;
  strokeColor: string;
  fillColor: string;
  active: boolean;
  objRef?: VectorLayer<Vector<Feature<Geometry>>>;
  objId?: string;
}
