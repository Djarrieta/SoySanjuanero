//SELECTOR 
function $(selector){
    return document.querySelector(selector)
}

//FIREBASE
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

//LATERAL MENU
function showHideMenu(){
    const menu=$('.menu')
    const overlay=$('#menuOverlay')
    if(menu.classList.contains('hideMenu')){
        menu.classList.remove('hideMenu')
        overlay.classList.add('showOverlay')
    }else{
        menu.classList.add('hideMenu') 
        overlay.classList.remove('showOverlay')
    }
}
function ShowMenuSocialDetail(cont){
    $('#menuSocialDetail').innerHTML=cont.dataset.text
}
//SCROLL TO TOP
function scrollToTop(){
    $('#main').scrollTop=0
}

// SEARCH HISTORIES
function searchAll(){
    const c=document.querySelectorAll('.card')
    let menuFilterInput=$('#filterInput')
    //quita la s del final si la hay
    if(menuFilterInput.value.substring(menuFilterInput.value.length-1,menuFilterInput.value.length).toUpperCase()=='S'){
        menuFilterInput.value=menuFilterInput.value.substring(0,menuFilterInput.value.length-1)
    }

    c.forEach(x=>x.classList.remove('hide'))
    
    if(menuFilterInput.value.length>2 || onlyStore){
        let i=0
        STORIES.forEach(item=>{
            if(!item.Texto && !item.PalabraClave){
                $('#card-'+i).classList.add('hide');
            }
            if(item.Texto){
                const t=item.Texto.toUpperCase()
                const m=menuFilterInput.value.toUpperCase()
                if(!t.includes(m)){
                    $('#card-'+i).classList.add('hide')
                }
            }
            if(item.PalabraClave){
                const ht=item.PalabraClave.toUpperCase()
                const m=menuFilterInput.value.toUpperCase()
                if(!ht.includes(m)){
                    $('#card-'+i).classList.add('hide')
                }else{
                    $('#card-'+i).classList.remove('hide')
                }
            };
            if(onlyStore && !item.Tienda){
                $('#card-'+i).classList.add('hide')
            }
            i++
        })
    }
}
function selectFilterText(obj){
    $("#filterInput").style.width='200px'
    $("#headerDiv1").classList.add('hide')
    $("#headerDiv3").classList.add('hide')
    obj.select()
}
function exitFilterText(){
    $("#headerDiv1").classList.remove('hide')
    $("#headerDiv3").classList.remove('hide')
    $("#filterInput").style.width='10px'
}
let onlyStore=false
function ShowOnlyStore(){
    if($('#storeSearchIcon').classList.contains('hide')){
        onlyStore=true
        $('#storeSearchIcon').classList.remove('hide')
        $('#headerStoreIcon').src='./icons/store2.png'
    }else{
        onlyStore=false
        $('#storeSearchIcon').classList.add('hide')
        $('#headerStoreIcon').src='./icons/store.png'
    }

    searchAll()
    if(!$('.menu').classList.contains('hideMenu')){
        showHideMenu()
    }
}  

