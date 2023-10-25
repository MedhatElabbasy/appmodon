import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { language } from '../../enums/language.enum';
import { CanvasService } from '../../services/canvas.service';
import { LangService } from '../../services/lang.service';

@Component({
  selector: 'public-api-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss'],
})
export class CanvasComponent implements OnInit {
  @Input() id!: string;
  @Input('horizontal') horizontal!: boolean;
  @Input('header') header: string = '';
  @Input('height') height: string = '';
  @Output('close') public closed = new EventEmitter();
  private element: any;
  isRtl!: boolean;
  constructor(
    private lang: LangService,
    private canvasService: CanvasService,
    private el: ElementRef
  ) {
    this.element = el.nativeElement;
  }

  ngOnInit() {
    this.dirListener();
    // ensure id attribute exists
    if (!this.id) {
      return;
    }

    // move element to bottom of page (just before </body>) so it can be displayed above everything else
    document.body.appendChild(this.element);

    // add self (this modal instance) to the modal service so it's accessible from controllers
    this.canvasService.add(this);
  }

  dirListener() {
    this.lang.language.subscribe((res) => {
      this.isRtl = res == language.ar;
    });
  }

  // remove self from modal service when component is destroyed
  ngOnDestroy(): void {
    this.canvasService.remove(this.id);
    this.element.remove();
  }

  // open modal
  open(): void {
    document.getElementById(this.id + '-canvas-open')?.click();
  }

  // close modal
  close(): void {
    document.getElementById(this.id + '-canvas-close')?.click();
  }

  closeListener() {
    this.closed.emit();
  }
}