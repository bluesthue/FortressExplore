const express =  require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");

const app = express();
const port = process.env.por || 3000;
const router= express.Router();

const conn=mysql.createPool({
   host: 'localhost',
   user: 'fortressdbman',
   password: 'L0s4BerPNrkbKlE_',
   database: 'fortressexplore'
});


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use("/api/v1/",router);

router.get("/planets",function(req,res){
  conn.getConnection(function(err){
    if(err) throw err;
    conn.query("select * from T_Planets",function(err,result,fields){
      if(err) throw err;
      res.send(JSON.stringify({
        "status":200,
        "error":err,
        "response":result
      }));
    });
  });
});
router.get("/planets/:id",function(req,res){
  conn.getConnection(function(err){
    if(err) throw err;
    conn.query("SELECT * FROM T_Planets WHERE id = ?", req.params.id ,function(err,result,fields){
        if(err) throw err;
        res.send(JSON.stringify({
          "status":200,
          "error":err,
          "response":result
        }));
    });
  });
})
;


app.listen(port, function(){
  console.log("Ready on port %d",port);
});
