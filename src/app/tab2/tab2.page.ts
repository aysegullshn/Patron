import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { async } from 'q';
import Personel from '../models/Personel';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  

  personeller :Array<Personel>=[];

  async ngOnInit() {
    await fetch('http://localhost:59466/api/Personel')
    .then(res => res.json())
    .then(veri => {
      veri.forEach(element => {
        let personel = new Personel(element.Name, element.Surname,element.Gender,element.Salary,element.id);
        this.personeller.push(personel);
      });
    });
    this.personeller.reverse();
  }
}
