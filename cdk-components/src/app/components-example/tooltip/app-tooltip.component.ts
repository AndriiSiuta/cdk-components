import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from '@angular/core';

@Component({
  selector: 'app-tooltip',
  templateUrl: './app-tooltip.component.html',
  styleUrls: ['./app-tooltip.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AppTooltipComponent implements OnInit {
  @Input() title: string;
  ngOnInit(): void {
  }

  constructor() {}
}
