import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { LayersMenuComponent } from '../layers-menu/layers-menu.component';
import { Layer } from 'src/app/model/layer/layer.model';

@Component({
  selector: 'layers-button',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogModule,
    CommonModule,
    LayersMenuComponent,
  ],
  templateUrl: './layers-button.component.html',
  styles: ``,
})
export class LayersButtonComponent {
  @Input() layers: Layer[] = [];
  @Output() detectLayerChange = new EventEmitter<null>();
  constructor(public dialog: MatDialog) {}

  dialogRef: MatDialogRef<LayersMenuComponent, any> | undefined;

  public clickMenu() {
    this.openMenu();
  }

  public openMenu() {
    this.dialogRef = this.dialog.open(LayersMenuComponent, {
      position: { left: '40px', top: '54px' }, // could be updated to reference this button and calculate so it always follows without having to change these values
      backdropClass: 'clear-background',
      data: { layers: this.layers },
    });
    this.dialogRef.afterClosed().subscribe((result) => {
      this.closeMenu();
    });
    this.dialogRef.componentInstance.detectLayerChange.subscribe(() => {
      this.onLayerChange();
    });
  }

  public closeMenu() {
    this.dialogRef!.close();
    this.dialogRef = undefined;
  }

  onLayerChange() {
    this.detectLayerChange.emit();
  }
}
export { LayersMenuComponent };
