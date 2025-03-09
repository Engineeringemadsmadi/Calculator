import { useReducer, usestate } from 'react';
import DigitButton from './DigitButton';
import OperationButton from './OperationButton';
import './App.css';

// ACTIONS is objetc include defintion the button in caclution
export const ACTIONS = {
    ADD_DIGIT: 'add-digit',
    CHOOSE_OPERATION: 'choose_operation',
    CLEAR: 'clear',
    DELETE_DIGIT: 'delete-digit',
    EVALUATE: 'evaluate',
}
// --------------- -------------------   state    --------------------------------------------------------------/
 // how the parmete switch between to compont as such  reducer(state , {type ,payload })
 // as such DigitButton({setValues ,* digit*}) {
 // * digit defin in compent DigitButton and use in compont App current*
 // * type , payload defin in compent App and use in compont DigitButton*
 // ==================> that is (state)
// ------------------------------------------------------------------------------------------//
function reducer(state , {type ,payload }) {       // ACTIONS   = > {type ,paloade}
    // the paremeter state here is refernc to value object useReducer the 3 [=>{}]
    // type to stored type operation and it setting in compant DigitButton and add to it value from obj ACTIONS form prop.. ADD_DIGIT
    // => type = 'add-digite'
    switch(type){
        case ACTIONS.ADD_DIGIT:
            if(state.overwrite){
                return {
                    ...state,
                    currentOperand: payload.digit,
                    overwrite: false,
                }
            }
            // payload.digit ==="0" is refurenc to button 0
            if(payload.digit === "0" && state.currentOperand === "0") return state;
            if(payload.digit === "." && state.currentOperand?.includes(".")) return state;
            console.log("hello 2",state);
            return {
                ...state,
                currentOperand: `${state.currentOperand || ""}${payload.digit}`, //payload.digit  'digit' retrun from propery compont DigitButton
                // and digit setting value currentOperand
            } 
        
        case ACTIONS.CHOOSE_OPERATION:
            if(state.currentOperand == null && state.previousOperand == null){
                console.log(state);
                return state;
            }

            if(state.currentOperand == null) {
                return{
                    ...state,
                    operation: payload.operation,
                }
            }

            if(state.previousOperand == null){
                return {
                    ...state,
                    operation: payload.operation,
                    previousOperand: state.currentOperand,
                    currentOperand: null,
                }
            }


            // if(state.currentOperand?.length > 1){
            //     console.log('Error,  you can not write more than one operater next to each other');
            //     return state;
            // }
            return {
                //payload.digit  'digit' retrun from propery compont DigitButton
                // and digit setting value currentOperand
                ...state,
                previousOperand: evaluate(state),
                operation: payload.operation,
                currentOperand: null,
            };

        case ACTIONS.CLEAR: 
            return {};          // this return {} object is empty return to function reducer 
                                // that return assign to switch assign to reducer
                                // return empty reducer is assign to useReducer seting to values it
        case ACTIONS.DELETE_DIGIT:
            if(state.overwrite){
                return {
                    ...state,
                    overwrite: false,
                    currentOperand: null,
                }
            }
            if(state.currentOperand == null) return state;
            if(state.currentOperand.length === 1){
                return {
                    ...state,
                    currentOperand: null,
                }
            }
            return {
                ...state,
                currentOperand: state.currentOperand.slice(0, -1)
            }
        
        case ACTIONS.EVALUATE:
            if(state.operation ==null || state.currentOperand ==null || state.previousOperand ==null){
                return state;
            }
            return {
                ...state,
                overwrite: true,
                previousOperand: null,
                operation: null,
                currentOperand: evaluate(state),
            }
        default:
            return;
    }
}
const evaluate = ({ currentOperand, previousOperand, operation}) =>{
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    //Cheeck value
    if (isNaN(prev) || isNaN(current)) return "";
    let computation ="";
    
    switch(operation){
        case "+":
            computation = prev + current;
            break;
        case "-":
            computation = prev - current;
            break;
        case "×":
            computation = prev * current;
            break;
        case "÷":
            computation = prev / current;
            break;
    }
    return computation.toString();
}
const INTEGER_FORMATIER = new Intl.NumberFormat("en-us",{
    maximumFractionDigits: 0,
})
function formatOperand(operand){
    if(operand == null) return;
    const [integer, decimal] = operand.split('.');
    if(decimal == null) return INTEGER_FORMATIER.format(integer);
    return `${INTEGER_FORMATIER.format(integer)}.${decimal}`;
}

// ------------------------------------------------------------------------------------------//
const App =_ => {
    // state => [=>{} ,] is objet include three value
    const [{ currentOperand, previousOperand, operation }, setValues] =useReducer(reducer, {});

    return(
        <>
            <h1 className=" d-flex justify-content-center align-items-center m-3">Calculator 
                create by Emad Alsmadi
            </h1>
            <div className="calculator d-flex justify-content-center align-items-center p-3 ">
                <div className="calculator-grid">
                    <div className="output d-flex flex-column align-items-end justify-content-around p-1 button">
                        <div className="previous-operand">
                            {formatOperand(previousOperand)} {operation}
                        </div>
                        {/*we put currentOperand here becuse us update it in function reducer and use it in switch case 1 and set it on*/}
                        <div className="current-operand">{formatOperand(currentOperand)}</div>
                    </div>
                    {/* ////////////////////////////////////////////////////////////////////////////////////////////// */}
                    <button  onClick={() => setValues({type: ACTIONS.CLEAR}) } className="span-two button">AC</button>

                    <button onClick={() => setValues({type: ACTIONS.DELETE_DIGIT}) } className='button'>DEL</button>

                    <OperationButton operation="÷" setValues={setValues} />

                    <DigitButton digit="1" setValues={setValues} />
                    <DigitButton digit="2" setValues={setValues} />
                    <DigitButton digit="3" setValues={setValues} />

                    <OperationButton operation="×" setValues={setValues} />
                    <DigitButton digit="4" setValues={setValues} />
                    <DigitButton digit="5" setValues={setValues} />
                    <DigitButton digit="6" setValues={setValues} />
                    
                    <OperationButton operation="+" setValues={setValues} />

                    <DigitButton digit="7" setValues={setValues} />
                    <DigitButton digit="8" setValues={setValues} />
                    <DigitButton digit="9" setValues={setValues} />
                    
                    <OperationButton operation="-" setValues={setValues} />

                    <DigitButton digit="." setValues={setValues} />
                    <DigitButton digit="0" setValues={setValues} />

                    <button className='span-two button' onClick={() =>setValues({type: ACTIONS.EVALUATE})}>=</button>
                </div>
            </div>
        </>
    );
}

export default App;