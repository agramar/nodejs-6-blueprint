'use strict';
module.exports = function (sequelize, DataTypes) {
    var Band = sequelize.define('Band', {
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        album: DataTypes.STRING,
        year: DataTypes.STRING,
        UserId: DataTypes.INTEGER
    }, {
        classMethods: {
            associate: function (models) {
                // 관계 정의는 여기서 한다.
                Band.belongsTo(models.User);
            }
        }
    });
    return Band;
};