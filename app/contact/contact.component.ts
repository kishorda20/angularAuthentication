import { Component } from '@angular/core';

@Component({
    moduleId: module.id,
    template: `
    <div class="col-md-6 col-md-offset-3">
        <p><a [routerLink]="['']">Home</a></p>    
    </div>
    <div class="col-md-6 col-md-offset-3">
    <h3>This is contact Page</h3>
    </div>
      `
})

export class ContactComponent {
    constructor(){
        console.log('On Contact Page');
    }
}