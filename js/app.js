// Blockchain Certificator App
let web3;
let userAccount;

// Contract ABI (semplificato per testnet)
const CONTRACT_ABI = [
    {
        "inputs": [{"internalType": "string", "name": "_contentHash", "type": "string"}],
        "name": "certifyContent",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

// Sepolia Testnet Configuration
const SEPOLIA_CHAIN_ID = '0xaa36a7';
const EXPLORER_URL = 'https://sepolia.etherscan.io/tx/';

// Elements
const certificationForm = document.getElementById('certificationForm');
const contentTextarea = document.getElementById('content');
const charCount = document.getElementById('charCount');
const certifyBtn = document.getElementById('certifyBtn');
const resultCard = document.getElementById('resultCard');
const walletModal = document.getElementById('walletModal');
const connectWalletBtn = document.getElementById('connectWalletBtn');

// Character counter
contentTextarea.addEventListener('input', (e) => {
    charCount.textContent = e.target.value.length;
});

// Form submission
certificationForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    const author = document.getElementById('author').value;

    // Check if MetaMask is installed
    if (typeof window.ethereum === 'undefined') {
        alert('MetaMask non è installato! Installa MetaMask per continuare.');
        window.open('https://metamask.io/download/', '_blank');
        return;
    }

    try {
        // Show loading state
        certifyBtn.disabled = true;
        certifyBtn.innerHTML = '<div class="loading"></div> Certificazione in corso...';

        // Connect to MetaMask
        await connectWallet();

        // Create content hash
        const contentHash = await hashContent(title, content, author);

        // Simulate blockchain transaction (in produzione useresti web3.js o ethers.js)
        const txHash = await simulateBlockchainTransaction(contentHash);

        // Show results
        displayResults(contentHash, txHash);

        // Reset form
        certificationForm.reset();
        charCount.textContent = '0';

    } catch (error) {
        console.error('Errore durante la certificazione:', error);
        alert('Errore durante la certificazione: ' + error.message);
    } finally {
        // Reset button state
        certifyBtn.disabled = false;
        certifyBtn.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 2L12.09 7.26L18 8.27L14 12.14L15.18 18.02L10 15.27L4.82 18.02L6 12.14L2 8.27L7.91 7.26L10 2Z"
                      fill="currentColor"/>
            </svg>
            Certifica sulla Blockchain
        `;
    }
});

// Connect Wallet
async function connectWallet() {
    try {
        const accounts = await window.ethereum.request({
            method: 'eth_requestAccounts'
        });
        userAccount = accounts[0];

        // Check if on Sepolia testnet
        const chainId = await window.ethereum.request({
            method: 'eth_chainId'
        });

        if (chainId !== SEPOLIA_CHAIN_ID) {
            // Try to switch to Sepolia
            try {
                await window.ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: SEPOLIA_CHAIN_ID }],
                });
            } catch (switchError) {
                // Chain not added to MetaMask
                if (switchError.code === 4902) {
                    await window.ethereum.request({
                        method: 'wallet_addEthereumChain',
                        params: [{
                            chainId: SEPOLIA_CHAIN_ID,
                            chainName: 'Sepolia Testnet',
                            nativeCurrency: {
                                name: 'Sepolia ETH',
                                symbol: 'ETH',
                                decimals: 18
                            },
                            rpcUrls: ['https://sepolia.infura.io/v3/'],
                            blockExplorerUrls: ['https://sepolia.etherscan.io/']
                        }]
                    });
                }
            }
        }

        console.log('Wallet connesso:', userAccount);
        return userAccount;

    } catch (error) {
        console.error('Errore connessione wallet:', error);
        throw new Error('Connessione wallet fallita. Riprova.');
    }
}

// Hash content using SHA-256
async function hashContent(title, content, author) {
    const fullContent = JSON.stringify({
        title,
        content,
        author: author || 'Anonimo',
        timestamp: new Date().toISOString()
    });

    const encoder = new TextEncoder();
    const data = encoder.encode(fullContent);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    return '0x' + hashHex;
}

// Simulate blockchain transaction
// In produzione, questo sarebbe sostituito con una vera transazione usando web3.js o ethers.js
async function simulateBlockchainTransaction(contentHash) {
    return new Promise((resolve) => {
        setTimeout(() => {
            // Generate a fake transaction hash
            const txHash = '0x' + generateRandomHex(64);
            resolve(txHash);
        }, 2000); // Simula 2 secondi di attesa per la transazione
    });
}

// Generate random hex string
function generateRandomHex(length) {
    let result = '';
    const characters = '0123456789abcdef';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

// Hacky Text Decoding Effect
function hackyText(elementId, finalValue) {
    const el = document.getElementById(elementId);
    const chars = "ABCDEF0123456789";
    let iterations = 0;

    const interval = setInterval(() => {
        el.textContent = finalValue.split("")
            .map((char, index) => {
                if (index < iterations) {
                    return finalValue[index];
                }
                return chars[Math.floor(Math.random() * 16)];
            })
            .join("");

        if (iterations >= finalValue.length) {
            clearInterval(interval);
        }
        iterations += 1 / 2; // Velocità della decodifica
    }, 30);
}

// Display results
function displayResults(contentHash, txHash) {
    // Hide form card
    document.querySelector('.card').style.display = 'none';

    // Show result card
    resultCard.style.display = 'block';

    // Fill in results with hacky text effect
    hackyText('contentHash', contentHash);
    hackyText('txHash', txHash);

    document.getElementById('timestamp').textContent = new Date().toLocaleString('it-IT', {
        dateStyle: 'full',
        timeStyle: 'medium'
    });
    document.getElementById('explorerLink').href = EXPLORER_URL + txHash;

    // Scroll to results
    resultCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Reset form
function resetForm() {
    document.querySelector('.card').style.display = 'block';
    resultCard.style.display = 'none';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Copy to clipboard
function copyToClipboard(elementId) {
    const text = document.getElementById(elementId).textContent;
    navigator.clipboard.writeText(text).then(() => {
        // Show temporary success message
        const btn = event.target.closest('.copy-btn');
        const originalHTML = btn.innerHTML;
        btn.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8L6 11L13 4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
        `;
        btn.style.color = '#10b981';

        setTimeout(() => {
            btn.innerHTML = originalHTML;
            btn.style.color = '';
        }, 2000);
    }).catch(err => {
        console.error('Errore copia:', err);
        alert('Errore durante la copia');
    });
}

// Close modal
function closeModal() {
    walletModal.style.display = 'none';
}

// Connect wallet button in modal
connectWalletBtn.addEventListener('click', async () => {
    try {
        await connectWallet();
        closeModal();
    } catch (error) {
        console.error('Errore:', error);
    }
});

// Close modal when clicking outside
walletModal.addEventListener('click', (e) => {
    if (e.target === walletModal) {
        closeModal();
    }
});

// Listen for account changes
if (window.ethereum) {
    window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length === 0) {
            console.log('Wallet disconnesso');
            userAccount = null;
        } else {
            userAccount = accounts[0];
            console.log('Account cambiato:', userAccount);
        }
    });

    window.ethereum.on('chainChanged', () => {
        window.location.reload();
    });
}

// Initialize
console.log('Blockchain Certificator initialized');
console.log('Ready to certify your ideas on the blockchain!');
