import { Component, OnInit } from '@angular/core';
import { ENDPOINT } from 'src/environments/environment';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-beacons',
  templateUrl: './beacons.component.html',
  styleUrls: ['./beacons.component.css']
})
export class BeaconsComponent implements OnInit {

  title = "Listagem de Beacon"
  buttonTitle = `<i class="fas fa-plus"></i>`
  view = true;
  edit = false;
  formGroup: FormGroup

  _beacons: Observable<Array<any>> = new Observable<Array<any>>();

  constructor(private http: HttpService, private form: FormBuilder) { }

  ngOnInit() {
    this.listUsers();

    this.formGroup = this.form.group({
      id: [''],
      name: ['', Validators.compose([Validators.required])],
      description: ['', Validators.compose([Validators.required])],
      type: ['', Validators.compose([Validators.required])],
      content: ['', Validators.compose([Validators.required])],
      legend: ['', Validators.compose([Validators.required])],
    })
  }

  listUsers() {
    this._beacons = this.http.get(ENDPOINT.BEACONS);
  }

  deleteBeacon(id) {
    this.http.delete(ENDPOINT.BEACONS, id).toPromise().then(() => {
      alert("Beacon Excluído com Sucesso!")
      this.listUsers();
    })
  }

  putToEdit(beacon) {
    this.edit = true
    this.formGroup.patchValue(beacon);
    this.title = "Editar de Beacon"
    this.view = !this.view;
  }

  submit() {
    if (this.formGroup.valid) {
      if (this.edit) {
        this.http.put(ENDPOINT.BEACONS, this.formGroup.getRawValue().id, this.formGroup.getRawValue())
          .toPromise()
          .then(() => {
            alert("Beacon Atualizado com sucesso!")
            this.listUsers();
            this.changeView()
          })
      } else {
        this.http.post(ENDPOINT.BEACONS, this.formGroup.getRawValue())
          .toPromise()
          .then(() => {
            alert("Beacon Cadastrado com sucesso!")
            this.listUsers();
            this.changeView()
          })
      }
    } else {
      alert("Preencha os campos Corretamente!")
    }
  }


  changeView() {
    if (this.edit) {
      this.edit = false
      this.formGroup.reset();
    }

    this.view = !this.view;
    this.buttonTitle = this.view ? `<i class="fas fa-plus"></i>` : `<i class="fas fa-list"></i>`
    this.title = this.view ? "Listagem de Beacon" : "Cadastrar Beacon"

  }


}
