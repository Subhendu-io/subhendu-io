import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private api: string = environment.API;
  private endpoints: object = environment.ENDPOINTS;

  constructor(
    private httpClient: HttpClient
  ) { }

  async post(url: string, data: any): Promise<any> {
    return this.httpClient.post(this.api + this.endpoints[url], data).toPromise();
  }
  async get(url: string): Promise<any> {
    return this.httpClient.get(this.api + this.endpoints[url]).toPromise();
  }
  async getById(url: string, id: string): Promise<any> {
    return this.httpClient.get(this.api + this.endpoints[url] + '/' + id).toPromise();
  }
  async updateById(url: string, id: string, data: any): Promise<any> {
    return this.httpClient.put(this.api + this.endpoints[url] + '/' + id, data).toPromise();
  }
  async deleteById(url: string, id: string): Promise<any> {
    return this.httpClient.delete(this.api + this.endpoints[url] + '/' + id).toPromise();
  }
  async getByParams(url: string, params: any[]): Promise<any> {
    let paramString = '';
    for (const param of params) {
      paramString += '/' + param;
    }
    return this.httpClient.get(this.api + this.endpoints[url] + paramString).toPromise();
  }
  async postByParams(url: string, params: any[], data: any): Promise<any> {
    let paramString = '';
    for (const param of params) {
      paramString += '/' + param;
    }
    return this.httpClient.post(this.api + this.endpoints[url] + paramString, data).toPromise();
  }
  async updateByParams(url: string, id: string, params: any[], data: any): Promise<any> {
    let paramString = '';
    for (const param of params) {
      paramString += '/' + param;
    }
    return this.httpClient.put(this.api + this.endpoints[url] + id + paramString, data).toPromise();
  }
  async getByQueryParams(url: string, queryParams: object): Promise<any> {
    let params = new HttpParams();
    for (const [key, value] of Object.entries(queryParams)) {
      params = params.append(key, value);
    }
    return this.httpClient.get(this.api + this.endpoints[url], { params }).toPromise();
  }
}
