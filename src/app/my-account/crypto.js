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

        // Return encrypted data and IV
        return { encryptedData: base64EncryptedData, iv: btoa(String.fromCharCode(...iv)), key: key };
        
    } catch (error) {
        console.error("Encryption failed", error);
    }
}

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

        return decryptedObject;

    } catch (error) {
        console.error("Decryption failed", error);
    }
}
