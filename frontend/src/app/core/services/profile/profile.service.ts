import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Profile } from '../../models/profile';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private apiUrl = `${environment.apiUrl}/profile`;

  constructor(private http: HttpClient) {}

  getProfile(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  updateProfile(profile: Partial<Profile>): Observable<any> {
    return this.http.put<any>(this.apiUrl, profile);
  }

  uploadProfileImage(file: File): Observable<any> {
    const formData = new FormData();
    
    formData.append('image', file);

    return this.http.post<any>(`${this.apiUrl}/upload-image`, formData);
  }
}
