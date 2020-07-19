//SELECTOR 
function $(selector){
    return document.querySelector(selector)
}

//CREATE SINGLE CARD
function createOneCard(story,id){
    //card
    const newCard=document.createElement('div');
    newCard.setAttribute('class','card');
    newCard.setAttribute('id','card-'+id);
    $('#main').appendChild(newCard);
        //cardContainerImg
        const cardContainerImg=document.createElement('div')
        cardContainerImg.setAttribute('class','cardContainerImg')
        cardContainerImg.setAttribute('id','cardContainerImg-' + id)
        newCard.appendChild(cardContainerImg);
            //cardImgElement img 
            let cardImgElement
            let j=0
            for(let img of story.img){
                cardImgElement=document.createElement('img')
                cardImgElement.setAttribute('class','cardImgElement')
                cardImgElement.setAttribute('src',img)
                cardImgElement.setAttribute('id','img-'+ id)
                cardImgElement.setAttribute('onclick','nextCardImgElement(this)')
                cardContainerImg.appendChild(cardImgElement)
                j++
            }
        //cardContainerImgNav
        if(story.img.length>1){
            const cardContainerImgNav=document.createElement('div')
            cardContainerImgNav.setAttribute('class','cardContainerImgNav')
            newCard.appendChild(cardContainerImgNav);
                //cardContainerImgNav button prev
                cardImgElement=document.createElement('img')
                cardImgElement.setAttribute('src','./icons/prev_24px.png')
                cardImgElement.setAttribute('id','prev-'+id)
                cardImgElement.setAttribute('onclick','prevCardImgElement(this)')
                cardContainerImgNav.appendChild(cardImgElement)
                //cardContainerImgNav button next
                cardImgElement=document.createElement('img')
                cardImgElement.setAttribute('src','./icons/right_button_24px.png')
                cardImgElement.setAttribute('id','next-'+id)
                cardImgElement.setAttribute('onclick','nextCardImgElement(this)')
                cardContainerImgNav.appendChild(cardImgElement)
        }
        //cardContainerSocial
        const cardContainerSocial=document.createElement('div')
        cardContainerSocial.setAttribute('class','cardContainerSocial')
        cardContainerSocial.setAttribute('id','cardContainerSocial-'+id)
        newCard.appendChild(cardContainerSocial);
            //cardSocial
            createSocialElement('WhatsApp',story.socialWhatsapp,cardContainerSocial)
            createSocialElement('Facebook',story.socialFacebook,cardContainerSocial)
            createSocialElement('Instagram',story.socialInstagram,cardContainerSocial)
            createSocialElement('YouTube',story.socialYoutube,cardContainerSocial)
            createSocialElement('WebSite',story.socialWeb,cardContainerSocial)
            createSocialElement('Email',story.socialEmail,cardContainerSocial)
            createSocialElement('Phone',story.socialTel,cardContainerSocial)
            //quantity selection
            if(story.nameStore){
                const quantitySelection=document.createElement('select')
                quantitySelection.setAttribute('name','Selecciona')
                quantitySelection.setAttribute('class','cardContainerSocialList')
                quantitySelection.setAttribute('id','cant-'+id)
                cardContainerSocial.appendChild(quantitySelection)
                    //quantity selection value
                    for(let j=1;j<=5;j++){
                        const quantitySelectionValue=document.createElement('option')
                        quantitySelectionValue.setAttribute('value-',j)
                        quantitySelectionValue.innerHTML=j
                        quantitySelection.appendChild(quantitySelectionValue)
                    }
                //crea icono de compra
                const cardSocial=document.createElement('div')
                cardSocial.setAttribute('class','cardSocial')
                cardSocial.setAttribute('onclick','openShoppingMall(this)')
                cardSocial.setAttribute('id','add-'+id)
                cardContainerSocial.appendChild(cardSocial)
                    //cardSocial img
                    const cardSocialImg=document.createElement('img')
                    cardSocialImg.setAttribute('src','./icons/add_shopping_cart_64px.png')
                    cardSocial.appendChild(cardSocialImg)
            }
        //cardText
        if(story.text){
            const cardText=document.createElement('div')
            cardText.setAttribute('class','cardText')
            cardText.innerHTML=story.text
            newCard.appendChild(cardText);
        }
}

