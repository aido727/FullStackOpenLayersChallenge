import { FeatureLike } from 'ol/Feature';

export interface FeatureWithLayerId {
  feature: FeatureLike;
  layerId: string;
}
