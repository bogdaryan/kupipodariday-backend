import { Module } from '@nestjs/common';
import { winstonModule } from './config/winston.config';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './config/database-config';
import { ThrottlerModule } from '@nestjs/throttler';
import { UserModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { WishesModule } from './wishes/wishes.module';
import { OffersModule } from './offers/offers.module';
// import { WishlistsModule } from './wishlists/wishlists.module';
// import { OffersModule } from './offers/offers.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),
    winstonModule,
    UserModule,
    AuthModule,
    WishesModule,
    OffersModule,
    // WishlistsModule,
  ],
  providers: [],
})
export class AppModule {}
