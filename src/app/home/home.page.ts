import { Component, OnInit } from '@angular/core';
import { AnimationController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { CapacitorBarcodeScanner, CapacitorBarcodeScannerTypeHint } from '@capacitor/barcode-scanner';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage  implements OnInit {

  usuarioActual: any[] = [];

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


  asistencia: {nombreMateria: string , fechaClase: string, horaInicio: string , fechaFin : string }[] = []
  scannedResult:any;

  imagen:string = "assets/imagen.jpg"
  constructor(
    private anim: AnimationController,
    private toast: ToastController
  ) {}

  async scan2() {
    try {
      const data = await CapacitorBarcodeScanner.scanBarcode({
        hint: CapacitorBarcodeScannerTypeHint.ALL
      });

      const parsedActivity = this.parseActivityText(data.ScanResult);


      const matchingSubject = this.materia.find(
        m => m.nombreMateria.toLowerCase() === parsedActivity.materia.toLowerCase()
      );

      if (matchingSubject) {

        this.addToAsistencia(
          matchingSubject.nombreMateria, 
          parsedActivity.fecha, 
          parsedActivity.inicio, 
          parsedActivity.fin
        );

        this.showToast(`Asistencia registrada para ${matchingSubject.nombreMateria}`);
      } else {

        this.showToast(`Materia no encontrada: ${parsedActivity.materia}`);
      }
    } catch (error) {
      this.showToast('Error al escanear código de barras');
      console.error('Scanning error:', error);
    }
  }

  async scan(){
    //scan 1 ya no lo ocupo
    CapacitorBarcodeScanner.scanBarcode({hint: CapacitorBarcodeScannerTypeHint.ALL})
    .then((data)=>{
      this.showToast(data.ScanResult)
    })
  }

  parseActivityText(inputText: string) {

    const parts = inputText.split(',').map(part => part.trim());


    const [materia, fecha, inicio, fin] = parts;

    return {
      materia,    
      fecha,      
      inicio,  
      fin     
    };
  }


  async showToast(texto: string) {
    const toast = await this.toast.create({
      message: texto,
      duration: 3000,
      positionAnchor: 'footer2',
      cssClass: 'rounded-toast'
    });
    await toast.present();
  }


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

  }

  ionViewWillEnter(){
    if (localStorage.getItem("carrito")) {
      this.usuarioActual = JSON.parse(localStorage.getItem("carrito")!)
    }

    if (localStorage.getItem("asistencia")) {
      this.asistencia = JSON.parse(localStorage.getItem("asistencia")!)
    }
    if (localStorage.getItem("materia")) {
      this.materia = JSON.parse(localStorage.getItem("materia")!)
    }

  }

 

  debug(mensaje : string){
    console.log(mensaje);
  }


   addToAsistencia(nombreMateria:any , fechaClase: any ,horaInicio: any,fechaFin:any  ){
    this.asistencia.push({nombreMateria , fechaClase, horaInicio , fechaFin })
    console.log(nombreMateria , fechaClase,horaInicio,fechaFin );
    localStorage.setItem("asistencia", JSON.stringify(this.asistencia))
  } 
 
}
