import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Room } from '../../core/models/room.model';
import { RoomsService } from '../../core/services/rooms.service';

@Component({
  selector: 'app-rooms-page',
  templateUrl: './rooms-page.component.html',
  styleUrl: './rooms-page.component.css',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoomsPageComponent {
  readonly rooms: Room[];

  constructor(roomsService: RoomsService) {
    this.rooms = roomsService.getRooms();
  }
}
