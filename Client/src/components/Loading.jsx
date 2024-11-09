const Loading = () => {
    return (
        <div className="text-center">
            <div 
                className="spinner-border" 
                role="status" 
                style={{ color: 'yellow', width: '4rem', height: '4rem', marginTop:"10rem" }} 
            >
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );
}

export default Loading;
