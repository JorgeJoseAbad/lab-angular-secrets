import { Component, OnInit } from '@angular/core';
import { SessionService} from '../session.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.css']
})
export class AuthLoginComponent implements OnInit {
  user: any;
  formInfo={
    username:'',
    password:''
  }
  error:string;
  privateData: any = '';
  constructor(private session: SessionService,
              private router: Router) { }

  ngOnInit() {
    this.session.isLoggedIn()
        .subscribe(
          (user) => this.successCb(user)
        );
    }


  login(){
          debugger;
    console.log("login");
    this.session.login(this.formInfo)
      .subscribe(
        (user)=>{
          console.log("USER ES: ", user);
          this.successCb(user)
          this.router.navigate([''])
        },
        (err)=>this.errorCb(err)
      )
  }

  logout() {
      // this.user = undefined;
      this.session.logout()
        .subscribe(
          () => this.successCb(null),
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
