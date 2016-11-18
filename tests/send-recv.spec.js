import assert from 'assert'

const PahoMQTT = require('../src/mqttws31')
const testServer = 'iot.eclipse.org'
const testPort = 80
const testPath = '/mqtt'
const testMqttVersion = 3
const clientId = 'javascript-client'

describe('Send and Receive', function () {
  const MqttClient = function (clientId) {
    const client = new PahoMQTT.Client(testServer, testPort, testPath, clientId)
    let connected = false
    let subscribed = false
    let messageReceived = false
    let messageDelivered = false
    let receivedMessage = null

    this.resetStates = function () {
      connected = false
      subscribed = false
      messageReceived = false
      messageDelivered = false
      receivedMessage = null
    }

    const onConnect = function () {
      console.log("%s connected", clientId)
      connected = true
    }

    const onDisconnect = function () {
      console.log("%s disconnected", clientId)
      connected = false
    }

    const onSubscribe = function () {
      console.log("%s subscribed", clientId)
      subscribed = true
    }

    const onUnsubscribe = function () {
      console.log("%s unsubscribed", clientId)
      subscribed = false
    }

    const onMessageArrived = function (msg) {
      console.log("%s received message: %s", clientId, msg.payloadString)
      messageReceived = true
      receivedMessage = msg
    }

    const onMessageDelivered = function (msg) {
      console.log("%s delivered message: %s", clientId, msg.payloadString)
      messageDelivered = true
    }

    client.onMessageArrived = onMessageArrived
    client.onConnectionLost = onDisconnect
    client.onMessageDelivered = onMessageDelivered

    this.connect = function (connectOptions) {
      connectOptions = connectOptions || {}
      if (!connectOptions.hasOwnProperty("onSuccess")) {
        connectOptions.onSuccess=onConnect
        connectOptions.mqttVersion=testMqttVersion
      }
      client.connect(connectOptions)
    }

    //disconnect and verify
    this.disconnect = function () {
      client.disconnect()
    }
  }

  it('should connect to iot.eclipse.org and disconnect', function () {
    const client = new MqttClient(clientId)
  })
})
