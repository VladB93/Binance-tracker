import { Component, OnInit } from '@angular/core';
import { RestApiService } from 'src/app/services/rest-api/rest-api.service';

@Component({
  selector: 'app-tagged-coins-table',
  templateUrl: './tagged-coins-table.component.html',
  styleUrls: ['./tagged-coins-table.component.scss']
})
export class TaggedCoinsTableComponent implements OnInit {

  constructor(private restApiService: RestApiService) { }

  ngOnInit() {
    this.restApiService.loadExchangeInfo();
  }

}
