import { Component, OnInit, OnDestroy } from "@angular/core";

import { interval, Subscription, Observable, Observer } from "rxjs";
import { map, filter } from "rxjs/operators";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit, OnDestroy {
  private firstObsSubscription: Subscription;
  constructor() {}

  ngOnInit() {
    // this.firstObsSubscription = interval(1000).subscribe((count) => {
    //   console.log(count);
    // });
    const customIntervalObs = new Observable((observer: Observer<object>) => {
      let count = 0;
      setInterval(() => {
        observer.next({ count });
        if (count === 2) {
          observer.complete();
        }
        if (count > 3) {
          observer.error(new Error("Counter is greater then 3"));
        }
        count++;
      }, 1000);
    });

    this.firstObsSubscription = customIntervalObs
      .pipe(
        filter((data) => {
          return data["count"] > 0;
        }),
        map((data) => {
          return "Round + " + (data["count"] + 1);
        })
      )
      .subscribe(
        (data) => {
          console.log(data);
        },
        (error) => {
          alert(error);
          console.log(error);
        },
        () => {
          console.log("completed");
        }
      );
  }

  ngOnDestroy(): void {
    this.firstObsSubscription.unsubscribe();
  }
}