//SHOPPING MALL
let paymentData={}
function openShoppingMall(obj){
    const id=obj.id.split('-')[1]
    const objNombre=$('#'+'nombre-'+id)
    let t=parseInt($('#'+'cant-'+id).value)*parseInt(STORIES[id].ArtPrecio[objNombre.value])

    paymentData={
        cant:parseInt($('#'+'cant-'+id).value) ,
        artNombre:STORIES[id].ArtNombre[objNombre.value],
        artPrecio:STORIES[id].ArtPrecio[objNombre.value],
        nacional:STORIES[id].Nacional,
        total:t
    }

    //valores por defecto
    loadRegion()
    $('#selectRegion').value="Bol\u00edvar"
    loadCitys()
    $('#selectCity').value="San Juan Nepomuceno"
    //habilitar region
    dis_enableRegion(paymentData.nacional)
    en_disableCash()

    $('#resumenMallCant').innerHTML=paymentData.cant
    $('#resumenMallName').innerHTML=paymentData.artNombre
    $('#resumenMallPrice').innerHTML=formatCurrency("es-CO", "COP", 2, parseInt(paymentData.artPrecio))
    $('#resumenMallTotal').innerHTML=formatCurrency("es-CO", "COP", 2, paymentData.total)

    //Lo pone visible
    $('#shoppingMall').classList.remove('hide')
}
function closeShoppingMall(){
    $('#shoppingMall').classList.add('hide')
}
function formatCurrency (locales, currency, fractionDigits, number) {
    var formatted = new Intl.NumberFormat(locales, {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: fractionDigits
    }).format(number);
    return formatted;
}
function loadRegion(){
    $('#selectRegion').innerHTML=''
    const region =listarCiudades()
    region.forEach(c=>{
        const newRegion=document.createElement('option');
        newRegion.setAttribute('value',c.departamento);
        newRegion.innerText=c.departamento
        $('#selectRegion').appendChild(newRegion)
    })
}
function loadCitys(){
    $('#selectCity').innerHTML=''
    const ciudad =listarCiudades()
    let listaCiudades=ciudad.filter(x=>x.departamento===$("#selectRegion").value)
    listaCiudades=listaCiudades[0].ciudades
    listaCiudades.forEach(c=>{
        const newCity=document.createElement('option');
        newCity.setAttribute('value',c);
        newCity.innerText=c
        $('#selectCity').appendChild(newCity)
    }) 
    en_disableCash()
}
function dis_enableRegion(nacional){
    if(nacional){
        $('#selectRegion').style.pointerEvents = "auto"
        $('#selectRegion').style.background='#ffffff'

        $('#selectCity').style.pointerEvents = "auto"
        $('#selectCity').style.background='#ffffff'
    }else{
        $('#selectRegion').style.pointerEvents = "none"
        $('#selectRegion').style.background='#dddcdc'

        $('#selectCity').style.pointerEvents = "none"
        $('#selectCity').style.background='#dddcdc'
    }
}
function en_disableCash(){
    if($('#selectCity').value=='San Juan Nepomuceno'){
        $('#shoppingMallContraentrega').style.pointerEvents = "auto"
        $('#shoppingMallContraentrega').style.cursor='pointer'
        $('#shoppingMallContraentrega').style.background='#A7A7A7'
        $('#shoppingMallContraentrega').style.color='#4b4a4a'
    }else{
        $('#shoppingMallContraentrega').style.pointerEvents = "none"
        $('#shoppingMallContraentrega').style.cursor='not-allowed'
        $('#shoppingMallContraentrega').style.background='#dddcdc'
        $('#shoppingMallContraentrega').style.color='#d3d1d1'
    }
}
function questions(){
    console.log('corriendo')
    let text='https://wa.me/573178123065?text='
    
    text+=
    `
     Hola amigos de SoySanjuanero.Online!
     Tengo dudas sobre la artículo ${paymentData.artNombre}.
     Me podrían ayudar?
    `
    window.open(text,'_blank')
}

