import { Controller, Get, Inject, Param } from '@nestjs/common';
import { AppService } from './app.service';
import Cache from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService
    ) 
  {}


  @Get(':key')
  async getValue(@Param('key') key: string) {
    console.log(process.env.REDIS_HOST);
    return this.appService.getValue(key);
  }
}
