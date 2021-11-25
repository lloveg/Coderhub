const service = require('../service/comment.service');

class CommentController {
  async create(ctx, next) {
    const { momentId, content } = ctx.request.body;
    const { id } = ctx.user;

    const result = await service.create(momentId, content, id);
    // console.log(result);
    ctx.body = result;
    // ctx.body = "发表评论成功~" + momentId + content + id;
  }

  async reply(ctx, next) {
    const { momentId, content } = ctx.request.body;
    const { commentId } = ctx.params;
    const { id } = ctx.user;

    const result = await service.reply(momentId, content, commentId, id);
    ctx.body = result;
    // ctx.body = "回复评论成功~"
  }

  async update(ctx, next) {
    const { commentId } = ctx.params;
    const { content } = ctx.request.body;

    const result = await service.update(commentId, content);
    ctx.body = result;
    // ctx.body = "修改评论" + commentId + content;
  }

  async remove(ctx, next) {
    const { commentId } = ctx.params;

    const result = await service.remove(commentId);
    ctx.body = result;
    // ctx.body = "删除评论" + commentId;
  }

  async list(ctx, next) {
    const { momentId } = ctx.query;

    const result = await service.getCommentsByMomentId(momentId);
    ctx.body = result;
  }
}

module.exports = new CommentController();