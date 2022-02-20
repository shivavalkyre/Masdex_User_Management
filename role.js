const pool = require('./dbCon');

const create = (request, response) => {
    const {role,jenis,level} = request.body;
    pool.query('INSERT INTO tbl_role (role,jenis,level) VALUES ($1,$2,$3) RETURNING id', [role,jenis,level], (error, results) => {
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
    pool.query('SELECT count(*) as total FROM tbl_role WHERE is_delete=false', (error, results) => {
      if (error) {
        response.status(400).send({success:false,data: error})
        return;
      }
      res.push({total:results.rows[0].total})
      var sql=  'SELECT * FROM tbl_role WHERE is_delete=false ORDER BY id ASC'
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

const read_by_id = (request, response) => {

  const id = parseInt(request.params.id);

  const { page, rows } = request.body
  var page_req = page || 1
  var rows_req = rows || 10
  var offset = (page_req - 1) * rows_req
  var res = []
  var items = []

  pool.query('SELECT count(*) as total FROM tbl_role where id=$1 and is_delete=false', [id], (error, results) => {
      if (error) {
          throw error
      }
      //console.log(results.rows[0].total)
      res.push({ total: results.rows[0].total })

      var sql = 'SELECT * FROM tbl_role where id=$1'
      pool.query(sql, [id], (error, results) => {
          if (error) {
              throw error
          }
          items.push({ rows: results.rows })
          res.push(items)
          response.status(200).send({ success: true, data: res })
      })

  })

}

const read_by_modul = (request, response) => {
  const modul_id = parseInt(request.params.id)
    const {page,rows} = request.body
    var page_req = page || 1
    var rows_req = rows || 3
    var offset = (page_req - 1) * rows_req
    var res = []
    var items = []
    pool.query('SELECT count(*) as total FROM read_role_by_modul WHERE modul_id=$1',[modul_id], (error, results) => {
      if (error) {
        response.status(400).send({success:false,data: error})
        return;
      }
      res.push({total:results.rows[0].total})
      var sql=  'SELECT * FROM read_role_by_modul WHERE modul_id=$1 ORDER BY role_id ASC'
      pool.query(
       sql,[modul_id],
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

const read_by_jenis = (request, response) => {
  const { jenis } = request.body
  const {page,rows} = request.body
  var page_req = page || 1
  var rows_req = rows || 3
  var offset = (page_req - 1) * rows_req
  var res = []
  var items = []
  pool.query('SELECT count(*) as total FROM tbl_role WHERE jenis=$1 AND is_delete=false',[jenis], (error, results) => {
    if (error) {
      response.status(400).send({success:false,data: error})
      return;
    }
    res.push({total:results.rows[0].total})
    var sql=  'SELECT * FROM tbl_role WHERE jenis=$1 AND is_delete=false ORDER BY id ASC'
    pool.query(
     sql,[jenis],
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

const update = (request, response) => {
    const id = parseInt(request.params.id)
    const {role,jenis,level} = request.body
    // select data first
    pool.query('SELECT * FROM tbl_role WHERE id=$1', [id],(error, results) => {
      if (error) {
        response.status(400).send({success:false,data: error})
        return;
      }
      if (results.rowCount >0){
        var update_time = new Date
        pool.query('UPDATE tbl_role set role=$1,jenis=$2,level=$3,updated_at=$4 WHERE id=$5', [role,jenis,level,update_time,id], (error, results) => {
          if (error) {
            response.status(400).send({success:false,data: error})
            return;
          }
          response.status(200).send({success:true,data:'Update role id: '+ id+ ' success'})
      })
      }else{
          response.status(400).send({success:false,data:'Data not found'})
      }
      
  
  })
   
  }

  
  const delete_ = (request, response) => {
    const id = parseInt(request.params.id)
    //const {levelid} = request.body
    pool.query('SELECT * FROM tbl_role WHERE id=$1', [id],(error, results) => {
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
        pool.query('UPDATE tbl_role set deleted_at = $1 ,is_delete = $2  WHERE id = $3', [delete_time,true,id] ,(error1, results1) => {
          if (error1) {
            response.status(400).send({success:false,data: error1})
            return;
          }
          response.status(200).send({success:true,data:'Delete role success'})
      })

      }else{
        response.status(400).send({success:false,data:'Data not found'})
      }
    })
   
  }


module.exports = {

    create,
    read,
    read_by_jenis,
    read_by_id,
    read_by_modul,
    update,
    delete_
}