// Supports ES6
import { create, Whatsapp } from 'venom-bot';


const { NlpManager } = require('node-nlp');

const manager = new NlpManager({ languages: ['pt'], forceNER: true });
// Adds the utterances and intents for the NLP
manager.addDocument('pt', 'bom dia', 'saudacao');
manager.addDocument('pt', 'boa tarde', 'saudacao');
manager.addDocument('pt', 'boa noite', 'saudacao');
manager.addDocument('pt', 'tudo bom', 'saudacao');
manager.addDocument('pt', 'oi', 'saudacao');
manager.addDocument('pt', 'ola', 'saudacao');
manager.addDocument('pt', 'fala ae', 'saudacao');
manager.addDocument('pt', 'ei', 'saudacao');
manager.addDocument('pt', 'salve', 'saudacao');


// Train also the NLG
manager.addAnswer('pt', 'greetings.bye', 'Till next time');
manager.addAnswer('pt', 'greetings.bye', 'see you soon!');
manager.addAnswer('pt', 'greetings.hello', 'Hey there!');
manager.addAnswer('pt', 'greetings.hello', 'Greetings!');

// Train and save the model.
(async() => {
    await manager.train();
    manager.save();
    const response = await manager.process('pt', 'I should go now');
    console.log(response);
})();


  create('LolaBot')
  .then((client) => {

    client.onMessage((message) => {
      if (message.isGroupMsg === false) {
        switch (message.body.toLowerCase()) {
          case "bom dia":
            client.sendText(message.from,"Olá, bom dia!")
            break

          default:
            break
        }
      }
    })

  })
  .catch((erro) => {
    console.log(erro);
  });
