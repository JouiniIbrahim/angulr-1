import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import {DatePipe} from "@angular/common";
interface Field {
  key: string;
  label: string;
  type: string;
  options: { label: string | null; value: number | null }[] | null;
  multiSelect?: boolean;
}

@Component({
  selector: 'app-generic-modal',
  templateUrl: './generic-modal.component.html',
  styleUrls: ['./generic-modal.component.scss'],

})
export class GenericModalComponent implements OnInit {
  @Input() visible = false;
  @Input() title = 'Modal Title';
  @Input() data: any = {};
  @Input() fields: Field[] = [];
  @Output() visibleChange = new EventEmitter<boolean>();
  @Input() mode: 'view' | 'edit' | 'add' = 'view';
  @Output() save = new EventEmitter<any>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({});
  }

  ngOnInit(): void {


    console.log('Fields in Modal:', this.fields);
    console.log('Data in Modal:', this.data);
    this.buildForm();


    console.log('Form Values:', this.form.value);
  }

  buildForm(): void {
    this.fields.forEach((field) => {

      if (!field.options) {
        field.options = [];
      }


      if (field.key === 'roles' && this.data[field.key]) {

        this.data[field.key] = this.data[field.key].map((role: any) => role.id);
      }


      const initialValue = this.data[field.key] || (field.multiSelect ? [] : null);
      this.form.addControl(field.key, new FormControl(initialValue));


      console.log(`FormControl for ${field.key}:`, this.form.get(field.key)?.value);
    });
  }

  closeModal(): void {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }

onSave(): void {
  if (this.form.valid) {
    const formData = this.form.value;
    formData.id=this.data.id;
    console.log("formdata",formData);


    if (formData.roles) {
      formData.roles = formData.roles.map((roleId: number) => ({
        id: roleId,
        name: this.fields.find((field) => field.key === 'roles')?.options?.find((option: any) => option.value === roleId)?.label,
      }));
    }


    this.save.emit(formData);
    this.closeModal();
  }
}
}
