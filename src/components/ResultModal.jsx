import {forwardRef, useRef, useImperativeHandle} from "react";
import {createPortal} from "react-dom";

const ResultModal = forwardRef( // why is forwardRef????
    function ResultModal({timeResult, movesCount, onClose}, ref) {
    const dialog = useRef();

    // api for this component ref
    useImperativeHandle(
        ref,
        () => {
            return {
                open() {
                    dialog.current.showModal();
                }
            }
        },
    );

    // place to root, avoid all nesting
    return createPortal(
        <dialog ref={dialog} className='result-modal'>

            <p>You done {movesCount} moves by {timeResult} seconds</p>

            <form method='dialog' onSubmit={onClose}>
                <button>Close</button>
            </form>
        </dialog>,
        document.getElementById('modal')
    );
});

export default ResultModal;