//CREATE SOCIAL ELEMENT
function createSocialElement(type,SocialElement,cardContainerSocial){
    const id =cardContainerSocial.id.split('-')[1]
    if(SocialElement && SocialElement!=''){
        //cardSocial
        let icon=''
        let addText=''
        let endText=''
        switch(type){
            case 'WhatsApp':
                icon='./icons/whatsapp_64px.png';
                addText='https://wa.me/57'
                endText='?text=Hola!%20Vi%20tu%20anuncio%20en%20SoySanjuanero%20y%20me%20gustaría%20saber%20más%20de%20tus%20servicios!'
                break;
            case 'Facebook':
                icon='./icons/facebook_circled_64px.png';
                addText=''
                break;
            case 'Instagram':
                icon='./icons/instagram_old_64px.png';
                addText=''
                break;
            case 'YouTube':
                icon='./icons/youtube_64px.png';
                addText='';
                break;
            case 'WebSite':
                icon='./icons/website_64px.png';
                addText=''
                break;
            case 'Email':
                icon='./icons/email_64px.png';
                addText='mailto:'
                break;
            case 'Phone':
                icon='./icons/cell_phone_64px.png';
                addText='tel:'
                break;
        }
        const cardSocial=document.createElement('a')
        cardSocial.setAttribute('class','cardSocial')
        cardSocial.setAttribute('onclick',"sumarClick('"+ id +"','" + type + "')")
        cardSocial.setAttribute('target','blank()')
        cardSocial.setAttribute('href',addText+SocialElement+endText)
        cardContainerSocial.appendChild(cardSocial)
            //cardSocial img
            const cardSocialImg=document.createElement('img')
            cardSocialImg.setAttribute('src',icon)
            cardSocial.appendChild(cardSocialImg)
    }
}

//NEXT IMG
function nextCardImgElement(obj){
    const id=obj.id.split('-')[1]
    const story=STORIES.filter(x=>x[0]===id)
    const imgCant=story[0][1].img.length
    
    if(imgCant>1) {
        const c= $('#cardContainerImg-' + id)
        const w=parseInt($('#card-'+ id).offsetWidth) 
        if(c.style.marginLeft==''){
            c.style.marginLeft="-"+w+"px"
        }else{
            const leftIni=c.style.marginLeft.substring(0,c.style.marginLeft.length-2)
            const leftMax=(imgCant-1)*-w
            if(leftMax==leftIni){   
                c.style.marginLeft='0px'
            }else{
                const leftFin=leftIni-w
                c.style.marginLeft=leftFin+'px'
            }
        } 
    }
}

//PREV IMG
function prevCardImgElement(obj){
    const id=obj.id.split('-')[1]
    const c= $('#cardContainerImg-' + id)
    const w=parseInt($('#card-'+ id).offsetWidth)
    const story=STORIES.filter(x=>x[0]===id)
    const imgCant=story[0][1].img.length
    const leftIni=c.style.marginLeft.substring(0,c.style.marginLeft.length-2)
    const leftMax=(imgCant-1)*-w
    let leftFin;
    if(c.style.marginLeft=='' ||c.style.marginLeft=='0px'){
        leftFin=leftMax+'px'
        c.style.marginLeft=leftFin
    }else{
        leftFin=w+parseInt(leftIni) 
        c.style.marginLeft=leftFin+'px'
    }
}

//SHOW OR HIDE LATERAL MENU
function showHideMenu(){
    const menu=$('.menu')
    const overlay=$('#menuOverlay')
    const sandwich=$('#sandwich')
    if(menu.classList.contains('hideMenu')){
        menu.classList.remove('hideMenu')
        overlay.classList.add('showOverlay')
    }else{
        menu.classList.add('hideMenu') 
        overlay.classList.remove('showOverlay')
    }
}

//MOSTRAR DETALLES DE REDES SOCIALES
function ShowMenuSocialDetail(cont){
    $('#menuSocialDetail').innerHTML=cont.dataset.text
}

// SEARCH HISTORIES
function buscarHistoria(){
    const c=document.querySelectorAll('.card')
    const menuFilterInput=$('#filterInput')

    c.forEach(x=>x.classList.remove('hide'))

    if(menuFilterInput.value.length>2){
        STORIES.forEach(item=>{
            if(!item[1].text && !item[1].hiddenText){
                $('#card-'+item[0]).classList.add('hide');
            }
            if(item[1].text){
                const t=item[1].text.toUpperCase()
                const m=menuFilterInput.value.toUpperCase()
                if(!t.includes(m)){
                    $('#card-'+item[0]).classList.add('hide')
                }
            }
            if(item[1].hiddenText){
                const ht=item[1].hiddenText.toUpperCase()
                const m=menuFilterInput.value.toUpperCase()
                if(!ht.includes(m)){
                    $('#card-'+item[0]).classList.add('hide')
                }else{
                    $('#card-'+item[0]).classList.remove('hide')
                }
            };
        })
    }
}
function seleccionarTodoInput(t){
    t.select()
}

