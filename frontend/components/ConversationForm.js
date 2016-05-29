import React from 'react';
import {fromJS, List} from 'immutable';
import * as convFactory from '../conversationFactory';
import req from 'axios';

const initialState = fromJS({
    // conversation title
    name: '',
    messages: List()
});


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
                    <button type="submit" className="btn btn-default">Ok</button>
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
        this.setState({answer: true});
    }

    onSubmit = (e) => {
        e.preventDefault();
        const text = this.msgInput.value;

        this.props.updateMessage({
            text
        });
    }

    render () {
        const {message, onAddAnswer, onDelete} = this.props;
        const placeholder = message.get('title') || 'Message text';

        return (
            <div>
                <div className="row" style={{margin: 20}}>
                    <div className="col-xs-8">
                        <form className="form-inline" onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <div>{message.get('text')}</div>
                                <label className="sr-only">Message</label>
                            </div>
                            <div className="form-group">
                                <label className="sr-only">Message</label>
                                <input
                                    className="form-control"
                                    placeholder={placeholder}
                                    ref={(ref) => this.msgInput = ref}
                                />
                            </div>
                            <button type="submit" className="btn btn-default">Ok</button>
                        </form>
                    </div>
                    <div className="col-xs-4">
                        <div><small>(If the previous message requires a user answer)</small></div>
                        <button
                            className="btn btn-primary btn-small"
                            onClick={this.onAddAnswer}
                            style={{marginRight: 5}}>Add Answer
                        </button>

                        <button className="btn btn-danger btn-small" onClick={onDelete}>Remove</button>

                        {this.state.answer &&
                            <Answer
                                updateMessage={this.props.updateMessage}
                                message={message}
                            />
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default class ConversationForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            conversation: initialState
        };
    }

    onNewMessageClick = () => {
        const newMessage = convFactory.createMessage();

        const conv = this.state.conversation
            .set('messages',
                this.state.conversation.get('messages').push(newMessage));

        this.setState({conversation: conv});
    }

    onDeleteMessage = (msgIndex) => {
        const messages = this.state.conversation.get('messages');
        const newMessages = messages.filter((msg, index) => msgIndex !== index);

        this.setState({
            conversation: this.state.conversation.set('messages', newMessages)
        });
    }

    onUpdateMessage = (msgIndex, data) => {
        const messages = this.state.conversation.get('messages');
        const oldMessage = messages.get(msgIndex);
        const newMessages = messages.set(msgIndex, oldMessage.merge(fromJS(data)));

        this.setState({
            conversation: this.state.conversation.set('messages', newMessages)
        });
    }

    savedConversationName = () => {
        const name = this.convTitle.value;
        const newConv = this.state.conversation.set('name', name);
        this.setState({
            conversation: newConv
        });
    }

    onSaveConversation = () => {
        // TODO: save conversation
        // with all messages in same call
        this.setState({saving: true});

        req.post('/api/v1/conversations', {
            conversation: this.state.conversation.toJSON()
        })
        .then((res) => {
            this.setState({saving: false, savedConversation: true});
            alert('Conversation saved!');
        })
        .catch((err) => {
            alert('Something went wrong. Please try later', err);
        })
    }

    render() {

        const messages = this.state.conversation.get('messages');

        return (
            <div>
                <h3>New conversation</h3>
                <div style={{margin: 50}} className="row text-center">
                    <div><small>Set a subject title for this conversation</small></div>
                    <input
                        className="form-control"
                        placeholder="Conversation title"
                        style={{maxWidth: 300, margin: 'auto'}}
                        ref={(ref) => this.convTitle = ref}
                        onBlur={this.savedConversationName}
                    />
                </div>

                <div>
                    <button className="btn btn-success" onClick={this.onSaveConversation}>Save Conversation</button>
                </div>

                <div>
                    <button className="btn" onClick={this.onNewMessageClick}>Add Message</button>
                </div>

                {messages.map((msg, i) => (
                    <Message
                        key={`msg.${i}`}
                        message={msg}
                        onDelete={() => this.onDeleteMessage(i)}
                        updateMessage={(text) => this.onUpdateMessage(i, text)}
                    />
                ))}
            </div>
        );
    }
}
