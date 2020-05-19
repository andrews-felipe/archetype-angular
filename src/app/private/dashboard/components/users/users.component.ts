import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';
import { ENDPOINT } from 'src/environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  title = "Listagem de Usuário"
  buttonTitle = `<i class="fas fa-plus"></i>`
  view = true;
  edit = false;
  formGroup: FormGroup

  _users: Observable<Array<any>> = new Observable<Array<any>>();

  constructor(private http: HttpService, private form: FormBuilder) { }

  ngOnInit() {
    this.listUsers();

    this.formGroup = this.form.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      name: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])],
      password2: ['', Validators.compose([Validators.required])],
      role: ['user', Validators.compose([Validators.required])],
      picture: [''],
      adress: [''],
      locale: [''],
      complement: [''],
      cep: [''],
      id: [''],
    })
  }

  listUsers() {
    this._users = this.http.get(ENDPOINT.USERS);
  }

  deleteUser(id) {
    this.http.delete(ENDPOINT.USERS, id).toPromise().then(() => {
      alert("Usuário Excluído com Sucesso!")
      this.listUsers();
    })
  }

  putToEdit(user) {
    this.edit = true
    this.formGroup.patchValue(user);
    this.formGroup.controls.password.setValue("default_pass");
    this.formGroup.controls.password2.setValue("default_pass");
    this.title = "Editar de Usuário"
    this.view = !this.view;
  }

  submit() {
    if (this.formGroup.valid && this.validatePassword()) {
      if (this.edit) {
        this.http.put(ENDPOINT.USERS, this.formGroup.getRawValue().id, this.formGroup.getRawValue())
          .toPromise()
          .then(() => {
            alert("Usuário Atualizado com sucesso!")
            this.listUsers();
            this.changeView()
          })
      } else {
        this.http.post(ENDPOINT.USERS, this.formGroup.getRawValue())
          .toPromise()
          .then(() => {
            alert("Usuário Cadastrado com sucesso!")
            this.listUsers();
            this.changeView()
          })
      }
    } else {
      alert("Preencha os campos Corretamente!")
    }
  }

  validatePassword() {
    return this.formGroup.getRawValue().password === this.formGroup.getRawValue().password2
  }

  changeView() {
    if (this.edit) {
      this.edit = false
      this.formGroup.reset();
    }

    this.view = !this.view;
    this.buttonTitle = this.view ? `<i class="fas fa-plus"></i>` : `<i class="fas fa-list"></i>`
    this.title = this.view ? "Listagem de Usuário" : "Cadastrar Usuário"

  }

}
