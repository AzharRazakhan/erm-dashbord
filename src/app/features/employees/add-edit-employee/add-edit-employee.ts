import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup, FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Component, Inject, OnInit } from '@angular/core';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { EmployeeService } from '../employee';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-add-edit-employee',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatButtonModule,
  ],
  templateUrl: './add-edit-employee.html',
  styleUrl: './add-edit-employee.scss',
})
export class AddEditEmployee implements OnInit {



  selectedFile: File | null = null;
  empForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private empService: EmployeeService,
    private ref: MatDialogRef<AddEditEmployee>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

  }


  ngOnInit() {
    this.empForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
      department: ['', Validators.required],
      joiningDate: [new Date(), Validators.required],
      status: ['', Validators.required]
    });


    if (this.data) {
      this.patchEmployeeData(this.data);
    }
  }


  patchEmployeeData(data: any) {
    if (!this.empForm) return;
    data.joiningDate = new Date(data.joiningDate);

    this.empForm.patchValue(data);
  }

  onFileSelect(event: any) {
    this.selectedFile = event.target.files[0];
  }

  submit() {
    if (this.empForm.invalid) return;

    const payload = {
      ...this.empForm.value,
      joiningDate: new Date(this.empForm.value.joiningDate),
    };

    if (this.data) {
      this.empService.updateEmployee(this.data._id, payload).subscribe(() => {
        if (this.selectedFile) {
          this.empService.uploadDocument(this.data._id, this.selectedFile).subscribe();
        }
        this.ref.close();
      });

    } else {
      this.empService.addEmployee(payload).subscribe((res: any) => {
        if (this.selectedFile) {
          this.empService.uploadDocument(res.id, this.selectedFile).subscribe();
        }
        this.ref.close();
      });
    }
  }

}