//SHOW ABOUT
function hideAbout(){
    $('.aboutDetail').classList.add('hide')
    $('.containerDetail').innerHTML=''
}
function showSoySanjuanero(){
    //About Detail
    const aboutDetail=$('#aboutDetail')
    aboutDetail.classList.remove('hide')
    //Container
    const containerDetail=$('.containerDetail');
    //Image
    const detailImg=document.createElement('img');
    detailImg.setAttribute('class','detailImg')
    detailImg.setAttribute('src','https://i.imgur.com/iAsv8NK.jpg')
    containerDetail.appendChild(detailImg);
    
    //Title
    const detailTitle=document.createElement('div');
    detailTitle.setAttribute('class','detailTitle');
    detailTitle.innerHTML='SOY SANJUANERO'
    containerDetail.appendChild(detailTitle);
    //Text
    const detailText=document.createElement('div');
    detailText.setAttribute('class','detailText');
    detailText.innerHTML='San Juan Nepomuceno es un municipio ubicado en la parte norte del departamento de Bolívar.  Rico en cultura, gastronomía e historia. Éste municipio  además pertenece a la región de Los Montes De María, es reconocido por el Santuario de Flora y Fauna Los Colorados.  #SoySanjuanero inicia sus labores en el año 2.017, cuando un grupo de amigos locales identifican que dentro de cada  ámbito cultural presente en este municipio, siempre existe una historia que contar, por lo tanto, se conforma un grupo de trabajo colectivo que se da a la tarea de investigar,  documentar y difundir a través de escritos, imágenes y videos las vivencias que resaltan lo que es ser sanjuanero.  <br><br> #SoySanjuanero no tiene color político, su trabajo es netamente independiente, fuera de cualquier tipo de  intervención pública o privada. Sin embargo, su raíz  principal se sostiene gracias al valor que cada uno de ustedes como sociedad nos brinda para seguir avanzando en este hermoso proyecto.'
    containerDetail.appendChild(detailText);
}
function showSanJuanNepo(){
    //About Detail
    const aboutDetail=$('#aboutDetail')
    aboutDetail.classList.remove('hide')
    //Container
    const containerDetail=$('.containerDetail');
    //Image
    const detailImg=document.createElement('img');
    detailImg.setAttribute('class','detailImg')
    detailImg.setAttribute('src','https://scontent.fbaq5-1.fna.fbcdn.net/v/t1.0-9/s960x960/103790826_1136393816744606_8841400399473692648_o.jpg?_nc_cat=103&_nc_sid=2d5d41&_nc_eui2=AeHaosbFPsdElITSE9j57BZ8_1YxKiDJ1Qb_VjEqIMnVBj23nGqekTMLFeG__5DEywo&_nc_ohc=FmQpzeXXfusAX8hAwdh&_nc_ht=scontent.fbaq5-1.fna&_nc_tp=7&oh=f6ae356fec4f2ab4940006dfdc2af1a3&oe=5F1C094E')
    containerDetail.appendChild(detailImg);
    
    //Title
    const detailTitle=document.createElement('div');
    detailTitle.setAttribute('class','detailTitle');
    detailTitle.innerHTML='SAN JUAN NEPOMUCENO'
    containerDetail.appendChild(detailTitle);
    //Text
    const detailText=document.createElement('div');
    detailText.setAttribute('class','detailText');
    detailText.innerHTML='San Juan Nepomuceno es la tierra donde se puya bastante ñame y yuca harinosa con suero atollabuey, queso finquero y machucao de ají chivato. Aquí te embarrutas el bigote de merengue y dulce de leche saboreando una galleta maria luisa y además somos la tierra donde suena la abarca tres puntá del campesino y rebuzna el burro avisando que llegó el bastimento. Somos la tierra donde la cultura y la inteligencia es peste y se riega como la verdolaga en playón, estamos repletos de gente servicial, ponedera de sebo y con berraquera pa echá pa lante cualquier situación. <br><br> Fue fundado durante la época de la Colonia, el  10 de agosto  de  1776 , por Antonio de la Torre y Miranda, cuando llegó al valle de los Carretos trayendo consigo las primeras familias provenientes de Pileta (hoy Corozal) y de San Benito de Abad; estas familias estuvieron constituidas por 120 personas. El 11 de mayo de 1779 se protocolizaron los límites y las actas de posesión de los ejidos y distritos de San Juan y San Cayetano ante el escribano del Carmen, fue declarado municipio en el año de 1870. Luego se organiza la población convirtiéndose en un centro de mercadeo regional. <br><br> Según los restos arqueológicos encontramos en la región que este sitio estuvo habitado durante épocas muy remotas por grupos indígenas de la cultura denominada Malibues que pertenecían a la gran familia Caribe, estos nos dejaron como legado cultural el uso del bejuco Malibú, utilizaron la construcción de casas y corrales. Vivían en una etapa conocida en la arqueología americana Colombiana como Paleóindio Arcaico, cuyas principales características son: recolección de frutas y raíces, fabricación de una cerámica rústica con grabaciones zoomorfas. Estos restos señalan los primeros asentamientos indígenas de Colombia y se localizan en la costa norte del país, remontándose a una antigüedad de 400 a 1000 años a. C. En la época federal colombiana perteneció a la Provincia del Carmen en el Estado Soberano de Bolívar.'
    containerDetail.appendChild(detailText);

    const detailMap=document.createElement('div')
    detailMap.setAttribute('class','detailImg');
    detailMap.innerHTML="<iframe src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15719.173627315484!2d-75.09258272264908!3d9.951139836153866!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e58b6685173d38b%3A0xa300e510d5fcb0a!2sSan%20Ju%C3%A1n%20Nepomuceno%2C%20Bol%C3%ADvar!5e0!3m2!1ses-419!2sco!4v1593204763930!5m2!1ses-419!2sco' width='100%' height='400' frameborder='0' style='border:0;' allowfullscreen='' aria-hidden='false' tabindex='0'></iframe>"
    containerDetail.appendChild(detailMap);
}

