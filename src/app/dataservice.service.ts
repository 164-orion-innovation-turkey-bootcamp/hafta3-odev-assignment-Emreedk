import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataserviceService {
  constructor(private http: HttpClient) {}
  postData(user) {
    return this.http.post('http://localhost:3000/users', { user });
  }
  getData() {
    return this.http.get('http://localhost:3000/users/').pipe(
      map((responseData) => {
        let newArray = [];
        for (let key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            newArray.push(responseData[key]);
          }
        }
        return newArray;
      })
    );
  }
}
