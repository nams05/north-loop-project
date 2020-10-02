import server from '@server'

export const logToWebSocket = (message: any) => {
  const clients = server.getWss().clients
  if (clients.size > 0) {
    clients.forEach(async (client:any) => {
      await sendToSingleWSClient(client, message)
    })
  }
}

export const sendToSingleWSClient = async (ws: any, data: any) => {
  // tslint:disable-next-line:no-console
  await ws.send(`[${new Date().toISOString()}]: ${data}`)
}
