import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';

//handle routing
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  @Input() userDetails = { name: '', username: '', email: '', birthday: '' };

  userData: any;
  favouriteComposers: ComposerInstance[] = [];

  constructor(
    private fetchApiData: FetchApiDataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.setUserdata();
    this.fetchComposerData();
  }

  //update the user info once the form is submitted
  updateUser(): void {}

  //navigate to the composers component
  goToComposers(): void {
    this.router.navigate(['composers']);
  }

  setUserdata(): void {
    const storedUser = localStorage.getItem('storedUser');

    if (storedUser) {
      const user = JSON.parse(storedUser);
      this.userData = user;
      this.userDetails = {
        birthday: this.userData.birthday,
        email: this.userData.email,
        name: this.userData.name,
        username: this.userData.username,
      };
    }
  }

  fetchComposerData() {
    // Fetch all composers first
    return this.fetchApiData
      .getAllComposers()
      .subscribe((response: ComposerInstance[]) => {
        //response is an array of all composers
        // filter composers and only select those that have the id found in userData.favouriteComposers
        this.favouriteComposers = response.filter((composerFromAllComposers) =>
          this.userData.favouriteComposers.includes(
            composerFromAllComposers._id
          )
        );
      });
  }

  logOut() {
    localStorage.removeItem('storedUser');
    localStorage.removeItem('token');
    this.router.navigate(['welcome']);
  }

  //update the user's data
  updateUserData() {
    this.fetchApiData
      .updateUser(this.userData.username, this.userDetails)
      .subscribe((response: any) => {
        this.userData = response;
        localStorage.setItem('storedUser', JSON.parse(response));
        this.setUserdata();
        return this.userData;
      });
  }
}

type ComposerInstance = {
  life: ComposerLife;
  _id: string;
  name: string;
  era: string;
  img: string;
  works: ComposerWork[];
  imgCredit?: string;
};

interface ComposerLife {
  fullName: string;
  lifespan: string;
  bio: string;
  nationality: string;
}

interface ComposerWork {
  _id: string;
  piece: string;
  date: string;
  description: string;
}
