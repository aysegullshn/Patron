import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonelService {
  apiUrl : string = 'http://localhost:59466/api/Personel';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient) { }


  personelGetir(): Observable<any>{
    return this.http.get(this.apiUrl);
  }
  personelEkle(data): Observable<any>{
    let API_URL = this.apiUrl + "/Add/"+data.name+"/"+data.surname;
    return this.http.get(API_URL, data);
  }
  personelGuncelle(id, name): Observable<any>{
    let API_URL = this.apiUrl + "/Update/"+id+"/"+name;
    return this.http.get(API_URL);
  }
  personelSil(id): Observable<any>{
    let API_URL = this.apiUrl + "/Delete/"+id;
    return this.http.get(API_URL);
  }
}
