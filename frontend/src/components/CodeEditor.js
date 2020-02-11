import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editorActions } from '../actions';
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-jsx";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/snippets/python";
import "ace-builds/src-min-noconflict/ext-searchbox";
import "ace-builds/src-min-noconflict/ext-language_tools";

class CodeEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: {
                body: `import sys
print(sys.version)`
},
            modified: false,
            output: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(value) {
        this.setState({ ...this.state, value: value });
    }
    handleSubmit(e) {
        e.preventDefault();
        const { value } = this.state;
        this.props.execute(value.body.replace(/"/g, "'"));
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (!this.state.modified || nextProps.output !== this.state.output) {
            this.setState({
                ...this.state,
                value: nextProps.code,
                modified: true,
                output: nextProps.output
            });
        } else {
            return false;
        }
        return true;
    }
    render() {
        let { output, editating } = this.props;
        let { value } = this.state;
        console.log(output);
        return (
            <div className="codeEditor">
                <AceEditor className=" "
                    placeholder="Python"
                    mode="python"
                    theme="monokai"
                    name="editor"
                    onLoad={this.onLoad}
                    onChange={this.handleChange}
                    fontSize={14}
                    showPrintMargin={true}
                    showGutter={true}
                    highlightActiveLine={true}
                    value={value.body}
                    setOptions={{
                        enableBasicAutocompletion: true,
                        enableLiveAutocompletion: true,
                        enableSnippets: true,
                        showLineNumbers: true,
                        tabSize: 2,
                    }} />
                <form name="execute" onSubmit={this.handleSubmit}>
                    {!editating && <div className="background-play"><button className="button play"></button></div>}
                    {/*<button className="btn btn-primary">Run</button>*/}
                </form>
                <div className="output"><pre>{output}</pre></div>
            </div>
        );
    }
}
function mapState(state) {
    const { editating, output } = state.editation;
    return { editating, output };
}

const actionCreators = {
    execute: editorActions.execute
};

const connectedCodeEditorPage = connect(mapState, actionCreators)(CodeEditor);
export default connectedCodeEditorPage;