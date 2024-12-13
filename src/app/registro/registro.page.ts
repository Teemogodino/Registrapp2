import { Component, OnInit } from '@angular/core';
import { AnimationController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-app',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  confirmarContrasenaRegistro : string =""
  contrasenaRegistro : string =""
  usuarioRegistro : string =""
  correoRegistro : string =""
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
  
  icono = "sol"
  public alertButtons = [
    {
      text: 'Cancelar',
      role: 'cancel',
      handler: () => {
        console.log('Alert canceled');
      },
    },
    {
      text: 'Volver',
      role: 'confirm',
      handler: () => {
        this.irALogin();
      },
    },
  ];



  setResult(ev:any) {
    console.log(`Dismissed with role: ${ev.detail.role}`);
  }


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

  constructor(
    private anim: AnimationController,
    private navCtrl: NavController,
    private route: Router,
    private toast: ToastController
  ) { }
  irALogin(){
      this.route.navigate(['/app']);
  }
  ngOnInit() {
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
  
 tryRegistrar(){
  if(this.confirmarContrasenaRegistro == this.contrasenaRegistro){
    if(this.usuarios.some(usuario => usuario.email === this.correoRegistro) ){
      this.showToast("Ya hay un usuario con este correo electronico!")
      
    }else{

      this.addToUsuarios(this.usuarioRegistro, this.correoRegistro ,this.contrasenaRegistro);
      this.showToast("El usuario fue creado con exito!")
      this.irALogin()
    }

  }else{
    this.showToast("Las contraseñas ingresadas deben coincidir!")
  }

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

 addToUsuarios(nombre:any , email: any , clave: any){
  this.usuarios.push({nombre , email, clave})
  localStorage.setItem("usuarios", JSON.stringify(this.usuarios))
}

  animarTema(){
    this.anim.create()
    .addElement(document.querySelector("#temaReg")!)
    .duration(500)
    .fromTo("transform", "rotate(0deg)", "rotate(-360deg)")
    .onFinish(()=>{
      this.cambiarTema()
    }).play()
  }

}