import req from 'axios';
import React from 'react';
import {fromJS, List} from 'immutable';
import * as convFactory from '../conversationFactory';
import Message from './MessageForm';
import {Editor, EditorState} from 'draft-js';


const initialState = fromJS({
    // conversation title
    name: '',
    messages: List()
});


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
            <div className="inner text-left">
                <div className="flex justify-space-between align-items-center">
                    <h3 className="lead">New conversation</h3>
                    <button className="btn btn-success" onClick={this.onSaveConversation}>SAVE</button>
                </div>
                <hr />

                <div className="flex mvl justify-space-between align-items-center">
                    <div>
                        <p><small>Set a subject title for this conversation</small></p>
                            <input
                                className="form-control"
                                placeholder="Conversation title"
                                style={{maxWidth: 300}}
                                ref={(ref) => this.convTitle = ref}
                                onBlur={this.savedConversationName}
                            />
                        </div>
                    <div>
                        <button className="btn btn-primary" onClick={this.onNewMessageClick}>Add Message</button>
                    </div>
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
