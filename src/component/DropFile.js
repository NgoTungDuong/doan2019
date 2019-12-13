import React, { Component } from "react";


export default class DropFile extends Component {
    state = {
        fileName: '',
        transactionHash: '',
    }
    handleOnChange = (e) => {
        const imageFile = e.target.files[0];
        if (imageFile) {
            const fileReader = new FileReader();
            fileReader.readAsText(imageFile);
            fileReader.onloadend = (data) => {
                const result = JSON.parse(data.target.result)
                this.setState({
                    fileName: result.fileName,
                    transactionHash: result.transactionHash
                });
            };
        };
    }
    onClick = (event) => {
        // console.log(this.state)
        event = this.state.transactionHash
        this.props.handleOnclick(event)
    }
    
    render() {
        return (
            <div>
                <div>
                    <input type="file" accept="application/json" onChange={this.handleOnChange} style={{cursor: "pointer"}}/>
                </div>
                <div className="mt-5">
                    <button onClick={this.onClick} className="btn btn-primary">Check File</button>
                </div>
            </div>
        );
    }
}

