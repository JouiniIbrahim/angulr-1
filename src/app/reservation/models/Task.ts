import {StatutReservation} from "./StatutReservation";

export class Task {
  id: string | null; // UUID string
  name: string | null; // Renamed from title
  processInstanceId: string | null;
  processDefinitionId: string | null;
  taskDefinitionKey: string | null; // Used to infer type
  priority: string | null;
  createTime: string | null; // Could use Date if parsed
  statut: StatutReservation | null; // Optional, not in response yet
  client: number | null; // Optional, not in response yet

  constructor() {
    this.id = null;
    this.name = null;
    this.processInstanceId = null;
    this.processDefinitionId = null;
    this.taskDefinitionKey = null;
    this.priority = null;
    this.createTime = null;
    this.statut = null;
    this.client = null;
  }
}
