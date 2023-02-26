import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-create-user-form',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  @Output() cancel = new EventEmitter<void>();
  @Output() userCreated = new EventEmitter<void>();
  @Output() formSubmitted = new EventEmitter<boolean>();
  
  formHasBeenSubmitted = false;
  submitted = false;
  imageUrl! : String ;

  userForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    surname: new FormControl('', [Validators.required]),
    picture: new FormControl(''),
    sex: new FormControl(''),
    dateOfBirth: new FormControl('', [Validators.required]),
    dateOfWorkStart: new FormControl('', [Validators.required]),
    typeOfContract: new FormControl(''),
    contractDuration: new FormControl(''),
    department: new FormControl('', [Validators.required])
  });

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  onSubmit() {
    this.formHasBeenSubmitted = true;
    if (this.userForm.invalid) {
      return;
    }
    const user = this.userForm.value;
    this.http.post('http://localhost:3000/users/createUser', user).subscribe(
      (response) => {
        console.log(response);
        this.submitted = true;
        this.userCreated.emit();
        this.userForm.reset();
        this.formHasBeenSubmitted = false;
        this.formSubmitted.emit(true);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  

  cancelForm() {
    this.cancel.emit();
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
  
}
