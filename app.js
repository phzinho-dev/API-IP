const http = require('http')

// Opções da requisição ao serviço de verificação de IP
const options = {
  host: 'checkip.amazonaws.com', // Endereço do serviço
  port: 80, // Porta do serviço
  path: '/', // Caminho da requisição
  method: 'GET' // Método da requisição
}

// Criação do servidor HTTP
const server = http.createServer((req, res) => {

  // Função que trata a resposta do serviço de verificação de IP
  const ipPublico = (response) => {
    response.on('data', (chunk) => {
      // Configuração da resposta HTTP
      res.statusCode = 200
      res.setHeader('Content-Type', 'text/plain')
      res.end(`Seu IP público é: ${chunk}\nSeu IP privado é: ${req.socket.localAddress}`)
    })
  }

  // Requisição ao serviço de verificação de IP
  const reqToIpApi = http.request(options, ipPublico)
  reqToIpApi.end()
})

// Inicia o servidor na porta 3000
server.listen(3000, () => {
  console.log('API rodando na porta 3000')
})