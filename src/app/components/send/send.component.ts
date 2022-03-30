import { Component} from '@angular/core';
import { AuthServices } from 'src/app/services/auth.service';

@Component({
  selector: 'app-send',
  templateUrl: './send.component.html',
  styleUrls: ['./send.component.css']
})
export class SendComponent {

  constructor(private authService: AuthServices) { }
  userLogged = this.authService.getUserLogged();
  
  onSendEmail(){
    this.authService.sendEmailForVerification();
  }
}
