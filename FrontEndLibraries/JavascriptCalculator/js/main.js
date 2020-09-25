//----REACTJS - JAVASCRIPT CALCULATOR----//


//----REACT JSX----//

const Display = (props) => {
    return (
        <div class="row">
                <div class="col-md-12" id="display">{props.result}</div>
        </div>
    );
}

const PreviewDisplay = (props) => {
    return (
        <div class="row">
                <div class="col-md-12" id="preview">{props.expression}</div>
        </div>
    );
}

const Keypad = (props) => {
    return(
        <div>
            <div class="row">
                <button 
                    class="col-md-6 op ac" 
                    id="clear" 
                    onClick={props.clearScreen}
                    value="">AC
                </button>

                <button 
                    class="col-md-3 op" 
                    id="divide" 
                    onClick={props.enterDigit}
                    value="/">/
                </button>

                <button 
                    class="col-md-3 op" 
                    id="multiply" 
                    onClick={props.enterDigit}
                    value="*">*
                </button>
            </div>

            <div class="row">
                <button 
                    class="col-md-3 digit" 
                    id="one" 
                    onClick={props.enterDigit}
                    value="1">1
                </button>

                <button 
                    class="col-md-3 digit" 
                    id="two" 
                    onClick={props.enterDigit}
                    value="2">2
                </button>

                <button 
                    class="col-md-3 digit" 
                    id="three" 
                    onClick={props.enterDigit}
                    value="3">3
                </button>

                <button 
                    class="col-md-3 op" 
                    id="subtract" 
                    onClick={props.enterDigit}
                    value="-">-
                </button>              
            </div>

            <div class="row">
                <button 
                    class="col-md-3 digit" 
                    id="four" 
                    onClick={props.enterDigit}
                    value="4">4
                </button>

                <button 
                    class="col-md-3 digit" 
                    id="five" 
                    onClick={props.enterDigit}
                    value="5">5
                </button>

                <button 
                    class="col-md-3 digit" 
                    id="six" 
                    onClick={props.enterDigit}
                    value="6">6
                </button>

                <button 
                    class="col-md-3 op" 
                    id="add" 
                    onClick={props.enterDigit}
                    value="+">+
                </button>
            </div>

            <div class="row">
                <button 
                    class="col-md-3 digit" 
                    id="seven" 
                    onClick={props.enterDigit}
                    value="7">7
                </button>

                <button 
                    class="col-md-3 digit" 
                    id="eight" 
                    onClick={props.enterDigit}
                    value="8">8
                </button>

                <button 
                    class="col-md-3 digit" 
                    id="nine" 
                    onClick={props.enterDigit}
                    value="9">9
                </button>

                <button 
                    class="col-md-3 dot" 
                    id="decimal" 
                    onClick={props.enterDigit}
                    value=".">.
                </button>
            </div>

            <div class="row">
                <button 
                    class="col-md-8" 
                    id="zero" 
                    onClick={props.enterDigit}
                    value="0">0
                </button>  

                <button 
                    class="col-md-4 op equal" 
                    id="equals" 
                    onClick={props.calculateResult}
                    value="=">=
                </button>
            </div>
        </div>
    );
}

//----CUSTOM REACT COMPONENTS----//

class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {            
            result: "0",
            expression: "0"
        }
        this.enterDigitHandler = this.enterDigitHandler.bind(this);
        this.clearScreenHandler = this.clearScreenHandler.bind(this);
        this.calculateResultHandler = this.calculateResultHandler.bind(this);
    }

    // Live digit input
    enterDigitHandler = (event) => {        
        if (this.state.result != "0") { 
                this.setState({
                    // ! NOTE - Fails Test 15 because it does not check input 
                    // live, but after calculating the expression - not sure how to check live
                    // at this time, but the result is always correct
                    result: this.state.result + event.target.value,
                    expression: this.state.expression + event.target.value
                });                                 
        }

        else {
            this.setState({
                result: event.target.value,
                expression: event.target.value
            });
        }       
    }

    // Screen clearing
    clearScreenHandler = () => {
        this.setState({
            result: "0",
            expression: "0"
        });
    }

    // Result evaluation
    calculateResultHandler = () => {     
            this.setState({
                result: eval(calculateMathExpression(this.state.result)),
                expression: eval(calculateMathExpression(this.state.expression))
            });         
    }

    render () {
        return (
            <div>
                <PreviewDisplay expression={this.state.expression}/>
                <Display result={this.state.result} />
                <Keypad 
                    enterDigit={this.enterDigitHandler} 
                    clearScreen={this.clearScreenHandler}
                    calculateResult = {this.calculateResultHandler} />
            </div>
        );
    }
}

ReactDOM.render(<Calculator />, document.getElementById('wrapper-div'));

//----FUNCTIONS----//

// Parses tidied expression (works only with simple math)

function calculateMathExpression(expr) {
    var parsed = parseDecimal(expr);
    var expression = [];
    var finalResult = "";      
    var regex = RegExp('^\-?[0-9](([-+\/*]\-?[0-9]+)?([.,][0-9]+)?)*?$');

    if (regex.test(parsed.join(""))) 
        { finalResult = eval(parsed.join("")); }
    
    else {       
        parsed.forEach((val) => {
            if (!isNaN(parseInt(val))) { expression.push(val); }

            else {               
                if (isNaN(parseInt(expression[expression.length-1]))) { 
                    expression[expression.length-1] = val;             
                }
                else { expression.push(val); }
            }                    
        });

        finalResult = expression.join("")
    }
   
    return finalResult;
}

// Gets rid of extra decimal dots in a single number

function parseDecimal(expr) {
    var splitExpression = expr.split("");
    splitExpression.push(" ");
   
    var currNumber = [];
    var parsedExpression = "";
    
    splitExpression.forEach((val) => {      
        if (!isNaN(parseInt(val)) || val == ".") { currNumber.push(val); }

        else if (isNaN(parseInt(val)) && !(val == ".")) { 
            var joinNumber = [];
            currNumber.forEach((el) => {
                if (el == "." && !joinNumber.includes(".")) joinNumber.push(el);
                if (!isNaN(parseInt(el))) { joinNumber.push(el); }
            });

            parsedExpression += joinNumber.join("") + val;        
            currNumber = [];          
        }     
    });  

    return parsedExpression.trim().split("");
}
