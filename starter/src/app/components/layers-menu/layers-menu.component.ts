import { Component, EventEmitter, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'layers-menu',
  standalone: true,
  imports: [MatSlideToggleModule, MatDialogModule, CommonModule, FormsModule],
  templateUrl: './layers-menu.component.html',
  styles: ``,
})
export class LayersMenuComponent {
  detectLayerChange = new EventEmitter<null>();
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  onLayerChange() {
    this.detectLayerChange.emit();
  }
}
