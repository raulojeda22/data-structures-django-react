import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editorActions, algorithmActions } from '../actions';
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
                body: ``
            },
            modified: false,
            output: '',
            name: '',
            description: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.saveCode = this.saveCode.bind(this);
        this.saveHandleChange = this.saveHandleChange.bind(this);
    }
    handleChange(value) {
        this.setState({ ...this.state, value: { body: value } });
    }
    handleSubmit(e) {
        e.preventDefault();
        const { value } = this.state;
        this.props.execute(value.body.replace(/"/g, "'"));
    }
    saveCode(e) {
        e.preventDefault()
        const {name, description} = e.target;
        this.props.create({
            body: this.state.value.body,
            description: description.value,
            title: name.value
        })
    }
    saveHandleChange(e) {
        //console.log(e.target)
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (!this.state.modified) {
            let name;
            if (nextProps.code.title !== undefined && this.props.user) { name = nextProps.code.title + " " + this.props.user.username }
            console.log(nextProps.code)
            this.setState({
                ...this.state,
                value: nextProps.code,
                modified: true,
                name: name,
                description: nextProps.code.description,
            });
        } else if (nextProps.output !== this.state.output) {
            this.setState({
                ...this.state,
                output: nextProps.output
            });
        } else if (this.props.editating !== nextProps.editating) {
            return true;
        } else {
            return true;
        }
        return true;
    }
    render() {
        let { output, editating, user } = this.props;
        let { value } = this.state;
        let saveForm;
        if (user) {
            saveForm = (
                <div className="codeSave">
                    <h3>Save your code</h3>
                        <form name="save" onSubmit={this.saveCode}>
                            Name <input name="name" type="text" value={this.state.name} onChange={this.saveHandleChange}/>
                            Description <textarea name="description" value={this.state.description} onChange={this.saveHandleChange}></textarea>
                            <button>Save</button>
                        </form>
                </div>
            )
        }
        return (
            <div>
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
                    { saveForm }
            </div>
        );
    }
}
function mapState(state) {
    const { authentication } = state;
    let user = null;
    if (authentication.user !== undefined)
        user = authentication.user.user;
    const { editating, output } = state.editation;
    return { editating, output, user };
}

const actionCreators = {
    execute: editorActions.execute,
    create: algorithmActions.create,
};

const connectedCodeEditorPage = connect(mapState, actionCreators)(CodeEditor);
export default connectedCodeEditorPage;