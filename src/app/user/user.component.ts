import {
  Component,
  computed,
  EventEmitter,
  Input,
  input,
  Output,
} from '@angular/core';
import { type IUser } from './user.model';
import { CardComponent } from '../shared/card/card.component';

@Component({
  selector: 'app-user',
  imports: [CardComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent {
  user = input.required<IUser>();
  imagePath = computed(() => 'assets/users/' + this.user().avatar);
  @Output() select = new EventEmitter<string>();
  @Input({ required: true }) isSelected!: boolean;
  onSelectedUser() {
    this.select.emit(this.user().id);
  }
}
