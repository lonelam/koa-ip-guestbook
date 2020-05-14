import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as redis from 'redis';
const client = redis.createClient({ host: 'redis', port: 6379 });
const app = new Koa();
const router = new Router();

router.get('/guestbook/post',
  (ctx, next) => {
    console.log(ctx.ip);
    ctx.response.type = 'text';
    ctx.response.body = 'success'
  }
)

router.get('/guestbook/test',
  async (ctx, next) => {
    console.log(ctx.ip);
    ctx.response.type = 'text';
    ctx.response.body = `${ctx.ip}`;
  }
)

router.get('/guestbook/ip',
  (ctx, next) => {
    console.log(ctx.ip);
  }
)

app
  .use(router.routes())
  .use(router.allowedMethods());


app.listen(3000);