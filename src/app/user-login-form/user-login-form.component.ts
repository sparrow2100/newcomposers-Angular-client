import { Component, OnInit, Input } from '@angular/core';

// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// This import brings in the API calls we created in 6.2
import { FetchApiDataService } from '../fetch-api-data.service';

// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

//handle routing
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss'],
})
export class UserLoginFormComponent implements OnInit {
  @Input() userDetails = { username: '', password: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {}

  logInUser(): void {
    this.fetchApiData.userLogin(this.userDetails).subscribe(
      (response) => {
        console.log(response);
        localStorage.setItem('storedUser', JSON.stringify(response.user));

        console.log(response.user);
        console.log(response.token);
        localStorage.setItem('token', response.token);
        this.dialogRef.close(); //closes the modal on success
        this.snackBar.open('User logged in successfully', 'OK', {
          duration: 2000,
        });
        this.router.navigate(['composers']);
      },
      (response) => {
        this.snackBar.open('User login failed', 'OK', {
          duration: 2000,
        });
      }
    );
  }
}
