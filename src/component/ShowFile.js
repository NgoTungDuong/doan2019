import React, { Component } from "react";


export default class ShowFile extends Component {
    render() {
        return (
            <div style={{marginLeft: "35%"}}>
                <img src={`https://ipfs.infura.io/ipfs/${this.props.fileHash}`} alt="img" />
            </div>
        );
    }
}

