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

manager.addDocument('pt', 'quem é vc?', 'conhecimento');
manager.addDocument('pt', 'quem é vc?', 'conhecimento');
manager.addDocument('pt', 'Lola?', 'conhecimento');
manager.addDocument('pt', 'menu', 'menu');
manager.addDocument('pt', '1', '1');
manager.addDocument('pt', '2', '2');
manager.addDocument('pt', '3', '3');
manager.addDocument('pt', '4', '4');





// Train also the NLG
manager.addAnswer('pt', 'saudacao', 'Oi, me chamo Lola, sou uma atendente virtual em fase de desenvolvimento!');
manager.addAnswer('pt', 'conhecimento', 'Me chamo Lola, sua atendente virtual em fase de teste!');
manager.addAnswer('pt', 'menu', 'Esse é o meu menu. Como posso lhe ajudar? Digite o número correspondente ao seu atendimento 1- Marcar horario 2- Comprar BOT 3- Falar com Paulo 4- voltar ao menu');
manager.addAnswer('pt', '1', 'Você escolheu a opção 1, e temos disponivel no momento alguns hórarios, confira. INDISPONIVEL',);
manager.addAnswer('pt', '2', 'Você escolheu a opção 2, para adquirir o bot, irei lhe mandar um link para o pagamento do bot, lembrando que o pagamento é mensal!!');
manager.addAnswer('pt', '3', 'Você escolheu a opção 3, já estou colocando você em contato com o Paulo(NÃO FUNCIONAL AINDA)', );
manager.addAnswer('pt', '4', 'Você voltou ao menu' );

// Train and save the model.
(async() => {
    await manager.train()
    manager.save()

  create('LolaBot')
  .then((client) => {
    client.onMessage(async(message) => {
      if (message.isGroupMsg === false) {
        const response = await manager.process('pt', message.body.toLowerCase())
        if (response.intent === "None") {
          client.sendText(message.from, 'Desculpa, mas eu não entendi o que você quis dizer! Ainda estou apredendo sobre o seu mundo.')
        } else {
        console.log(response)
        client.sendText(message.from, response.answer)
        }
      }
    })

  })
  .catch((erro) => {
    console.log(erro)
  })

})()



