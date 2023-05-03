import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  perfilData: any;
  message: string = '';
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds: number = 2;
  email: string = '';

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _snackBar: MatSnackBar,
  ) {
    this.perfilData = {};
  }

  ngOnInit(): void {this.getUserInfo}


  getUserInfo() {
      this.email = this._userService.getEmail()!
      this._userService.findUser(this.perfilData).subscribe({
          next: (v) => {
            this.perfilData.pus
            this.perfilData = v.perfilData;
          },
          error: (e) => {
            this.message = e.error.message;
            this.openSnackBarError();
          },
          complete: () => console.info('complete'),
      });
  }

  updateUser() {
    if (
      !this.perfilData.name ||
      !this.perfilData.email ||
      !this.perfilData.direction ||
      !this.perfilData.celNumber ||
      !this.perfilData.password
    ) {
      this.message = 'Failed process: Imcomplete data';
      this.openSnackBarError();
    } else {
      this._userService.updateUser(this.perfilData).subscribe({
        next: (v) => {
          localStorage.setItem('token', v.token);
          this._router.navigate(['/saveTask']);
          this.message = 'Successfull user updated';
          this.openSnackBarSuccesfull();
          this.perfilData = {};
        },
        error: (e) => {
          this.message = e.error.message;
          this.openSnackBarError();
        },
        complete: () => console.info('complete'),
      });
    }
  }

  openSnackBarSuccesfull() {
    this._snackBar.open(this.message, 'X', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,
      panelClass: ['style-snackBarTrue'],
    });
  }

  openSnackBarError() {
    this._snackBar.open(this.message, 'X', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,
      panelClass: ['style-snackBarFalse'],
    });
  }

}
