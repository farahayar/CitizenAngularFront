import { Component } from '@angular/core';
import { MessagingService } from './services/messaging.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Citizen';
  constructor(private messagingService: MessagingService) { }
ngOnInit() {
  this.messagingService.receiveMessage()
 }
}