import { Component, Inject } from '@angular/core';

import { DataSvc } from './service/data.service';
import { CustomListBoxComponent } from './custom-list-box/custom-list-box.component';

//import { WjListBox } from 'wijmo/wijmo.angular2.input';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  data: any[] = [];

  constructor(@Inject(DataSvc) svc: DataSvc) {
    // inject DataSvc object - svc - into data array
    this.data = svc.getSomeCountries();
  }

  selectionChanged(clb: CustomListBoxComponent){
    console.log('selection: ' + JSON.stringify(clb.selection));
  }
}
