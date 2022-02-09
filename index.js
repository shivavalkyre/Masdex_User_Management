const express = require('express')
const bodyParser = require('body-parser')
const cors = require("cors");
const logger = require('morgan');
const path = require('path');
const fileUpload = require("express-fileupload");
const jwt = require('jsonwebtoken');


require('dotenv').config();
const PORT = process.env.PORT || 3002;
const base_url = process.env.base_url;

const app = express();
app.use(fileUpload());
app.use(express.json())// add this line
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())


app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin','*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
  
    // Pass to next layer of middleware
    next();
  });

app.use(cors())
app.use(logger('dev'));
app.use(express.json({
    limit: '50mb'
}));
app.use(express.urlencoded({
    extended: true,
    parameterLimit: 100000,
    limit: '50mb'
}));


// routing part
const dbRole = require('./role')
// =========================== Role ==========================================
    app.post('/api/V2/role_management/role',dbRole.create);
    app.get('/api/V2/role_management/role',dbRole.read);
    app.post('/api/V2/role_management/role/jenis',dbRole.read_by_jenis);
    app.put('/api/V2/role_management/role/:id',dbRole.update);
    app.delete('/api/V2/role_management/role/:id',dbRole.delete_);
// ===========================================================================
const dbModul = require('./modul')
// =========================== Role ==========================================
    app.post('/api/V2/role_management/modul',dbModul.create);
    app.get('/api/V2/role_management/modul',dbModul.read);
    app.put('/api/V2/role_management/modul/:id',dbModul.update);
    app.delete('/api/V2/role_management/modul/:id',dbModul.delete_);
// ===========================================================================
const dbMenus = require('./menu')
// =========================== Role ==========================================
    app.post('/api/V2/role_management/menu',dbMenus.create);
    app.get('/api/V2/role_management/menu',dbMenus.read);
    app.put('/api/V2/role_management/menu/:id',dbMenus.update);
    app.delete('/api/V2/role_management/menu/:id',dbMenus.delete_);
// ===========================================================================
const dbModulMenu = require('./modul_menu')
// =========================== Role ==========================================
    app.post('/api/V2/role_management/modul_menu',dbModulMenu.create);
    app.get('/api/V2/role_management/modul_menu',dbModulMenu.read);
    app.put('/api/V2/role_management/modul_menu/:id',dbModulMenu.update);
    app.delete('/api/V2/role_management/modul_menu/:id',dbModulMenu.delete_);
// ===========================================================================

const dbRoleModul = require('./role_modul')
// =========================== Role ==========================================
    app.post('/api/V2/role_management/role_modul',dbRoleModul.create);
    app.get('/api/V2/role_management/role_modul',dbRoleModul.read);
    app.put('/api/V2/role_management/role_modul/:id',dbRoleModul.update);
    app.delete('/api/V2/role_management/role_modul/:id',dbRoleModul.delete_);
// ===========================================================================


const dbRoleModulMenu = require('./role_modul_menu')
// =========================== Role ==========================================
    app.post('/api/V2/role_management/role_modul_menu',dbRoleModulMenu.create);
    app.get('/api/V2/role_management/role_modul_menu',dbRoleModulMenu.read);
    app.put('/api/V2/role_management/role_modul_menu/:id',dbRoleModulMenu.update);
    app.delete('/api/V2/role_management/role_modul_menu/:id',dbRoleModulMenu.delete_);
// ===========================================================================

const dbUserRole = require('./user_role')
// =========================== User Role ==========================================
app.put('/api/V2/role_management/user_role_navigasi/:id',dbUserRole.update_role_navigasi);
app.put('/api/V2/role_management/user_role_stakeholder/:id',dbUserRole.update_role_stakeholder);
// =================================================================================

const dbUser = require('./user')
// =============================== USER =====================================
app.post('/api/V1/masdex/user', dbUser.create);
app.get('/api/V1/masdex/user/all',dbUser.readall);
app.get('/api/V1/masdex/user/:id',dbUser.read_by_id);
app.patch('/api/V1/masdex/user/:id',dbUser.update);
app.delete('/api/V1/masdex/user/:id',dbUser.delete_);
// ==========================================================================
const dbUserStakeholder = require('./user_stakeholder')
// =============================== USER STAKEHOLDER =====================================
app.post('/api/V1/masdex/user_stakeholder', dbUserStakeholder.create);
app.get('/api/V1/masdex/user_stakeholder/profile/:id', dbUserStakeholder.detail_profile);
app.get('/api/V1/masdex/user_stakeholder/all',dbUserStakeholder.readall);

app.get('/api/V1/masdex/user_stakeholder/:id',dbUserStakeholder.read_by_id);
//app.post('/api/V1/masdex/user_stakeholder/login', user_stakeholder.read);
app.patch('/api/V1/masdex/user_stakeholder/:id',dbUserStakeholder.update);
app.delete('/api/V1/masdex/user_stakeholder/:id',dbUserStakeholder.delete_);
// ==========================================================================
// authentification part======================================================

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
  
    if (token == null) return res.sendStatus(401)
    try {
      const verified = jwt.verify(token, process.env.TOKEN_SECRET)
      req.user = verified
  
      next() // continuamos
  } catch (error) {
      res.status(400).json({error: 'token not valid'})
  }
  
  }

// ==============================================================================
app.get("/", (req, res) => {
    res.send({
        message: "🚀 API Masdex Role Management v2.0"
    });
});

app.listen(PORT, () => {
    console.log(`API listening on port ${PORT}`);
});