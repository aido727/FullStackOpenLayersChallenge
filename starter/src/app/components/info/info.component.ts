import {
  AfterContentInit,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { FeatureComponent } from '../feature/feature.component';
import { CdkDrag } from '@angular/cdk/drag-drop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { FeatureWithLayerId } from 'src/app/model/layer/featureWithLayerId.model';
import { Layer } from 'src/app/model/layer/layer.model';

@Component({
  selector: 'info',
  standalone: true,
  imports: [
    FeatureComponent,
    MatListModule,
    CommonModule,
    CdkDrag,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
  ],
  templateUrl: './info.component.html',
  styles: ``,
})
export class InfoComponent implements AfterContentInit {
  @Input() features: FeatureWithLayerId[] = [];
  @Input() layers: Layer[] = [];
  @Output() deselect = new EventEmitter<null>();

  draggingResize = false;

  ngAfterContentInit() {
    var featureContent = document.getElementById('feature-content');
    var dragbar = document.getElementById('dragbar');

    if (dragbar && featureContent) {
      dragbar.onmousedown = (e) => {
        e.preventDefault();
        this.draggingResize = true;
      };

      document.onmousemove = (e) => {
        if (this.draggingResize) {
          // need an automated way to calc this from element
          let max = window.innerWidth * 0.4;
          let min = window.innerWidth * 0.1;
          let value = window.innerWidth - e.clientX;
          if (value > max) {
            value = max;
          } else if (value < min) {
            value = min;
          }
          featureContent!.style.width = value + 'px';
        }
      };

      document.onmouseup = (e) => {
        this.draggingResize = false;
      };
    }
  }

  getMatchingLayer(feature: FeatureWithLayerId): Layer {
    return this.layers.find((x) => x.objId == feature.layerId)!;
  }

  closeView() {
    this.deselect.emit();
  }
}
