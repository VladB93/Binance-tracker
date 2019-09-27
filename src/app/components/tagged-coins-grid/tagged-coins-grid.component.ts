import { Component, OnInit, OnDestroy } from "@angular/core";
import { StoreService } from "src/app/services/store/store.service";
import { ObjectKlines, TaggedGridEntry } from "src/app/interfaces";
import { LIMIT } from "src/app/consts";
import { calculateDifferenceForInterval } from "src/app/helpers";
import { TimeInterval } from "rxjs";

@Component({
  selector: "app-tagged-coins-grid",
  templateUrl: "./tagged-coins-grid.component.html",
  styleUrls: ["./tagged-coins-grid.component.scss"]
})
export class TaggedCoinsGridComponent implements OnInit, OnDestroy {
  private interval;
  private timer = 0;
  public loading = true;
  public data: TaggedGridEntry[] = [];

  constructor(private storeService: StoreService) {}

  ngOnInit() {
    this.storeService.init();
    this.storeService.coinKlinesSubject.subscribe((e: ObjectKlines) => {
      this.data = this.convertToGridData(e);
    });
  }

  ngOnDestroy() {
    this.interval.clearInterval();
  }

  public formatValue(value: number) {
    return value.toFixed(8);
  }

  private convertToGridData(coinKlinesData: ObjectKlines) {
    const newData =[];
    for (const key in coinKlinesData) {
      const currentCoin = coinKlinesData[key];
      if (coinKlinesData[key].tagged) {
        const match = this.data.find(
          (el: TaggedGridEntry) => el.Ticker === key
        );
        if (match) {
            match.Price = Number(currentCoin.data[LIMIT - 1].ClosePrice);
            match["% change(3m)"] = calculateDifferenceForInterval(currentCoin.data, 3);
            match["% change(15m)"] = calculateDifferenceForInterval(currentCoin.data,15);
            match["% change(1h)"] = calculateDifferenceForInterval(currentCoin.data,60);
            match["% change(4h)"] = calculateDifferenceForInterval(currentCoin.data, 60 * 4);
            newData.push(match)
        } else {
          const entry: TaggedGridEntry = {
            Ticker: currentCoin.coin.symbol,
            Price: Number(currentCoin.data[LIMIT - 1].ClosePrice),
            "% change(3m)": calculateDifferenceForInterval(currentCoin.data, 3),
            "% change(15m)": calculateDifferenceForInterval(currentCoin.data,15),
            "% change(1h)": calculateDifferenceForInterval(currentCoin.data,60),
            "% change(4h)": calculateDifferenceForInterval(currentCoin.data,60 * 4),
            date: new Date()
          };
          newData.push(entry)
        }
      }
    }
    if (this.loading) {
      this.timer = 60 - new Date().getSeconds();
      this.loading = false;
      this.interval = setInterval(() => {
        this.timer--;
        if (this.timer === 0) {
          this.timer = 65;
        }
      }, 1000);
    }
    return this.sortByDate(newData);
  }

  private sortByDate(arr: TaggedGridEntry[]) {
    return arr.sort(
      (a: TaggedGridEntry, b: TaggedGridEntry) =>
        b.date.getTime() - a.date.getTime()
    );
  }
}
