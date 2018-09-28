import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable({
  // Any components that will use this service will tell it which module is providing the service.  In this
  // case it is the root module with is the app.module.ts.  When we add a new service, then we need to
  // add it on our app.module.ts under the providers:[] array.
  providedIn: 'root'
})
export class ErrorInterceptor implements HttpInterceptor {  

  // Intercept an outgoing  HttpRequest and optionally transform it or the response
  // First parameter is the request parameter of type HttpRequest<any>
  // Second parameter is the next parameter of type HttpHandler
  // This will return an Observable that is having a return type of HttpEvent<any>
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // We will return next and handle the request and then we need use the
    // rxjs pipe because we want to use an rxjs operator which is the rxjs catchError
    return next.handle(req).pipe(
      catchError(error => {
        // We will check what type of error
        if (error instanceof HttpErrorResponse) {

          // We will check if the error is a 401 - UnAuthorized error
          if (error.status === 401) {
            return throwError(error.statusText);
          }

          // We will check the application headers and get the application error
          // that we have created in \DatingApp.API\Helpers\Extensions.cs
          // on the method AddApplicationError(this HttpResponse response, string message)
          const applicationError = error.headers.get('Application-Error');

          if (applicationError) {
            console.error(applicationError);
            // We will throw the error
            // throwError is coming from rxjs and is of type Observable
            return throwError(applicationError);
          }

          // We will check for server errors and this will go inside the
          // HttpResponse          
          const serverError = error.error;
          // If it is a model state error, it will be of type object
          // which is basically a key/value
          let modalStateError = '';

          if (serverError && typeof serverError === 'object') {
            for (const key in serverError) {
              if (serverError[key]) {
                modalStateError += serverError[key] + '\n';
              }
            }
          }

          return throwError(modalStateError || serverError || 'Server Error');
        }
      })
    );
  }
}

// We need to create an error interceptor provider that we can later add to our
// app.module.ts
export const ErrorInterceptorProvider = {
  // Add an additional http interceptor to the existing Angular array
  // of http interceptors
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  // Set to true since we don't want to replace this to our existing Angular array
  // of interceptors but we need to add it.
  multi: true
}
