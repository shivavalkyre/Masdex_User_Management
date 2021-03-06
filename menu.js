const pool = require('./dbCon');

const create = (request, response) => {
  const { menu, url, icon, is_main_menu, parent_id } = request.body;
  pool.query('INSERT INTO tbl_menus (menu,url,icon,is_main_menu,parent_id) VALUES ($1,$2,$3,$4,$5) RETURNING id', [menu, url, icon, is_main_menu, parseInt(parent_id)], (error, results) => {
    if (error) {
      if (error.code == '23505') {
        response.status(400).send({ success: false, data: 'Duplicate data' })
        return;
      } else {
        response.status(400).send({ success: false, data: error })
      }
    } else {
      response.status(200).send({ success: true, data: 'new data success inserted with id: ' + results.rows[0].id })
    }
  })
}

const read = (request, response) => {
  //const { id } = request.body
  const { page, rows } = request.body
  var page_req = page || 1
  var rows_req = rows || 3
  var offset = (page_req - 1) * rows_req
  var res = []
  var items = []
  pool.query('SELECT count(*) as total FROM tbl_menus WHERE is_delete=false', (error, results) => {
    if (error) {
      response.status(400).send({ success: false, data: error })
      return;
    }
    res.push({ total: results.rows[0].total })
    var sql = 'SELECT * FROM tbl_menus WHERE is_delete=false ORDER BY id ASC'
    pool.query(
      sql,
      (error, results) => {
        if (error) {
          response.status(400).send({ success: false, data: error })
        }
        items.push({ rows: results.rows })
        res.push(items)
        response.status(200).send({ success: true, data: res })
        //response.status(200).send(res)
      })
  })

}

const update = (request, response) => {
  const id = parseInt(request.params.id)
  const { menu, url, icon, is_main_menu, parent_id } = request.body
  // select data first
  pool.query('SELECT * FROM tbl_menus WHERE id=$1', [id], (error, results) => {
    if (error) {
      response.status(400).send({ success: false, data: error })
      return;
    }
    if (results.rowCount > 0) {
      var update_time = new Date
      pool.query('UPDATE tbl_menus set menu=$1,url=$2,icon=$3,updated_at=$4, is_main_menu=$6, parent_id=$7 WHERE id=$5', [menu, url, icon, update_time, id, is_main_menu, parseInt(parent_id)], (error, results) => {
        if (error) {
          response.status(400).send({ success: false, data: error })
          return;
        }
        response.status(200).send({ success: true, data: 'Update modul id: ' + id + ' success' })
      })
    } else {
      response.status(400).send({ success: false, data: 'Data not found' })
    }


  })

}


const delete_ = (request, response) => {
  const id = parseInt(request.params.id)
  //const {levelid} = request.body
  pool.query('SELECT * FROM tbl_menus WHERE id=$1', [id], (error, results) => {
    if (error) {
      response.status(400).send({ success: false, data: error })
      return;
    }

    if (results.rowCount > 0) {
      var delete_time = new Date
      //var level = results.rows[0].level
      //var modul = results.rows[0].modul
      ///console.log(level)
      ///console.log(modul)
      pool.query('UPDATE tbl_menus set deleted_at = $1 ,is_delete = $2  WHERE id = $3', [delete_time, true, id], (error1, results1) => {
        if (error1) {
          response.status(400).send({ success: false, data: error1 })
          return;
        }
        response.status(200).send({ success: true, data: 'Delete menu success' })
      })

    } else {
      response.status(400).send({ success: false, data: 'Data not found' })
    }
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

  pool.query('SELECT count(*) as total FROM tbl_menus where id=$1 and is_delete=false', [id], (error, results) => {
    if (error) {
      throw error
    }
    //console.log(results.rows[0].total)
    res.push({ total: results.rows[0].total })

    var sql = 'SELECT * FROM tbl_menus where id=$1'
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


module.exports = {

  create,
  read,
  update,
  delete_,
  read_by_id
}