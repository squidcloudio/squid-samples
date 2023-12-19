import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { LocalBackendService } from './local-backend.service';
import { RunConfigurationRequest, serializeObj } from '@squidcloud/common';
import { Response } from 'express';

@Controller('code')
export class LocalBackendController {
  constructor(private readonly localBackendService: LocalBackendService) {}

  @Post('run')
  async runCode(@Body() request: RunConfigurationRequest, @Res() res: Response): Promise<void> {
    try {
      const processResult = await this.localBackendService.processRunCode(request);
      res.set('Content-Type', 'application/json').status(200).send(serializeObj(processResult));
    } catch (e) {
      res
        .set('Content-Type', 'application/json')
        .status(500)
        .send(serializeObj({ ok: false, error: e.message }));
    }
  }

  @Get('health')
  async healthCheck(@Res() res: Response): Promise<void> {
    console.log('Got health check request');
    res.status(200).send('OK');
  }
}
