import React, { Component } from 'react';

export default class CreateFile extends Component {

    state = {
        fileName: '',
        fileUpload: null
    }

    onChange = (event) => {
        event.preventDefault();
        const file = event.target.files[0];
        if(file.type === "image/png" || file.type === "image/jpeg") {
            const reader = new window.FileReader();
            if(file) {
                reader.readAsArrayBuffer(file)
                reader.onloadend = () => {
                    this.setState({ fileUpload: Buffer(reader.result)})
                }
            }
        } else {
            window.alert('Please choose exactly file type JPG or PNG !')
            document.getElementById("uploadCaptureInputFile").value = "";
            return
        }
    }

    onSubmit = (e, name, file) => {
        e.preventDefault();
        name = this.state.fileName;
        file = this.state.fileUpload;
        this.props.handleOnsubmit(e, name, file)
        this.setState({
            fileName: ''
        })
        document.getElementById("uploadCaptureInputFile").value = "";
    }

    download = (fileName, json) => {
        const data = {
            fileName: fileName,
            transactionHash: json
        }

        var element = document.createElement('a');
        element.style.display = 'none';
        element.setAttribute('href', 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data)));
        element.setAttribute("download", "scene2.json");
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }

    onclickDownload = async () => {
        if(localStorage.length !== 0 ) {
            await this.props.onLoadDataDownload();

            var fileName = localStorage.getItem('fileName');
            var transactionHash = localStorage.getItem('transactionHash');
            if (fileName && transactionHash) {
                this.download(fileName, transactionHash);
            }
            console.log(localStorage.getItem('transactionHash'));
            localStorage.clear()
        } else {
            window.alert('You need create file first to download file !')
        }
        
    }

    render() {
        return (
            <div>
                <form style={{margin: "20%"}} onSubmit={this.onSubmit}> 
                    <div className="form-group">
                        <p className="w-100">SubCribe</p>
                        <input required value={this.state.fileName} onChange={e => this.setState({fileName: e.target.value})} className="form-control" type="text" placeholder='file name' style={{width: "70%", margin: "auto"}}/>
                        <input id="uploadCaptureInputFile" required onChange={this.onChange} className="form-control mt-2 mb-2" type="file" accept="image/*" style={{width: "70%", margin: "auto", cursor: "pointer"}}/>
                        <input type="submit" className="btn btn-success "/>
                    </div>
                </form>
                <button style={{marginTop: "-320px"}} className="btn btn-success" onClick={this.onclickDownload}>Download File</button>
            </div>
        )
    }
}

