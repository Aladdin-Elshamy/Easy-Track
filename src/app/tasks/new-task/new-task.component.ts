import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { type INewTaskData } from '../task/task.model';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-new-task',
  imports: [FormsModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
})
export class NewTaskComponent {
  @Output() close = new EventEmitter<void>();
  @Output() add = new EventEmitter<INewTaskData>();
  @Input({ required: true }) userId!: string;
  private tasksService = inject(TasksService);
  enteredTitle = '';
  enteredSummary = '';
  enteredDate = '';
  isAllfieldsCompleted = true;
  onCloseDialog() {
    this.close.emit();
  }
  onSubmit() {
    if (!this.enteredTitle || !this.enteredSummary || !this.enteredDate) {
      this.isAllfieldsCompleted = false;
    } else {
      this.isAllfieldsCompleted = true;
    }
    if (this.isAllfieldsCompleted) {
      this.tasksService.addTask(
        {
          title: this.enteredTitle,
          summary: this.enteredSummary,
          dueDate: this.enteredDate,
        },
        this.userId
      );
      this.close.emit();
    }
  }
}
