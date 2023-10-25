import { Component, Input, OnInit } from '@angular/core';
import { FormControl, UntypedFormControl } from '@angular/forms';
import { AttachmentService } from '../../services/attachment.service';

@Component({
  selector: 'projects/tools/src/public-api-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent implements OnInit {
  @Input('acceptedExtension') acceptedExtension: string[] = [];
  @Input('Control') Control!: FormControl;
  @Input('placeHolderImage') image: string = 'assets/images/svg/photos.svg';
  @Input('link') link: string | null = null;

  constructor(private attachment: AttachmentService) {}

  ngOnInit() {}

  onFileUpload(event: any) {
    let arr = event.target.files[0].name.split('.');
    const extension = arr[arr.length - 1].toLowerCase();

    if (!this.acceptedExtension.includes(extension)) {
      if (this.Control) {
        this.Control.setErrors({
          notValid: true,
        });
      }

      this.link = null;

      return;
    } else {
      let url = URL.createObjectURL(event.target.files[0]);
      

      if (this.Control) {
        this.Control.setErrors({
          notValid: null,
        });
        this.attachment
          .uploadFile(event.target.files[0].name, event.target.files[0])
          .subscribe((res) => {
            this.link = url;
            this.Control.setValue(res);
          });
      }
    }
  }
}
