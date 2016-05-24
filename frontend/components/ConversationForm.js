import React from 'react';
import {fromJS, List} from 'immutable';
import * as convFactory from '../conversationFactory';

const initialState = fromJS({
    // conversation title
    title: '',
    messages: List()
});


const Answer = () => (
    <div>
        <div className="checkbox">
            <label>
                <input type="checkbox" /> <span> User-input</span>
            </label>
        </div>
        <input placeholder="Insert answer" className="form-control" />
    </div>
);

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
                                <input className="form-control" placeholder={placeholder} ref={(ref) => this.msgInput = ref} />
                            </div>
                            <button type="submit" className="btn btn-default">Ok</button>
                        </form>
                    </div>
                    <div className="col-xs-4">
                        <button className="btn btn-primary btn-small" onClick={this.onAddAnswer} style={{marginRight: 5}}>Add Answer</button>
                        <button className="btn btn-danger btn-small" onClick={onDelete}>Remove</button>
                        {this.state.answer && <Answer />}
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

    render() {

        const messages = this.state.conversation.get('messages');

        return (
            <div>
                <h3>New conversation</h3>
                <div style={{margin: 50}} className="row text-center">
                    <input
                        className="form-control"
                        placeholder="Conversation title"
                        style={{maxWidth: 300, margin: 'auto'}}
                    />
                </div>

                <button className="btn" onClick={this.onNewMessageClick}>Add Message</button>

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
