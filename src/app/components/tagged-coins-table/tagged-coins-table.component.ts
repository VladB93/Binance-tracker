import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/services/store/store.service';

@Component({
  selector: 'app-tagged-coins-table',
  templateUrl: './tagged-coins-table.component.html',
  styleUrls: ['./tagged-coins-table.component.scss']
})
export class TaggedCoinsTableComponent implements OnInit {

  constructor(private storeService: StoreService) { }

  ngOnInit() {
    this.storeService.init();
    this.storeService.coinKlinesSubject.subscribe(e => console.log(e));
  }

}
