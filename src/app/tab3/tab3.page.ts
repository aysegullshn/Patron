import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { async } from 'q';
import Personel from '../models/Personel';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  personeller :Array<Personel>=[];

  async ngOnInit() {
    await fetch('http://localhost:59466/api/Personel')
    .then(res => res.json())
    .then(veri => {
      veri.forEach(element => {
        let personel=new Personel(element.Name,element.Surname,element.Gender,element.Salary);
        this.personeller.push(personel);
      });
    });
    this.personeller.reverse();
  }
}
