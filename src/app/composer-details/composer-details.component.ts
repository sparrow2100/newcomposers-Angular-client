import { Component, Input, Inject } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-composer-details',
  templateUrl: './composer-details.component.html',
  styleUrls: ['./composer-details.component.scss'],
})
export class ComposerDetailsComponent {
  composer: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.composer = data.composer;
  }
}
