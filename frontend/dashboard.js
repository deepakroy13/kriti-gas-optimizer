const ctx = document.getElementById('gasChart')

new Chart(ctx,{

type:'bar',

data:{

labels:['Normal Transactions','Batch Transactions'],

datasets:[{

label:'Gas Usage',

data:[1000000,150000],

borderWidth:1

}]

},

options:{

scales:{
y:{
beginAtZero:true
}
}

}

})