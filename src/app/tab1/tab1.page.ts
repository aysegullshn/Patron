import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { async } from 'q';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  
  constructor(public loadingController : LoadingController,public alertController: AlertController ) {
    
  }
  veriler : Array<string> = [];
  kadi : String;
  sifre : String;
  

  //typescript
  public textcontrolkadi(event : any) {
    this.kadi = event.detail.value;
  }
  public textcontrolsifre(event : any) {
    this.sifre = event.detail.value;
  }

  ngAfterViewInit(){
    
  }
  async ngOnInit() {
    await fetch('http://localhost:59466/api/Personel')
    .then(res => res.json())
    .then(veri => {
      veri.forEach(element => {
        this.veriler.push(element);
      });
    });
    this.veriler.reverse();
  }
  public async doRefresh(e){
    await fetch('http://localhost:59466/api/Personel')
    .then(res => res.json())
    .then(veri => {
      veri.forEach(element => {
        this.veriler.push(element);
      });
    }).then(a => {
      e.target.complete();
    });
    this.veriler.reverse();
  }
  getVeriler(){
    let tempVeriler : Array<string> = [];
    this.veriler.forEach(element => {
      const name = element['Name'];
      const surname = element['Surname'];
      const veri = {
        "name": name,
        "surname": surname
      };
      
      tempVeriler.push(name+surname);
    });
    return tempVeriler;
  }
  public async personelsil(id : Number){
    await fetch('http://localhost:59466/api/Personel/Delete/'+id)
    .then(res => {
      if(res.ok){
        window.location.reload();
      }
      
    });
  }

  public async personelduzenle(id: Number, _name: String){
    const alert = await this.alertController.create({
      header: 'Düzenle',
      inputs:[
        {
          name: 'name',
          type: 'text',
          id : 'name',
          value : _name,
          placeholder : 'İsim girin'
        },//burayıı yapmamız gerekiyor
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
            await fetch('http://localhost:59466/api/Personel/Update/'+id+'/'+e.name)
            .then(res => {
              if(res.ok){
                console.log('yenilendi');
              }
            })
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
            await fetch('http://localhost:59466/api/Personel/Add/'+a.name+'/'+a.surname)
            .then(res => {
              if(res.ok){
                console.log('eklendi');
              }
            })
          }
        }
      ]
    });
    await alert.present();
  }
  public async girisyap(){
    //fetch("localhost:1000/api/"+this.kadi+"/"+this.sifre);
    //if(this.kadi == "aysegul" && this.sifre == "123"){
    //  console.log("dogru giriş yaptın");
    ///}else{
    //  console.log("giriş yapamadın");
    //}
    const loading = await this.loadingController.create({
      message : "Giriş yapılıyor",
      duration : 1000
    });
    await loading.present();
  }
  
}
