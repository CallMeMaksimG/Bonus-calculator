import './Info.scss';

function Info({ text, setShowInfo }) {
    return (
        <>
            <div className="overlay"></div>
            <div className="modal-info">
                <p className="modal-info__text">{text}</p>
                <button
                    onClick={() => setShowInfo(false)}
                    className="modal-info__button"
                >
                    Закрыть
                </button>
            </div>
        </>
    );
}

export default Info;
