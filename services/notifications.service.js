const { findUserByToken } = require("./user.service")

exports.getNotifications = async function (token) {
    const userBd = await findUserByToken(token)
    return userBd.notificaciones;
}

exports.changeNotificationSeen = async function (idNotification, token) {
    const userBd = await findUserByToken(token)
    const notification = userBd.notificaciones.find(noti => noti._id = idNotification);
    notification.visto = !notification.visto
    userBd.save()
    return await notification
}