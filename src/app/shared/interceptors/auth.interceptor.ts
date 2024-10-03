import { HttpHandlerFn, HttpRequest } from "@angular/common/http";

export function authInterceptor(req: HttpRequest<any>, next: HttpHandlerFn) {
	const accessKey = localStorage.getItem("accessKey");
	if (accessKey) {
		return next(
			req.clone({
				headers: req.headers.set("Authorization", `Bearer ${accessKey}`),
			}),
		);
	}
	return next(req);
}
