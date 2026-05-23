import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Plot } from './plots/entities/plot.entity/plot.entity';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(
    @InjectRepository(Plot)
    private plotRepository: Repository<Plot>,
  ) {}

  async onModuleInit() {}

  getHello(): string {
    return 'Hello World!';
  }
}
