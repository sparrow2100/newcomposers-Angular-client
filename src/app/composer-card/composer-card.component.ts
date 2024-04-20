import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';

//import components
import { ComposerDetailsComponent } from '../composer-details/composer-details.component';

//handle routing
import { Router } from '@angular/router';

@Component({
  selector: 'app-composer-card',
  templateUrl: './composer-card.component.html',
  styleUrls: ['./composer-card.component.scss'],
})
export class ComposerCardComponent {
  composers: any[] = [];
  constructor(
    public fetchApiData: FetchApiDataService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getComposers();
  }

  getComposers(): void {
    this.fetchApiData.getAllComposers().subscribe((resp: any) => {
      this.composers = resp;
      console.log(this.composers);
      return this.composers;
    });
  }

  goToProfile(): void {
    this.router.navigate(['profile']);
  }

  //open a dialog with a composer's details when a card is clicked
  openComposerDetailsDialog(composer: any): void {
    this.dialog.open(ComposerDetailsComponent, {
      width: '75%',
      data: {
        composer,
      },
    });
  }

  logOut() {
    localStorage.removeItem('storedUser');
    localStorage.removeItem('token');
    this.router.navigate(['welcome']);
  }
}
