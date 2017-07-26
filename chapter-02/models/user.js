'use strict';
module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define('User', {
        name: DataTypes.STRING,
        email: DataTypes.STRING
    }, {
        classMethods: {
            associate: function (models) {
                // 관계 정의는 여기서 한다.
                User.hasMany(models.Band);
            }
        }
    });
    return User;
};