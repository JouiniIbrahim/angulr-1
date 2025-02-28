import { Component, OnInit, ViewChild } from '@angular/core';
import { ReservationService } from '../services/reservation.service';
import { Table } from 'primeng/table';
import {Client} from "../models/Client";

@Component({
  selector: 'app-gestion-client',
  templateUrl: './gestion-client.component.html',
  styleUrls: ['./gestion-client.component.css']
})
export class GestionClientComponent implements OnInit {
  @ViewChild('dt') dt: Table | undefined;

  clients: Client[] = [];
  loading: boolean = false;
  errorMessage: string | null = null;
  sidebarCollapsed: boolean = false;
  showModal: boolean = false; // Controls modal visibility (renamed for clarity)
  selectedClient: Client = new Client(); // Client data for the modal (add or view)
  isViewMode: boolean = false; // Flag to toggle between add and view modes

  constructor(private service: ReservationService) {}

  ngOnInit(): void {
    this.getClientList();
  }

  getClientList(): void {
    this.loading = true;
    this.errorMessage = null;

    this.service.AllClients().subscribe({
      next: (response: Client[]) => {
        this.clients = response;
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = 'Error loading clients: ' + error.message;
        this.loading = false;
        console.error('Error fetching clients:', error);
      }
    });
  }

  toggleSidebar(): void {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }

  clear(table: Table): void {
    table.clear();
  }

  // Open modal for adding a client
  openAddModal(): void {
    this.selectedClient = new Client(); // Reset to a new client
    this.isViewMode = false; // Add mode
    this.showModal = true;
  }

  // Open modal for viewing a client
  viewClient(id: number | null): void {
    const client = this.clients.find(c => c.id === id);
    if (client) {
      this.selectedClient = { ...client }; // Copy client data
      this.isViewMode = true; // View mode
      this.showModal = true;
    } else {
      this.errorMessage = 'Client not found';
    }
  }

  // Close modal
  closeModal(): void {
    this.showModal = false;
  }

  // Save new client (only in add mode)
  saveClient(): void {
    if (!this.isViewMode) {
      this.service.AddClient(this.selectedClient).subscribe({
        next: () => {
          this.getClientList(); // Refresh client list
          this.closeModal(); // Close modal
        },
        error: (error) => {
          this.errorMessage = 'Error adding client: ' + error.message;
          console.error('Error adding client:', error);
        }
      });
    }
  }

  editClient(id: number | null): void {
    console.log('Edit client:', id);
  }

  deleteClient(id: number | null): void {
    console.log('Delete client:', id);
  }
}

