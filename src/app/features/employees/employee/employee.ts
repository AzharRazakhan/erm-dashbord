import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { AddEditEmployee } from '../add-edit-employee/add-edit-employee';
import { EmployeeService } from '../employee';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { Employee } from '../employee.model';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Auth } from '../../../core/auth';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule
  ],
  templateUrl: './employee.html',
})
export class EmployeeComponent implements OnInit {

  displayedColumns = ['name', 'email', 'role', 'department', 'joiningDate', 'status', 'actions'];
  dataSource = new MatTableDataSource<Employee>([]);

  filterForm = new FormGroup({
    search: new FormControl(''),
    department: new FormControl('')
  });

  constructor(
    private empService: EmployeeService,
    private dialog: MatDialog,
    private auth: Auth
  ) { }

  ngOnInit() {
    this.filterForm.valueChanges.subscribe(() => this.applyFilters());
    this.loadEmployees();
    const userRole = this.auth.getUserRole();
  }

  loadEmployees() {
    const filters = {
      search: this.filterForm.value.search || '',
      department: this.filterForm.value.department || '',
    };

    this.empService.getEmployees(filters).subscribe((res: any) => {
      this.dataSource.data = res.data;
    });
  }

  resetFilters() {
    this.filterForm.reset({
      search: '',
      department: ''
    });
  }

  applyFilters() {
    this.loadEmployees();
  }

  openAdd() {
    const ref = this.dialog.open(AddEditEmployee, {
      width: '500px',
      data: null
    });
    ref.afterClosed().subscribe(() => this.loadEmployees());
  }

  openEdit(emp: Employee) {
    const ref = this.dialog.open(AddEditEmployee, {
      width: '500px',
      data: emp
    });
    ref.afterClosed().subscribe(() => this.loadEmployees());
  }

  deleteEmployee(id: string) {
    if (confirm("Delete this employee?")) {
      this.empService.deleteEmployee(id).subscribe(() => this.loadEmployees());
    }
  }
}
