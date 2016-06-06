// It is important to import the Editor which accepts plugins.
import Editor from 'draft-js-plugins-editor';
import {EditorState} from 'draft-js';
import createEmojiPlugin from 'draft-js-emoji-plugin';
import React from 'react';
import 'draft-js-emoji-plugin/lib/plugin.css';

// Creates an Instance. At this step, a configuration object can be passed in
// as an argument.
const emojiPlugin = createEmojiPlugin();
const { EmojiSuggestions } = emojiPlugin;

// The Editor accepts an array of plugins. In this case, only the emojiPlugin is
// passed in, although it is possible to pass in multiple plugins.
// The EmojiSuggestions component is internally connected to the editor and will
// be updated & positioned once the user starts the autocompletion with a colon.
class RichEditor extends React.Component {

    render () {

        const { editorState, onChange } = this.props;
        return (
          <div>
                <Editor
                  editorState={ editorState }
                  onChange={ onChange }
                  plugins={ [emojiPlugin] }
                  ref={(_ref) => this.editor = _ref}
                />
                <EmojiSuggestions />
          </div>
      );
    }
}

class TextEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {editorState: EditorState.createEmpty()};

        this.focus = () => this.editor.editor.focus();
        this.onChange = (editorState) => this.setState({editorState});
        this.logState = () => console.log(this.state.editorState.toJS());
    }

    onOkClick = () => {
        const message = this.state.editorState.getCurrentContent().getPlainText();
        this.props.onAddMessage(message);    
    }

    render () {
        return (
            <div className="flex align-items-start">
                <div className="editor" onClick={this.focus}>
                    <RichEditor
                        ref={(_ref) => this.editor = _ref}
                        onChange={this.onChange}
                        editorState={this.state.editorState}
                    />
                </div>
                <button onClick={this.onOkClick} className="btn btn-default mls">Ok</button>
            </div>
        )
    }
}

export default TextEditor;
