import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppDataSource } from './database/data-source';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { SmsServiceModule } from './sms-service/sms-service.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useFactory: async () => ({
        ...AppDataSource.options,
        migrations: [], // Rewrite for disable migrations in nest
      }),
    }),
    UsersModule,
    AuthModule,
    SmsServiceModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
