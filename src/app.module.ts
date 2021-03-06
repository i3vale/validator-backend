import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthMiddleware } from './auth/auth.middleware';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { CommonModule } from './common/common.module';
import { Web3Module } from './web3/web3.module';
import { LogModule } from './log/log.module';

@Module({
	imports: [
		UserModule,
		AuthModule,
		TypeOrmModule.forRoot(),
		CommonModule,
		Web3Module,
		LogModule,
	],
	controllers: [
		AppController,
	],
	providers: [
		AppService,
		{
			provide: APP_GUARD,
			useClass: AuthGuard,
		},
	],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(AuthMiddleware).forRoutes('*');
	}
}
