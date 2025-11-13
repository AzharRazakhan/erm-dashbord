import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { AddEditEmployee } from '../add-edit-employee/add-edit-employee';
import { EmployeeService } from '../employee';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatDialogModule, MatIconModule, FormsModule],
  templateUrl: './employee.html',
})
export class EmployeeComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'role', 'department', 'joiningDate', 'status', 'actions'];
  employees: any[] = [];
  search = '';

  constructor(private dialog: MatDialog, private empService: EmployeeService) {}

  ngOnInit() {
    this.loadEmployees();
  }

  loadEmployees() {
    this.empService.getEmployees().subscribe((res) => {
      this.employees = res;
    });
  }

  openAdd() {
    const dialogRef = this.dialog.open(AddEditEmployee, { width: '400px' });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.empService.addEmployee(result).subscribe(() => this.loadEmployees());
      }
    });
  }

  openEdit(employee: any) {
    const dialogRef = this.dialog.open(AddEditEmployee, { width: '400px', data: employee });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.empService.updateEmployee(employee.id, result).subscribe(() => this.loadEmployees());
      }
    });
  }

  deleteEmployee(id: number) {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.empService.deleteEmployee(id).subscribe(() => this.loadEmployees());
    }
  }

  searchEmployees() {
    if (this.search.trim() === '') {
      this.loadEmployees();
    } else {
      this.employees = this.employees.filter((e) =>
        e.name.toLowerCase().includes(this.search.toLowerCase())
      );
    }
  }
}
