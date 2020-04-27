import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import { HttpResponse } from '@angular/common/http';
import 'rxjs/add/operator/mergeMap';


@Injectable()
export class AuthenticationService {
    constructor(private http: HttpClient) { }

    login(username: string, password: string) {
        //return this.http.post<any>('/api/authenticate', { username: username, password: password })
        return this.getLoginUserData(username, password)
            .map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.body.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }

                return user;
            });
    }

    getLoginUserData(username: string, password: string){
        let users: any[] = JSON.parse(localStorage.getItem('users')) || [];

        // wrap in delayed observable to simulate server api call
        return Observable.of(null).mergeMap(() => {

            // authenticate
            //if (request.url.endsWith('/api/authenticate') && request.method === 'POST') {
                // find if any user matches login credentials
                let filteredUsers = users.filter(user => {
                    return user.username === username && user.password === password;
                });

                if (filteredUsers.length) {
                    // if login details are valid return 200 OK with user details and fake jwt token
                    let user = filteredUsers[0];
                    let body = {
                        id: user.id,
                        username: user.username,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        token: 'fake-jwt-token'
                    };

                    return Observable.of(new HttpResponse({ status: 200, body: body }));
                } else {
                    // else return 400 bad request
                    return Observable.throw('Username or password is incorrect');
                }
                
            //}
        });
    }


    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}