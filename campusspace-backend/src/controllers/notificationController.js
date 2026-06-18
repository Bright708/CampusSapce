import {
    getUserNotificationsService,
    markNotificationReadService,
} from "../services/notificationService.js";

export const getNotifications = async (req, res) => {
  try {
    const notifications = await getUserNotificationsService(req.user.id);

    res.status(200).json({
      success: true,
      notifications,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const markNotificationRead = async (req, res) => {
  try {
    const notification = await markNotificationReadService(req.params.id);

    res.status(200).json({
      success: true,
      notification,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
