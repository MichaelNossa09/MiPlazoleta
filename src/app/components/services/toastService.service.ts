import { Injectable } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';

@Injectable()
export class ToastService {

  constructor(public toastService:NgToastService) { }
  
}