import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { User } from '../app.component';

import { UpdateUserComponent } from '../update-user/update-user.component';



@Component({
  selector: 'app-single-user-info',
  templateUrl: './single-user-info.component.html',
  styleUrls: ['./single-user-info.component.css']
})
export class SingleUserInfoComponent {
  
  user!: User;
  loading: boolean = true;
  

  constructor(
    private http: HttpClient,
    public dialogRef: MatDialogRef<SingleUserInfoComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.getUser(data.userId);
  }

  getUser(userId: number): void {
    this.http.get<User>(`/http://localhost:3000/userInfo/${userId}`).subscribe((user: User) => {
      this.user = user;
      this.loading = false;
    });
  }

  openUpdateUserDialog(user: User): void {
    this.dialogRef.close();
    this.dialog.open(UpdateUserComponent, {
      width: '500px',
      data: user
    });
  }
  
  

  closeDialog(): void {
    this.dialogRef.close();
  }

  
}
