const pool = require('./dbCon');

const update_role_navigasi = (request, response) => {
    const id = parseInt(request.params.id)
    const {role_id} = request.body
    // select data first
    pool.query('SELECT * FROM tbl_users WHERE id=$1', [id],(error, results) => {
      if (error) {
        response.status(400).send({success:false,data: error})
        return;
      }
      if (results.rowCount >0){
        var update_time = new Date
        pool.query('UPDATE tbl_users set role_id=$1,updated_at=$2 WHERE id=$3', [role_id,update_time,id], (error, results) => {
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

  const read_user_role_access = (request, response) => {
    const id = parseInt(request.params.id)
    const {modul_id} = request.body

    var res = []
    var items = []

    pool.query('SELECT count(*) as total FROM masdex_users_role_access WHERE id=$1 AND modul_id=$2 AND is_delete=false',[id,modul_id], (error, results) => {
      if (error) {
        response.status(400).send({success:false,data: error})
        return;
      }
      res.push({total:results.rows[0].total})
      var sql=  'SELECT * FROM masdex_users_role_access WHERE id=$1 AND modul_id=$2 AND is_delete=false ORDER BY id ASC'
      pool.query(
       sql,[id,modul_id],
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


  const read_modul_role_access = (request, response) => {
    const id = parseInt(request.params.id)
    //const {modul_id} = request.body

    var res = []
    var items = []

    pool.query('SELECT count(*) as total FROM masdex_users_role_access WHERE modul_id=$1  AND is_delete=false',[id], (error, results) => {
      if (error) {
        response.status(400).send({success:false,data: error})
        return;
      }
      res.push({total:results.rows[0].total})
      var sql=  'SELECT * FROM masdex_users_role_access WHERE  modul_id=$1 AND is_delete=false ORDER BY id ASC'
      pool.query(
       sql,[id],
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

  const read_modul_role_access_by_modul_and_user_id = (request, response) => {
    const modul_id = parseInt(request.params.modul_id)
    const user_id = parseInt(request.params.user_id)
    //const {modul_id} = request.body

    var res = []
    var items = []

    pool.query('SELECT count(*) as total FROM masdex_users_role_access WHERE modul_id=$1 AND id=$2  AND is_delete=false',[modul_id, user_id], (error, results) => {
      if (error) {
        response.status(400).send({success:false,data: error})
        return;
      }
      res.push({total:results.rows[0].total})
      var sql=  'SELECT * FROM masdex_users_role_access WHERE modul_id=$1 AND id=$2  AND is_delete=false ORDER BY id ASC'
      pool.query(
       sql,[modul_id, user_id],
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

  const read_access_rights = (request, response) => {
    const user_id = parseInt(request.params.user_id)
    const url = request.query.url

    var res = []
    var items = []

    pool.query('SELECT count(*) as total FROM masdex_users_role_access WHERE id=$1 AND url=$2 AND is_delete=false',[user_id, url], (error, results) => {
      if (error) {
        response.status(400).send({success:false,data: error})
        return;
      }
      res.push({total:results.rows[0].total})
      var sql=  'SELECT * FROM masdex_users_role_access WHERE id=$1 AND url=$2 AND is_delete=false ORDER BY id ASC'
      pool.query(
       sql,[user_id, url],
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

  const update_role_stakeholder = (request, response) => {
    const id = parseInt(request.params.id)
    const {role_id} = request.body
    // select data first
    pool.query('SELECT * FROM tbl_user_stakeholder WHERE id=$1', [id],(error, results) => {
      if (error) {
        response.status(400).send({success:false,data: error})
        return;
      }
      if (results.rowCount >0){
        var update_time = new Date
        pool.query('UPDATE tbl_user_stakeholder set role_id=$1,updated_at=$2 WHERE id=$3', [role_id,update_time,id], (error, results) => {
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
  const read_user_stakeholder_role_access = (request, response) => {
    const id = parseInt(request.params.id)
    const {modul_id} = request.body

    var res = []
    var items = []

    pool.query('SELECT count(*) as total FROM masdex_users_stakeholder_role_access WHERE id=$1 AND modul_id=$2 AND is_delete=false',[id,modul_id], (error, results) => {
      if (error) {
        response.status(400).send({success:false,data: error})
        return;
      }
      res.push({total:results.rows[0].total})
      var sql=  'SELECT * FROM masdex_users_stakeholder_role_access WHERE id=$1 AND modul_id=$2 AND is_delete=false ORDER BY id ASC'
      pool.query(
       sql,[id,modul_id],
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

  const read_modul_stakeholder_role_access = (request, response) => {
    const id = parseInt(request.params.id)
    //const {modul_id} = request.body

    var res = []
    var items = []

    pool.query('SELECT count(*) as total FROM masdex_users_stakeholder_role_access WHERE modul_id=$1  AND is_delete=false',[id], (error, results) => {
      if (error) {
        response.status(400).send({success:false,data: error})
        return;
      }
      res.push({total:results.rows[0].total})
      var sql=  'SELECT * FROM masdex_users_stakeholder_role_access WHERE  modul_id=$1 AND is_delete=false ORDER BY id ASC'
      pool.query(
       sql,[id],
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
module.exports = {
    read_user_role_access,
    update_role_navigasi,
    read_user_stakeholder_role_access,
    update_role_stakeholder,
    read_modul_role_access,
    read_modul_stakeholder_role_access,
    read_modul_role_access_by_modul_and_user_id,
    read_access_rights

}