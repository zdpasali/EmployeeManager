import { MatDialog } from '@angular/material/dialog';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import './app.component.css';

import { SingleUserInfoComponent } from './single-user-info/single-user-info.component';
import { UpdateUserComponent } from './update-user/update-user.component';



export interface User {
  _id: string;
  name: string;
  surname: string;
  picture: string;
  sex: string;
  dateOfBirth: Date;
  dateOfWorkStart: Date;
  typeOfContract: string;
  contractDuration: number;
  department: string;
  numberOfVacationDays: number;
  numberOfFreeDays: number;
  numberOfPaidLeaveDays: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Employee Manager';
  showUsers = false;
  userList: User[] = [];
  buttonClicked = false;
  showCreateUsersVar = false;
  createUserFormVisible = false;

  isCreateUserFormSubmitted = false;

  constructor(private http: HttpClient, private dialog: MatDialog) {}

  showUserList() {
    this.http.get<User[]>('http://localhost:3000/users/userList').subscribe(data => {
      this.userList = data;
      this.showUsers = true;
      this.buttonClicked = true;
    });
  }
  

  showCreateUser() {
    this.showCreateUsersVar = !this.showCreateUsersVar;
    this.createUserFormVisible = true;
    this.isCreateUserFormSubmitted = false;
  }

  onCancel() {
    this.showCreateUsersVar = false;
    this.createUserFormVisible = false;
  }


  createUserFormSubmitted() {
    this.createUserFormVisible = false;
    this.showCreateUsersVar = false;
    this.isCreateUserFormSubmitted = true;
    this.showUserList();
  }


  openDialog(user: User) {
    const dialogRef = this.dialog.open(SingleUserInfoComponent, {
      width: '500px',
      data: user
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }


  openUpdateUserDialog(user: User): void {
    const dialogRef = this.dialog.open(UpdateUserComponent, {
      width: '500px',
      data: user
    });
  
    dialogRef.afterClosed().subscribe((updatedUser: User) => {
      if (updatedUser) {
        const index = this.userList.findIndex(u => u._id === updatedUser._id);
        if (index !== -1) {
          this.userList[index] = updatedUser;
        }
      }
    });
  }
  
}
