import React, { Component } from 'react';
import Web3 from 'web3';
import './App.css';
import NavBar from './containers/NavBar';
import './css/maincontent.css';
import MainContent from './containers/MainContent';
import FileUpload from './abis/FileUpload.json';

const ipfsClient = require('ipfs-http-client');
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https'});
// decode data input
const InputDataDecoder = require('ethereum-input-data-decoder');
const decoder = new InputDataDecoder(FileUpload.abi);

class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadBlockchainData() {
    const accounts = await window.web3.eth.getAccounts()
    this.setState({ account: accounts[0]})
    var id = await window.web3.eth.net.getId()
    var data = await FileUpload.networks[id]
    // console.log(data) => address contract, txHash
    if(!data) {
      window.alert('Smart contract not deployed to detected network')
    }
  }

  constructor(props) {
    super(props);
    this.state = { 
      account: '',
      fileName: '',
      buffer: null,
      fileHash: '',
      ipfsHash: '',
      inputTransaction: ''
    };
  }

  async loadWeb3() {
    if(window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    } if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    } else {
      window.alert('Please use metamask!')
    }
  }
  
  // Example hash: "QmdrbUvQmC1MT6SRNoFNw7gucp8w4QrVXRpdTWgx5yqNJ3"
  // Example url: https://ipfs.infura.io/ipfs/QmdKDgrFPA9vgxuhpGZ2mfWV9i2hEKZ9Fkeuy3yr6cYDkn
  
  onSubmit = async (event, name, file) => {
    event.preventDefault();
    console.log('Submitingg ...');
    console.log(name, file)
    this.setState({fileName: name})
    window.alert('Please wait a second to upload ....')
    ipfs.add(file, async (error, result) => {
      console.log('IPFS result', result)
      const ipfsHash = result[0].hash;
      if(!ipfsHash) {
        window.alert('Server busy, please try again ...')
      }
      if(error) {
        console.log(error);
        return
      }

      // Store file on the BlockChain
      const web3 = window.web3;
      const networkId = await web3.eth.net.getId();
      const networkData = FileUpload.networks[networkId];
      const abi = FileUpload.abi;
      const address = networkData.address;
      const contract = web3.eth.Contract(abi, address);
      contract.methods.set(ipfsHash).send({ from: this.state.account}).then(r => {
        this.setState({ ipfsHash });
      });
      window.alert('Create Success, confirm to upload')
      localStorage.setItem('upload', 'success');
    })
  }

  onLoadDataDownload = async () => {
    console.log('Successs!');
    const getBlockTransaction = await window.web3.eth.getTransactionFromBlock('latest');
    // console.log(getBlockTransaction.hash) => tx Hash moi nhat
    window.localStorage.setItem('fileName', this.state.fileName)
    window.localStorage.setItem('transactionHash', getBlockTransaction.hash) 
  }

  handleOnclick = async (file) => {
    console.log(file) // ==> transactionHash
    if(file) {
      await window.web3.eth.getTransaction(file).then(result => {
        this.setState({inputTransaction: result.input})
        console.log(result)
      })
    } else {
      return window.alert('Choose your file!')
    }
    const result = decoder.decodeData(this.state.inputTransaction)
    this.setState({ fileHash: result.inputs[0]})
    console.log('link anh: ', this.state.fileHash) 
  }

  render() {
    return (
      <div className="App">
        <NavBar account={this.state.account}/>
        <div className="container-fluid mt-5">
          <div className="row">
            <div className="col-12">
              <MainContent 
                handleOnclick={this.handleOnclick} 
                handleOnsubmit={this.onSubmit}
                onLoadDataDownload={this.onLoadDataDownload}
                />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App
