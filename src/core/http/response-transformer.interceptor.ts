import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { AbstractHttpAdapter, HttpAdapterHost } from "@nestjs/core";
import { map, Observable } from "rxjs";
import { NestResponse } from "./nest-response";

@Injectable()
export class ResponseTransformInterceptor implements NestInterceptor {

  private httpAdapter: AbstractHttpAdapter;

  constructor(adapterHost: HttpAdapterHost) {
    this.httpAdapter = adapterHost.httpAdapter;
  }

  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    return next.handle()
      .pipe(
        map((responseController: NestResponse) => {
          if (responseController instanceof NestResponse) {
            const resContext = context.switchToHttp();
            const response = resContext.getResponse();
            const { headers, status, body } = responseController;

            const nameHeaders = Object.getOwnPropertyNames(headers);
            nameHeaders.forEach(nameHeader => {
              const valueHeader = headers[nameHeader];
              this.httpAdapter.setHeader(response, nameHeader, valueHeader);
            });

            this.httpAdapter.status(response, status);
            return body;
          }

          return responseController;
        })
      );
  }

}