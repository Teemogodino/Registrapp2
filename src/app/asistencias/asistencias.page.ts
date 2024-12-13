import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-asistencias',
  templateUrl: './asistencias.page.html',
  styleUrls: ['./asistencias.page.scss'],
})
export class AsistenciasPage implements OnInit {

  asistencia: any[] = [];
  materia: { nombreMateria: string}[] = [
    { nombreMateria: 'Ingles' },
    { nombreMateria: 'Religion' },
    { nombreMateria: 'Lenguaje' },
    { nombreMateria: 'Tecnologia' },
    { nombreMateria: 'Ciencias Naturales' },
    { nombreMateria: 'Arte' },
    { nombreMateria: 'Educacion Fisica' },
    { nombreMateria: 'Historia' },
    { nombreMateria: 'Musica' }
  ];
  
  usuarioActual: any[] = [
    {
      nombre :"",
      email: "",
      clave:""
    }
  ];

  constructor() { }

  ionViewWillEnter(){
    if (localStorage.getItem("asistencia")) {
      this.asistencia = JSON.parse(localStorage.getItem("asistencia")!)
    }
    if (localStorage.getItem("materia")) {
      this.materia = JSON.parse(localStorage.getItem("materia")!)
    }
    if (localStorage.getItem("usuario")) {
      this.usuarioActual = JSON.parse(localStorage.getItem("usuarioActual")!)
    }
  }

  ngOnInit() {
  }

}
