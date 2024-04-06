// Constantes

var textArea = document.getElementById('text-area');
var sendButton = document.getElementById('send-button');
var chatArea = document.getElementById('chat-area');
var selectOfModel = document.getElementById('model-select');

// funciones

//ENVIAR UN MENSAJE

function sendMessageToGroq() {
  //CONSTANTES O DECALARACIONES
  var message = textArea.value;
  var model = selectOfModel.value;
  const url = 'https://api.groq.com/openai/v1/chat/completions';
  const headers = {
    Authorization: `Bearer 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`,
    'Content-Type': 'application/json',
  };
  const data = {
    messages: [{ role: 'user', content: message }],
    model: model,
  };

  //ACCCIONES

  //Desabilitar boton
  sendButton.disabled = true;

  //Pintar mensage enviado
  paintMessage(message, 'to');

  fetch(url, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Error in API request');
      }
    })
    .then((data) => {
      // Do something with the response data
      sendButton.disabled = false;
      console.log(data.choices[0].message.content);
      paintMessage(data.choices[0].message.content, 'from');
    })
    .catch((error) => {
      // Handle any errors that occur
      sendButton.disabled = false;
      console.error(error.message);
    });
}

//PINTAR MENSAJE

function paintMessage(message, type) {
  if (type === 'from') {
    //DECLARACIONES
    var mfgContainer = document.createElement('div');
    var mfgElement = document.createElement('div');
    //STYLES
    mfgElement.className = 'mfg';
    mfgContainer.className = 'mfg-container';
    //ACCIONES
    mfgElement.innerText = message;
    mfgContainer.appendChild(mfgElement);
    //PINTAR
    chatArea.appendChild(mfgContainer);
  } else if (type === 'to') {
    //DECLARACIONES
    var mtgContainer = document.createElement('div');
    var mtgElement = document.createElement('div');
    //STYLES
    mtgElement.className = 'mtg';
    mtgContainer.className = 'mtg-container';
    //ACCIONES
    mtgElement.innerText = message;
    mtgContainer.appendChild(mtgElement);
    //PINTAR
    chatArea.appendChild(mtgContainer);
  }
}

// LISTENER

sendButton.onclick = sendMessageToGroq;
