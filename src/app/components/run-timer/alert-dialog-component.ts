import {Component, inject} from "@angular/core";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  template: `
    <h1 mat-dialog-title>Alert</h1>
    <div mat-dialog-content>{{ data.message }}</div>
    <div mat-dialog-actions>
      <button mat-button mat-dialog-close>OK</button>
    </div>
  `
})

export class AlertDialogComponent {
  data = inject(MAT_DIALOG_DATA);
}
