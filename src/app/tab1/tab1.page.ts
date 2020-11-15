import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import Personel from '../models/Personel';
import { PersonelService } from '../services/personel.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  
  constructor(public loadingController : LoadingController,public alertController: AlertController, private personelService: PersonelService ) {}
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
    this.personelService.personelGetir().subscribe((item) => {
      item.map(element => {
        let personel = new Personel(element.Name, element.Surname,element.Gender,element.Salary, element.Id);
        this.personeller.push(personel);
      })
      
      this.personeller.reverse();
    });
  }
  async ngOnInit() {
    await this.personelGetir();
  }
  public async doRefresh(e){
    await this.personelGetir().then(() => e.target.complete());
  }
  public async personelsil(id : number){
    await this.personelService.personelSil(id).subscribe(()=>{
      this.personeller = this.personeller.filter((item) => item.id !== id);
    });
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
            await this.personelService.personelGuncelle(id, e.name).subscribe(()=>{
              this.personeller.map((item) => {
                if(item.id == id){
                  item.name = e.name;
                }
              })
            });
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
            let data = {
              name: a.name,
              surname: a.surname
            }
           await this.personelService.personelEkle(data).subscribe((item) => {
              let personel = new Personel(a.name, a.surname, null, null, item);
              this.personeller.unshift(personel);
           });         
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
