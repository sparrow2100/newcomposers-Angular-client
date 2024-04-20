//THIS IS THE ROOT COMPONENT

import { Component } from '@angular/core';
// import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
// import { UserLoginFormComponent } from './user-login-form/user-login-form.component';
// import { ComposerCardComponent } from './composer-card/composer-card.component';
// import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'newcomposers-Angular-client';
}

// constructor(public dialog: MatDialog) {}

//function that opens the dialog when the signup button is clicked
// openUserRegistrationDialog(): void {
//   this.dialog.open(UserRegistrationFormComponent, {
//     width: '480px',
//   });
// }

//opens the dialog when the login button is clicked
// openUserLoginDialog(): void {
//   this.dialog.open(UserLoginFormComponent, {
//     width: '480px',
//   });
// }

//opens the dialog when the composers button is clicked (test)
//   openComposersDialog(): void {
//     this.dialog.open(ComposerCardComponent, {
//       width: '500px',
//     });
//   }
// }
