import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { StudentsService } from '../../students.service';
import { DataSource } from '@angular/cdk/collections';

export interface UserData {
  studentID: number;
  name: string;
  age: number;
  email: string;
}

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
})


export class StudentsComponent  implements AfterViewInit {
  displayedColumns: string[] = ['studentID', 'name', 'age', 'email'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(
    private StudentsService: StudentsService,
  ) {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource<UserData>();
  }

  ngOnInit() {
    this.getStudents(); // Fetch students when the component initializes
  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getStudents = () => {
    this.StudentsService.getStudents().subscribe(students => {
      console.log(students);
      this.dataSource.data = students; 
  });
}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}