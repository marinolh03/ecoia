const INFO = {
  "Garrafa de Plástico":{c:"var(--red)", t:"Descarte na lixeira vermelha (plástico).", say:"Garrafa de plástico"},
  "Garrafa de Vidro":{c:"var(--green)", t:"Descarte na lixeira verde (vidro).", say:"Garrafa de vidro"},
  "Caixa de Papelão":{c:"var(--blue)", t:"Descarte na lixeira azul (papel e papelão).", say:"Caixa de papelão"},
  "Sem Objeto":{c:"var(--gray)", t:"Aponte a câmera para um objeto e tente de novo.", say:"Nenhum objeto identificado"}
};
const $ = id => document.getElementById(id);
let model, lastSpeech = "";

async function init(){
  try{
    model = await tmImage.load("model/model.json", "model/metadata.json");
    $("status").textContent = "";
    $("take").style.opacity = 1; $("take").style.pointerEvents = "auto";
  }catch(e){
    $("status").textContent = "Não foi possível carregar o modelo. Recarregue a página.";
    console.error(e);
  }
}

function speak(text){
  if (!("speechSynthesis" in window) || !text) return;
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "pt-BR";
  const v = speechSynthesis.getVoices().find(v => v.lang && v.lang.toLowerCase().startsWith("pt"));
  if (v) u.voice = v;
  speechSynthesis.speak(u);
}

$("cam").addEventListener("change", async e => {
  const f = e.target.files[0];
  if (!f || !model) return;
  $("status").textContent = "Analisando…";
  const img = new Image();
  img.onload = async () => {
    $("frame").innerHTML = ""; $("frame").style.padding = 0; $("frame").appendChild(img);
    const preds = await model.predict(img);
    show(preds);
    $("status").textContent = "";
  };
  img.src = URL.createObjectURL(f);
  e.target.value = "";
});

function show(preds){
  const sorted = [...preds].sort((a,b) => b.probability - a.probability);
  const top = sorted[0], info = INFO[top.className] || {c:"var(--gray)", t:"", say:top.className};
  $("label").textContent = top.className;
  $("hint").textContent = info.t;
  $("out").style.setProperty("--c", info.c);
  $("bars").innerHTML = "";
  preds.forEach(p => {
    const i = INFO[p.className] || {c:"var(--gray)"}, pct = (p.probability * 100).toFixed(1);
    const row = document.createElement("div"); row.className = "row";
    row.innerHTML = '<div class="top"><span></span><span>' + pct.replace(".", ",") + '%</span></div><div class="bar"><i></i></div>';
    row.querySelector("span").textContent = p.className;
    const bar = row.querySelector("i"); bar.style.background = i.c;
    $("bars").appendChild(row);
    requestAnimationFrame(() => bar.style.width = pct + "%");
  });
  $("out").style.display = "block";
  lastSpeech = top.className === "Sem Objeto" ? info.say : "Objeto identificado: " + info.say;
  speak(lastSpeech);
}

$("speak").addEventListener("click", () => speak(lastSpeech));
init();
