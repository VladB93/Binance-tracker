import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/services/store/store.service';
import { ObjectKlines, TaggedGridEntry } from 'src/app/interfaces';
import { LIMIT } from 'src/app/consts';
import { calculateDifferenceForInterval } from 'src/app/helpers';

@Component({
  selector: 'app-tagged-coins-grid',
  templateUrl: './tagged-coins-grid.component.html',
  styleUrls: ['./tagged-coins-grid.component.scss']
})
export class TaggedCoinsGridComponent implements OnInit {
  public data = [];

  constructor(private storeService: StoreService) {}

  ngOnInit() {
    this.storeService.init();
    this.storeService.coinKlinesSubject.subscribe((e: ObjectKlines) => {
      this.data = this.convertToGridData(e);
    });
  }

  private convertToGridData(coinKlinesData: ObjectKlines) {
    const data = [];
    for (const key in coinKlinesData) {
      if (coinKlinesData[key].tagged) {
        const currentCoin = coinKlinesData[key];
        const entry: TaggedGridEntry = {
          Ticker: currentCoin.coin.symbol,
          Price: Number(currentCoin.data[LIMIT - 1].ClosePrice),
          '% change(3m)': calculateDifferenceForInterval(currentCoin.data, 3),
          '% change(15m)': calculateDifferenceForInterval(currentCoin.data, 15),
          '% change(1h)': calculateDifferenceForInterval(currentCoin.data, 60),
          '% change(4h)': calculateDifferenceForInterval(currentCoin.data, 60 * 4)
        };
        data.push(entry);
      }
    }
    return data;

  }

  public formatValue(value: number) {
    return value.toFixed(8);
  }
}
