import { Component, OnInit } from '@angular/core';
import { SessionService} from '../session.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-auth-signup',
  templateUrl: './auth-signup.component.html',
  styleUrls: ['./auth-signup.component.css']
})
export class AuthSignupComponent implements OnInit {
  user:any;
  formInfo={
    username: '',
    password: '',
    name:'',
    secret:''
  }
  error:string;

  constructor(private session: SessionService,
              private router: Router) { }


  ngOnInit() {
  }

  signup() {
    // this.router.navigate([''])
    this.session.signup(this.formInfo)
      .subscribe(
        (user) =>{
          this.successCb(user)
          this.router.navigate(['']);
        },
        (err) => this.errorCb(err)
      );
  }

  errorCb(err) {
    this.error = err;
    this.user = null;
  }

  successCb(user) {
    this.user = user;
    this.error = null;
  }
}
