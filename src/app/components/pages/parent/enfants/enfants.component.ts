import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { MatTableDataSource } from '@angular/material';
import { EnfantService } from 'src/app/services/enfant.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-enfants',
  templateUrl: './enfants.component.html',
  styleUrls: ['./enfants.component.css']
})
export class EnfantsComponent implements OnInit {

  loading = false;
  enfants: User[] = [];

  columns = [
    { columnDef: 'firstName', header: 'First Name', cell: (row: User) => `${row.firstName}` },
    { columnDef: 'lastName', header: 'Last Name', cell: (row: User) => `${row.lastName}` },
    { columnDef: 'gender', header: 'Sexe', cell: (row: User) => `${row.gender}` },
    { columnDef: 'username', header: 'Username', cell: (row: User) => `${row.account.username}` },
  ];

  displayedColumns = [];
  dataSource: MatTableDataSource<User> = new MatTableDataSource();

  constructor(private router: Router, private enfantService: EnfantService, private toastr: ToastrService) { }

  ngOnInit() {
    this.initColumns();
    this.loadEnfants();
  }

  initColumns() {
    this.columns.forEach(element => {
      this.displayedColumns.push(element.columnDef);
    });
    this.displayedColumns.push('actions');
  }

  loadEnfants() {
    this.loading = true;
    this.enfantService.getMyEnfants().delay(1000).subscribe((resp: User[]) => {
      this.loading = false;
      this.enfants = resp;
      this.dataSource = new MatTableDataSource<User>(this.enfants);
    }, error => {
      this.loading = false;
      this.toastr.error('Error while loading enfants');
    })
  }

  deleteEleve(row) {
    this.loading = true;
    this.enfantService.deleteEnfant(row.id).subscribe(resp => {
      this.loading = false;
      this.loadEnfants();
    }, error => {
      this.loading = false;
      this.toastr.error('Error while deleting enfant : ' + row.username);
    })
  }

  editEleve(row) {
    this.router.navigate(['enfants/form/', row.id]);
  }

}
