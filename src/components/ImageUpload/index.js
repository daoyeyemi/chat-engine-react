import { Modal } from "semantic-ui-react";
import AvatarEditor from "react-avatar-editor";

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
            {crop ? (
                <AvatarEditor 
                    ref={cropRef}
                    width={175}
                    height={175}
                    border={50}
                    image={image}
                />
            ) : (
                <Image size="medium" src={image} />
            )}
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
                                const canvas = cropRef.current.getImageScaledToCanvas().toDataURL();
                            fetch(canvas).then(res => res.blob()).then(b => onSubmit(b));
                            } else {
                                onSubmit();
                            }
                        }}>Upload</button>
                </div>
            </Modal.Actions>
        </Modal>
    );
};