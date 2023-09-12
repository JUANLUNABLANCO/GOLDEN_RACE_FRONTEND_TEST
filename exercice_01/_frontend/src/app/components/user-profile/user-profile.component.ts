import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription, map } from 'rxjs';

import { User } from '../../interfaces/user.interface';

import { UserService } from '../../services/users/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit, OnDestroy {

  userId: number = null;
  private subscription: Subscription;

  user: User = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.subscription = this.activatedRoute.params.subscribe(params => {
      this.userId = parseInt(params['id']);
      this.userService.findOne(this.userId).pipe(map(
        (user: User) => this.user = user
      )).subscribe();
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
