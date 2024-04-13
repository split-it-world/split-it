import { Module } from "@nestjs/common";
import { ExpansesService } from "./expanses.service";
import { ExpansesController } from "./expanses.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Expanse, ExpanseSchema } from "./schemas/expanse.schema";
import { Comment, CommentSchema } from "./schemas/comment.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Expanse.name,
        schema: ExpanseSchema,
      },
      {
        name: Comment.name,
        schema: CommentSchema,
      }
    ]),
  ],
  providers: [ExpansesService],
  controllers: [ExpansesController],
})
export class ExpansesModule {}
