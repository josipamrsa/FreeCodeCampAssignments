//----REACTJS - MARKDOWN PREVIEWER----//

marked.setOptions({ breaks: true }); // Allows line breaks

//----DEFAULT DATA----//
const previewText = ` # This is Heading 1  
## This is Heading 2  
[This is a link](https://www.freecodecamp.org/)  

Here's some code: \`<div></div>\`  
\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`  
>This however is a blockquote  

- A list item
    - Another list item 
  
 
![And there is an image:](https://miro.medium.com/max/256/1*d69DKqFDwBZn_23mizMWcQ.png)  

And alas, here's some **bold** text
`;

//----REACT JSX----//

const Editor = (props) => {
    // pass props values and events to editor element
    return (
        <textarea id="editor" 
            value={props.text}
            onChange={props.onChange}
            type="text">           
        </textarea>
    );
}

const Preview = (props) => {    
     // dangerouslySetInnerHTML attribute is for HTML parsing 
     // marked() parses input and applies GitHub-flavoured markdown 
    return (
        <div id="preview" 
            dangerouslySetInnerHTML={{__html: marked(props.text)}} /> 
    );
}

//----CUSTOM REACT COMPONENTS----//

class MarkdownPreview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {text: previewText};
        this.updateMarkedHandler = this.updateMarkedHandler.bind(this);
    }

    // Update state (text) as user is typing
    updateMarkedHandler = (event) => {
        this.setState({text: event.target.value});
    }

    // Render JSX components within this component
    render() {
        return (
            <div>
                <h1>Markdown Previewer</h1>
                <h3>Type into editor: </h3>
                {/* Components with passed props */}
                <Editor text={this.state.text} onChange={this.updateMarkedHandler} />
                <Preview text = {this.state.text} />                              
            </div>           
        );
    }
  }

  // Render components to HTML page wrapper element
  ReactDOM.render(<MarkdownPreview />, document.getElementById('wrapper-div'));

  