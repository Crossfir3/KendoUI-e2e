import { Component, Input } from '@angular/core';

@Component({
    selector: 'destination-component',
    template: `
        <div class="destination">
            <img src="https://www.telerik.com/kendo-angular-ui-develop/components/pager/assets/destinations/{{data.destinationId}}.png"
                alt="{{data.destinationName}}" />
            <h3>{{data.destinationName}}</h3>
            <p>{{data.destinationText}}</p>
        </div>
    `,
    styles: [`
        .destination {
            position: relative;
            width: 170px;
            height: 230px;
            margin-left: 10px;
            padding: 0;
            cursor: default;
            cursor: default;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
        }
        .destination img {
            width: 160px;
            height: 150px;
            margin-bottom: 10px;
        }
        .destination h3 {
            margin: 0;
            padding: 3px 5px 0 0;
            max-width: 100%;
            overflow: hidden;
            line-height: 1.1em;
            font-size: .9em;
            font-weight: bolder;
            text-transform: uppercase;
            color: #656565;
        }
        .destination p {
            width: 100%;
            font-size: 0.8em;
            color: #BABABA;
        }
    `]
})

export class DestinationComponent {
    @Input() public data: any;
}
