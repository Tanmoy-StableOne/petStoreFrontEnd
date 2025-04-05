import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError  } from 'rxjs';
import { GetBaseURL } from '../../constants/endpoints';
import { MICROSERVICE_NAME } from '../../constants/Enums';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MenuDataService {
  constructor(private http: HttpClient) { }

  getMenuData(): Observable<any> {
    const baseUrl = GetBaseURL(MICROSERVICE_NAME.CORE);
    const apiUrl = `${baseUrl}navbar/get`;

    return this.http.get(apiUrl).pipe(
      catchError(error => {
        console.error('Failed to fetch menu data:', error);
        return throwError(() => new Error('Failed to load menu data'));
      })
    );
  }
}
