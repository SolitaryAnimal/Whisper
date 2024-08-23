function encrypted(text = null, key = null) {
    text = text ?? prompt("输入明文");
    if (text === null) return;
    key = key ?? prompt("输入密钥");
    if (key === null) return;
    const encryptedText = CryptoJS.AES.encrypt(text, key).toString();
    alert(
        `${
            window.location.origin + window.location.pathname
        }?t=${encryptedText}`
    );
}

function decrypted(encryptedText = null, key = null) {
    encryptedText = encryptedText ?? prompt("输入密文");
    if (encryptedText === null) return;
    key = key ?? prompt("输入密钥");
    if (key === null) return;
    const decryptedText = CryptoJS.AES.decrypt(encryptedText, key).toString(
        CryptoJS.enc.Utf8
    );
    alert(decryptedText);
}

// 当带有t参数时立刻进入解密模式
const queryParams = new URLSearchParams(window.location.search);
if (queryParams.has("t")) {
    decrypted(queryParams.get("t").replace(/ /g, "+"));
}
