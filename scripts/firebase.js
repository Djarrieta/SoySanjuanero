//CONFIG
var config = {
    apiKey: "AIzaSyAnxXJlQC9mOyNnSYzV4utnjYXF29fWoC8",
    authDomain: "soysanjuanero-a5c1c.firebaseapp.com",
    databaseURL: "https://soysanjuanero-a5c1c.firebaseio.com",
    projectId: "soysanjuanero-a5c1c",
    storageBucket: "soysanjuanero-a5c1c.appspot.com",
    messagingSenderId: "344513006950",
    appId: "1:344513006950:web:10250cd62d0e7236d20ca7",
    measurementId: "G-5DX7T59E32"
};
firebase.initializeApp(config);

const firestore = firebase.firestore();
const settings = {timestampsInSnapshots: true};
firestore.settings(settings);

var db = firebase.firestore();

//READ DATA
let STORIES=[]
let NEWID=false
let orderSTORIES=[]
let numberOfStories=0
function readData(){
    STORIES=[]
    document.getElementById('main').innerHTML=''

    this.db.collection('stories').onSnapshot(query=>{
        query.forEach(story=>{
            STORIES.push([story.id,story.data()])
            createOneCard(story.data(),story.id)
        })
    })
    
    this.db.collection('pieces').onSnapshot(query=>{
        query.forEach(doc=>{
            var PIEZAS=doc.data().img
            $('#piezaImg1').src=PIEZAS[0]
            $('#piezaImg2').src=PIEZAS[1]
            $('#piezaImg3').src=PIEZAS[2]
            $('#piezaImg4').src=PIEZAS[3]
            $('#piezaImg5').src=PIEZAS[4]
            $('#piezaImg6').src=PIEZAS[5]
        })
    })  

}
//CLICKS REPORT TO DATABASE
function sumarClick(id,type){
    this.db
      .collection('clicks')
      .add({
        fecha: firebase.firestore.FieldValue.serverTimestamp(),
        id:id,
        type:type
      })
}
//REPORT PAY
async function reportPay(paymentData){
    await this.db
      .collection('sells')
      .add(paymentData)
      .then(ref=>{
        $('#shopConfirmation p').innerText='Señor(a) '+ paymentData.costumerName +' Acabas de realizar un pedido por '+ paymentData.cant +' UN de '+paymentData.nameArt +'. PULSA ACÁ PARA COMUNICARTE DIRECTAMENTE CON EL VENDEDOR al whatsapp '+ paymentData.providerWhatsapp +'. El código del pedido es ' + ref.id
        $('#shopConfirmation').classList.remove('hide')
        if(paymentData.paymentMethod=='cash'){
            $('#shopConfirmation').dataText= 'https://wa.me/57'+paymentData.providerWhatsapp+'?text=Hola!%20Desde%20SoySanjuanero%20te%20hice%20un%20pedido%20de%20'+paymentData.cant+'%20UN%20de%20'+paymentData.nameArt +'%20para%20pagar%20cuando%20me%20lo%20entreguen.%20El%20código%20del%20pedido%20es%20' + ref.id,'_blank'
        }else if(paymentData.paymentMethod=='card'){
            $('#shopConfirmation').dataText= 'https://wa.me/57'+paymentData.providerWhatsapp+'?text=Hola!%20Desde%20SoySanjuanero%20te%20hice%20una%20compra%20con%20tarjeta%20de%20'+paymentData.cant+'%20UN%20de%20'+paymentData.nameArt +'%20para%20pagar%20cuando%20me%20lo%20entreguen.%20El%20código%20del%20pedido%20es%20' + ref.id,'_blank' 
        }
      });
}
//USAGE
readData()


