import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formLogin: FormGroup;
  constructor(private fb:FormBuilder, private httpClient:HttpClient, private router: Router) {
    this.formLogin = this.fb.group({
      email:['eve.holt@reqres.in',Validators.required],
      password:['',[Validators.required, Validators.minLength(3)]]
    });
   }

   login() {
     if (this.formLogin.invalid) {
       alert('Ingresa los datos correctamente');
       return;
     }

      //  let body = {
      //    email: this.formLogin.get('email').value,
      //    password: this.formLogin.get('password').value
      //  }
      

      //   console.log('>>>>> FORM LOGIN ', body);

      //   let formVal = this.formLogin.value;
      //   console.log('>>>>> FORM LOGIN ', formVal);


      this.httpClient.post('https://reqres.in/api/login', this.formLogin.value).subscribe(res => {
        console.log('>>> RES', res);
        this.router.navigate(['list']);
      }, err => {
        console.log('>>>> ERROR HTTP', err);
        alert(err.error.error);
      });
   }

  ngOnInit() {
  }

}
