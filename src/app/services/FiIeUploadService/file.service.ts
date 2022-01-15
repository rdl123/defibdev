import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {AND, API_URL, INCIDENT_AND_QUERY, INCIDENT_OR_QUERY} from '../../Utils/constantes';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http: HttpClient) { }


  UploadFormateurFile(selectedFile: File , id : any){
    const uploadData = new FormData();
    let Array = selectedFile.name.split(".");
    let Extension = Array[Array.length-1];
    uploadData.append('File', selectedFile, "Formateur_" + id + "." + Extension);
    return this.http.post(API_URL + '/upload', uploadData);
  }
  UploadClientFile(selectedFile: File , id : any){
    const uploadData = new FormData();

    uploadData.append('File', selectedFile, "Client_" + id);
    return this.http.post(API_URL + '/upload', uploadData);
  }
  getFormateur64file(name : String){
    return this.http.post(API_URL+'/Formateur/getFile', name ,{responseType: 'text'} );
  }
}
