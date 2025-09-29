import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import mqtt from 'mqtt';

const MQTTContext = createContext();

// src/context/MQTTContext.jsx
let mqttClientInstance = null; // fora do componente

export const MQTTProvider = ({ children }) => {
  const [client, setClient] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!mqttClientInstance) {
      const options = {
        connectTimeout: 4000,
        reconnectPeriod: 1000,
      };

      //LOCALHOST
      mqttClientInstance = mqtt.connect('ws://localhost:9001', options);


      setClient(mqttClientInstance);

      mqttClientInstance.on('connect', () => {
        console.log('MQTT conectado:', mqttClientInstance.options.clientId);
      });

      mqttClientInstance.on('error', (err) => {
        console.error('Erro MQTT:', err);
      });

      mqttClientInstance.on('reconnect', () => {
        console.log('Tentando reconectar...');
      });
    } else {
      setClient(mqttClientInstance);
    }

    return () => {
      // NÃO encerra a conexão aqui
      // Isso evita que a reconexão cause múltiplos clients
    };
  }, []);

  return (
    <MQTTContext.Provider value={{ client, isConnected }}>
      {children}
    </MQTTContext.Provider>
  );
};

export const useMQTT = () => {
  return useContext(MQTTContext);
};
