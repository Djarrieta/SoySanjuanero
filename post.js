/* class post{
    constructor(){
        this.db=firebase.firestore()
        const settings={timestampInSnapshots:true}
        this.db.settings(settings)
    }
    crearPost(img,text,hiddenText) {
        return this.db.collection("post").add({
            img:img,
            text:text,
            hiddenText:hiddenText,
            date:firebase.firestore.FieldValue.serverTimestamp()
        })
        .then(refDoc=>{
            console.log('Id del post: ' + refDoc)
        })
        .catch(err=>{
            console.log('Error creando el post: $(err)')
        })
     }
} */
