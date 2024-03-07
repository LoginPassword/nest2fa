import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SentSms } from 'src/database/entities/Sent-sms';
import { MoreThan, Repository } from 'typeorm';

@Injectable()
export class SmsServiceService {
  private readonly logger = new Logger(this.constructor.name);

  constructor(
    @InjectRepository(SentSms)
    private readonly sentSmsRepository: Repository<SentSms>,
  ) {}

  async sendAuthSmsCode(phone: string) {
    let code: number;
    let existingCode: SentSms;

    let i = 0;
    do {
      if (i > 1000000) {
        throw new Error('Failed to generate unique code');
      }

      code = Math.floor(Math.random() * 999999) + 1;
      existingCode = await this.sentSmsRepository.findOne({
        where: { phone, code },
      });
      i++;
    } while (existingCode);

    const codeString = code.toString().padStart(6, '0');
    this.logger.log(`Generated code ${codeString} for phone ${phone}`);

    await this.sentSmsRepository.save({
      phone,
      code,
      used: false,
    });
  }

  async verifyAuthSmsCode(phone: string, code: string) {
    const existingCode = await this.sentSmsRepository.findOne({
      where: {
        phone,
        code: Number(code),
        used: false,
        createdAt: MoreThan(new Date(Date.now() - 1000 * 60 * 3)),
      },
    });

    if (!existingCode) {
      throw new Error('Invalid code');
    }

    existingCode.used = true;
    await this.sentSmsRepository.save(existingCode);
  }
}
