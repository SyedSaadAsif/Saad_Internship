import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

import { useToast } from "../context/ToastContext";

function NotificationToast() {

    const {

        toast,

        hideToast

    } = useToast();

    return (

        <ToastContainer
            position="top-end"
            className="p-3"
        >

            <Toast

                bg={toast.variant}

                show={toast.show}

                delay={3000}

                autohide

                onClose={hideToast}

            >

                <Toast.Header>

                    <strong className="me-auto">

                        Notification

                    </strong>

                </Toast.Header>

                <Toast.Body className="text-white">

                    {toast.message}

                </Toast.Body>

            </Toast>

        </ToastContainer>

    );

}

export default NotificationToast;