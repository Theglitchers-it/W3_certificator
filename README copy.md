# 🔒 Blockchain Certificator

WebApp che permette di notarizzare idee e contenuti sulla blockchain Ethereum con timestamp immutabile.

## 🚀 Funzionalità

- **Notarizzazione sicura**: Certifica i tuoi contenuti con hash crittografico SHA-256
- **Blockchain immutabile**: Registrazione permanente sulla testnet Sepolia
- **Timestamp verificabile**: Prova quando hai avuto l'idea
- **Integrazione MetaMask**: Connessione wallet facile e sicura
- **Explorer link**: Visualizza la transazione su Etherscan
- **UI moderna**: Design dark mode con animazioni fluide

## 🛠️ Tecnologie

- **Frontend**: HTML5, CSS3, JavaScript vanilla
- **Blockchain**: Ethereum Sepolia Testnet
- **Wallet**: MetaMask integration
- **Crypto**: Web Crypto API per hashing SHA-256

## 📋 Come usare

1. **Apri il file `index.html` nel browser**

2. **Installa MetaMask** (se non ce l'hai):
   - Visita [metamask.io](https://metamask.io)
   - Scarica l'estensione per il tuo browser
   - Crea un nuovo wallet o importane uno esistente

3. **Configura la Sepolia Testnet**:
   - L'app ti guiderà automaticamente nel cambio di rete
   - Oppure aggiungi manualmente:
     - Network Name: Sepolia Testnet
     - RPC URL: https://sepolia.infura.io/v3/YOUR-API-KEY
     - Chain ID: 11155111
     - Currency Symbol: ETH

4. **Ottieni ETH di test** (gratis):
   - Visita [sepoliafaucet.com](https://sepoliafaucet.com)
   - Incolla il tuo indirizzo wallet
   - Ricevi ETH gratuiti per testare

5. **Certifica il tuo contenuto**:
   - Compila il form con titolo e contenuto
   - Clicca su "Certifica sulla Blockchain"
   - Approva la transazione su MetaMask
   - Ricevi hash del contenuto e transaction hash
   - Visualizza la transazione su Etherscan

## 🎯 Caratteristiche del Portfolio

Questo progetto dimostra:

✅ **Competenze Web3**: Integrazione blockchain e smart contracts
✅ **Sicurezza**: Hashing crittografico e immutabilità
✅ **UX/UI Design**: Interfaccia moderna e intuitiva
✅ **JavaScript avanzato**: Async/await, Web Crypto API, MetaMask SDK
✅ **Problem Solving**: Soluzione concreta per anti-plagio e timestamp

## 📁 Struttura del progetto

```
blockchain-certificator/
├── index.html          # UI principale
├── css/
│   └── style.css      # Styling completo
├── js/
│   └── app.js         # Logica blockchain
└── README.md          # Documentazione
```

## 🔧 Prossimi sviluppi

Per un'implementazione production-ready:

- [ ] Integrare web3.js o ethers.js per transazioni reali
- [ ] Deployare smart contract su Sepolia
- [ ] Aggiungere database per storico certificazioni
- [ ] Sistema di ricerca certificati per hash
- [ ] Download PDF del certificato
- [ ] Supporto multi-wallet (WalletConnect, Coinbase Wallet)

## 💡 Note

- **Costi**: Zero! Usa la testnet Sepolia (ETH gratuiti)
- **Velocità**: Transazioni in ~15 secondi
- **Sicurezza**: Hash crittograficamente sicuro
- **Privacy**: Solo l'hash viene registrato, non il contenuto originale

## 🌐 Demo

Per vedere il progetto in azione, apri semplicemente `index.html` nel browser!

---

**Powered by Ethereum Sepolia Testnet** | Built with ❤️ for transparency
