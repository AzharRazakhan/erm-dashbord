import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatCardModule } from "@angular/material/card";
import { MatGridListModule } from '@angular/material/grid-list';
import { Router } from '@angular/router';
import Chart, { Chart as ChartJS } from 'chart.js/auto';
import { environment } from '../../../../environments/environment.development';
import { EmployeeService } from '../../employees/employee';

@Component({
  selector: 'app-dashbord',
  imports: [MatCardModule, MatGridListModule],
  templateUrl: './dashbord.html',
  styleUrl: './dashbord.scss',
})
export class Dashbord implements OnInit {
  totalEmployees = 0;
  totalApplicants = 0;
  departmentCount = 0;
  activeJobRoles = 0;

  constructor(private http: HttpClient, private router: Router, private employeeService: EmployeeService) { }


  ngOnInit(): void {
    this.loadData()

    this.employeeService.getEmployees().subscribe((res: any) => {
      console.log(res, 'res--')
      this.createDepartmentChart(res.data)
    })
  }


  loadData() {
    this.http.get(`${environment.apiUrl}/api/dashboard/summary`).subscribe((res: any) => {
      this.totalEmployees = res.totalEmployees;
      this.activeJobRoles = res.activeJobRoles;
      this.totalApplicants = res.totalApplicants;
      this.departmentCount = res.departmentCount;
    })
  }


  /*loadData() {
    this.http.get<any>('http://localhost:3000/employees').subscribe((res) => {
      this.totalEmployees = res.length;
      this.activeJobRoles = new Set(res.map((e: any) => e.role)).size;
      this.createDepartmentChart(res);
    });

    this.http.get<any>('http://localhost:3000/applicants').subscribe((res) => {
      this.totalApplicants = res.length;
      this.createApplicantsChart(res);
    });

    this.http.get<any>('http://localhost:3000/departments').subscribe((res) => {
      this.departmentCount = res.length;
    });
  }
  */
  /*
  createDepartmentChart(employees: any[]) {
    const departmentCount: any = {};
    employees.forEach((e) => {
      departmentCount[e.department] = (departmentCount[e.department] || 0) + 1;
    });

    new Chart('deptChart', {
      type: 'bar',
      data: {
        labels: Object.keys(departmentCount),
        datasets: [
          {
            label: 'Employees by Department',
            data: Object.values(departmentCount),
            backgroundColor: ['#2196F3', '#4CAF50', '#FF9800', '#9C27B0'],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  }
  /*
  createApplicantsChart(applicants: any[]) {
    const roleCount: any = {};
    applicants.forEach((a) => {
      roleCount[a.appliedRole] = (roleCount[a.appliedRole] || 0) + 1;
    });

    new Chart('applicantChart', {
      type: 'pie',
      data: {
        labels: Object.keys(roleCount),
        datasets: [
          {
            label: 'Applicants by Role',
            data: Object.values(roleCount),
            backgroundColor: ['#3F51B5', '#E91E63', '#00BCD4', '#FFC107'],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  }
  */

  createDepartmentChart(employees: any[]) {
    const departmentCount: any = {};
    employees.forEach((e) => {
      departmentCount[e.department] = (departmentCount[e.department] || 0) + 1;
    });

    new Chart('deptChart', {
      type: 'bar',
      data: {
        labels: Object.keys(departmentCount),
        datasets: [
          {
            label: 'Employees by Department',
            data: Object.values(departmentCount),
            backgroundColor: ['#2196F3', '#4CAF50', '#FF9800', '#9C27B0'],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  }

  goToEmplyee() {
    this.router.navigate(['/employee'])
  }
}
