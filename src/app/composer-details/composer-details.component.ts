import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';

import { MatSnackBar } from '@angular/material/snack-bar'; //display notifications to the user

import { MatDialogRef } from '@angular/material/dialog'; //close the dialog on success

@Component({
  selector: 'app-composer-details',
  templateUrl: './composer-details.component.html',
  styleUrls: ['./composer-details.component.scss'],
})
export class ComposerDetailsComponent {
  composer: any;
  isFavourite: boolean = false;

  user: any;

  constructor(
    public dialogRef: MatDialogRef<ComposerDetailsComponent>,
    public snackBar: MatSnackBar,
    public fetchApiData: FetchApiDataService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.composer = data.composer; //data about the currently selected composer
  }

  ngOnInit(): void {
    this.getFavourites();
    this.checkFavourites();
  }

  /* GET FAVOURITE COMPOSERS */

  getFavourites() {
    const storedUser = localStorage.getItem('storedUser');
    if (storedUser) {
      this.user = JSON.parse(storedUser);

      console.log(
        `FAVOURITES FROM DETAILS COMPONENT: ${this.user.favouriteComposers}`
      );
    }
  }

  /* COMPARE THE CURRENT COMPOSER ID TO THE FAVOURITE COMPOSERS ARRAY */

  checkFavourites(): void {
    if (this.user.favouriteComposers.includes(this.composer._id)) {
      console.log('ALREADY A FAVOURITE');
      this.isFavourite = true;
    } else {
      console.log('NOT A FAVOURITE YET');
      this.isFavourite = false;
    }
  }

  /*
   * If isFavourite is true, delete from favourites
   * If isFavourite is false, add to favourites
   * call when the heart button is clicked
   */

  editFavourite() {
    if (this.isFavourite === true) {
      console.log('WILL REMOVE FROM FAVOURITES');
      this.fetchApiData
        .deleteFavourite(this.user.username, this.composer._id)
        .subscribe(
          (response) => {
            console.log('REMOVED');
            localStorage.setItem('storedUser', JSON.stringify(response));
            this.user = response;
            this.snackBar.open('Removed successfully', 'OK', {
              duration: 2000,
            });
          },
          (response) => {
            console.log('NOT REMOVED');
            this.snackBar.open('Was not able to remove', 'OK', {
              duration: 2000,
            });
          }
        );
    } else if (this.isFavourite === false) {
      console.log('WILL ADD TO FAVOURITES');
      this.fetchApiData
        .addFavourite(this.user.username, this.composer._id, this.user)
        .subscribe(
          (response) => {
            console.log(`RESPONSE: ${response}`);
            console.log(response);
            localStorage.setItem('storedUser', JSON.stringify(response));
            this.user = response;
            this.snackBar.open('Added successfully', 'OK', {
              duration: 2000,
            });
          },
          (response) => {
            console.log(`RESPONSE: ${response}`);
            this.snackBar.open('NOT ADDED', 'OK', {
              duration: 2000,
            });
          }
        );
    }
  }
}
