import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

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
    //
    // if (this.mode === 'edit' && this.data.file) {
    //   console.log('ffffffffffffffffff',this.setFileValue(this.data.file, 'support'));
    //
    // }
  }

  buildForm(): void {
    this.fields.forEach((field) => {
      if (!field.options) {
        field.options = [];
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
      formData.id = this.data.id;
      console.log('formdata', formData);

      this.save.emit(formData);
      this.closeModal();
    }
  }

  onFileChange(event: any, fieldKey: string): void {
    const files = event.target.files;
    if (files && files.length > 0) {

      this.form.get(fieldKey)?.setValue(files);
    }
  }


  setFileValue(file: File | null, fieldKey: string): void {
    if (file) {
      this.form.get(fieldKey)?.setValue([file]);
    } else {
      this.form.get(fieldKey)?.setValue(null);
    }
  }
}