//SHOW SHOPPING MALL
let paymentData={}
function openShoppingMall(obj){
    //Lo pone visible
    $('#shoppingMall').classList.remove('hide')
    //lista cuidades y departamentos
    $('#selectRegion').innerHTML=''
    const region =listarCiudades()
    region.forEach(c=>{
        const newRegion=document.createElement('option');
        newRegion.setAttribute('value',c.departamento);
        newRegion.innerText=c.departamento
        $('#selectRegion').appendChild(newRegion)
    })
    //ciudad y departamento por defecto
    $('#selectRegion').value='Bolívar'
    loadCitys()
    $('#selectCity').value='San Juan Nepomuceno'
    //resumen de compra
    const id=obj.id.split('-')[1]
    const cant=$('#cant-'+id).value
    const story=STORIES.filter(x=>id===x[0])[0][1]
    const total=cant*parseInt(story.price) + parseInt(story.shippingCostTown)

    $('#resumenMallCant').innerHTML='Cant(un):__ <strong>' + cant +'</strong>'
    $('#resumenMallName').innerHTML='Nombre:___ <strong>' + story.nameStore +'</strong>'
    $('#resumenMallPrice').innerHTML='Precio:_____ <strong>' + formatCurrency("es-CO", "COP", 2, parseInt(story.price)) +'</strong>'
    $('#resumenMallShipping').innerHTML='Envio:______ <strong>' + formatCurrency("es-CO", "COP", 2, parseInt(story.shippingCostTown)) +'</strong>'
    $('#resumenMallTotal').innerHTML='Total:______ <strong>' + formatCurrency("es-CO", "COP", 2, total)   +'</strong>'
    $('#socialWhatsapp').innerHTML=story.socialWhatsapp
    
    paymentData={
        cant:cant,
        nameArt:story.nameStore,
        price:story.price,
        shippingCost:story.shippingCostTown,
        total:total,
        providerWhatsapp:story.socialWhatsapp
    }
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
}
function formatCurrency (locales, currency, fractionDigits, number) {
    var formatted = new Intl.NumberFormat(locales, {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: fractionDigits
    }).format(number);
    return formatted;
  }
function closeShoppingMall(){
    $('#shoppingMall').classList.add('hide')
}

//CASH BUTTON
async function payWithCash(){
    if(verifyInputs()){
        await reportPay({
            cant:paymentData.cant,
            nameArt:paymentData.nameArt,
            price:paymentData.price,
            shippingCost:paymentData.shippingCost,
            total:paymentData.total,
            costumerName:$('#shoppingMallName').value,
            costumerNumber:$('#shoppingMallNumber').value,
            costumerYear:$('#shoppingMallBirthYear').value,
            costumerRegion:$('#selectRegion').value,
            costumerCity:$('#selectCity').value,
            costumerAddress:$('#shoppingMallAddress').value,
            date:firebase.firestore.FieldValue.serverTimestamp(),
            paymentMethod:'cash',
            providerWhatsapp:paymentData.providerWhatsapp
        })
        closeShoppingMall()
    }
}

