let provider
let signer
let userAddress

let transactions = []

document.getElementById("connect").onclick = async ()=>{

provider = new ethers.BrowserProvider(window.ethereum)

await provider.send("eth_requestAccounts",[])

signer = await provider.getSigner()

userAddress = await signer.getAddress()

document.getElementById("wallet").innerText =
"Connected: " + userAddress

}

document.getElementById("addTx").onclick = async ()=>{

let to = document.getElementById("to").value
let value = document.getElementById("value").value

let nonce = transactions.length

let hash = ethers.solidityPackedKeccak256(
["address","address","uint256","uint256"],
[userAddress,to,value,nonce]
)

let signature = await signer.signMessage(
ethers.getBytes(hash)
)

let meta = {

from:userAddress,
to:to,
value:value,
nonce:nonce,
data:"0x",
signature:signature

}

transactions.push(meta)

updateList()

}

function updateList(){

let list = document.getElementById("txList")

list.innerHTML = ""

transactions.forEach((tx,i)=>{

let li = document.createElement("li")

li.innerText =
"TX " + i + " → " + tx.to

list.appendChild(li)

})

}

document.getElementById("sendBatch").onclick = async ()=>{

await fetch("http://localhost:3000/relay",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify(transactions)

})

alert("Batch sent!")

transactions=[]

updateList()

}