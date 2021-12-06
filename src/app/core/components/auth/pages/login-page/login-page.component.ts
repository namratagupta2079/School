import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Credentials } from "@core/models/user";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-login-page",
  templateUrl: "./login-page.component.html",
  styleUrls: ["./login-page.component.scss"],
})
export class LoginPageComponent implements OnInit {
  public loginForm: FormGroup;

  @Input() loading: boolean;

  @Input() error!: string | null;

  @Output() submitted: EventEmitter<Credentials> = new EventEmitter<
    Credentials
  >();

  constructor(private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      username: ["testUser1", Validators.required],
      password: ["123456", Validators.required],
    });
  }

  ngOnInit() { }

  submit() {
    if (this.loginForm.valid) {
      this.submitted.emit(this.loginForm.value);
    }
  }
}
