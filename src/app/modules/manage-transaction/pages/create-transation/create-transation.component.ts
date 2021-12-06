import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Transaction } from '@features/manage-transaction/models/transaction';
import { custInfo } from '@features/manage-transaction/models/customer-info';
@Component({
  selector: 'app-create-transation',
  templateUrl: './create-transation.component.html',
  styleUrls: ['./create-transation.component.scss']
})
export class CreateTransationComponent implements OnInit {

  public form: FormGroup;
  customer: any = null
  regionList: any = ['Port Louis', 'Curepipe', 'Vacoas', 'Port Mathurin']
  currencyList: any = ['AED', 'EUR', 'CHF', 'MUR', 'USD']

  @Output() submitted: EventEmitter<Transaction> = new EventEmitter<
    Transaction
  >();

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      typeOfCustomer: ["New", Validators.required],
      customerNumber: ["", [Validators.required]],
      customerName: ["", [Validators.required]],
      customerAddress: ["", [Validators.required]],
      customerPhone: ["", [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      amount: ["", [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      currency: ["", [Validators.required]],
      beneficiaryBank: ["", [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      beneficiaryAccountNumber: ["", [Validators.required]],
      paymentDetails: ["", [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      cardDetails: ["", [Validators.required]],
      region: ["", [Validators.required]]
    });
  }

  ngOnInit() { }

  customerData(inputData: string) {
    var products = custInfo;
    this.customer = products.responseXML.getCustomerInfoResponse.getCustomerInfoResult.CUST_INFO;

    if (this.customer.CUST_NO == inputData) {
      this.form.patchValue({
        customerName: this.customer.SHORT_NAME,
        customerAddress: this.customer.STREET_ADDR,
        customerPhone: this.customer.CONTACT_INFO_V7.CONTACT_INFO_V7.PHONE_LIST_V7.PHONE_LIST_ITEM_V7.PHONE
      })
    } else {
      this.form.patchValue({
        customerName: '',
        customerAddress: '',
        customerPhoneNumber: ''
      })
    }
  }

  submit() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.submitted.emit(this.form.value);
    }
  }

}
