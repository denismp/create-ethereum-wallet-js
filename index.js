const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const fs = require('fs')

const util = require('util')

//TODO: require ethers.js
const ethers = require('ethers')
//TODO: set provider to be ropsten
const provider = ethers.getDefaultProvider('ropsten')

//TODO: set wallets directory
const walletDirectory = "wallets"

if (!fs.existsSync(walletDirectory)){
     fs.mkdirSync(walletDirectory)
}

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.set('view engine', 'ejs')
app.engine('html', require('ejs').renderFile)

app.use(express.static('public'))

//Home page
app.get('/', (req, res) => {
    res.render(__dirname + '/views/index.html')
})


//Page for creating a wallet
app.get('/create', (req, res) => {
    res.render(__dirname + '/views/create.html')
})

// Create endpoint
app.post('/create', (req, res) => {
    // TODO: fetch user input fields (password and confirmPassword)

    //TODO: make simple validation

    //TODO: Generate wallet from mnemonic

    //TODO: Encrypt and save as json file
    wallet.encrypt(password).then((jsonWallet) => {
        let filename  = "UTC_JSON_WALLET_" + Math.round(+ new Date() / 1000)
                                           + "_" + Math.random(10000, 10000)
                                           + ".json"

        //TODO: Make a file with the wallet data
    })
})

app.get('/send', (req, res) => {
    res.render(__dirname + '/views/send.html')
})

app.post('/send', (req, res) => {
    //TODO: fetch user data (recipient,private key and amaunt)

    // Simple validation
    if(recipient === "" || recipient === undefined &&
        privateKey === "" || privateKey === undefined &&
        amount === "" || amount === undefined || amount <= 0){ return }
    
    let wallet;

    try{
        //TODO: make instance of the wallet
    } catch(e) {
        drawView(res, "send", { 
            transactionHash : undefined, 
            error : e.reason
        })
        return
    }

    let gasPrice = 6
    let gas = 21000

    // TODO: send the transaction to the network
})

app.get('/balance', (req, res) => {
	res.render(__dirname + '/views/balance.html');
})

app.post('/balance', (req, res) => {
    //TODO: fetch user data (filename and password)
    
    //read the file
    fs.readFile(walletDirectory + filename, 'utf8', async (err, jsonWallet) => {
        if(err) {
            drawView(res, "balance", { wallets : undefined, error : 'Error with file writing' })
        }
    
        ethers.Wallet.fromEncryptedJson(jsonWallet, password).then(async (wallet) => {
            //TODO: generate 5 wallets from your master key

            drawView(res, "balance", { wallets : wallets, error : undefined })
        }).catch( (err) => {
            drawView(res, "balance", { wallets : undefined, error : 'The password is wrong' })
        })
    })
})

//recover wallet
app.get('/recover', (req, res) => {
    res.render(__dirname + '/views/recover.html')
})

//recover wallet
app.post('/recover', (req, res) => {
    //TODO: fetch user data (mnemonic and password)

    //TODO: make wallet instance of this mnemonic
    
    // TODO: encrypt and save the wallet
})

//load your wallet
app.get('/load', (req, res) => {
    res.render(__dirname + '/views/load.html')
})

app.post('/load', (req, res) => {
    //TODO: fetch user data (filename and password)

    fs.readFile(walletDirectory + filename, 'utf8', (err,jsonWallet) => {
        //error handling
        if (err) { 
            res.render(__dirname + "/views/load.html", {
                address : undefined,
                privateKey : undefined,
                mnemonic : undefined,
                error : 'The file doesn\'t exist'
            }) 
        }

        //TODO: decrypt the wallet
    })
})

function drawView(res, view, data){
    res.render(__dirname + "/views/" +  view + ".html", data)
}

app.listen(3000)