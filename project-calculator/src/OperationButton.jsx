import {ACTIONS}  from './App';

function OperationButton({setValues , operation}) {

    return(
        // type : 'add-digit'
        // palloade : conClick this / =/
    <button className='button' onClick={() => setValues({type: ACTIONS.CHOOSE_OPERATION, payload: {operation}}) }>
        {operation}
    </button>
    );
}

export default OperationButton;