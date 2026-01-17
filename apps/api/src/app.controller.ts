import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {
  createSuccessResponse,
  createErrorResponse,
  ApiResponse,
  API_ENDPOINTS,
} from '@logicnomad/engine';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): ApiResponse<string> {
    const message = this.appService.getHello();
    return createSuccessResponse(message, 'Welcome to LogicNomad API');
  }

  @Get(API_ENDPOINTS.HEALTH)
  getHealth(): ApiResponse<{ status: string; timestamp: string }> {
    return createSuccessResponse({
      status: 'ok',
      timestamp: new Date().toISOString(),
    });
  }
}
