import { importProvidersFrom, provideZoneChangeDetection } from "@angular/core";
import { provideRouter } from "@angular/router";
import { routes } from "./app/app.routes";
import { HTTP_INTERCEPTORS, provideHttpClient } from "@angular/common/http";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { AuthInterceptorService } from "./app/services/auth-interceptor.service";
import { FormsModule } from "@angular/forms";

export const testingServices = [
        provideZoneChangeDetection({ eventCoalescing: true }), 
            provideRouter(routes),
            provideHttpClient(),
              {
                provide: HTTP_INTERCEPTORS,
                useClass: AuthInterceptorService,
                multi: true,
              },
            importProvidersFrom(FormsModule),
            provideHttpClientTesting()
    ];