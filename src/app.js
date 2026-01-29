import { NicknameController } from "./controller/NicknameController.js";

const controller = new NicknameController({
  countEl: document.getElementById("count"),
  styleEl: document.getElementById("style"),
  lengthEl: document.getElementById("length"),
  outEl: document.getElementById("out"),
  statusEl: document.getElementById("status"),
  genBtn: document.getElementById("genBtn"),
  copyAllBtn: document.getElementById("copyAllBtn"),
  copySelectedBtn: document.getElementById("copySelectedBtn"),
});

controller.init();