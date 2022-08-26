const fs = require("fs");
const qs = require('qs');
const  UserModel = require('../model/user.model')
const cookie = require('cookie');

class  AuthController{
    UserModel;
    constructor(){
        this.UserModel = new UserModel();
    }

    showHomePage(req, res){
        fs.readFile('./views/template/index.html', 'utf8', (err, data) => {
            res.writeHead(200, { 'Content-Type': 'text/html'});
            res.write(data);
            res.end();
        })
    }
    showFormLogin(req,res){
        //lay cookie tu header req
        let cookieUserLogin = {
            email: '',
            password: ''
        }
        if(req.headers.cookie){
            let cookies = cookie.parse(req.headers.cookie);
            if (cookies && cookies.user){
                cookieUserLogin = JSON.parse(cookies.user);
            }
        }
        fs.readFile('./views/template/login.html', 'utf8', (err, data) => {
            data = data.replace('{email}', cookieUserLogin.email);
            data = data.replace('{password}', cookieUserLogin.password);
            res.writeHead(200, { 'Content-Type': 'text/html'});
            res.write(data);
            res.end();
        })
    }
    login(req, res){
        console.log(1)
        let data = '';
        req.on('data',chunk => data += chunk);
        req.on('end', async () => {
            let dataForm = qs.parse(data);
            let result = await this.UserModel.findUser(dataForm)
            console.log(dataForm)
            console.log(result)
            //tao cookie
            const setCookie = cookie.serialize('user',JSON.stringify(dataForm));
            //tao session
            let sessionLogin = {
                email: dataForm.email,
                password: dataForm.password
            }
            //ghi session vào file
            let nameFile = Date.now()
            let dataSession = JSON.stringify(sessionLogin)

            //gui cookie ve cho trinh duyet
            res.setHeader('Set-Cookie',setCookie);

            if (result.length > 0) {
                fs.writeFileSync('./session/' + nameFile + '.txt', dataSession)
                res.writeHead(301, {'Location': '/'});
                res.end()
            }else {
                res.writeHead(301, {'Location': '/login'});
                res.end();
            }

        })
    }


}
module.exports = AuthController;