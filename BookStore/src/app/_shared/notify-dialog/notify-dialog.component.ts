import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-notify-dialog',
  templateUrl: './notify-dialog.component.html',
  styleUrls: ['./notify-dialog.component.css']
})
export class NotifyDialogComponent implements OnInit {
 message:string;
  status:number;
  constructor(@Inject(MAT_DIALOG_DATA) public data: dialogData,private dialogRef: MatDialogRef<NotifyDialogComponent>) {
     this.message = data.message;
    this.status = data.status;
   }

  ngOnInit(): void {
  }

}
export class dialogData{
  message: string="";
  status:number=0 ; // 1 = success, 2 faliure
}
