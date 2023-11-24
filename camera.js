const divBanner = document.getElementById('banner')
const main = document.getElementById('main')
let locFoto
const marcacao = document.getElementById('marcar')

divBanner.addEventListener('mouseenter', () =>{

    const camBanner = document.getElementById('camBanner')

    camBanner.style.display = 'block'
})
divBanner.addEventListener('mouseleave', () =>{

    const camBanner = document.getElementById('camBanner')

    camBanner.style.display = 'none'
})




var mediaStream

function abrirCamera(parametro) {
    locFoto = parametro
    const cameraDiv = document.getElementById('cameraDiv')
    cameraDiv.style.display = 'flex'

    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        .then(function (stream){
            mediaStream = stream

            const areaVideo = document.getElementById('camera')
            areaVideo.srcObject = stream

        })
        .catch(function (error) {
            console.error('Erro ao acessar a câmera', error)
        })

        if(locFoto == 'banner'){  
            marcacao.style.display = 'block'
        }else{
            marcacao.style.display = 'none'  
        }
    main.style.display = 'none'
}

function tirarFoto(){


    const areaVideo = document.getElementById('camera')
    const canvas = document.createElement('canvas')
    canvas.width = areaVideo.videoWidth
    canvas.height = areaVideo.videoHeight
    const context = canvas.getContext('2d');
    context.drawImage(areaVideo, 0, 0, canvas.width, canvas.height)

    // Convertendo a imagem para o formato base64
    const imageDataURL = canvas.toDataURL()

    // Armazenando a imagem no background da div 
    if(locFoto == 'banner'){
        const fotoDiv = document.getElementById('banner')
        fotoDiv.style.backgroundImage = `url(${imageDataURL})`  
        marcacao.style.display = 'block'
    }else{
        marcacao.style.display = 'none'
        const fotoDiv = document.getElementById('fotoPerfil')
        fotoDiv.style.backgroundImage = `url(${imageDataURL})`  
    }


    // const downloadLink = document.createElement('a')

    // downloadLink.href = imageDataURL
    // downloadLink.download = 'foto.png'
    // downloadLink.textContent = 'Clique para baixar'
    // document.body.appendChild(downloadLink)

    fechar()
}
function fechar() {
    navigator.mediaDevices.getUserMedia({ video: false})
    const areaVideo = document.getElementById('camera')
    areaVideo.srcObject = null
    mediaStream = null
    const cameraDiv = document.getElementById('cameraDiv')
    cameraDiv.style.display = 'none'
    main.style.display = 'block '
}

