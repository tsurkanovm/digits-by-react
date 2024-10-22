import {forwardRef, useRef, useImperativeHandle} from "react";
import {createPortal} from "react-dom";

type ResultModalProps = {
    timeResult: number;
    movesCount: number;
    onClose: () => void;
};

export type ResultModalHandle = {
    open: () => void;
};

const ResultModal = forwardRef<ResultModalHandle, ResultModalProps>(
    ({timeResult, movesCount, onClose}, ref) => {
        const dialog = useRef<HTMLDialogElement>(null);

        // api for this component ref
        useImperativeHandle(ref, () => ({
            open() {
                //dialog.current?.showModal(); // dialog.current theoretically can be null, in case <dialog ref={dialog} ...> not invoke yet
                dialog.current!.showModal(); // but we sure that it impossible, so mark it by "!"
            },
        }));

        // Ensure that the portal is rendered to an existing DOM element
        const modalRoot = document.getElementById('modal');
        if (!modalRoot) return null;

    // place to root, avoid all nesting
    return createPortal(
        <dialog ref={dialog} className='result-modal'>

            <p>You done {movesCount} moves by {timeResult} seconds</p>

            <form method='dialog' onSubmit={onClose}>
                <button type="submit">Close</button>
            </form>
        </dialog>,
        modalRoot
    );
});

export default ResultModal;
