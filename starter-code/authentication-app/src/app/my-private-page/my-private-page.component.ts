import { Component, OnInit } from '@angular/core';
import { SessionService } from "./../session.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-private-page',
  templateUrl: './my-private-page.component.html',
  styleUrls: ['./my-private-page.component.css']
})
export class MyPrivatePageComponent implements OnInit {
  username: string = "";
  secret: string = "";
  //mine
  user: any;
  error: string;
  privateData: any = '';

  constructor(private session: SessionService,private router: Router) { }

  ngOnInit() {

    this.session.isLoggedIn()
      .subscribe(
        (user) =>{
          this.getPrivateData();
          return this.successCb(user)
        },
        (err) =>{
          this.errorCb(err)
          this.router.navigate([''])
        });
        //this.username = this.session.user.name,
        //this.secret   = this.session.user.secret;
        //console.log(this.username);
        //console.log(this.secret);
  }

  getPrivateData(){
    console.log("get private data");
    this.session.getPrivateData()
      .subscribe(
        (data)=>this.privateData=data,
        (err)=>this.error=err
      )
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
