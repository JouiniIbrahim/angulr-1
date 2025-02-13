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

  // Add this property to store file content to display
  fileContent: string | null = null;

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
      // Read file content if it's a text file
      const file = files[0];
      if (file.type.startsWith('text')) {
        const reader = new FileReader();
        reader.onload = () => {
          this.fileContent = reader.result as string; // Store the file content
        };
        reader.readAsText(file);
      }

      this.form.get(fieldKey)?.setValue(files);
    }
  }

  // setFileValue(file: File | null, fieldKey: string): void {
  //   if (file) {
  //     this.form.get(fieldKey)?.setValue([file]);
  //   } else {
  //     this.form.get(fieldKey)?.setValue(null);
  //   }
  // }
}
