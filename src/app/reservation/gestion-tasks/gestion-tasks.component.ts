import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import {Task} from "../models/Task";
import {StatutReservation} from "../models/StatutReservation";
import {Client} from "../models/Client";
import {ReservationService} from "../services/reservation.service";

@Component({
  selector: 'app-gestion-tasks',
  templateUrl: './gestion-tasks.component.html',
  styleUrls: ['./gestion-tasks.component.scss']
})
export class GestionTasksComponent implements OnInit {
  @ViewChild('agencyDt') agencyDt: Table | undefined;
  @ViewChild('hotelDt') hotelDt: Table | undefined;

  agencyTasks: Task[] = [];
  hotelTasks: Task[] = [];
  clients: Client[] = [];
  selectedClientId: number | null = null;
  statuts: StatutReservation[] = [];
  loading: boolean = false;
  errorMessage: string | null = null;
  sidebarCollapsed: boolean = false;
  showModal: boolean = false;
  selectedTask: Task = new Task();
  isViewMode: boolean = false;

  constructor(private service: ReservationService) {}

  ngOnInit(): void {
    this.getTaskList();
    this.getClientList();
    this.getStatutList();
  }

  getTaskList(): void {
    this.loading = true;
    this.errorMessage = null;

    this.service.AllTasks().subscribe({
      next: (response: Task[]) => {
        this.agencyTasks = response.filter(task => task.taskDefinitionKey?.startsWith('Agence'));
        this.hotelTasks = response.filter(task => task.taskDefinitionKey?.startsWith('Hotel'));
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = 'Error loading tasks: ' + error.message;
        this.loading = false;
        console.error('Error fetching tasks:', error);
      }
    });
  }

  getClientList(): void {
    this.service.AllClients().subscribe({
      next: (response: Client[]) => {
        this.clients = response;
      },
      error: (error) => {
        this.errorMessage = 'Error loading clients: ' + error.message;
        console.error('Error fetching clients:', error);
      }
    });
  }

  getStatutList(): void {
    this.service.AllStatuts().subscribe({
      next: (response: StatutReservation[]) => {
        this.statuts = response;
        if (!this.isViewMode && this.showModal) {
          this.selectedTask.statut = this.statuts.find(s => s.id === 1) || null;
        }
      },
      error: (error) => {
        this.errorMessage = 'Error loading statuses: ' + error.message;
        console.error('Error fetching statuses:', error);
      }
    });
  }

  toggleSidebar(): void {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }

  clear(table: Table): void {
    table.clear();
  }

  openAddModal(): void {
    this.selectedTask = new Task();
    this.selectedClientId = null;
    this.selectedTask.statut = this.statuts.find(s => s.id === 1) || null;
    this.isViewMode = false;
    this.showModal = true;
  }

  viewTask(id: string | null): void {
    const task = [...this.agencyTasks, ...this.hotelTasks].find(t => t.id === id);
    if (task) {
      this.selectedTask = { ...task, statut: null, client: null };
      this.selectedClientId = null;
      this.isViewMode = true;
      this.showModal = true;
    } else {
      this.errorMessage = 'Task not found';
    }
  }

  closeModal(): void {
    this.showModal = false;
  }



  approveTask(taskId: string | null): void {
    if (taskId) {
      const task = [...this.agencyTasks, ...this.hotelTasks].find(t => t.id === taskId);
      if (task && task.processInstanceId) {
        this.service.updateTaskStatus(taskId, task.processInstanceId, true).subscribe({
          next: () => this.getTaskList(),
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
        this.service.updateTaskStatus(taskId, task.processInstanceId, false).subscribe({
          next: () => this.getTaskList(),
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

  editTask(id: string | null): void {
    console.log('Edit task:', id);
  }

  deleteTask(id: string | null): void {
    console.log('Delete task:', id);
  }
}
