// Convert a Base64 string to a Uint8Array
function convertBase64ToBuffer(base64Str) {
    const binaryString = atob(base64Str); // Decode Base64 to binary string
    const len = binaryString.length;
    const buffer = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        buffer[i] = binaryString.charCodeAt(i); // Convert each character to a byte
    }
    return buffer;
}
export const getCustomerSesion = () => {
    return {
        "session": {
            "id": "2c72f5ae-7267-4d66-8190-596e9478c59a",
            "environment": {
                "id": "9865fafc-110d-4fee-972a-488361ed28ae"
            },
            "user": {
                "id": "6c2daa16-a198-41b8-802e-82a8e7afd8ba"
            },
            "createdAt": "2025-03-24T10:12:28.461Z",
            "activeAt": "2025-03-24T10:12:28.446Z",
            "idleTimeoutInMinutes": 480,
            "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36",
            "browser": {
                "name": "Chrome",
                "version": "134.0.0"
            },
            "operatingSystem": {
                "name": "Windows",
                "version": "10"
            },
            "locations": [
                {
                    "at": "2025-03-24T10:12:28.446Z",
                    "remoteIp": "203.129.200.122"
                }
            ],
            "lastSignOn": {
                "remoteIp": "203.129.200.122",
                "authenticators": [
                    "pwd"
                ],
                "withAuthenticator": {
                    "pwd": {
                        "policy": {
                            "id": "e682141b7e0ac356be6a5b2208700b9a",
                            "type": "DAVINCI"
                        },
                        "at": "2025-03-24T10:12:28.446Z"
                    }
                },
                "policy": {
                    "id": "e682141b7e0ac356be6a5b2208700b9a",
                    "type": "DAVINCI"
                },
                "at": "2025-03-24T10:12:28.446Z"
            },
            "expiresAt": "2025-03-24T18:12:28.446Z",
            "device": {
                "type": "Other"
            }
        }
    }
};

// Decrypt function using AES-GCM
export async function decryptData(encryptedData, ivBase64, key) {
    try {
        // Convert encrypted data and IV from Base64
        const encryptedDataBuffer = convertBase64ToBuffer(encryptedData);
        const ivBuffer = convertBase64ToBuffer(ivBase64);

        // Decrypt the data
        const decryptedData = await window.crypto.subtle.decrypt(
            {
                name: "AES-GCM",
                iv: ivBuffer, // Use the same IV that was used during encryption
            },
            key,
            encryptedDataBuffer
        );

        // Decode the decrypted data from Uint8Array to string (JSON string in this case)
        const decoder = new TextDecoder();
        const decryptedText = decoder.decode(decryptedData);
        
        // Parse the decrypted data (if it was originally an object)
        const decryptedObject = JSON.parse(decryptedText);

        // Log the decrypted data
        console.log("Decrypted Data:", decryptedObject);

        return decryptedObject;

    } catch (error) {
        console.error("Decryption failed", error);
    }
}

// Convert an object to a Uint8Array (required for encryption)
function convertToBuffer(data) {
    const encoder = new TextEncoder(); // Converts to Uint8Array
    return encoder.encode(JSON.stringify(data)); // Convert to JSON string and then to Uint8Array
}

// Encrypt function using AES-GCM
export async function encryptData(data) {
    try {
        const dataBuffer = convertToBuffer(data); // Convert data to buffer
        
        // Generate a secret key for AES-GCM encryption
        const key = await window.crypto.subtle.generateKey(
            {
                name: "AES-GCM",
                length: 256, // Key size (256 bits)
            },
            true, // Extractable - can be used for encryption/decryption later
            ["encrypt", "decrypt"] // Usable for both encrypting and decrypting
        );

        // Generate an initialization vector (IV)
        const iv = window.crypto.getRandomValues(new Uint8Array(12)); // AES-GCM needs a 12-byte IV

        // Encrypt the data
        const encryptedData = await window.crypto.subtle.encrypt(
            {
                name: "AES-GCM",
                iv: iv,
            },
            key,
            dataBuffer
        );

        // Convert encrypted data to Base64 for easy handling
        const encryptedArray = new Uint8Array(encryptedData);
        const base64EncryptedData = btoa(String.fromCharCode(...encryptedArray));

        // Log encrypted data and IV to the console
        console.log("Encrypted Data:", base64EncryptedData);
        console.log("Encryption IV:", btoa(String.fromCharCode(...iv)));

        return { encryptedData: base64EncryptedData, iv: btoa(String.fromCharCode(...iv)), key: key }; // Returning key for later use
        
    } catch (error) {
        console.error("Encryption failed", error);
    }
}

// Example usage for encryption and decryption
(async () => {
    const sessionData = getCustomerSesion();
    
    // Encrypt data
    const { encryptedData, iv, key } = await encryptData(sessionData);
    
    // Decrypt data
    const decryptedData = await decryptData(encryptedData, iv, key);

    console.log("Decrypted Data:", decryptedData);
})();


