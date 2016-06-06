import React from 'react';
import {fromJS, List} from 'immutable';
import Editor from './Editor';


class Answer extends React.Component {

    onSubmit = (e) => {
        e.preventDefault();

        this.props.updateMessage({
            answer: {
                text: this.msgInput.value
            }
        });
    }

    onChangeUserInput = (e) => {
        this.props.updateMessage({
            answer: {
                user_input_answer: this.userInput.checked
            }
        });
    }

    renderAnswer() {
        const message = this.props.message;
        // only render answer text if not user input is enabled
        if (!message.getIn(['answer', 'user_input_answer'])) {
            return (
                <form className="form-inline" onSubmit={this.onSubmit}>
                        <div>{message.getIn(['answer', 'text'])}</div>
                    <div className="form-group">
                        <label className="sr-only">Answer</label>
                        <input
                            className="form-control"
                            placeholder="Add answer text"
                            ref={(ref) => this.msgInput = ref}
                        />
                    </div>
                    <button type="submit" className="btn btn-default mls">Ok</button>
                </form>
            );
        }
     }

    render () {
        return (
            <div>
                <div className="checkbox">
                    <label>
                        <input
                            type="checkbox"
                            onChange={this.onChangeUserInput}
                            ref={(ref) => this.userInput = ref}
                        /> <span> User-input</span>
                    </label>
                </div>
                {this.renderAnswer()}
            </div>
        );
    }
}

class Message extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    onAddAnswer = () => {
        this.setState({answer: !this.state.answer});
    }

    onAddMessage = (text) => {
        this.props.updateMessage({
            text
        });

        this.editMessage();
    }

    editMessage = () => {
        this.setState({editMessage: !this.state.editMessage});
    }

    render () {
        const {message, onAddAnswer, onDelete} = this.props;
        const editMessage = this.state.editMessage;
        const placeholder = message.get('title') || 'Message text';
        const messageText = message.get('text');

        return (
            <div>
                <div className="flex justify-space-between align-items-center mtm">
                    <div>

                        <div className="mbm">
                            <button
                                className="btn btn-primary btn-sm"
                                onClick={this.onAddAnswer}
                                style={{marginRight: 5}}>Add Answer
                            </button>
                            <small>(If the previous message requires a user answer)</small>

                            {this.state.answer &&
                                <Answer
                                    updateMessage={this.props.updateMessage}
                                    message={message}
                                />
                            }
                        </div>

                        {(!editMessage || !messageText) &&
                            <div>
                                <div className="form-group">
                                    <label className="sr-only">Message</label>
                                </div>
                                <div className="form-group">
                                    <label className="sr-only">Message</label>
                                    <Editor onAddMessage={this.onAddMessage}/>
                                </div>
                            </div>
                        }

                        {!!messageText &&
                            <div>
                                {messageText}
                            </div>
                        }
                    </div>
                    <div>
                        {!!messageText && <button className="btn btn-default btn-sm" onClick={this.editMessage}>Edit</button>}
                        <button className="btn btn-danger btn-sm mls" onClick={onDelete}>Remove</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Message;
