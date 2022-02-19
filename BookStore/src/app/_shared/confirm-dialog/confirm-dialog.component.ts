import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotifyDialogComponent } from '../notify-dialog/notify-dialog.component';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {
message:string;
  constructor(@Inject(MAT_DIALOG_DATA) public data: string, private dialogRef: MatDialogRef<NotifyDialogComponent>) {
    this.message = data;
   }

  ngOnInit(): void {
  }
 onNoClick(): void {
    this.dialogRef.close(0);
  }
  confirmDelete(){
    this.dialogRef.close(1);
  }
}
