function $(selector){
    return document.querySelector(selector)
}
class PostDAO {
    constructor () {
      this.db = firebase.firestore()
      const settings = { timestampsInSnapshots: true }
      this.db.settings(settings)
    }
    
    batch (piezas) {
        piezas.forEach(p => {
            const ref=this.db.collection('piezas')
            batch.set(ref,{
                pieza:p
            })
        });

        batch
          .commit()
          .then(() => {
            console.log('Batch correcto')
          })
          .catch(error => console.error(error))
      }
}


function enviarDatos(){
    const piezas=[
       $('#pieza1').value,
       $('#pieza2').value,
       $('#pieza3').value,
       $('#pieza4').value,
       $('#pieza5').value,
       $('#pieza6').value,
    ]
    const userDAO = new PostDAO()
    userDAO.batch(piezas)
    
}



