import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{

  user!: User;
  constructor(private cookieService:CookieService) { }

  ngOnInit(): void {
    this.user = JSON.parse(this.cookieService.get("user")!);
  }
}
