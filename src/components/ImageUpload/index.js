import { Modal } from "semantic-ui-react";

export const ImageUpload = () => {
    const [image, setImage] = useState("");
    const crop = useRef();

    return (
        <Modal>
            <Modal.Header>Send this message?</Modal.Header>
            <Modal.Content>

            </Modal.Content>
            <Modal.Actions>

            </Modal.Actions>
        </Modal>
    )
}