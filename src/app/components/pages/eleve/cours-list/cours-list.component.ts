import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/models/Course';
import { MatTableDataSource } from '@angular/material';
import { EnfantService } from 'src/app/services/enfant.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CoursService } from 'src/app/services/cours.service';

@Component({
  selector: 'app-cours-list',
  templateUrl: './cours-list.component.html',
  styleUrls: ['./cours-list.component.scss']
})
export class CoursListComponent implements OnInit {


  loading = false;
  courses: Course[] = [];

  columns = [
    { columnDef: 'id', header: 'ID', cell: (row: Course) => `${row.id}` },
    { columnDef: 'nom', header: 'Nom', cell: (row: Course) => `${row.nom}` },
    { columnDef: 'description', header: 'Description', cell: (row: Course) => `${row.description}` },
    { columnDef: 'niveau', header: 'Niveau', cell: (row: Course) => `${row.niveau}` },
    { columnDef: 'nbVisiteurs', header: 'Nombre visiteurs', cell: (row: Course) => `${row.nbVisiteurs}` },
    { columnDef: 'prix', header: 'Prix', cell: (row: Course) => `${row.prix}` },
  ];

  displayedColumns = [];
  dataSource: MatTableDataSource<Course> = new MatTableDataSource();

  constructor(private router: Router, private courseService: CoursService, private toastr: ToastrService) { }

  ngOnInit() {
    this.initColumns();
    this.loadCourses();
  }

  initColumns() {
    this.columns.forEach(element => {
      this.displayedColumns.push(element.columnDef);
    });
    this.displayedColumns.push('actions');
  }

  loadCourses() {
    this.loading = true;
    this.courseService.getAllCourses().delay(1000).subscribe((resp: Course[]) => {
      this.loading = false;
      this.courses = resp;
      this.dataSource = new MatTableDataSource<Course>(this.courses);
    }, error => {
      this.loading = false;
      this.toastr.error('Error while loading courses');
    })
  }

  deleteCourse(row) {
    this.loading = true;
    this.courseService.delete(row.id).subscribe(resp => {
      this.loading = false;
      this.loadCourses();
    }, error => {
      this.loading = false;
      this.toastr.error('Error while deleting enfant : ' + row.username);
    })
  }

  editCourse(row) {
    this.router.navigate(['course/form/', row.id]);
  }

}
