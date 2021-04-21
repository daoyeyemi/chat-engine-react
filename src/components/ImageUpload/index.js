import { Modal } from "semantic-ui-react";

export const ImageUpload = ({
    file,
    close,
    onSubmit,
    crop = false
}) => {
    
    const [image, setImage] = useState("");
    const cropRef = useRef();

    useEffect(() => {
        const fileReader = new FileReader();
        fileReader.onload = () => setImage(fileReader.result);
        fileReader.readAsDataURL(file);
    }, [file]);

    return (
        <Modal dimmer="inverted" open={true}>
            <Modal.Header>Send image?</Modal.Header>
            <Modal.Content>

            </Modal.Content>
            <Modal.Actions>
                <div className="image-upload-actions">
                    <button className="cancel">
                        Cancel
                    </button>
                    <button 
                        className="submit"
                        onClick={() => {
                            if (crop && cropRef) {
                                const canvas = cropRef
                            } else {

                            }
                        }}>Upload</button>
                </div>
            </Modal.Actions>
        </Modal>
    )
}