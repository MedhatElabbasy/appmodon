import { Component, Input, OnInit } from '@angular/core';
import { OptionSetItem } from '../../models/option-set';
import { LangService } from '../../services/lang.service';

@Component({
  selector: 'projects/tools/src/public-api-status-badge',
  templateUrl: './status-badge.component.html',
  styleUrls: ['./status-badge.component.scss'],
})
export class StatusBadgeComponent implements OnInit {
  @Input('status') public status!: OptionSetItem;

  constructor(public lang: LangService) {}

  ngOnInit(): void {}

  addAlpha(color: string, opacity: number): string {
    // coerce values so ti is between 0 and 1.
    const _opacity = Math.round(Math.min(Math.max(opacity || 1, 0), 1) * 255);
    return color + _opacity.toString(16).toUpperCase();
  }
}
