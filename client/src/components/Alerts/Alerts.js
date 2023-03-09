import React from "react";
import $ from 'jquery';


export default class Alerts extends React.Component {

    constructor(props) {
        super(props)
        this.alertRef = React.createRef();
    }
    componentDidMount() {
        $(this.alertRef.current).hide();
    }

    hidePopUp = () => {
        $(this.alertRef.current).fadeIn(200);
        document.getElementsByTagName('html')[0].style.overflow = 'hidden';
    }
    showPopUp = () => {
        $(this.alertRef.current).fadeOut(200);
        document.getElementsByTagName('html')[0].style.overflow = 'auto';
    }
    render() {
        let popup = undefined;
        if(this.props.model === true) {
            this.hidePopUp()

        } else {
            this.showPopUp();
        }
      
            popup = <div ref={this.alertRef} style={{overflow: 'scroll', position: 'absolute', top:  '400px', right: '500px', zIndex: this.props.zIndex
            ? this.props.zIndex: 40, backgroundColor: this.props.backgroundColor  ? this.props.backgroundColor : '#30D158',width: 'fit-content', color: 'white', borderRadius: '5px', padding: '20px 30px'}}>
                {this.props.message}
            </div>
    
        
        return (

            <div>{popup}</div>

        )

        
    }
}