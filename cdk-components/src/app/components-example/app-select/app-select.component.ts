import {
  ConnectedPosition,
  OverlayConfig,
  OverlayRef
} from '@angular/cdk/overlay';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { inSensitiveSearch } from '@common/utility/insensitive_search';
import { Udf } from '@core/types/Udf';
import { DropdownService } from '@shared/dropdown/dropdown.service';
import {
  FormViewAdapter,
  NGRX_FORM_VIEW_ADAPTER
} from 'ngrx-forms';
import Requals from 'ramda/es/equals';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector       : 'app-select',
  templateUrl    : './app-select.component.html',
  styleUrls      : ['./app-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers      : [{
    provide    : NGRX_FORM_VIEW_ADAPTER,
    useExisting: forwardRef(() => AppSelectComponent),
    multi      : true
  }]
})

export class AppSelectComponent implements OnInit,
  OnDestroy, OnDestroy, OnChanges, FormViewAdapter {
  // ToDo [Andrii] after user add some model with the input
  // i should call on change callback for updating the state

  @Input() optionList: any[] = [];
  @Input() config: OverlayConfig = {
    maxHeight: '128px'
  };
  @Input() withoutSearch = false;
  @Input() model: any;
  @Input() labelKey = 'name';
  @Input() idKey: Udf<number>;
  @Input() placeholder = '';
  @Input() withNone = true;
  @Output() selectedValue = new EventEmitter<any>();

  @Input('dropdownPosition')
  set dropdownPosition(value: ConnectedPosition[]) {
    this._dropdownPosition = value;
  }

  getWidth() {
    return this.config && this.config.width;
  }

  private _dropdownPosition: ConnectedPosition[] = [{
    originX : 'center',
    originY : 'bottom',
    overlayX: 'center',
    overlayY: 'top',
    offsetY : 5
  }];

  private destroyed$ = new Subject();
  private overlayRef: Udf<OverlayRef>;
  private originalOptionsList = [];

  // search control
  searchControl = new FormControl();

  handleClick(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  openDropdown(event, template: TemplateRef<any>) {
    event.preventDefault();

    this.closeDropdown();

    this.overlayRef = this.dropdownService.open({
      template    : template,
      containerRef: this.viewContainerRef,
      position    : this._dropdownPosition,
    });
  }

  select(option: any | null, e) {
    this.model = option;

    // ToDo [Andrii] think about this condition improvement
    if (this.model && this.model.id) {
      this.onChangeCallback(this.model.id);
      this.selectedValue.next(this.model.id);
    } else {
      this.onChangeCallback(this.model);
      this.selectedValue.next(this.model);
    }

    this.closeDropdown();
    e.stopPropagation();
  }

  closeDropdown() {
    if (this.isOpen) {
      this.overlayRef.dispose();
      this.searchControl.patchValue('');
    }
  }

  get isOpen() {
    return this.overlayRef && this.overlayRef.hasAttached();
  }

  get label() {
    return this.model ? this.model.name : this.placeholder;
  }

  getSelected(currentModel: any = {}): boolean {
    if (currentModel) {
      return Requals(this.model, currentModel);
    }
  }

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(
        // debounceTime(300),
        takeUntil(this.destroyed$)
      ).subscribe((query) => this.search(query));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.originalOptionsList.length === 0 && changes['optionList']) {
      this.originalOptionsList = [...this.optionList];
    }

    // if (this.model !== undefined) {
    //   this.model = this.optionList.find(curOpt => curOpt[this.idKey] === this.model);
    // }
  }

  ngOnDestroy(): void {
    this.closeDropdown();
    this.destroyed$.next();
  }

  private search(query: string) {
    this.optionList = this.originalOptionsList
      .filter(option => inSensitiveSearch(option[this.labelKey], query));
    // this.cDr.detectChanges();
  }

  // form view adapter implementation
  public onChangeCallback = (_: any) => undefined;
  public onTouchedCallback = () => undefined;

  setOnChangeCallback(fn: any): void {
    this.onChangeCallback = fn;
  }

  setOnTouchedCallback(fn: any): void {
    this.onTouchedCallback = fn;
  }

  public setViewValue(value: any): void {
    this.idKey = value;
  }

  constructor(
    private dropdownService: DropdownService,
    private viewContainerRef: ViewContainerRef,
  ) {
  }
}
