import { HttpClient } from '@angular/common/http';
import { Component, OnInit , ViewChild} from '@angular/core';
import { AnimationController } from '@ionic/angular';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-app',
  templateUrl: './app.page.html',
  styleUrls: ['./app.page.scss'],
})
export class AppPage implements OnInit {
  
  usuarioActual: any[] = [
    {
      nombre :"",
      email: "",
      clave:""
    }
  ];

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

  usuarioReset="";


  usuarioLogin  : string ="";
  contrasenaLogin  : string ="";
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
  ]

  icono = "sol"
  logo="logoReg"
  cambiarTema(){
    
    if(this.icono == "luna"){
      document.documentElement.style.setProperty("--texto-titulo", "#ffffff");
      document.documentElement.style.setProperty("--texto-input","#ffffff");
      document.documentElement.style.setProperty("--color-boton","#2e3192ff");
      document.documentElement.style.setProperty("--color-fondo","#181823");
      document.documentElement.style.setProperty("--color-comp","#525CEB");

      this.logo="logoReg"
      this.icono = "sol"
    }else{
      document.documentElement.style.setProperty("--texto-titulo", "#000000");
      document.documentElement.style.setProperty("--texto-input","#000000");
      document.documentElement.style.setProperty("--color-boton","#ff530e");
      document.documentElement.style.setProperty("--color-fondo","#ffffff");
      document.documentElement.style.setProperty("--color-comp","#e92c0c");



      this.logo="logoRegNoche"
      this.icono = "luna"
    }
  }
  public alertButtons = [
    {
      text: 'Cancelar',
      role: 'cancel'
    },
    {
      text: 'Enviar',
      role: 'confirm',
      handler: (alertData: any) => {
        this.usuarioReset = alertData.email; // Ensure usuarioReset is updated
        if (this.usuarioReset) {
          this.resetPass();
        } else {
          this.showToast('Por favor, ingrese un correo válido.');
        }
      }
    }
  ];



  public alertInputs = [
    {
      name: 'email',
      type: 'email',
      placeholder: 'Ingrese su correo',
      value: this.usuarioReset,
      handler: (input: any) => {
        this.usuarioReset = input.value; // Sync the input value with usuarioReset
      }
    }
  ];

  ionViewWillEnter(){
    if (localStorage.getItem("usuarios")) {
      this.usuarios = JSON.parse(localStorage.getItem("usuarios")!)
    }

    localStorage.removeItem("asistencia");
    localStorage.removeItem("usuarioActual");
  };

  constructor(
    private toast: ToastController,
    private anim: AnimationController,
    private route: Router,
    private http: HttpClient,
    private loadingCtrl: LoadingController
  ) { }

  irAHome(){
    this.route.navigate(['/home']);
  }

  irARegistro(){
    this.route.navigate(['/registro']);
  }

  async showToast(texto: string) {
    const toast = await this.toast.create({
      message: texto,
      duration: 3000,
      position:'bottom',
      cssClass: 'rounded-toast'
    });
    await toast.present();
  }

  ngOnInit() {
    console.log(this.materia);
    this.usuarioLogin  ="";
    this.contrasenaLogin  ="";
    this.icono = "luna";
    document.documentElement.style.setProperty("--texto-titulo", "#000000");
    document.documentElement.style.setProperty("--texto-input","#000000");
    document.documentElement.style.setProperty("--color-boton","#ff530e");
    document.documentElement.style.setProperty("--color-fondo","#ffffff");
    document.documentElement.style.setProperty("--color-comp","#e92c0c");
  }

  tryLogin() {
    if (this.usuarioLogin!= "" && this.contrasenaLogin != ""){
      for (let u of this.usuarios) {
        if (u.email === this.usuarioLogin && u.clave === this.contrasenaLogin) {
          
          this.usuarioActual.push(u.nombre ,u.email , u.clave)
          console.log(u.nombre ,u.email , u.clave)
          localStorage.setItem("usuarioActual", JSON.stringify(this.usuarioActual))
          this.irAHome();
          return
        }
      }
      this.showToast("Contraseña u usuario incorrectos!")
    }else{
      this.showToast("Se debe ingresar un usuario y contraseña!")
    }

  }



  async crearCodigoRecuperacion(){

    const nuevaPsw = Math.round(Math.random()*(9999-1000) +1000)

    return nuevaPsw

  }

  animarTema(){
    this.anim.create()
    .addElement(document.querySelector("#tema")!)
    .duration(500)
    .fromTo("transform", "rotate(0deg)", "rotate(-360deg)")
    .onFinish(()=>{
      this.cambiarTema()
    }).play()
  }

  async resetPass() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando...',
    });
    loading.present()
    for (let u of this.usuarios) {
      if (u.email == this.usuarioReset) {
        let nueva = Math.random().toString(36).slice(-6)
        console.log(nueva)
        console.log(u.email)
        u.clave = nueva
        let body = {
          "nombre": u.nombre,
          "app": "RegistrAPP",
          "clave": nueva,
          "email": u.email
        }
        this.http.post("https://myths.cl/api/reset_password.php", body)
        .subscribe((data)=>{
          console.log(data)
          loading.dismiss()
        })
        this.showToast('Correo Enviado')
        return
      }else{
        loading.dismiss();
        this.showToast('Correo invalido')
      }
    }
    console.log("Usuario no encontrado!.")
  }
}
