import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Room } from '../../../core/models/room.model';

@Component({
  selector: 'app-room-card',
  templateUrl: './room-card.component.html',
  styleUrl: './room-card.component.css',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoomCardComponent {
  @Input({ required: true }) room!: Room;
}
