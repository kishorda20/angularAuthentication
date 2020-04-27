import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { User } from '../_models/index';

@Injectable()
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
       // return this.http.get<User[]>('/api/users');

        let users: any[] = JSON.parse(localStorage.getItem('users')) || [];

        // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
        //if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
            return Observable.of(new HttpResponse({ status: 200, body: users }));
        //} else {
            // return 401 not authorised if token is null or invalid
            //return Observable.throw('Unauthorised');
        //}
    }

    getById(id: number) {
        return this.http.get('/api/users/' + id);
    }

    create(user: User) {
       // return this.http.post('/api/users', user);
        return this.createUser(user);
    }

    update(user: User) {
        return this.http.put('/api/users/' + user.id, user);
    }

    delete(id: number) {
        //return this.http.delete('/api/users/' + id);
        return this.deleteUserById(id);
    }

    deleteUserById(id: number){
        // array in local storage for registered users
        let users: any[] = JSON.parse(localStorage.getItem('users')) || [];

        // delete user
        
                let id2 = id;
                for (let i = 0; i < users.length; i++) {
                    let user = users[i];
                    if (user.id === id2) {
                        // delete user
                        users.splice(i, 1);
                        localStorage.setItem('users', JSON.stringify(users));
                        break;
                    }
                }

                // respond 200 OK
                return Observable.of(new HttpResponse({ status: 200 }));
            }

    createUser(user: User){
         // array in local storage for registered users
         let users: any[] = JSON.parse(localStorage.getItem('users')) || [];

         // get new user object from post body
         let newUser = user;

         // validation
         let duplicateUser = users.filter(user => { return user.username === newUser.username; }).length;
         if (duplicateUser) {
             return Observable.throw('Username "' + newUser.username + '" is already taken');
         }

         // save new user
         newUser.id = users.length + 1;
         users.push(newUser);
         localStorage.setItem('users', JSON.stringify(users));

         // respond 200 OK
         return Observable.of(new HttpResponse({ status: 200 }));
    }
           
        
    
}