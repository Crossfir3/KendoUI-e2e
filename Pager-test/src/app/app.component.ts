import { PageChangeEvent } from '@progress/kendo-angular-pager';
import { Component, OnInit } from '@angular/core';
import { destinations } from './destinations';

@Component({
    selector: 'my-app',
    template: `
        <span class="title">
            Top European Destinations
        </span>
        <div class="wrapper">
            <div class="content-container">
                <destination-component
                    *ngFor="let destination of pagedDestinations"
                    [data]="destination">
                </destination-component>
            </div>
            <kendo-datapager
                [style.width.%]="100"
                [pageSize]="pageSize"
                [skip]="skip"
                [total]="total"
                (pageChange)="onPageChange($event)">
            </kendo-datapager>
        </div>
    `,
    styleUrls: ['styles.css']
})
export class AppComponent implements OnInit {
    public pageSize = 7;
    public skip = 0;
    public pagedDestinations = [];
    public total = destinations.length;

    public ngOnInit(): void {
        this.pageData();
    }

    public onPageChange(e: PageChangeEvent): void {
        this.skip = e.skip;
        this.pageSize = e.take;
        this.pageData();
    }

    private pageData(): void {
        this.pagedDestinations = destinations.slice(this.skip, this.skip + this.pageSize);
    }
}
