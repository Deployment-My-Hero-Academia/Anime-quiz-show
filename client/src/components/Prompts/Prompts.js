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
      
            popup = <div ref={this.modalRef} style={{overflow: 'scroll', position: 'absolute', margin: '0,0,0,0', zIndex: this.props.zIndex
            ? this.props.zIndex: 20, width: '100w', backgroundColor: this.props.backgroundColor  ? this.props.backgroundColor : 'rgba(0, 0, 0, 0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <div style={{backgroundColor: this.props.noBg ? ' '  : 'white', borderRadius: '20 px', padding: '20px'}}></div>
            </div>
    
        
        return (

            <div>{popup}</div>

        )

        
    }
}