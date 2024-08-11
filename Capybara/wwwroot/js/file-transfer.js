let dotNetHelper;
let stunServer;
let localConnection, remoteConnection;
let localDataChannel, remoteDataChannel;

async function initialization(dotNetHelperValue, stunServerValue) {
    dotNetHelper = dotNetHelperValue;
    stunServer = stunServerValue;
}

//execute in client A
async function createSenderConnection() {
    const config = { iceServers: [{ urls: stunServer }] };
    localConnection = new RTCPeerConnection(config);
    // create data channel
    let dataChannelOptions = {
        ordered: true, //maintain order
    };
    localDataChannel = localConnection.createDataChannel("dataChannel", dataChannelOptions);
    localDataChannel.onopen = dataChannelStateChange;
    localDataChannel.onclose = dataChannelStateChange;

    // listen ICE candidate event
    localConnection.onicecandidate = event => {
        if (event.candidate) {
            // send local ICE candidate to signaling server
            dotNetHelper.invokeMethodAsync('SendIceCandidateToServer', JSON.stringify(event.candidate));
        }
    }

    // 创建 SDP Offer
    const offer = await localConnection.createOffer();
    await localConnection.setLocalDescription(offer);

    // send SDP Offer to signaling server
    dotNetHelper.invokeMethodAsync('SendOfferToServer', JSON.stringify(offer));
}

function dataChannelStateChange() {
    if (localDataChannel.readyState === 'open') {
        dotNetHelper.invokeMethodAsync('SenderConnected');
    }
}

//  use received SDP answer from client A to set remote description
async function receiveAnswer(answer) {

    const answerObj = JSON.parse(answer);
    await localConnection.setRemoteDescription(
        {
            type: answerObj.type,
            sdp: answerObj.sdp
        });
}

// execute in client B 
async function createReceiverConnection(offer) {

    const config = { iceServers: [{ urls: stunServer }] };
    remoteConnection = new RTCPeerConnection(config);

    // listen ICE candidate event
    remoteConnection.onicecandidate = event => {
        if (event.candidate) {
            // send local ICE candidate to signaling server
            dotNetHelper.invokeMethodAsync('SendIceCandidateToServer', JSON.stringify(event.candidate));
        }
    }
    remoteConnection.ondatachannel = event => {

        // set data channel event process
        event.channel.onopen = handleDataChannelOpen;
        event.channel.onmessage = receiveFileData;
    };
    // set remote SDP
    const offerObj = JSON.parse(offer);
    await remoteConnection.setRemoteDescription(
        {
            type: offerObj.type,
            sdp: offerObj.sdp
        });

    // create SDP Answer
    const answer = await remoteConnection.createAnswer();
    await remoteConnection.setLocalDescription(answer);

    // send SDP Answer to signaling server
    dotNetHelper.invokeMethodAsync('SendAnswerToServer', JSON.stringify(answer));
}

// execute both in A and B
function receiveIceCandidate(candidate) {
    //  add remote ICE candidate in both client connection
    const candidateObj = JSON.parse(candidate);
    const iceCandidate = new RTCIceCandidate(
        {
            candidate: candidateObj.candidate,
            sdpMid: candidateObj.sdpMid,
            sdpMLineIndex: candidateObj.sdpMLineIndex
        });
    if (localConnection) {
        localConnection.addIceCandidate(iceCandidate);
    } else if (remoteConnection) {
        remoteConnection.addIceCandidate(iceCandidate);
    }
}

function handleDataChannelOpen() {
    dotNetHelper.invokeMethodAsync('ReceiverConnected');
}

let readyToSendKey = "ReadyToSend";
let fileSent = "FileSent";
function receiveFileData(event) {

    const receivedData = event.data;
    if (typeof receivedData === 'string') {

        if (receivedData.indexOf(readyToSendKey) == 0) {
            let fileInfo = receivedData.substring(readyToSendKey.length);
            //receive file info
            dotNetHelper.invokeMethodAsync('FileInfoReceived', fileInfo);
        } else if (receivedData == fileSent) {
            dotNetHelper.invokeMethodAsync('FileReceivedWithWebRTC');
        }

    } else {
        dotNetHelper.invokeMethodAsync('FileReceivingWithWebRTC', new Uint8Array(receivedData));
    }
}

function sendFileInfo(fileInfo) {
    //send file info
    localDataChannel.send(readyToSendKey + fileInfo);
}

function sendFile(fileArray) {
    sendFileDataChunks(fileArray);
}

const CHUNK_SIZE = 16384; // size of blocs
const SEND_INTERVAL = 20; // send interval（ms）of every blocs
function sendFileDataChunks(byteArray) {
    // sending blocs
    const chunk = byteArray.slice(0, CHUNK_SIZE);
    localDataChannel.send(chunk);
    // deleted sent blocs
    byteArray = byteArray.slice(CHUNK_SIZE);
    dotNetHelper.invokeMethodAsync('FileSending', byteArray.length);

    if (byteArray.length > 0) {
        setTimeout(() => {
            sendFileDataChunks(byteArray);
        }, SEND_INTERVAL);
    } else {
        // data file tranfert completed
        localDataChannel.send(fileSent);
        dotNetHelper.invokeMethodAsync('FileSent');
    }
}

function saveToFileWithBufferAndName(fileName, buffer) {
    const blob = new Blob([buffer], { type: 'application/octet-stream' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(link.href);
}