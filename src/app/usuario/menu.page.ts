import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  usuarioActual: any[] = [
    {
      nombre : "",
      email: "",
      clave:""
    }

  ];
  usuarios  = [
    {
      nombre: "Pancito",
      email: "di.daille@duocuc.cl",
      clave: "123"
    },
    {
      nombre: "Carlitos",
      email: "teemogod34@gmail.com",
      clave: "Teemo_GOD"
    }
  ];
  i:number = 0;
  asistencia: any[]=[]

  materia: { nombreMateria: string}[] = [
    { nombreMateria: 'Ingles' },
    { nombreMateria: 'Religion' },
    { nombreMateria: 'Lenguaje' },
    { nombreMateria: 'Tecnologia' },
    { nombreMateria: 'Ciencias Naturales' },
    { nombreMateria: 'Arte' },
    { nombreMateria: 'Educación Física' },
    { nombreMateria: 'Historia' },
    { nombreMateria: 'Musica' }
  ];

  constructor(private alertController: AlertController) { }



  icono = "sol"

  cambiarTema(){
    
    if(this.icono == "luna"){
      document.documentElement.style.setProperty("--texto-titulo", "#ffffff");
      document.documentElement.style.setProperty("--texto-input","#ffffff");
      document.documentElement.style.setProperty("--color-boton","#2e3192ff");
      document.documentElement.style.setProperty("--color-fondo","#181823");
      document.documentElement.style.setProperty("--color-comp","#525CEB");


      this.icono = "sol"
    }else{
      document.documentElement.style.setProperty("--texto-titulo", "#000000");
      document.documentElement.style.setProperty("--texto-input","#000000");
      document.documentElement.style.setProperty("--color-boton","#ff530e");
      document.documentElement.style.setProperty("--color-fondo","#ffffff");
      document.documentElement.style.setProperty("--color-comp","#e92c0c");




      this.icono = "luna"
    }
  }
  
  ngOnInit() {
    if (localStorage.getItem("usuarioActual")) {
      this.usuarioActual = JSON.parse(localStorage.getItem("usuarioActual")!)
    }
    if (localStorage.getItem("asistencia")) {
      this.asistencia = JSON.parse(localStorage.getItem("asistencia")!)
    }
  }

  async cambiarContrasena() {
    const alert = await this.alertController.create({
      header: 'Cambiar Contraseña',
      inputs: [
        {
          name: 'nuevaContrasena',
          type: 'password',
          placeholder: 'Ingrese nueva contraseña'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Guardar',
          handler: (data) => {
            if (data.nuevaContrasena) {
              this.usuarioActual[3] = data.nuevaContrasena;
              localStorage.setItem('usuarioActual', JSON.stringify(this.usuarioActual));
              this.i=0
              for (let u of this.usuarios){

                if (u.email == this.usuarioActual[2]) {
                  this.usuarios[this.i].clave = data.nuevaContrasena;
                  localStorage.setItem("usuarios", JSON.stringify(this.usuarios))

              }
              this.i= this.i +1;
            }
          }
        }
      }
      ]
    });
    await alert.present();
  }

  mostrarContrasena: boolean = false;

  toggleMostrarContrasena() {
    this.mostrarContrasena = !this.mostrarContrasena;
  }
  async cambiarNombreUsuario() {
    const alert = await this.alertController.create({
      header: 'Cambiar Nombre de Usuario',
      inputs: [
        {
          name: 'nuevoNombre',
          type: 'text',
          placeholder: 'Ingrese nuevo nombre de usuario'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Guardar',
          handler: (data) => {
            if (data.nuevoNombre) {
              this.usuarioActual[1] = data.nuevoNombre;
              
              localStorage.setItem('usuarioActual', JSON.stringify(this.usuarioActual));
              this.i=0
              for (let u of this.usuarios){

                if (u.email == this.usuarioActual[2]) {
                  this.usuarios[this.i].nombre = data.nuevoNombre;
                  localStorage.setItem("usuarios", JSON.stringify(this.usuarios))

              }
              this.i= this.i +1;
            }
            }
          }
        }
      ]
    });

    await alert.present();
  }
  ionViewWillEnter(){

    if (localStorage.getItem("usuarios")) {
      this.usuarios = JSON.parse(localStorage.getItem("usuarios")!)
      this.usuarios = JSON.parse(localStorage.getItem("usuarios")!)
    }
    if (localStorage.getItem("materia")) {
      this.materia = JSON.parse(localStorage.getItem("materia")!)
    }
  
  }
}
