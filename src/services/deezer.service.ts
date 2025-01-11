import { Injectable } from "@angular/core";
import { environment } from "../enviroments/enviroment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { DeezerAlbum } from "../models/deezer-album.model";

@Injectable({
  providedIn: 'root'
})
export class DeezerService {
  private apiUrl = `${environment.apiUrl}/charts`;

  constructor(private http: HttpClient) {}

  getAlbums(): Observable<any> {
    return this.http.get<any>(this.apiUrl+'/albums');
  }

}