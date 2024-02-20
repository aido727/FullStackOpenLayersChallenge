import { Component, Input, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { FeatureWithLayerId } from 'src/app/model/layer/featureWithLayerId.model';
import { Layer } from 'src/app/model/layer/layer.model';

@Component({
  selector: 'feature',
  standalone: true,
  imports: [MatListModule, CommonModule],
  templateUrl: './feature.component.html',
  styles: ``,
})
export class FeatureComponent {
  @Input() featureWithLayerId!: FeatureWithLayerId;
  @Input() layer!: Layer;
  properties: string[] = [];

  ngOnChanges(changes: SimpleChanges) {
    this.setProperties();
  }

  setProperties() {
    var featureProperties = this.featureWithLayerId.feature.getProperties();
    this.properties = Object.keys(featureProperties)
      .map(function (namedIndex) {
        var value = featureProperties[namedIndex];
        if (typeof value != 'object' && value.toString().trim() != '') {
          return namedIndex;
        }
        return '';
      })
      .filter((x) => x != '');
  }

  getPropertyValue(property: string) {
    return this.featureWithLayerId.feature.get(property);
  }
}
