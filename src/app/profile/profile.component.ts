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

  favouriteComposers: any[] = [];

  userData = { name: '', username: '', email: '', birthday: '' };

  constructor(
    private fetchApiData: FetchApiDataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.setUserdata();
  }

  //update the user info once the form is submitted
  updateUser(): void {}

  //navigate to the composers component
  goToComposers(): void {
    this.router.navigate(['composers']);
  }

  setUserdata(): void {
    const storedUser = localStorage.getItem('storedUser');

    if (!storedUser) {
      return;
    } else {
      const parsedUser = JSON.parse(storedUser);
      this.userData.name = parsedUser.name;
      this.userData.username = parsedUser.username;
      this.userData.email = parsedUser.email;
      this.userData.birthday = parsedUser.birthday;
    }
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
        return this.userData;
      });
  }
}
