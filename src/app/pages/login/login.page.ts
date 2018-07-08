import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
import { AuthService } from '../../services/user/auth.service';
import { EmailValidator } from '../../validators/email';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public loginForm: FormGroup;
  public loading: any;

  constructor(
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: [
        '',
        Validators.compose([Validators.required, EmailValidator.isValid]),
      ],
      password: [
        '',
        Validators.compose([Validators.required, Validators.minLength(6)]),
      ],
    });
  }

  ngOnInit() {}

  loginUser(): void {
    if (!this.loginForm.valid) {
      console.log(
        `Form is not valid yet, current value: ${this.loginForm.value}`
      );
    } else {
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;

      this.authService.loginUser(email, password).then(
        () => {
          this.loading.dismiss().then(() => {
            this.router.navigateByUrl('home');
          });
        },
        error => {
          this.loading.dismiss().then(async () => {
            const alert = await this.alertCtrl.create({
              message: error.message,
              buttons: [{ text: 'Ok', role: 'cancel' }],
            });
            await alert.present();
          });
        }
      );
      this.loading = this.loadingCtrl.create();
      this.loading.present();
    }
  }
}
