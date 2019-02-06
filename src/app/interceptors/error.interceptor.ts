import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';


/**
 * Interceptor para tratativa de Erros em requisições http
 */
export class HttpErrorInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
            .pipe(
                retry(1),
                catchError((error: HttpErrorResponse) => {
                    let errorMessage = '';
                    if (error.error instanceof ErrorEvent) {
                        errorMessage = `Ops! Erro: ${error.error.message}`;
                    } else {
                        errorMessage = `Error Code: ${error.status}\nMensagem: ${error.message}`;
                    }
                    return throwError(errorMessage);
                })
            )
    }
}