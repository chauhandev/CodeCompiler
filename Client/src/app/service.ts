import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiServiceResponse } from './Model/ApiServiceResponse';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Service {
  private mode = new BehaviorSubject<string>('light');
  private apiUrl = environment.apiUrl
  constructor(private http : HttpClient) { 
  }
  getmode() {
    return this.mode.asObservable();
  }
  toggleMode() {
    const currentTheme = this.mode.value;
    const newTheme = this.mode.value === 'light' ? 'dark' : 'light';
    this.mode.next(newTheme);
  }

  run(data: any): Observable<ApiServiceResponse>{
   
     return this.http.post<ApiServiceResponse>(this.apiUrl, data);
  }
}
