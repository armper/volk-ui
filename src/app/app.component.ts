import { Component, OnInit, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { AccessService, AccessSession } from './access.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, MatIconModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  private accessService = inject(AccessService);

  title = 'Volk';

  accessSession?: AccessSession;

  ngOnInit(): void {
    this.accessService.session().subscribe((session) => {
      this.accessSession = session;
    });
  }
}
