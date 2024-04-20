import { Component } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-composer-details',
  templateUrl: './composer-details.component.html',
  styleUrls: ['./composer-details.component.scss'],
})
export class ComposerDetailsComponent {
  composers: any[] = [];
  constructor(public fetchApiData: FetchApiDataService) {}
  getComposers(): void {
    this.fetchApiData.getAllComposers().subscribe((resp: any) => {
      this.composers = resp;
      console.log(this.composers);
      return this.composers;
    });
  }
}
