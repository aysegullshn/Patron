import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { async } from 'q';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  

  veriler :Array<String>=[];

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
  
  getVeriler(){
    let tempVeriler : Array<string> = [];
    this.veriler.forEach(element => {
      const name = element['Name'];
      const surname = element['Surname'];
      const id = element['Id'];

      const veri = {
        "name": name,
        "surname": surname,
        "id":id
      };
      tempVeriler.push(id);
      tempVeriler.push(name+surname);
    });
    return tempVeriler;
  }


}
