import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-generic-modal',
  templateUrl: './generic-modal.component.html',
  styleUrls: ['./generic-modal.component.scss']
})
export class GenericModalComponent implements OnInit{
  @Input() visible = false; 
  @Input() title = 'Modal Title'; 
  @Input() data: any; 
  @Input() fields: { key: string, label: string, type: string }[] = []; 
  @Output() visibleChange = new EventEmitter<boolean>(); 
  @Input() mode: 'view' | 'edit' | 'add' = 'view'; 
  @Output() save = new EventEmitter<any>(); 
  
  ngOnInit(): void {
        console.log("*****");

  }
  closeModal(): void {
    this.visible = false;
    this.visibleChange.emit(this.visible);   
  }


  onSave(): void {
    this.save.emit(this.data); 
    this.closeModal();
  }
}