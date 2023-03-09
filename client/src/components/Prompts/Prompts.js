import React from "react";
import $ from 'jquery';


export default class Prompts extends React.Component {

    constructor(props) {
        super(props)
        this.modalRef = React.createRef();
    }
    componentDidMount() {
        $(this.modalRef.current).hide();
    }

    hidePopUp = () => {
        $(this.modalRef.current).fadeIn(200);
        document.getElementsByTagName('html')[0].style.overflow = 'hidden';
    }
    showPopUp = () => {
        $(this.modalRef.current).fadeOut(200);
        document.getElementsByTagName('html')[0].style.overflow = 'auto';
    }
    render() {
        let popup = undefined;
        if(this.props.model === true) {
            this.hidePopUp()

        } else {
            this.showPopUp();
        }
      
            popup = <div ref={this.modalRef} style={{overflow: 'scroll', position: 'absolute', top: '0', bottom: '0', left: '0', right: '0', zIndex: this.props.zIndex ?  this.props.zIndex: 20, width: '100w', backgroundColor: this.props.backgroundColor  ? this.props.backgroundColor : 'rgba(0, 0, 0, 0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <div style={{backgroundColor: this.props.noBg ? ' '  : 'white', borderRadius: '20px', padding: '20px'}}></div>
                {this.props.children}
            </div>
    
        
        return (

            <div>{popup}</div>

        )

        
    }
}