//WOMPY BUTTON
function payWithWompi(){
    if(verifyInputs()){
        let now=Date.now()
        //mando aca la informacion a la base de datos
        reportPay({
            cant:paymentData.cant,
            nameArt:paymentData.nameArt,
            price:paymentData.price,
            shippingCost:paymentData.shippingCost,
            total:paymentData.total,
            costumerName:$('#shoppingMallName').value,
            costumerNumber:$('#shoppingMallNumber').value,
            costumerYear:$('#shoppingMallBirthYear').value,
            costumerRegion:$('#selectRegion').value,
            costumerCity:$('#selectCity').value,
            costumerAddress:$('#shoppingMallAddress').value,
            date:firebase.firestore.FieldValue.serverTimestamp(),
            paymentMethod:'card',
            providerWhatsapp:paymentData.providerWhatsapp
        })
        var checkout = new WidgetCheckout({
            currency: 'COP',
            amountInCents: paymentData.total*100,
            reference:'Ref'+now,
            publicKey: 'pub_test_3jwUCFdgoY1Y316dFrtIpjCvVTaZrS63',
            redirectUrl:'http://127.0.0.1:5501/pages/pago.html'
        })
        checkout.open(function ( result ) {
           var transaction=result.transaction
/*            fetch('https://production.wompi.co/v1/transactions/'+transaction.id)
           .then(response=>console.log('para el id'+transaction.id+' hubo una respuesta de '+response)) */
        })
    }
}

//CONTACT COSTUMER - PROVIDER
function cerrarConfirmacion(obj){
    window.open(obj.dataText)
    $('#shopConfirmation').classList.add('hide')
}
//VERIFY INPUT DATA
function verifyInputs(){
    let ok=true
    const inputs=document.querySelectorAll('.campoMallInput')
    inputs.forEach(input=>{
        if(!input.value){ 
            input.style.border = "1px solid #FF0000"
            ok=false
        }else{
            input.style.border = "1px solid #c3c3c3"
        }
    })
    return ok
}

//SCROLL MAIN TO TOP
function scrollToTop(){
    $('#main').scrollTop= 0
}
//MUSIC
let playlist=[
    'https://firebasestorage.googleapis.com/v0/b/soysanjuanero-a5c1c.appspot.com/o/SOY%20SANJUANERO%20-%20JORGE%20LAMBIS%20JR.mp3?alt=media&token=f9022d5f-0a7d-4ab8-9414-957cf070f4f2',
    'https://firebasestorage.googleapis.com/v0/b/soysanjuanero-a5c1c.appspot.com/o/IMAGENES.mp3?alt=media&token=966329bb-b79d-4571-ad64-69f778cdeafd',
    'https://firebasestorage.googleapis.com/v0/b/soysanjuanero-a5c1c.appspot.com/o/LA%20PUYA%20DEL%20DIABLO.mp3?alt=media&token=e31913c1-c528-413a-a4a7-0cbda7c6ef9c',
    'https://firebasestorage.googleapis.com/v0/b/soysanjuanero-a5c1c.appspot.com/o/LOS%20SABANALES.mp3?alt=media&token=d6c7d3b6-37fc-44dd-9cfd-e708519b4f0e',
    'https://firebasestorage.googleapis.com/v0/b/soysanjuanero-a5c1c.appspot.com/o/NOCHE%20SIN%20LUCEROS.mp3?alt=media&token=804695a2-6474-42aa-b369-1b36bcad1096',
    'https://firebasestorage.googleapis.com/v0/b/soysanjuanero-a5c1c.appspot.com/o/SANJUANERA%20-%20HERMANOS%20ZULETA.mp3?alt=media&token=31213278-6e6a-4b87-b0f9-38b10ca9aba0',
    'https://firebasestorage.googleapis.com/v0/b/soysanjuanero-a5c1c.appspot.com/o/SOY%20SANJUANERO%20-%20JORGE%20LAMBIS%20JR.mp3?alt=media&token=f9022d5f-0a7d-4ab8-9414-957cf070f4f2'
]
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
    const n= Math.floor(Math.random()*playlist.length)
    $('#player').src=playlist[n]
    $('#player').play()
}

