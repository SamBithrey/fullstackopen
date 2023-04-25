interface NotificationMessageProps {
    notification: string
}

const NotificationMessage = (props: NotificationMessageProps) => {

    if (props.notification === '') {
        return null;
    }
    return (
        <div>
            <p>{props.notification}</p>
        </div>
    );
};

export default NotificationMessage;