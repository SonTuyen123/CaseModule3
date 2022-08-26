const BaseModel = require("./base.model");

class UserModel extends BaseModel {
    async findUser(data) {
        const sql = `SELECT * FROM users
                                WHERE email = '${data.email}' 
                                AND password = '${data.password}'`;
        return await this.querySQL(sql);
    }


}
module.exports = UserModel;