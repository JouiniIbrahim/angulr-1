import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { Task } from "../models/Task";
import { StatutReservation } from "../models/StatutReservation";
import { Client } from "../models/Client";
import { ReservationService } from "../services/reservation.service";

@Component({
  selector: 'app-gestion-tasks',
  templateUrl: './gestion-tasks.component.html',
  styleUrls: ['./gestion-tasks.component.scss']
})
export class GestionTasksComponent implements OnInit {
  @ViewChild('agencyDt') agencyDt: Table | undefined;
  @ViewChild('hotelDt') hotelDt: Table | undefined;
  @ViewChild('completedAgencyDt') completedAgencyDt: Table | undefined;
  @ViewChild('completedHotelDt') completedHotelDt: Table | undefined;

  agencyTasks: Task[] = [];
  hotelTasks: Task[] = [];
  completedAgencyTasks: Task[] = [];
  completedHotelTasks: Task[] = [];
  loading: boolean = false;
  errorMessage: string | null = null;
  sidebarCollapsed: boolean = false;

  constructor(private service: ReservationService) {}

  ngOnInit(): void {
    this.getTaskList(); // Current tasks
    this.getCompletedTaskList(); // Completed tasks
    // this.getClientList();
    // this.getStatutList();
  }

  getTaskList(): void {
    this.loading = true;
    this.errorMessage = null;

    this.service.AllTasks().subscribe({
      next: (response: Task[]) => {
        console.log('Current tasks response:', response);
        this.agencyTasks = response.filter(task => task.taskDefinitionKey?.startsWith('Agence'));
        this.hotelTasks = response.filter(task => task.taskDefinitionKey?.startsWith('Activity'));
        console.log('Agency tasks:', this.agencyTasks);
        console.log('Hotel tasks:', this.hotelTasks);
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = 'Error loading current tasks: ' + error.message;
        this.loading = false;
        console.error('Error fetching current tasks:', error);
      }
    });
  }

  getCompletedTaskList(): void {
    this.loading = true;
    this.errorMessage = null;

    this.service.CompletedTasks().subscribe({
      next: (response: Task[]) => {
        console.log('Completed tasks response:', response);
        this.completedAgencyTasks = response.filter(task => task.taskDefinitionKey?.startsWith('Agence'));
        this.completedHotelTasks = response.filter(task => task.name?.startsWith('Hotel'));
        console.log('Completed Agency tasks:', this.completedAgencyTasks);
        console.log('Completed Hotel tasks:', this.completedHotelTasks);
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = 'Error loading completed tasks: ' + error.message;
        this.loading = false;
        console.error('Error fetching completed tasks:', error);
      }
    });
  }





  toggleSidebar(): void {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }

  clear(table: Table): void {
    table.clear();
  }

  approveTask(taskId: string | null): void {
    if (taskId) {
      const task = [...this.agencyTasks, ...this.hotelTasks].find(t => t.id === taskId);
      if (task && task.processInstanceId) {
        this.service.updateTaskStatus(taskId, task.processInstanceId, true).subscribe({
          next: (updatedTask: Task) => {
            console.log('Approved task response:', updatedTask);
            this.updateTaskLists(taskId, updatedTask);
          },
          error: (error) => {
            this.errorMessage = 'Error approving task: ' + error.message;
            console.error('Error approving task:', error);
          }
        });
      } else {
        this.errorMessage = 'Task or processInstanceId not found';
      }
    }
  }

  rejectTask(taskId: string | null): void {
    if (taskId) {
      const task = [...this.agencyTasks, ...this.hotelTasks].find(t => t.id === taskId);
      if (task && task.processInstanceId) {
        this.service.updateTaskStatus(taskId, task.processInstanceId, false).subscribe(
          {
          next: (updatedTask: Task) => {
            console.log('Rejected task response:', updatedTask);
            this.updateTaskLists(taskId, updatedTask);
          },
          error: (error) => {
            this.errorMessage = 'Error rejecting task: ' + error.message;
            console.error('Error rejecting task:', error);
          }
        });
      } else {
        this.errorMessage = 'Task or processInstanceId not found';
      }
    }
  }



  private updateTaskLists(taskId: string, updatedTask: Task): void {
    const isAgency = updatedTask.taskDefinitionKey?.startsWith('Agence');
    const isHotel = updatedTask.taskDefinitionKey?.startsWith('Activity');

    // Remove from active lists and add to completed lists
    this.agencyTasks = this.agencyTasks.filter(t => t.id !== taskId);
    this.hotelTasks = this.hotelTasks.filter(t => t.id !== taskId);
    if (isAgency) {
      this.completedAgencyTasks = [...this.completedAgencyTasks, updatedTask];
    } else if (isHotel) {
      this.completedHotelTasks = [...this.completedHotelTasks, updatedTask];
    }
  }

  editTask(id: string | null): void {
    console.log('Edit task:', id);
  }

  deleteTask(id: string | null): void {
    console.log('Delete task:', id);
  }
}
