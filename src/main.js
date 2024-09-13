import { AES, Utf8 } from "crypto-js";
import ClipboardJS from "clipboard";

// 初始化拷贝按钮
new ClipboardJS(".copy-btn");

const panelScoop = document.getElementById("panel-scoop");
const copyEncryptedTextButton = document.getElementById("copy-encrypted-text");
const copyEncryptedUrlButton = document.getElementById("copy-encrypted-url");
const decryptedPanel = document.getElementById("decrypted");
const decryptedPanelTextarea =
    decryptedPanel.getElementsByTagName("textarea")[0];
// const DecryptedResultIfram = document.querySelector("#decrypted-result iframe");
const DecryptedResultDiv = document.querySelector("#decrypted-result div");

function openPanel(name) {
    panelScoop.setAttribute("open-panel", name);
}

function returnHome() {
    openPanel("describe");
}

function openEncryptPanel() {
    openPanel("encrypt");
}

document.getElementById("encrypt").addEventListener("submit", onEncrypt);
function onEncrypt(event) {
    // 阻止表单的默认提交
    event.preventDefault();
    const formData = new FormData(this);
    const text = formData.get("orgin");
    const password = formData.get("password");
    const tip = formData.get("tip");
    const encryptedText = AES.encrypt(text, password).toString();
    openEncryptedResultPanel(encryptedText, tip);
}

function openEncryptedResultPanel(text, tip) {
    openPanel("encrypted-result");
    const url = `${
        window.location.origin + window.location.pathname
    }?t=${text}`;
    copyEncryptedTextButton.setAttribute("data-clipboard-text", text);
    copyEncryptedUrlButton.setAttribute("data-clipboard-text", url);
}

function openDecryptedPanel(text) {
    openPanel("decrypted");
    decryptedPanelTextarea.textContent = text ?? "";
    // if (text === undefined) {
    //     decryptedPanelTextarea.removeAttribute("disabled");
    // } else {
    //     decryptedPanelTextarea.setAttribute("disabled");
    // }
}

decryptedPanel.addEventListener("submit", onDecrypt);
function onDecrypt(event) {
    // 阻止表单的默认提交
    event.preventDefault();
    const formData = new FormData(this);
    const ciphertext = formData.get("ciphertext");
    const password = formData.get("password");
    // console.log(ciphertext, password);
    const orgin = AES.decrypt(ciphertext, password).toString(Utf8);
    openDecryptedResultPanel(orgin);
}

function openDecryptedResultPanel(text) {
    openPanel("decrypted-result");
    DecryptedResultDiv.innerHTML = text;
    // DecryptedResultIfram.srcdoc = text;
}

// 当带有t参数时立刻进入解密模式
const queryParams = new URLSearchParams(window.location.search);
if (queryParams.has("t")) {
    openDecryptedPanel(queryParams.get("t").replace(/ /g, "+"));
}
