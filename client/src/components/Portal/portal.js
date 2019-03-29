import React from "react";
import ReactDOM from "react-dom";
import "./portal.css";

// PORTAL COMPONENT
// This component is a ReactDOM pop-up window.
// It is called from the Listen to Podcast page when user clicks "Open Portal".
// It is a miniature window that contains only Podcast title, Episode title, and audio player.

class Portal extends React.Component {
    constructor(props) {
        super(props);
        this.state = { win: null, el: null };
    }

    componentDidMount() {
        let win = window.open('', '', 'width=400,height=200');
        win.document.title = 'Podhub Audio';
        let el = document.createElement('div');
        win.document.body.appendChild(el);
        this.setState({ win, el });
    }

    componentWillUnmount() {
        this.state.win.close();
    }

    render() {
        const { el } = this.state;
        if (!el) {
            return null;
        }
        return ReactDOM.createPortal(this.props.children, el);
    }
}

export default Portal;