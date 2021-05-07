import { useState } from "react";

const Calculator = () => {
    const [calculation, setCalculation] = useState("");
    const [result, setResult] = useState("");

    // Handle numbers and operators
    const handleKeys = (elem) => {
        if (elem === "=") {
            if ((result.slice(-1) === "/" || result.slice(-1) === "*" || result.slice(-1) === "-" || result.slice(-1) === "+")) {
                setCalculation(result.substring(0, result.length - 1));
                setResult(eval(result.substring(0, result.length - 1)));
            } else {
                setCalculation(result);
                setResult(eval(result).toString());
            }
            return;
        } else if ((result.slice(-1) === "/" || result.slice(-1) === "*" || result.slice(-1) === "-" || result.slice(-1) === "+") &&
                    (elem === "/" || elem === "*" || elem === "-" || elem === "+"))  {
            setResult(result.substring(0, result.length - 1) + elem);
            return;
        } else if ((elem === "/" || elem === "*" || elem === "-" || elem === "+") && result.length === 0)  {
            return;
        } else if ((elem === "/" || elem === "*" || elem === "-" || elem === "+") && result.length > 0) {
            setResult(prev => prev + elem);
        } else {
            setResult(prev => prev + elem);
        };
    };

    // Handle visuals for the calculator
    const handleVisuals = (elem) => {
        if (elem === "ac" || elem === "c") {
            setCalculation("");
            setResult("");
        }
    }

    return ( 
        <div className="calculator">
            <div className="display">
                <div className="calculation">{calculation}</div>
                {result.length > 7 ? <div className="result" style={{fontSize: `${3.5 - (result.length/10)}rem`}}>{result}</div> : <div className="result">{result}</div>}
            </div>
            <div className="divider"></div>
            <div className="keys">
                <div className="rows">
                    <div className="key sunny material-icons material-icons-outlined" onClick={() => {handleVisuals('sunny')}}>wb_sunny</div>
                    <div className="key ac" onClick={() => {handleVisuals('ac')}}>AC</div>
                    <div className="key c" onClick={() => {handleVisuals('c')}}>C</div>
                    <div className="operator division" onClick={() => {handleKeys('/')}}>/</div>
                </div>
                <div className="rows">
                    <div className="key 7" onClick={() => {handleKeys('7')}}>7</div>
                    <div className="key 8" onClick={() => {handleKeys('8')}}>8</div>
                    <div className="key 9" onClick={() => {handleKeys('9')}}>9</div>
                    <div className="operator multiply" onClick={() => {handleKeys('*')}}>*</div>
                </div>
                <div className="rows">
                    <div className="key 4" onClick={() => {handleKeys('4')}}>4</div>
                    <div className="key 5" onClick={() => {handleKeys('5')}}>5</div>
                    <div className="key 6" onClick={() => {handleKeys('6')}}>6</div>
                    <div className="operator minus" onClick={() => {handleKeys('-')}}>-</div>
                </div>
                <div className="rows">
                    <div className="key 1" onClick={() => {handleKeys('1')}}>1</div>
                    <div className="key 2" onClick={() => {handleKeys('2')}}>2</div>
                    <div className="key 3" onClick={() => {handleKeys('3')}}>3</div>
                    <div className="operator add" onClick={() => {handleKeys('+')}}>+</div>
                </div>
                <div className="rows">
                    <div className="key change material-icons material-icons-outlined" onClick={() => {handleVisuals('change')}}>change_circle</div>
                    <div className="key 0" onClick={() => {handleKeys('0')}}>0</div>
                    <div className="key dot" onClick={() => {handleKeys('.')}}>.</div>
                    <div className="operator equal" onClick={() => {handleKeys('=')}}>=</div>
                </div>
            </div>
        </div>
     );
}
 
export default Calculator;