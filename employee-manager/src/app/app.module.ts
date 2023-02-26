import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserListComponent } from './user-list/user-list.component';
import { SingleUserInfoComponent } from './single-user-info/single-user-info.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { UpdateUserComponent } from './update-user/update-user.component';

 import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 import { MatDialogModule } from '@angular/material/dialog';
 import { FormsModule } from '@angular/forms'; 

 import { MatIconModule } from '@angular/material/icon';

 import { MatFormFieldModule } from '@angular/material/form-field';
 import { MatInputModule } from '@angular/material/input';
 import { MatButtonModule } from '@angular/material/button';

 import { MatDatepickerModule } from '@angular/material/datepicker';
 import { MatNativeDateModule } from '@angular/material/core';
 import { MatSelectModule } from '@angular/material/select';



@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    SingleUserInfoComponent,
    CreateUserComponent,
    UpdateUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
