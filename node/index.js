const Koa = require('koa');
const mysql = require('koa-mysql');
const KoaRouter = require('koa-router');
const db = mysql.createPool({user: 'fortressdbman', password: 'L0s4BerPNrkbKlE_', database: 'fortressexplore', host: 'localhost'});
const app = new Koa();
const router = new KoaRouter();

// x-response-time

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

// logger

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}`);
});



/*app.use(function*(){
  try{
    // Execute a sample query (with params)
       var rows = yield db.query("select * from T_Planets");

       // Output test result (3)
       this.body = { test: rows };
  }
  catch(err){
    this.status=500;
    this.body = { error: err };
  }
});*/

router
  .get('/planets', async (ctx) =>{
    //GET PLANETS
      planets(ctx);
  });
  /*.get('/planets/:id', ctx =>{
    //GET PLANET BY ID
    try{
      var rows =  db.query("select * from T_Planets where id = ?",[ctx.params.id]);
      ctx.body = rows;
    }
    catch(err){
      ctx.status=500;
      ctx.body={error:err};
    }
  })
  .get('/flyto/:id', ctx =>{
    //FLY TO A PLANET TODO:update this to post
    try{
      ctx.body={flyto:ctx.params.id}
    }
    catch(err){
      ctx.status=500;
      ctx.body={error:err};
    }
  });*/

function* planets(ctx){
  try{
    var rows = yield db.query("select * from T_Planets");
    console.log("rows:"+rows);
    ctx.body=rows;
  }
  catch(err){
    ctx.status=500;
    ctx.body={error:err};
  }
}

app.use(router.routes());//.use(router.allowedMethods())

// response

//app.use(async ctx => {
  //ctx.body = 'Hello World';
//});

app.listen(3000);
