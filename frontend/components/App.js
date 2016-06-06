import React from 'react';
import ConversationForm from './ConversationForm';

export default class App extends React.Component {
  render() {
    return (
        <div className="text-center main-container container">
            <ConversationForm />
        </div>
    );
  }
}
