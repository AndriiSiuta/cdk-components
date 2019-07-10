import {
  Pipe,
  PipeTransform
} from '@angular/core';
import {
  DomSanitizer,
  SafeResourceUrl,
  SafeStyle,
  SafeUrl
} from '@angular/platform-browser';

const enum SafeTypes {
  url = 'url',
  style = 'style',
  resourceUrl = 'resourceUrl'
}

export type SafePipeReturns = SafeStyle | SafeUrl | SafeResourceUrl;

@Pipe({
  name: 'safe'
})

export class SafePipe implements PipeTransform {
  transform(value: any, type: SafeTypes.url | SafeTypes.resourceUrl | SafeTypes.style): SafePipeReturns {
    switch (type) {
      case SafeTypes.resourceUrl:
        return this.sanitizer.bypassSecurityTrustResourceUrl(value);
      case SafeTypes.url:
        return this.sanitizer.bypassSecurityTrustUrl(value);
      case SafeTypes.style:
        return this.sanitizer.bypassSecurityTrustStyle(`url(${value})`);
      default:
        throw new Error(`Invalid type of sanitizer. Please check if ${type} is contains in condition!`);
    }
  }

  constructor(
    private sanitizer: DomSanitizer
  ) {
  }
}
