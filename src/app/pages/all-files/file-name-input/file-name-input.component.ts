import { Component, OnInit, forwardRef, OnChanges, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, ControlValueAccessor, FormControl, FormGroup, FormBuilder, ValidatorFn, AbstractControl } from '@angular/forms';

export interface FileNameInput {
  name?: string;
  check: boolean;
}

@Component({
  selector: 'app-file-name-input',
  templateUrl: './file-name-input.component.html',
  styleUrls: ['./file-name-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FileNameInputComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => FileNameInputComponent),
      multi: true
    },
  ]
})
export class FileNameInputComponent implements OnInit, ControlValueAccessor {


  form: FormGroup;

  @Input() initFileName = '新建文件夹';
  @Output() formChange = new EventEmitter<FileNameInput>();
  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      folderName: [this.initFileName]
    });
  }

  onNewCheck(data: boolean) {
    const _name = this.form.get('folderName').value;
    if (data) {
      this.formChange.emit({name: _name, check: true});
    } else {
      this.formChange.emit({check: false});
    }
  }

  writeValue(initName?: any) {
    if (initName) {
      this.form.get('folderName').patchValue(initName);
    }
  }

  registerOnChange() {

  }

  registerOnTouched() {

  }

  validate(c: FormControl) {

  }

}
