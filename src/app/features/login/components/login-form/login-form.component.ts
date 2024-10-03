import { CommonModule, JsonPipe } from "@angular/common";
import { Component, EventEmitter, Output } from "@angular/core";
import { FormsModule, NgForm } from "@angular/forms";

@Component({
	selector: "login-form",
	standalone: true,
	imports: [FormsModule, JsonPipe, CommonModule],
	templateUrl: "./login-form.component.html",
	styleUrl: "./login-form.component.scss",
})
export class LoginFormComponent {
	@Output() login = new EventEmitter<{ email: string; password: string }>();

	handleSubmit(form: NgForm) {
		if (form.valid) {
			this.login.emit(form.value);
		} else {
			form.form.markAllAsTouched();
		}
	}
}
