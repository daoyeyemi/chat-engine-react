export const RailHeader = () => {
    const chatConfig = useChat().chatConfig;
    const resolvedConfig = useResolved(chatConfig);
    const inputRef = useRef(null);
    const [picture, setPicture] = useState();

    const onFileAttach = file => {
        setImage(file)
    };

    return (
        <>
        <input 
            className="file-input"
            type="file"
            ref={inputRef}
            onChange={event => {
                const doc = event.target?.files?.[0]
                if (doc) {
                    onFileAttach(doc);
                }
            }}
        />
        <div className="left-rail-header">
            <div className="current-user-info">
                
            </div>
        </div>
        </>
         

         
    )
}