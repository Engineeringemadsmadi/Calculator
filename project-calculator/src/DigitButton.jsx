import {ACTIONS}  from './App';

export default function DigitButton({setValues , digit}) {

    return(
        // type : 'add-digit'
        // palloade : conClick this / =/
    <button className='button' onClick={() => setValues({type: ACTIONS.ADD_DIGIT, payload: {digit}}) }>
        {digit}
    </button>
    );
}