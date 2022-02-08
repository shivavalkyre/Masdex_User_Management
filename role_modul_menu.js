const pool = require('./dbCon');

const create = (request, response) => {
    const {role_modul_id,menu_id,allow_view,allow_create,allow_read,allow_update,allow_delete} = request.body;
    pool.query('INSERT INTO tbl_role_modul_menu (role_modul_id,menu_id,allow_view,allow_create,allow_read,allow_update,allow_delete) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING id', [role_modul_id,menu_id,allow_view,allow_create,allow_read,allow_update,allow_delete], (error, results) => {
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
    pool.query('SELECT count(*) as total FROM tbl_role_modul_menu WHERE is_delete=false', (error, results) => {
      if (error) {
        response.status(400).send({success:false,data: error})
        return;
      }
      res.push({total:results.rows[0].total})
      var sql=  'SELECT * FROM tbl_role_modul_menu WHERE is_delete=false ORDER BY id ASC'
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

const update = (request, response) => {
    const id = parseInt(request.params.id)
    const {role_modul_id,menu_id,allow_view,allow_create,allow_read,allow_update,allow_delete} = request.body
    // select data first
    pool.query('SELECT * FROM tbl_role_modul_menu WHERE id=$1', [id],(error, results) => {
      if (error) {
        response.status(400).send({success:false,data: error})
        return;
      }
      if (results.rowCount >0){
        var update_time = new Date
        pool.query('UPDATE tbl_role_modul_menu set role_modul_id=$1,menu_id=$2,allow_view=$3,allow_create=$4,allow_read=$5,allow_update=$6,allow_delete=$7,updated_at=$8 WHERE id=$9', [role_modul_id,menu_id,allow_view,allow_create,allow_read,allow_update,allow_delete,update_time,id], (error, results) => {
          if (error) {
            response.status(400).send({success:false,data: error})
            return;
          }
          response.status(200).send({success:true,data:'Update role modul menu id: '+ id+ ' success'})
      })
      }else{
          response.status(400).send({success:false,data:'Data not found'})
      }
      
  
  })
   
  }

  
  const delete_ = (request, response) => {
    const id = parseInt(request.params.id)
    //const {levelid} = request.body
    pool.query('SELECT * FROM tbl_role_modul_menu WHERE id=$1', [id],(error, results) => {
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
        pool.query('UPDATE tbl_role_modul_menu set deleted_at = $1 ,is_delete = $2  WHERE id = $3', [delete_time,true,id] ,(error1, results1) => {
          if (error1) {
            response.status(400).send({success:false,data: error1})
            return;
          }
          response.status(200).send({success:true,data:'Delete role modul menu success'})
      })

      }else{
        response.status(400).send({success:false,data:'Data not found'})
      }
    })
   
  }


module.exports = {

    create,
    read,
    update,
    delete_
}