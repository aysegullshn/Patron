import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import Personel from '../models/Personel';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  
  constructor(public loadingController : LoadingController,public alertController: AlertController ) {}
  personeller : Array<Personel> = [];
  kadi : String;
  sifre : String;
  

  //typescript
  public textcontrolkadi(event : any) {
    this.kadi = event.detail.value;
  }
  public textcontrolsifre(event : any) {
    this.sifre = event.detail.value;
  }
  async personelGetir(){
    await fetch('http://localhost:59466/api/Personel')
    .then(res => res.json())
    .then(veri => {
      veri.forEach(element => {
        let personel = new Personel(element.Name, element.Surname,element.Gender,element.Salary, element.Id);
        this.personeller.push(personel);
      });
    });
    this.personeller.reverse();
    console.log(this.personeller);
  }
  async ngOnInit() {
    await this.personelGetir();
  }
  public async doRefresh(e){
    await this.personelGetir().then(() => e.target.complete());
  }
  public async personelsil(id : number){
    await Personel.sil(id);
  }

  public async personelduzenle(id: number, _name: String){
    const alert = await this.alertController.create({
      header: 'Düzenle',
      inputs:[
        {
          name: 'name',
          type: 'text',
          id : 'name',
          value : _name,
          placeholder : 'İsim girin'
        },
        {
          name: 'gender',
          type: 'radio',
          id : 'name',
          value : 'erkek',
        }
      ],
      buttons:[
        {
          text: 'Kapat',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Kaydet',
          handler: async (e) => {
            await Personel.guncelle(id, e.name);
          }
        }
      ]
    });
    await alert.present();
  }
  public async personelekle(id: Number, _name: String){
    const alert = await this.alertController.create({
      header: 'Ekle',
      inputs:[
        {
          name : 'name',
          type : 'text',
          placeholder : 'ismini giriniz:'
        },
        {
          name : 'surname',
          type : 'text',
          placeholder : 'soyismini giriniz:'
        }
      ],
      buttons:[
        {
          text : 'Ekle',
          handler : async (a) =>{
           await Personel.ekle(a.name, a.surname);         
          }
        }
      ]
    });
    await alert.present();
  }
  public async girisyap(){
    const loading = await this.loadingController.create({
      message : "Giriş yapılıyor",
      duration : 1000
    });
    await loading.present();
  }
}
