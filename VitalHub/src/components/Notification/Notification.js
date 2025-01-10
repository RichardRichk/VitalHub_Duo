import * as Notifications from 'expo-notifications'

Notifications.requestPermissionsAsync();

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

export const Notification = ({title, body}) => {

    const handleNotification = async () => {

        const {status} = await Notifications.getPermissionsAsync();

        if (status !== "granted") {
            alert("Ative as notificacoes para continuar!")
        }

        await Notifications.scheduleNotificationAsync({
            content:{
                title: {title},
                body: {body},
            },
            trigger: null
        })

    }

}