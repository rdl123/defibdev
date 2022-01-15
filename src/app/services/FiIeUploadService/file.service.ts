import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {AND, API_URL, INCIDENT_AND_QUERY, INCIDENT_OR_QUERY} from '../../Utils/constantes';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http: HttpClient) { }


  UploadFile(selectedFile: File){
    const uploadData = new FormData();
    uploadData.append('File', selectedFile, selectedFile.name);
    return this.http.post(API_URL + '/upload', uploadData);
  }
}
