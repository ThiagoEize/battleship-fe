import Row from "./Row";

const Field = ({ field, handleCellClick, id, message }) => {
    return (
        <>
        <div id={id} className="field">
            {field.map((v, i) => (
                <Row
                    key={i}
                    row={v}
                    handleCellClick={
                        handleCellClick ? handleCellClick : () => {}
                    }
                />
            ))}
        </div>
        <div className="message">
            {message}
        </div>
        </>
    );
};

export default Field;
