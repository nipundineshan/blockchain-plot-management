import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIconComponent } from '@ng-icons/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, NgIconComponent, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  readonly Home = 'heroHome';
  readonly Mail = 'heroEnvelope';
  readonly Lock = 'heroLockClosed';
  readonly ArrowRight = 'heroArrowRight';
}
