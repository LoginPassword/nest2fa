import { Module } from '@nestjs/common';
import { SmsServiceService } from './sms-service.service';
import { SentSms } from 'src/database/entities/Sent-sms';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [SmsServiceService],
  exports: [SmsServiceService],
  imports: [TypeOrmModule.forFeature([SentSms])],
})
export class SmsServiceModule {}
