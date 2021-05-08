import { useState } from "react";

const Calculator = () => {
    const [background, setBackground] = useState("sunny");
    const [calculation, setCalculation] = useState("");
    const [result, setResult] = useState("");
    const [selectedTheme, setSelectedTheme] = useState(0);
    const [theme, setTheme] = useState([{
        "--cal-background": "#FFBB41",
        "--display": "#FCEBD8",
        "--divider": "#FCEBD8",
        "--keys": "#FCEBD8",
        "--keys-hover": "#fce1c3",
        "--operators": "#955015",
        "--operators-hover": "#be6416",
        "--equal": "#955015",
        "--equal-hover": "#ad5d18"
    },
    {
        "--cal-background": "#FFFFFF",
        "--display": "#2D414A",
        "--divider": "#2A3E47",
        "--keys": "#5D6C73",
        "--keys-hover": "#212627",
        "--operators": "#FF6945",
        "--operators-hover": "#f83200",
        "--equal": "#FF6945",
        "--equal-hover": "#ff5b32"
    },
    {
        "--cal-background": "#2D4049",
        "--display": "#E0D9CA",
        "--divider": "#E0D9CA",
        "--keys": "#E0D9CA",
        "--keys-hover": "#fadfa5",
        "--operators": "#AA5745",
        "--operators-hover": "#d85d41",
        "--equal": "#AA5745",
        "--equal-hover": "#c96a17"
    }]);

    // Handle numbers and operators
    const handleKeys = (elem) => {
        if (elem === "=") {
            if ((result.slice(-1) === "/" || result.slice(-1) === "*" || result.slice(-1) === "-" || result.slice(-1) === "+")) {
                setCalculation(result.substring(0, result.length - 1));
                setResult(eval(result.substring(0, result.length - 1)).toString());
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
        };

        if (elem === "sunny") {
            if (background === "sunny") {
                setBackground("dark");
                document.querySelector(".sunny").innerHTML = "wb_sunny";
                document.body.style.background = "#272727";
            } else {
                setBackground("sunny");
                document.querySelector(".sunny").innerHTML = "dark_mode";
                document.body.style.background = "#FCF5ED";
            };
        };

        if (elem === "change") {
            let root = document.querySelector(":root");
            for (const key in theme[selectedTheme]) {
                root.style.setProperty(key, theme[selectedTheme][key]);
            };

            if (selectedTheme < 2) {
                setSelectedTheme(prev => prev + 1);
            } else {
                setSelectedTheme(0);
            }
        };
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
                    <div className="key sunny material-icons material-icons-outlined" onClick={() => {handleVisuals('sunny')}}>dark_mode</div>
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
                    <div className="equal" onClick={() => {handleKeys('=')}}>=</div>
                </div>
            </div>
        </div>
     );
}
 
export default Calculator;