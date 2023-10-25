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

exports.changeNotificationState = async (idNotification, token, state) => {
    const userBd = await findUserByToken(token)
    const notification = userBd.notificaciones.find(noti => noti._id = idNotification);
    if (!notification.visto) {
        notification.visto = true
    }
    const servicio = userBd.servicios.find(servicio => servicio._id == notification.idServicio)
    notification.estado = state


    if (notification.tipo == "Contacto") {
        if (notification.idContacto) {
            const contrato = servicio.contrataciones.find(contratacion => contratacion.idNotificacion == notification._id)
            contrato.estado = state
        } else {
            const contrato = { mail: notification.mail, motivo: notification.motivo, telefono: notification.telefono, horario: notification.horario, estado: state, idNotificacion: notification._id }
            servicio.contrataciones.push(contrato)
        }
    } else {
        if (notification.idServicio) {
            const comentario = servicio.comentarios.find(comentario => comentario.idNotificacion == notification._id)
            comentario.estado = state
            notification.estado = state
        } else {
            const comentario = { fecha: notification.fecha, calificacion: notification.calificacion, estado: state, idNotificacion: notification._id }
            servicio.comentarios.push(comentario)
        }
    }
    userBd.save()
    return await notification
}
