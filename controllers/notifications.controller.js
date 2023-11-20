const NotificationsService = require("../services/notifications.service")

exports.getNotifications = async (req, res) => {
    const token = req.headers["x-access-token"];
    if (!token) {
        return res
            .status(401)
            .json({ status: 401, message: "Token no proporcionado" });
    }

    try {
        const notificaciones = await NotificationsService.getNotifications(token)
        return res.send(notificaciones)
    } catch (error) {
        return res.send("Error al procesar notificaciones")
    }
}

exports.changeNotificationSeen = async (req, res) => {
    const token = req.headers["x-access-token"];
    const idNotification = req.params["id"];
    if (!token) {
        return res
            .status(401)
            .json({ status: 401, message: "Token no proporcionado" });
    }
    try {
        const notification = await NotificationsService.changeNotificationSeen(idNotification, token)
        return res.status(200).send(notification)
    } catch (error) {
        console.log(error)
        return res.status(500).send({ msg: "Error al procesar notificaciones", error })
    }
}

exports.changeNotificationState = async (req, res) => {
    const token = req.headers["x-access-token"];
    const idNotification = req.params["id"];
    const { estado } = req.body
    console.log({ estado })
    if (estado != "Cancelado" && estado != "Aceptado") {
        return res.send("No existe el estado " + estado)
    }

    if (!token) {
        return res
            .status(401)
            .json({ status: 401, message: "Token no proporcionado" });
    }

    try {
        const notification = await NotificationsService.changeNotificationState(idNotification, token, estado)
        return res.send(notification)
    } catch (error) {
        console.log(error)
        return res.send({ msg: "Error al procesar notificaciones", error })
    }
}