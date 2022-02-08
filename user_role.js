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

  
module.exports = {

    update_role_navigasi,
    update_role_stakeholder,

}