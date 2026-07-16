import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthUser } from 'src/app/core/models/auth/auth-user';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Output() toggleSidebar = new EventEmitter<void>();

  user: AuthUser | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.user = this.authService.getUser();
  }

  openSidebar() {
    this.toggleSidebar.emit();
  }

}
