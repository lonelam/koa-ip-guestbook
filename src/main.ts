console.log('koa-ip-questbook startd!');
import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as koaBody from 'koa-body';
import * as logger from 'koa-logger';
const app = new Koa();
const router = new Router();
let latestPostedIp: string = '';
let latestPostedText: string = '';
app.use(logger());
app.use(koaBody());

router.get('/guestbook/post',
  (ctx, next) => {
    latestPostedIp = ctx.headers['x-forwarded-for'];
    ctx.response.type = 'text';
    ctx.response.body = 'success'
  }
)

router.post('/guestbook/post',
  (ctx, next) => {
    latestPostedIp = ctx.headers['x-forwarded-for'];
    latestPostedText = ctx.request.body.text ?? ctx.request.body;
    ctx.response.type = 'text';
    ctx.response.body = 'success: ' + latestPostedText;
  }
)

router.get('/guestbook/test',
  async (ctx, next) => {
    ctx.response.type = 'text';
    ctx.response.body = `${ctx.ip}`;
  }
)

router.get('/guestbook/ip',
  (ctx, next) => {
    ctx.response.type = 'text';
    ctx.response.body = latestPostedIp;
  }
)

router.get('/guestbook/text',
  (ctx, next) => {
    ctx.response.type = 'text';
    ctx.response.body = latestPostedText;
  }
)

app
  .use(router.routes())
  .use(router.allowedMethods());


app.listen(3000);