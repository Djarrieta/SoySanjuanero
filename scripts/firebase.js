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
function readData(){
    STORIES=[]
    this.db.collection('stories').onSnapshot(query=>{
        $('#main').innerHTML=""
        query.forEach(story=>{
            createOneCard(story.data(),story.id)
            STORIES.push([story.id,story.data()])
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
//USAGE
readData()


