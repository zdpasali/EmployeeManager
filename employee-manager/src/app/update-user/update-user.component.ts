import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { User } from '../app.component';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
  userForm!: FormGroup;
  imageUrl!: string;
  
  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<UpdateUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User
  ) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      name: [this.data.name, Validators.required],
      surname: [this.data.surname, Validators.required],
      picture: [this.data.picture],
      sex: [this.data.sex, Validators.required],
      dateOfBirth: [this.data.dateOfBirth, Validators.required],
      dateOfWorkStart: [this.data.dateOfWorkStart],
      typeOfContract: [this.data.typeOfContract, Validators.required],
      contractDuration: [this.data.contractDuration],
      department: [this.data.department, Validators.required],
      numberOfVacationDays: [this.data.numberOfVacationDays],
      numberOfFreeDays: [this.data.numberOfFreeDays],
      numberOfPaidLeaveDays: [this.data.numberOfPaidLeaveDays]
    });

    this.imageUrl = this.data.picture;
  }
  
  updateUser(): void {
    const updatedUser = {...this.data, ...this.userForm.value};

    this.http.patch(`http://localhost:3000/users/updateUser/${updatedUser._id}`, updatedUser).subscribe(() => {
      this.dialogRef.close(updatedUser);
    });
  }


  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageUrl = reader.result as string;
        this.userForm.patchValue({
          picture: file.name
        });
      };
    }
  }


  closeDialog(): void {
    this.dialogRef.close();
  }
}
