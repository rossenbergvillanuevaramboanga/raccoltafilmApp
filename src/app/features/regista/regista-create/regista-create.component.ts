import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Regista } from 'src/app/model/regista';
import { Sesso } from 'src/app/model/sesso';
import { RegistaService } from '../regista.service';

@Component({
  selector: 'app-regista-create',
  templateUrl: './regista-create.component.html',
  styleUrls: ['./regista-create.component.css']
})
export class RegistaCreateComponent implements OnInit {

  regista: Regista = {
    nome: '',
    cognome: '',
    nickName: '',
    dataDiNascita: new Date,
    sesso: Sesso.MASCHIO,
    films: []
  };
  errorMessage: string = '';

  constructor(private registaService: RegistaService, private router: Router) { }

  ngOnInit(): void {
  }

  save(registaForm: NgForm): void {
    console.log('sub ' + JSON.stringify(this.regista));
    if (registaForm.valid) {
      this.registaService.addRegista(this.regista!).subscribe({
        next: registaItem => {
          this.regista = registaItem;
          this.errorMessage = '';
        },
        error: () => this.errorMessage = 'Attenzione! Inserimento fallito!',
        complete: () => {
          if (!this.errorMessage)
            this.router.navigate([`regista/list`], { queryParams: { confirmMessage: 'Operazione effettuata correttamente.' } })
        }
      });
    } else
      this.errorMessage = 'Attenzione! Operazione fallita! Il form non è stato validato';
  }

}
