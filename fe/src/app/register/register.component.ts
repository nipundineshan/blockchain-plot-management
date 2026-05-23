import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIconComponent } from '@ng-icons/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, NgIconComponent, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  readonly Home = 'heroHome';
  readonly User = 'heroUser';
  readonly Mail = 'heroEnvelope';
  readonly Phone = 'heroPhone';
  readonly MapPin = 'heroMapPin';
  readonly Lock = 'heroLockClosed';
  readonly ArrowRight = 'heroArrowRight';
}