//PAY BUTTONS
function verifyInputs(){
    let ok=true
    //nombre
    if(
        !$('#shoppingMallName').value.includes(' ') || 
        $('#shoppingMallName').value==' ' ||
        $('#shoppingMallName').value=='  '
        ){
            $('#shoppingMallName').style.border = "1px solid #FF0000"
            ok=false
    }else{
        $('#shoppingMallName').style.border = "1px solid #c3c3c3"
    }
    //whatsapp
    if(
        $('#shoppingMallNumber').value.length!=10
        ){
            $('#shoppingMallNumber').style.border = "1px solid #FF0000"
            ok=false
    }else{
        $('#shoppingMallNumber').style.border = "1px solid #c3c3c3"
    }
    //ano de nacimiento
    if(
        $('#shoppingMallBirthYear').value.length!=4
        ){
            $('#shoppingMallBirthYear').style.border = "1px solid #FF0000"
            ok=false
    }else{
        $('#shoppingMallBirthYear').style.border = "1px solid #c3c3c3"
    }
    //direccion
    if(
        $('#shoppingMallAddress').value=='' ||
        $('#shoppingMallAddress').value.length<8 ||
        !$('#shoppingMallAddress').value.includes(' ')
        ){
            $('#shoppingMallAddress').style.border = "1px solid #FF0000"
            ok=false
    }else{
        $('#shoppingMallAddress').style.border = "1px solid #c3c3c3"
    }

    return ok
}
function payWithCash(){
    const ok=verifyInputs()
    let now=Date.now()
    if(ok){
        swal({
            title: "¿ESTÁS SEGUR@?",
            text: "Una vez realizado el PEDIDO, todo nuestro equipo se PONDRÁ EN MARCHA para hacerte llegar tu producto lo más RÁPIDO POSIBLE. Se abrirá WHATSAPP para notificarnos.",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then(
        r=>{
        if(r){
                paymentData={
                    medio:'cash',
                    cliNombre:$('#shoppingMallName').value.toUpperCase(),
                    whatsapp:$('#shoppingMallNumber').value,
                    anio:$('#shoppingMallBirthYear').value,
                    region:$('#selectRegion').value,
                    city:$('#selectCity').value,
                    dir:$('#shoppingMallAddress').value,
                    cant:paymentData.cant,
                    artNombre:paymentData.artNombre,
                    artPrecio:paymentData.artPrecio,
                    nacional:paymentData.nacional,
                    total:paymentData.total,
                    fecha:firebase.firestore.FieldValue.serverTimestamp(),
                    ref:'Ref'+now
                }
                //REPORTA A BASE DE DATOS
                this.db.collection('ventas').add(paymentData)
                //NOTIFICA A WHATSAPP
                let text=`https://wa.me/573178123065?text=Hola!+%f0%9f%98%83%0d%0aQuiero+comprar+lo+siguiente+de+SoySanjuanero.Online%0d%0a%0d%0a`
                text+=`Para+pagar+CONTRAENTREGA%0d%0a%0d%0a`
                text+=`%f0%9f%8e%81+${paymentData.cant}+${paymentData.artNombre}++%f0%9f%92%b0${paymentData.artPrecio}%0d%0a`
                text+=`TOTAL%3a+${paymentData.total}%0d%0a%0d%0a`
                text+=`${paymentData.cliNombre}%0d%0a${paymentData.whatsapp}%0d%0a${paymentData.anio}%0d%0a${paymentData.dir}%0d%0a${paymentData.city}%0d%0a${paymentData.region}`

                window.open(text,'_blank')
            }
        })   
    }
}
function payWithWompi(){
    const ok=verifyInputs()
    let now=Date.now()
    swal({
        title:"IMPORTANTE!",
        text:"Al FINALIZAR el pago, PULSA el botón REGRESAR AL COMERCIO o FINALIZAR para contactarte con el vendedor por WHATSAPP.",
        icon:"warning",
        button:"Entendí!"
    })
    .then(x=>{
        if(ok){
            paymentData={
                medio:'card',
                cliNombre:$('#shoppingMallName').value.toUpperCase(),
                whatsapp:$('#shoppingMallNumber').value,
                anio:$('#shoppingMallBirthYear').value,
                region:$('#selectRegion').value,
                city:$('#selectCity').value,
                dir:$('#shoppingMallAddress').value,
                cant:paymentData.cant,
                artNombre:paymentData.artNombre,
                artPrecio:paymentData.artPrecio,
                nacional:paymentData.nacional,
                total:paymentData.total,
                fecha:firebase.firestore.FieldValue.serverTimestamp(),
                ref:'Ref'+now,
                status:'PENDING'
            }
            this.db.collection('ventas').add(paymentData)
            var checkout = new WidgetCheckout({
                currency: 'COP',
                amountInCents:paymentData.total*100,
                reference:'Ref'+now,
                publicKey: 'pub_prod_fjmg6rFhMISzqHrBANhPJXEQtbnmnSIh',
                redirectUrl:'https://soysanjuanero.online/pago.html' 
            })
            checkout.open(x=>{
                window.open('https://soysanjuanero.online/pago.html?id='+x.transaction.id,'blank()')
            })
        }  
    })
}
function donate(){
    let now=Date.now()
    paymentData={
        notaDonacion:$('#donateNotes').value,
        total:$('#donateAmount').value,
        fecha:firebase.firestore.FieldValue.serverTimestamp(),
        ref:'Ref'+now,
        status:'PENDING'
    }
    this.db.collection('ventas').add(paymentData)
    var checkout = new WidgetCheckout({
        currency: 'COP',
        amountInCents:paymentData.total*100,
        reference:'Ref'+now,
        publicKey: 'pub_prod_fjmg6rFhMISzqHrBANhPJXEQtbnmnSIh',
        redirectUrl:'https://soysanjuanero.online/pago.html' 
    })
    checkout.open(x=>{
        window.open('https://soysanjuanero.online/pago.html?id='+x.transaction.id,'blank()')
    })
}

//SHOW STORIES
showStories()
function showStories(){
    let hmtlText=''
    let id=0
    STORIES.forEach(story => {
        /* IMAGE */
        hmtlText+=
        `<div class="card" id="card-${id}">
            <div class="containerImgFull" id="containerImgFull-${id}">`
                if(story.ArtImg){
                    let r=0
                    story.ArtImg.forEach(img=>{
                        hmtlText+=`
                            <div class="containerImg">
                                <img
                                    src="${img}" 
                                    alt="imgsStory" 
                                    class="cardImgElement" 
                                    id="cardImgElement-${r}-${id}">
                            </div>
                        `
                        r++ 
                    })
                }else if(story.ArtVideo){
                    hmtlText+=`
                    <div class="containerImg">
                        ${story.ArtVideo}
                    </div>
                ` 
                }

            hmtlText+=`</div>`
            /* NAV IMAGE */
            if(story.ArtImg && story.ArtImg.length>1){
                hmtlText+=`
                <div class="cardContainerImgNav">
                    <img 
                        src="./icons/prev_24px.png" 
                        alt="prev" 
                        onclick="prevCardImgElement(this)"
                        id="prev-${id}">
                    <img 
                        src="./icons/right_button_24px.png" 
                        alt="prev" 
                        onclick="nextCardImgElement(this)"
                        id="next-${id}">
                </div>
                `
            }
            /* SOCIAL ELEMENTS */
            hmtlText+=`<div class="cardContainerSocial" id="cardContainerSocial-${id}">`
                if(story.socialFacebook && story.socialFacebook!=''){
                    hmtlText+=`
                    <a 
                        href="${story.socialFacebook}" 
                        class="cardSocialElement"
                        target="blank()">
                            <img src="./icons/facebook_circled_64px.png">
                    </a>`
                }
                if(story.socialInstagram && story.socialInstagram!=''){
                    hmtlText+=`
                    <a 
                        href="${story.socialInstagram}" 
                        class="cardSocialElement"
                        target="blank()">
                            <img src="./icons/instagram_old_64px.png">
                    </a>`
                }
                if(story.socialYoutube && story.socialYoutube!=''){
                    hmtlText+=`
                    <a 
                        href="${story.socialYoutube}" 
                        class="cardSocialElement"
                        target="blank()">
                            <img src="./icons/youtube_64px.png">
                    </a>`
                }
                if(story.socialWhatsapp && story.socialWhatsapp!=''){
                    hmtlText+=`
                    <a 
                        href=https://wa.me/57${story.socialWhatsapp}
                        class="cardSocialElement"
                        target="blank()">
                            <img src="./icons/whatsapp_64px.png">
                    </a>`
                }
                if(story.socialTwitter && story.socialTwitter!=''){
                    hmtlText+=`
                    <a 
                        href="${story.socialTwitter}" 
                        class="cardSocialElement"
                        target="blank()">
                            <img src="./icons/twitter_64px.png">
                    </a>`
                }
                if(story.socialTel && story.socialTel!=''){
                    hmtlText+=`
                    <a 
                        href="Tel:${story.socialTel}" 
                        class="cardSocialElement"
                        target="blank()">
                            <img src="./icons/cell_phone_64px.png">
                    </a>`
                }
                if(story.socialWeb && story.socialWeb!=''){
                    hmtlText+=`
                    <a 
                        href="${story.socialWeb}" 
                        class="cardSocialElement"
                        target="blank()">
                            <img src="./icons/website_64px.png">
                    </a>`
                }
            hmtlText+=`</div>`
            if(story.Tienda){
                hmtlText+=`
                <div class="cardContainerStore" id="cardContainerStore-${id}">
                    <select 
                        name="Selecciona" 
                        id="cant-${id}"
                        class="cant">`
                        for(let i=1;i<=5;i++){
                            hmtlText+=`<option value="${i}">${i}</option>`
                        }
                    hmtlText+=`</select>`
                    hmtlText+=`
                    <select 
                        name="Selecciona" 
                        id="nombre-${id}"
                        class="nombre"
                        disabled=true>`
                        let i=0
                        story.ArtNombre.forEach(n=>{
                            hmtlText+=`<option value="${i}">${n}</option>`
                            i++
                        }) 
                    hmtlText+=`</select>`
                    hmtlText+=`<div 
                        class="cardSocialElement"
                        id="cardSocialElement-${id}"
                        onclick="openShoppingMall(this)">
                            <img src="./icons/storeBuy.png" alt="">
                    </div>`
                hmtlText+=`</div>`
            }
            if(story.Texto){
                hmtlText+=`<div class="cardText">`
                    hmtlText+=story.Texto
                hmtlText+=`</div>`
            } 
        hmtlText+=`</div>`
        id++
    });
    $('#main').innerHTML=hmtlText
}

//NEXT PREV IMAGE
function prevCardImgElement(obj){
    const id=obj.id.split('-')[1]
    const c= $('#containerImgFull-' + id)
    const w=parseInt($('#card-'+ id).offsetWidth)
    const story=STORIES[id]
    const imgCant=story.ArtImg.length
    const leftIni=c.style.marginLeft.substring(0,c.style.marginLeft.length-2)
    const leftMax=(imgCant-1)*-w
    let leftFin;
    let numImg=0
    if(c.style.marginLeft=='' ||c.style.marginLeft=='0px'){
        leftFin=leftMax+'px'
        c.style.marginLeft=leftFin
        $('#nombre-'+id).value=imgCant-1
    }else{
        leftFin=w+parseInt(leftIni) 
        c.style.marginLeft=leftFin+'px'
        $('#nombre-'+id).value--
    }
}
function nextCardImgElement(obj){

    const id=obj.id.split('-')[1]
    const story=STORIES[id]
    const imgCant=story.ArtImg.length
    
    if(imgCant>1) {
        const c= $('#containerImgFull-' + id)
        const w=parseInt($('#card-'+ id).offsetWidth) 
        let numImg=0
        if(c.style.marginLeft==''){
            c.style.marginLeft="-"+w+"px"
            $('#nombre-'+id).value=1
        }else{
            const leftIni=c.style.marginLeft.substring(0,c.style.marginLeft.length-2)
            const leftMax=(imgCant-1)*-w
            if(leftMax==leftIni){   
                c.style.marginLeft='0px'
                $('#nombre-'+id).value=0
            }else{
                const leftFin=leftIni-w
                c.style.marginLeft=leftFin+'px'
                $('#nombre-'+id).value++
            }
        } 
    } 
}

//SHOW ABOUT
function ShowAbout(r){
    let texto=''
    $('.aboutDetail').classList.remove('hide')
    $('.containerDetail').innerHTML=''
    if(r=='SoySanjuanero'){
        texto=
        `
            <i   class="material-icons aboutDetailClose" onclick="ShowAbout('close')">close</i>
            <img class="detailImg" src="https://i.imgur.com/iAsv8NK.jpg" alt="SoySanjuanerologo">
            <span>SOY SANJUANERO</span>
            <p class="detailP">
              #SoySanjuanero inicia sus labores en el año 2.017, cuando un grupo de amigos locales identifican que dentro de cada  ámbito cultural presente en este municipio, siempre existe una historia que contar, por lo tanto, se conforma un grupo de trabajo colectivo que se da a la tarea de investigar,  documentar y difundir a través de escritos, imágenes y videos las vivencias que resaltan lo que es ser sanjuanero.  <br><br> #SoySanjuanero no tiene color político, su trabajo es netamente independiente, fuera de cualquier tipo de  intervención pública o privada. Sin embargo, su raíz  principal se sostiene gracias al valor que cada uno de ustedes como sociedad nos brinda para seguir avanzando en este hermoso proyecto.
            </p>
            <img class="detailImg" src="https://i.imgur.com/hUj1dZu.jpg" alt="entrevista">
            <br><br><br><br><br><br>
        `
    }else if(r=='SanJuanNepo'){
        texto=
        `
            <i   class="material-icons aboutDetailClose" onclick="ShowAbout('close')">close</i>
            <img class="detailImg" src="https://i.imgur.com/62c5vfr.jpg" alt="SanJuanNepo">
            <span class="detailSpan">SAN JUAN NEPOMUCENO</span>
            <p class="detailP">
            San Juan Nepomuceno es la tierra donde se puya bastante ñame y yuca harinosa con suero atollabuey, queso finquero y machucao de ají chivato. Aquí te embarrutas el bigote de merengue y dulce de leche saboreando una galleta maria luisa y además somos la tierra donde suena la abarca tres puntá del campesino y rebuzna el burro avisando que llegó el bastimento. Somos la tierra donde la cultura y la inteligencia es peste y se riega como la verdolaga en playón, estamos repletos de gente servicial, ponedera de sebo y con berraquera pa echá pa lante cualquier situación. <br><br> Fue fundado durante la época de la Colonia, el  10 de agosto  de  1776 , por Antonio de la Torre y Miranda, cuando llegó al valle de los Carretos trayendo consigo las primeras familias provenientes de Pileta (hoy Corozal) y de San Benito de Abad; estas familias estuvieron constituidas por 120 personas. El 11 de mayo de 1779 se protocolizaron los límites y las actas de posesión de los ejidos y distritos de San Juan y San Cayetano ante el escribano del Carmen, fue declarado municipio en el año de 1870. Luego se organiza la población convirtiéndose en un centro de mercadeo regional. <br><br> Según los restos arqueológicos encontramos en la región que este sitio estuvo habitado durante épocas muy remotas por grupos indígenas de la cultura denominada Malibues que pertenecían a la gran familia Caribe, estos nos dejaron como legado cultural el uso del bejuco Malibú, utilizaron la construcción de casas y corrales. Vivían en una etapa conocida en la arqueología americana Colombiana como Paleóindio Arcaico, cuyas principales características son: recolección de frutas y raíces, fabricación de una cerámica rústica con grabaciones zoomorfas. Estos restos señalan los primeros asentamientos indígenas de Colombia y se localizan en la costa norte del país, remontándose a una antigüedad de 400 a 1000 años a. C. En la época federal colombiana perteneció a la Provincia del Carmen en el Estado Soberano de Bolívar.
            </p>
            <iframe src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15719.173627315484!2d-75.09258272264908!3d9.951139836153866!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e58b6685173d38b%3A0xa300e510d5fcb0a!2sSan%20Ju%C3%A1n%20Nepomuceno%2C%20Bol%C3%ADvar!5e0!3m2!1ses-419!2sco!4v1593204763930!5m2!1ses-419!2sco' width='100%' height='400' frameborder='0' style='border:0;' allowfullscreen='' aria-hidden='false' tabindex='0'></iframe>
            <br><br><br><br><br><br>
        `
    }else if(r=='donations'){
        texto=
        `
            <i   class="material-icons aboutDetailClose" onclick="ShowAbout('close')">close</i>
            <img  class="detailImg" src="https://i.imgur.com/bOjS5xq.jpg">
            <span class="detailSpan">DONACIONES</span>
            <p class="detailP">
                Si quieres apoyarnos por favor realiza una compra de cualquier producto o servicio. Si te encuentras fuera de Colombia y no puedes, o sencillamente no quieres adquirir nada, pero aún así quieres apoyar nuestro proyecto, puedes hacer una donación.
            <br><br>
                Con tu donación estás APOYANDO el proyecto SOY SANJUANERO,  de San Juan Nepomuceno, un pueblo de gente PUJANTE Y HERMOSA que ha sido golpeada durante muchos años por la GUERRA. 
            <br><br>
                Este proyecto busca resaltar la idiosincrasia sanjuanera, artistas, artesanos, costumbres, el Santuario de Flora y Fauna Los Colorados y todo lo que lo rodea. 
            <br><br>
                Por otro lado SoySanjuanero busca apoyar los  productos y servicios de los sanjuaneros a nivel nacional. 
            <br><br>
                Es así como favorecer este proyecto es poner un granito de arena para la cultura y la economía de la región.
            </p>
            
            <textarea id="donateNotes" rows="5" cols="25" placeholder="Tus datos y lo que nos quieras decir"></textarea>
            
            <input id="donateAmount" type="number" value="20000">
            <span onclick="donate()" id="donateSpan"><img src="./icons/bank_cards_64px.png"><div id="donateButton">DONAR</div> </span>
            
            <br><br><br><br>
        `
    }else if(r=='close'){
        $('.aboutDetail').classList.add('hide')
    }
    $('.containerDetail').innerHTML=texto
}

//MUSIC
let currentSong=0
let playlistOrder=[]
do{
    const n=Math.floor(Math.random()*PLAYLIST.length)
    if(!playlistOrder.includes(n)){
        playlistOrder.push(n)
    }
}while (playlistOrder.length!=PLAYLIST.length) 

function playStopMusic(){
    const icon=$('#headerPlayPauseMusic').src
    if(icon.includes('musical_notes_64px.png')){
        $('#headerPlayPauseMusic').src='./icons/pause_64px.png'
        nextSong()
    }else if(icon.includes('pause_64px.png')){
        $('#headerPlayPauseMusic').src='./icons/musical_notes_64px.png'
        $('#player').pause()
    }
}
function nextSong(){
    $('#player').src=PLAYLIST[playlistOrder[currentSong]]
    $('#player').play()
    currentSong++
    if(currentSong===PLAYLIST.length){
        currentSong=0
    }
}

