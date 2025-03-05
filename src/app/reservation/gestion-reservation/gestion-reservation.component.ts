import { Component, OnInit, ViewChild } from '@angular/core';
import { ReservationService } from '../services/reservation.service';
import { Table } from 'primeng/table';
import {Reservation} from "../models/Reservation";
import {StatutReservation} from "../models/StatutReservation";
import {Client} from "../models/Client";

@Component({
  selector: 'app-gestion-reservation',
  templateUrl: './gestion-reservation.component.html',
  styleUrls: ['./gestion-reservation.component.css']
})
export class GestionReservationComponent implements OnInit {
  @ViewChild('dt') dt: Table | undefined;

  reservations: Reservation[] = [];
  clients: Client[] = [];
  selectedClientId: number | null = null;
  statuts: StatutReservation[] = [];
  loading: boolean = false;
  errorMessage: string | null = null;
  sidebarCollapsed: boolean = false;
  showModal: boolean = false;
  selectedReservation: Reservation = new Reservation();
  isViewMode: boolean = false;

  constructor(private service: ReservationService) {}

  ngOnInit(): void {
    this.getReservationList();
    this.getClientList();
    this.getStatutList();
  }

  getReservationList(): void {
    this.loading = true;
    this.errorMessage = null;

    this.service.AllReservations().subscribe({
      next: (response: Reservation[]) => {
        this.reservations = response;
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = 'Error loading reservations: ' + error.message;
        this.loading = false;
        console.error('Error fetching reservations:', error);
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
          this.selectedReservation.statut = this.statuts.find(s => s.id === 1) || null;
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
    this.selectedReservation = new Reservation();
    this.selectedClientId = null;
    this.selectedReservation.statut = this.statuts.find(s => s.id === 1) || null;
    this.isViewMode = false;
    this.showModal = true;
  }

  viewReservation(id: number | null): void {
    const reservation = this.reservations.find(r => r.id === id);
    if (reservation) {
      this.selectedReservation = { ...reservation, statut: null, client: null };
      this.selectedClientId = null;
      this.isViewMode = true;
      this.showModal = true;
    } else {
      this.errorMessage = 'Reservation not found';
    }
  }

  closeModal(): void {
    this.showModal = false;
  }

  saveReservation(): void {
    if (!this.isViewMode) {
      const reservationToSave = {
        ...this.selectedReservation,
        statutId: this.selectedReservation.statut?.id || null, // Send only statut ID
        clientid: this.selectedClientId // Send single client ID
      };
      this.service.AddReservation(reservationToSave).subscribe({
        next: () => {
          this.getReservationList();
          this.closeModal();
        },
        error: (error) => {
          this.errorMessage = 'Error adding reservation: ' + error.message;
          console.error('Error adding reservation:', error);
        }
      });
    }
  }
  getStatusLibelle(statutId: number): any {
    const status = this.statuts.find(s => s.id === statutId);
    return status ? status.libelle : "N/A";
  }

  // @ts-ignore
  getSeverity(status: string):any {
    switch (status) {
      case 'CONFIRMÉE':
        return 'success';
      case 'EN_ATTENTE':
        return 'warn';
      case 'ANNULÉE':
        return 'danger';
    }
  }


  editReservation(id: number | null): void {
    console.log('Edit reservation:', id);
  }

  deleteReservation(id: number | null): void {
    console.log('Delete reservation:', id);
  }
}


