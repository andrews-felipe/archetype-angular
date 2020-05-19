import { Component, OnInit } from '@angular/core';
import { ENDPOINT } from 'src/environments/environment';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-visitants',
  templateUrl: './visitants.component.html',
  styleUrls: ['./visitants.component.css']
})
export class VisitantsComponent implements OnInit {

  title = "Listagem de Visitantes"
  buttonTitle = `<i class="fas fa-plus"></i>`
  view = true;
  edit = false;
  formGroup: FormGroup

  _visitants: Observable<Array<any>> = new Observable<Array<any>>();

  constructor(private http: HttpService, private form: FormBuilder) { }

  ngOnInit() {
    this.listVisitants();

    this.formGroup = this.form.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      name: ['', Validators.compose([Validators.required])],
      phone: ['', Validators.compose([Validators.required])],
      id_device: ['', Validators.compose([Validators.required])],
    })
  }

  listVisitants() {
    this._visitants = this.http.get(ENDPOINT.VISITANTS);
  }

  submit() {
    if (this.formGroup.valid) {
      this.http.post(ENDPOINT.VISITANTS, this.formGroup.getRawValue())
        .toPromise()
        .then(() => {
          alert("Visitante Cadastrado com sucesso!")
          this.listVisitants();
          this.changeView()
        })
    } else {
      alert("Preencha os campos Corretamente!")
    }
  }

  changeView() {
    this.view = !this.view;
    this.buttonTitle = this.view ? `<i class="fas fa-plus"></i>` : `<i class="fas fa-list"></i>`
    this.title = this.view ? "Listagem de Visitantes" : "Cadastrar Visitante"

  }

}
