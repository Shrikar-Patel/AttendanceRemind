import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Send} from './send';
import { SendService } from './send.service';

@Component({
  selector: 'app-send',
  templateUrl: './send.component.html',
  styleUrls: ['./send.component.css'],
  providers: [SendService]
})
export class SendComponent implements OnInit {
  //sendForm;
  sendResponse;
  sendForm = new FormGroup({
    eventName :new FormControl(''),
    groupName : new FormControl(''),
    message : new FormControl(''),
  });



  constructor(
    private formBuilder: FormBuilder,
    private sendService: SendService
  ) {
    this.sendForm = this.formBuilder.group({
      eventName:'',
      groupName: '',
      message: '',

    });
  }

  onSubmit(sendForm) {
    console.warn('Your Message Has Been Sent', this.sendForm.value);
    this.sendService.sendMessage(this.sendForm.value)
    .subscribe((data:(any)) => this.sendResponse = data);

    this.sendForm.reset();
  }

  ngOnInit() {
  }

}
