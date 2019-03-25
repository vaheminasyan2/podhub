import React from "react";
import ReactDOM from "react-dom";
import "./windowPortal.css";

// WINDOW PORTAL COMPONENT
// This component is a ReactDOM pop-up window.
// It is called from the Listen to Podcast page when user clicks "Open Portal".
// It is a miniature window that contains only Podcast title, Episode title, and audio player.

class WindowPortal extends React.PureComponent {
    constructor(props) {
        super(props);
        this.containerEl = document.createElement('div');
        this.externalWindow = null;
    }

    componentDidMount() {
        this.externalWindow = window.open('', '', 'width=400,height=200,left=200,top=200,scrollbars=no');
        this.externalWindow.document.title="Podhub Audio";
        this.externalWindow.document.body.appendChild(this.containerEl); 
    }

    componentWillUnmount() {
        this.externalWindow.close();
    }

    render() {
        return ReactDOM.createPortal(this.props.children, this.containerEl);
    }
}

export default WindowPortal;