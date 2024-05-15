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

  /**
   * navigate to the composers component when the composers
   * button is clicked
   */

  goToComposers(): void {
    this.router.navigate(['composers']);
  }

  /**
   * set the initial values of the form inputs to
   * the values from the user object in localStorage
   */

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

  /**
   * Fetches all composers and filters them for ids matching ids in the user's favourite composers
   * @returns array of composers
   */

  fetchComposerData() {
    return this.fetchApiData
      .getAllComposers()
      .subscribe((response: ComposerInstance[]) => {
        this.favouriteComposers = response.filter((composerFromAllComposers) =>
          this.userData.favouriteComposers.includes(
            composerFromAllComposers._id
          )
        );
      });
  }

  /**
   * logs out the user by removing the user object and token from localStorage
   * and navigating to the welcome component
   */

  logOut() {
    localStorage.removeItem('storedUser');
    localStorage.removeItem('token');
    this.router.navigate(['welcome']);
  }

  /**
   * update the user's info with the new values from the form
   * @returns the updated user object
   */

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
