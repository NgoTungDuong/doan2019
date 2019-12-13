const FileUpload = artifacts.require('FileUpload')
const web3 = require('web3');

require('chai')
    .use(require('chai-as-promised'))
    .should()

contract('FileUpload', (account) => {
    let file;
    let input;
    describe('deployment', async () => {
        it('deployment success ...', async () => {
            FileUpload.deployed();
            // input = await web3.eth.getTransaction('0x1a7878ec695e628cd6cc8fadbb0bc826dc72c65fcc98c00319e743df70d2bdb9')
            // result = web3.util.toAscii(input.input)
            // console.log(input.input)
            // console.log(result)
            // console.log(input)
            console.log(account);
        });
    });
    
});

// 0x0c9972cf5ac892fd307e14914a8512f8173c369366713abb951a54f9679b6d24