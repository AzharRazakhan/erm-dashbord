import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-edit-employee',
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule, MatButtonModule, MatInputModule],
  templateUrl: './add-edit-employee.html',
  styleUrl: './add-edit-employee.scss',
})
export class AddEditEmployee implements OnInit {


  empForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddEditEmployee>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
   
  }

  ngOnInit() {
    this.empForm = this.fb.group({
      name: ['', Validators.required],
      role: ['', Validators.required],
      department: ['', Validators.required],
      joiningDate: ['', Validators.required],
      status: ['Active', Validators.required]
    });

    if (this.data) {
      this.empForm.patchValue(this.data);
    }
  }

  onSubmit() {
    if (this.empForm.valid) {
      this.dialogRef.close(this.empForm.value);
    }
  }


  close() {
    this.dialogRef.close();
  }
}
