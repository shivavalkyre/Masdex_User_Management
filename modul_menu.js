const pool = require('./dbCon');

const create = (request, response) => {
    const {modul_id,menu_id} = request.body;
    pool.query('INSERT INTO tbl_modul_menu (modul_id,menu_id) VALUES ($1,$2) RETURNING id', [modul_id,menu_id], (error, results) => {
        if (error) {
          if (error.code == '23505')
          {
              response.status(400).send({success:false,data:'Duplicate data'})
              return;
          }else{
              response.status(400).send({success:false,data:error})
          }
        }  else{
            response.status(200).send({success:true,data: 'new data success inserted with id: '+ results.rows[0].id})
        } 
})
}

const read = (request, response) => {
    //const { id } = request.body
    const {page,rows} = request.body
    var page_req = page || 1
    var rows_req = rows || 3
    var offset = (page_req - 1) * rows_req
    var res = []
    var items = []
    pool.query('SELECT count(*) as total FROM tbl_modul_menu WHERE is_delete=false', (error, results) => {
      if (error) {
        response.status(400).send({success:false,data: error})
        return;
      }
      res.push({total:results.rows[0].total})
      var sql=  'SELECT * FROM tbl_modul_menu WHERE is_delete=false ORDER BY id ASC'
      pool.query(
       sql,
        (error, results) => {
          if (error) {
            response.status(400).send({success:false,data:error})
          }
          items.push({rows:results.rows})
          res.push(items)
          response.status(200).send({success:true,data:res})
          //response.status(200).send(res)
        })
    })
    
}

const read_by_modul_id = (request, response) => {
  //const { id } = request.body
  const id = parseInt(request.params.id);
  const {page,rows} = request.body
  var page_req = page || 1
  var rows_req = rows || 3
  var offset = (page_req - 1) * rows_req
  var res = []
  var items = []
  pool.query('SELECT count(*) as total FROM tbl_modul_menu WHERE is_delete=false', (error, results) => {
    if (error) {
      response.status(400).send({success:false,data: error})
      return;
    }
    res.push({total:results.rows[0].total})
    var sql=  'SELECT tbl_modul_menu.id, tbl_modul_menu.modul_id, tbl_menus.menu, tbl_modul_menu.menu_id FROM tbl_modul_menu JOIN tbl_menus ON tbl_menus.id = tbl_modul_menu.menu_id WHERE tbl_modul_menu.is_delete=false AND tbl_modul_menu.modul_id = $1 ORDER BY tbl_modul_menu.id ASC'
    pool.query(
     sql, [id], (error, results) => {
        if (error) {
          response.status(400).send({success:false,data:error})
        }
        items.push({rows:results.rows})
        res.push(items)
        response.status(200).send({success:true,data:res})
        //response.status(200).send(res)
      })
  })
  
}

const update = (request, response) => {
    const id = parseInt(request.params.id)
    const {modul_id,menu_id} = request.body
    // select data first
    pool.query('SELECT * FROM tbl_modul_menu WHERE id=$1', [id],(error, results) => {
      if (error) {
        response.status(400).send({success:false,data: error})
        return;
      }
      if (results.rowCount >0){
        var update_time = new Date
        pool.query('UPDATE tbl_modul_menu set modul_id=$1,menu_id=$2,updated_at=$3 WHERE id=$4', [modul_id,menu_id,update_time,id], (error, results) => {
          if (error) {
            response.status(400).send({success:false,data: error})
            return;
          }
          response.status(200).send({success:true,data:'Update modul menu id: '+ id+ ' success'})
      })
      }else{
          response.status(400).send({success:false,data:'Data not found'})
      }
      
  
  })
   
  }

  
  const delete_ = (request, response) => {
    const id = parseInt(request.params.id)
    //const {levelid} = request.body
    pool.query('SELECT * FROM tbl_modul_menu WHERE id=$1', [id],(error, results) => {
      if (error) {
        response.status(400).send({success:false,data: error})
        return;
      }
      
      if (results.rowCount >0){
        var delete_time = new Date
        //var level = results.rows[0].level
        //var modul = results.rows[0].modul
        ///console.log(level)
        ///console.log(modul)
        pool.query('UPDATE tbl_modul_menu set deleted_at = $1 ,is_delete = $2  WHERE id = $3', [delete_time,true,id] ,(error1, results1) => {
          if (error1) {
            response.status(400).send({success:false,data: error1})
            return;
          }
          response.status(200).send({success:true,data:'Delete modul menu success'})
      })

      }else{
        response.status(400).send({success:false,data:'Data not found'})
      }
    })
   
  }


module.exports = {

    create,
    read,
    read_by_modul_id,
    update,
    delete_
}