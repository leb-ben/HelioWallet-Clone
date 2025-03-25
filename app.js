// API Endpoints (matching original site structure)
const API_ENDPOINTS = {
    CREATE_WALLET: '/api/wallet/create',
    ACCESS_WALLET: '/api/wallet/access',
    CLAIM_AIRDROP: '/api/airdrop/claim',
    EXCHANGE: '/api/exchange',
    GET_BALANCE: '/api/wallet/balance',
    SEND_TRANSACTION: '/api/transaction/send',
    GET_TOKEN_LIST: '/api/tokens/list',
    VERIFY_ADDRESS: '/api/wallet/verify'
};

// DOM Elements
const claimBtn = document.getElementById('claimBtn');
const newWalletBtn = document.getElementById('newWalletBtn');
const accessWalletBtn = document.getElementById('accessWalletBtn');

// Event Listeners
claimBtn.addEventListener('click', handleClaim);
newWalletBtn.addEventListener('click', handleNewWallet);
accessWalletBtn.addEventListener('click', handleAccessWallet);

// Wallet Creation Handler
async function handleNewWallet() {
    try {
        showModal(`
            <div class="p-6">
                <h2 class="text-2xl font-bold mb-4">Create A New Wallet</h2>
                <div class="flex space-x-2 mb-6">
                    <button class="flex-1 py-2 px-4 bg-gray-700 text-white rounded" onclick="createByKeystore()">
                        By Keystore File
                    </button>
                    <button class="flex-1 py-2 px-4 bg-gray-200 text-gray-700 rounded" onclick="createByMnemonic()">
                        By Mnemonic Phrase
                    </button>
                </div>
                <div class="mb-4">
                    <label class="block text-sm font-medium mb-2">Your password</label>
                    <input type="password" id="walletPassword" 
                           class="w-full p-2 border rounded text-gray-700" 
                           placeholder="Enter password">
                </div>
                <button onclick="generateWallet()" 
                        class="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    Generate Wallet
                </button>
            </div>
        `);
    } catch (error) {
        showError('Failed to initialize wallet creation');
    }
}

// Wallet Access Handler
async function handleAccessWallet() {
    try {
        showModal(`
            <div class="p-6">
                <h2 class="text-2xl font-bold mb-4">Access My Wallet</h2>
                <div class="grid grid-cols-2 gap-4 mb-6">
                    <button class="p-4 bg-gray-700 text-white rounded text-center">
                        <i class="fas fa-mobile-alt text-2xl mb-2"></i>
                        <div>Hardware</div>
                    </button>
                    <button class="p-4 bg-gray-700 text-white rounded text-center">
                        <i class="fas fa-mask text-2xl mb-2"></i>
                        <div>MetaMask</div>
                    </button>
                    <button class="p-4 bg-gray-700 text-white rounded text-center">
                        <i class="fas fa-key text-2xl mb-2"></i>
                        <div>Private Key</div>
                    </button>
                    <button class="p-4 bg-gray-700 text-white rounded text-center">
                        <i class="fas fa-file-alt text-2xl mb-2"></i>
                        <div>Keystore</div>
                    </button>
                </div>
            </div>
        `);
    } catch (error) {
        showError('Failed to initialize wallet access');
    }
}

// Airdrop Claim Handler
async function handleClaim() {
    try {
        showModal(`
            <div class="p-6">
                <h2 class="text-2xl font-bold mb-4">Claim Airdrop</h2>
                <div class="mb-4">
                    <label class="block text-sm font-medium mb-2">Wallet Address</label>
                    <input type="text" id="claimAddress" 
                           class="w-full p-2 border rounded text-gray-700" 
                           placeholder="Enter your wallet address">
                </div>
                <button onclick="submitClaim()" 
                        class="w-full py-2 bg-red-500 text-white rounded hover:bg-red-600">
                    Check Eligibility
                </button>
            </div>
        `);
    } catch (error) {
        showError('Failed to initialize claim process');
    }
}

// UI Helpers
function showModal(content) {
    // Remove existing modal if any
    const existingModal = document.querySelector('.modal-container');
    if (existingModal) {
        existingModal.remove();
    }

    // Create new modal
    const modal = document.createElement('div');
    modal.className = 'modal-container fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    modal.innerHTML = `
        <div class="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 relative">
            <button onclick="closeModal()" 
                    class="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
                <i class="fas fa-times"></i>
            </button>
            ${content}
        </div>
    `;
    document.body.appendChild(modal);
}

function closeModal() {
    const modal = document.querySelector('.modal-container');
    if (modal) {
        modal.remove();
    }
}

function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'fixed bottom-4 right-4 bg-red-500 text-white px-6 py-3 rounded shadow-lg';
    errorDiv.textContent = message;
    document.body.appendChild(errorDiv);
    setTimeout(() => errorDiv.remove(), 3000);
}

// Wallet Functions
async function generateWallet() {
    const password = document.getElementById('walletPassword').value;
    if (!password) {
        showError('Please enter a password');
        return;
    }

    try {
        // Here we'll integrate with the actual API in the future
        const response = await mockApiCall(API_ENDPOINTS.CREATE_WALLET, {
            password: password
        });
        
        showModal(`
            <div class="p-6">
                <h2 class="text-2xl font-bold mb-4 text-green-500">
                    <i class="fas fa-check-circle mr-2"></i>Wallet Created!
                </h2>
                <div class="mb-4">
                    <label class="block text-sm font-medium mb-2">Your Address</label>
                    <div class="bg-gray-100 p-2 rounded break-all">
                        ${response.address}
                    </div>
                </div>
                <div class="mb-4">
                    <label class="block text-sm font-medium mb-2">Private Key</label>
                    <div class="bg-gray-100 p-2 rounded break-all">
                        ${response.privateKey}
                    </div>
                </div>
                <p class="text-red-500 text-sm mb-4">
                    Important: Save these details securely. They cannot be recovered if lost!
                </p>
                <button onclick="closeModal()" 
                        class="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    I've Saved My Details
                </button>
            </div>
        `);
    } catch (error) {
        showError('Failed to generate wallet');
    }
}

// Mock API Call (to be replaced with real API calls)
async function mockApiCall(endpoint, data) {
    // This is just for demonstration
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                address: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
                privateKey: '0x5d7b4f3f7b14f7f7f7b4f3f7b14f7f7f7b4f3f7b14f7f7f7b4f3f7b14f7f7f'
            });
        }, 1000);
    });
}

// Initialize tooltips and other UI elements
document.addEventListener('DOMContentLoaded', () => {
    // Add any initialization code here
});