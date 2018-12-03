import React from 'react';
import ReactDOM from 'react-dom';

const modalRoot: HTMLBodyElement = document.body;

interface PortalProps {
    children: React.ReactNode;
}

class Portal extends React.Component<PortalProps> {
    el: HTMLDivElement;

    constructor(props: PortalProps) {
        super(props);
        this.el = document.createElement('div');
    }

    componentDidMount() {
        modalRoot.appendChild(this.el);
    }

    componentWillUnmount() {
        modalRoot.removeChild(this.el);
    }

    render() {
        return ReactDOM.createPortal(this.props.children, this.el);
    }
}

export default Portal;
