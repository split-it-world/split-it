import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { GroupsModule } from './groups/groups.module';
import { config } from './config/config';
import { ExpansesModule } from './expanses/expanses.module';
import { SplitsModule } from './splits/splits.module';
import { CategoriesModule } from './categories/categories.module';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `${process.env.NODE_ENV}.env`,
      load: [config],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        uri: config.get('mongodb.database.connectionString'),
        user: config.get('mongodb.database.user'),
        pass: config.get('mongodb.database.pass'),
        dbName: config.get('mongodb.database.dbName'),
      }),
    }),
    UsersModule,
    GroupsModule,
    ExpansesModule,
    SplitsModule,
    CategoriesModule,
    CommentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
