import { audioStories, storyForEntry } from './audio-stories.js';
import { audioRecordings } from './audio-recordings.js';
import { audioLabels } from './audio-i18n.js';

const languageCodes={fr:'fr-FR',es:'es-ES',en:'en-GB',ar:'ar-MA'};
const clamp=(n,min,max)=>Math.max(min,Math.min(max,n));
const time=value=>`${Math.floor(Math.max(0,value)/60)}:${String(Math.floor(Math.max(0,value)%60)).padStart(2,'0')}`;

// One controller and one media element survive every hash route and page render.
export function createAudioGuide({getLanguage,escape,icon,image,head,sourceLinks}) {
 const media=new Audio();media.preload='none';
 const synthesis=window.speechSynthesis;
 const state={id:audioStories[0].id,lang:getLanguage(),active:false,playing:false,loading:false,progress:0,rate:1,engine:'speech',message:'',token:0,seekPreview:null};
 let spokenOffset=0,chunkStart=0,chunkEnd=0,chunkStartedAt=0,utterance=null,mediaKey='',pendingSeek=0,playRequest=0,speechStartTimer=null;
 const dock=document.createElement('aside');dock.id='audio-mini-player';dock.className='audio-mini';dock.hidden=true;document.body.append(dock);
 const labels=()=>audioLabels[state.lang];
 const story=()=>audioStories.find(s=>s.id===state.id);
 const recording=()=>audioRecordings[state.id]?.[state.lang];
 const script=()=>story().paragraphs[state.lang].join(' ');
 const duration=()=>state.engine==='recorded'?(Number.isFinite(media.duration)&&mediaKey===`${state.id}:${state.lang}`?media.duration:recording()?.duration||60):Math.max(20,script().trim().split(/\s+/).length/(state.lang==='ar'?2.05:2.3));
 const current=()=>state.progress*duration();
 const currentStatus=()=>state.message||(state.loading?labels().loading:state.playing?labels().playing:state.progress>=1?labels().finished:state.active?labels().paused:labels().ready);
 const wave=()=>`<div class="audio-wave" aria-hidden="true">${[9,22,35,16,43,28,50,19,37,47,24,40,17,32,44,12,27,39,21,8].map((height,i)=>`<i style="--wave-height:${height}px;--wave-delay:${i*-.09}s"></i>`).join('')}</div>`;
 const languageName=()=>labels().languageNames[state.lang];
 function controls(variant) {
  const l=labels();
  return `<div class="audio-controls audio-controls-${variant}"><div class="audio-control-row"><button class="audio-round audio-skip" data-audio-back aria-label="${l.back}">${icon('rewind')}<span>10</span></button><button class="audio-round audio-primary" data-audio-toggle aria-label="${l.play}">${icon('play')}</button><button class="audio-round audio-skip" data-audio-forward aria-label="${l.forward}">${icon('forward')}<span>10</span></button><label class="audio-speed"><span class="sr-only">${l.speed}</span><select data-audio-speed aria-label="${l.speed}">${[.75,1,1.25,1.5,2].map(rate=>`<option value="${rate}" ${state.rate===rate?'selected':''}>${rate}×</option>`).join('')}</select></label></div><label class="audio-progress"><span class="sr-only">${l.progress}</span><input type="range" min="0" max="1000" step="1" value="${Math.round(state.progress*1000)}" data-audio-seek aria-label="${l.progress}" dir="ltr"></label><div class="audio-times" dir="ltr"><span data-audio-current>${time(current())}</span><span data-audio-duration>${time(duration())}</span></div></div>`;
 }
 const sourcesFor=s=>`<div class="audio-reference-links">${sourceLinks(s.sourceIds)}</div>`;
 function transcript() {
  const s=story(),l=labels();
  return `<details id="audio-transcript" class="audio-transcript"><summary>${icon('book')}<span>${l.transcript}</span>${icon('chevron')}</summary><div class="audio-transcript-body"><div class="eyebrow">${l.transcriptTitle}</div><h3>${escape(s.title[state.lang])}</h3>${s.paragraphs[state.lang].map(p=>`<p>${escape(p)}</p>`).join('')}<h4>${l.references}</h4>${sourcesFor(s)}<p class="audio-source-note">${l.sourcesNote}</p></div></details>`;
 }
 function chapterCards() {
  return audioStories.map((s,i)=>`<article class="audio-chapter ${s.id===state.id?'selected':''}" data-audio-card="${s.id}"><div class="audio-chapter-image">${image(s.photoId)}<span class="audio-chapter-number">0${i+1}</span></div><div class="audio-chapter-copy"><div class="audio-chapter-meta"><span>${labels().chapter} 0${i+1}</span><span>${audioRecordings[s.id]?.[state.lang]?time(audioRecordings[s.id][state.lang].duration):'~ '+time(Math.max(20,s.paragraphs[state.lang].join(' ').split(/\s+/).length/(state.lang==='ar'?2.05:2.3)))}</span></div><h3>${escape(s.title[state.lang])}</h3><p>${escape(s.intro[state.lang])}</p><button class="text-button audio-listen" data-audio-start="${s.id}">${icon('headphones')}<span>${labels().listen}</span></button></div></article>`).join('');
 }
 function page() {
  syncLanguage();
  const l=labels(),s=story();
  return `<div class="wrap audio-guide">${head(l.eyebrow,l.heading,l.description)}<section class="audio-room" aria-label="${l.name}"><div class="audio-cover" data-audio-cover>${image(s.photoId,'',true)}<div class="audio-cover-shade"></div><div class="audio-cover-caption"><span class="audio-symbol">${icon('headphones')}</span><span>${l.name}</span><small>${l.collection}</small></div></div><div class="audio-room-copy"><div class="eyebrow">${l.access}</div><div class="audio-track-meta"><span data-audio-language>${languageName()}</span><span data-audio-engine>${recording()?l.recorded:l.device}</span></div><h2 data-audio-title>${escape(s.title[state.lang])}</h2><p data-audio-intro>${escape(s.intro[state.lang])}</p>${wave()}${controls('full')}<div class="audio-listening-status" role="status" aria-live="polite" data-audio-status>${currentStatus()}</div><button class="text-button" data-audio-transcript>${icon('book')}${l.transcriptLink}</button></div></section><div data-audio-transcript-container>${transcript()}</div><div class="audio-section-heading"><h2>${l.chapters}</h2><span>${l.collection}</span></div><div class="audio-chapters">${chapterCards()}</div><p class="audio-voice-note">${icon('headphones')}<span>${l.voiceNote} <a href="https://github.com/alaereddam01-prog/Tetouan/blob/main/AUDIO.md" target="_blank" rel="noopener">${l.credits}</a></span></p></div>`;
 }
 function homeTeaser() {
  const l=audioLabels[getLanguage()];
  return `<section class="section wrap"><div class="audio-home"><div><div class="eyebrow">${l.intro}</div><h2>${l.homeTitle}</h2><p>${l.homeBody}</p><a class="button" href="#/audio">${icon('headphones')}${l.homeLink}</a></div><div class="audio-home-art" aria-hidden="true"><span>${icon('headphones')}</span>${wave()}</div></div></section>`;
 }
 function button(id,compact=false) {
  const s=audioStories.find(s=>s.id===id);if(!s)return '';
  const l=audioLabels[getLanguage()];
  return `<button class="${compact?'text-button':'button outline'} audio-listen" data-audio-start="${s.id}" aria-label="${escape(l.listen+': '+s.title[getLanguage()])}">${icon('headphones')}<span>${l.listen}</span></button>`;
 }
 function buttonForEntry(entry,compact=false){return button(storyForEntry(entry)?.id,compact);}
 function buildDock() {
  const l=labels();
  dock.setAttribute('aria-label',l.player);
  dock.innerHTML=`<div class="audio-mini-heading"><a class="audio-mini-story" href="#/audio" aria-label="${l.guide}"><span class="audio-mini-art">${image(story().photoId)}</span><span><small>${l.name} · ${languageName()}</small><strong>${escape(story().title[state.lang])}</strong></span></a><button class="icon-button audio-mini-close" data-audio-close aria-label="${l.close}">${icon('close')}</button></div>${controls('mini')}<div class="audio-mini-status" data-audio-status></div>`;
 }
 function refreshStory() {
  const s=story();
  document.querySelectorAll('[data-audio-title]').forEach(el=>el.textContent=s.title[state.lang]);
  document.querySelectorAll('[data-audio-intro]').forEach(el=>el.textContent=s.intro[state.lang]);
  const cover=document.querySelector('[data-audio-cover]');if(cover)cover.querySelector('img').outerHTML=image(s.photoId,'',true);
  const container=document.querySelector('[data-audio-transcript-container]');if(container){const open=!!container.querySelector('details[open]');container.innerHTML=transcript();if(open)container.querySelector('details').open=true;}
  document.querySelectorAll('[data-audio-card]').forEach(el=>el.classList.toggle('selected',el.dataset.audioCard===state.id));
  buildDock();update();
 }
 function update() {
  dock.hidden=!state.active;document.body.classList.toggle('has-audio-player',state.active);
  document.querySelectorAll('[data-audio-toggle]').forEach(el=>{el.innerHTML=icon(state.playing?'pause':'play');el.setAttribute('aria-label',state.playing?labels().pause:labels().play);el.setAttribute('aria-pressed',String(state.playing));el.dataset.loading=String(state.loading);});
  document.querySelectorAll('[data-audio-start]').forEach(el=>{const active=state.active&&el.dataset.audioStart===state.id;el.classList.toggle('audio-is-playing',active&&state.playing);const s=audioStories.find(s=>s.id===el.dataset.audioStart);const label=active&&state.playing?labels().pause:labels().listen;el.setAttribute('aria-label',`${label}: ${s?.title[state.lang]||''}`);el.setAttribute('aria-pressed',String(active&&state.playing));const span=el.querySelector('span');if(span)span.textContent=label;});
  const progress=state.seekPreview??state.progress;
  document.querySelectorAll('[data-audio-seek]').forEach(el=>{if(document.activeElement!==el)el.value=String(Math.round(progress*1000));el.style.setProperty('--audio-progress',`${progress*100}%`);el.setAttribute('aria-valuetext',`${time(progress*duration())} / ${time(duration())}${state.engine==='speech'?' · '+labels().estimated:''}`);});
  document.querySelectorAll('[data-audio-current]').forEach(el=>el.textContent=(state.engine==='speech'?'~ ':'')+time(progress*duration()));
  document.querySelectorAll('[data-audio-duration]').forEach(el=>el.textContent=(state.engine==='speech'?'~ ':'')+time(duration()));
  document.querySelectorAll('[data-audio-engine]').forEach(el=>el.textContent=state.engine==='recorded'?labels().recorded:labels().device);
  document.querySelectorAll('[data-audio-status]').forEach(el=>{if(el.textContent!==currentStatus())el.textContent=currentStatus();});
  document.querySelectorAll('[data-audio-speed]').forEach(el=>{if(el.value!==String(state.rate))el.value=String(state.rate);});
  document.querySelectorAll('.audio-wave').forEach(el=>el.classList.toggle('playing',state.playing&&!state.loading));
  if('mediaSession' in navigator)navigator.mediaSession.playbackState=state.playing?'playing':state.active?'paused':'none';
 }
 function halt() {
  state.token++;playRequest++;media.pause();
  clearTimeout(speechStartTimer);
  if(utterance){utterance.onend=null;utterance.onerror=null;utterance.onboundary=null;utterance=null;}
  if(synthesis)synthesis.cancel();
  state.playing=false;state.loading=false;
 }
 function choose(id) {
  if(!audioStories.some(s=>s.id===id))return;
  halt();state.id=id;state.lang=getLanguage();state.progress=0;state.seekPreview=null;state.message='';state.engine=recording()?'recorded':'speech';mediaKey='';spokenOffset=0;refreshStory();
 }
 function mediaMetadata() {
  if('mediaSession' in navigator&&'MediaMetadata' in window){navigator.mediaSession.metadata=new MediaMetadata({title:story().title[state.lang],artist:labels().name,album:languageName()});}
 }
 function finish() {state.playing=false;state.loading=false;state.progress=1;state.message='';utterance=null;update();}
 function fail(message) {state.playing=false;state.loading=false;state.message=message;update();}
 function matchingVoice() {
  if(!synthesis)return null;
  const voices=synthesis.getVoices().filter(v=>v.lang.toLowerCase().split(/[-_]/)[0]===state.lang);
  return voices.sort((a,b)=>{const score=v=>(v.lang.toLowerCase()===languageCodes[state.lang].toLowerCase()?8:0)+(/natural|neural|google/i.test(v.name)?4:0)+(v.localService?1:0);return score(b)-score(a);})[0]||null;
 }
 function speakChunk(offset,token) {
  if(token!==state.token||!state.playing)return;
  const full=script();offset=clamp(offset,0,full.length);
  while(offset<full.length&&/\s/.test(full[offset]))offset++;
  if(offset>=full.length){finish();return;}
  const max=Math.min(full.length,offset+220),segment=full.slice(offset,max);
  const sentence=segment.match(/^[\s\S]*?[.!?؟](?:\s|$)/);
  let end=sentence?offset+sentence[0].length:max;
  if(!sentence&&max<full.length){const space=full.lastIndexOf(' ',max);if(space>offset+40)end=space;}
  chunkStart=offset;chunkEnd=end;spokenOffset=offset;chunkStartedAt=0;
  utterance=new SpeechSynthesisUtterance(full.slice(offset,end));utterance.lang=languageCodes[state.lang];utterance.rate=state.rate;utterance.pitch=1;
  const voice=matchingVoice();if(voice)utterance.voice=voice;
  utterance.onstart=()=>{if(token!==state.token)return;clearTimeout(speechStartTimer);chunkStartedAt=performance.now();state.loading=false;update();};
  utterance.onboundary=event=>{if(token!==state.token)return;spokenOffset=clamp(offset+event.charIndex,offset,end);state.progress=spokenOffset/full.length;update();};
  utterance.onend=()=>{if(token!==state.token)return;clearTimeout(speechStartTimer);state.progress=end/full.length;speakChunk(end,token);};
  utterance.onerror=event=>{if(token!==state.token||['canceled','interrupted'].includes(event.error))return;fail(event.error==='language-unavailable'||event.error==='voice-unavailable'?labels().missingVoice:labels().error);};
  speechStartTimer=setTimeout(()=>{if(token!==state.token||chunkStartedAt||!state.playing)return;halt();fail(matchingVoice()?labels().error:labels().missingVoice);},10000);
  synthesis.speak(utterance);
 }
 function startSpeech() {
  if(!synthesis||!('SpeechSynthesisUtterance' in window)){fail(labels().unavailable);return;}
  // Never deliberately use an unrelated language voice when the device lists voices.
  if(synthesis.getVoices().length&&!matchingVoice()){fail(labels().missingVoice);return;}
  state.engine='speech';state.message='';state.loading=true;state.playing=true;
  const full=script();let offset=Math.floor(state.progress*full.length);
  if(offset&&offset<full.length&&!/\s/.test(full[offset])){const word=full.lastIndexOf(' ',offset);offset=word>=0?word+1:0;}
  mediaMetadata();speakChunk(offset,state.token);update();
 }
 async function play() {
  syncLanguage();if(state.playing)return;
  if(state.progress>=.999)state.progress=0;
  state.active=true;state.message='';state.loading=true;state.playing=true;
  const file=recording();state.engine=file?'recorded':'speech';mediaMetadata();update();
  if(!file){startSpeech();return;}
  const key=`${state.id}:${state.lang}`,request=++playRequest;
  if(mediaKey!==key){mediaKey=key;media.src=file.src;pendingSeek=state.progress*file.duration;media.load();}
  else if(Number.isFinite(media.duration))media.currentTime=state.progress*media.duration;
  media.playbackRate=state.rate;
  try {await media.play();if(request!==playRequest){if(!state.playing)media.pause();return;}state.loading=false;update();}
  catch(error){if(request!==playRequest)return;if(error.name==='NotAllowedError'){fail(labels().error);}else{media.pause();mediaKey='';state.token++;startSpeech();}}
 }
 function pause() {
  if(state.engine==='recorded'&&Number.isFinite(media.duration))state.progress=media.currentTime/media.duration;
  halt();state.message='';update();
 }
 function seek(progress) {
  const wasPlaying=state.playing;
  state.seekPreview=null;state.progress=clamp(progress,0,1);state.message='';
  if(state.engine==='recorded'&&Number.isFinite(media.duration)&&mediaKey===`${state.id}:${state.lang}`){media.currentTime=state.progress*media.duration;if(wasPlaying&&state.progress>=1)finish();}
  else {halt();if(wasPlaying&&state.progress<1)void play();}
  update();
 }
 function changeRate(rate) {
  if(![.75,1,1.25,1.5,2].includes(rate))return;
  const wasPlaying=state.playing;state.rate=rate;media.playbackRate=rate;
  if(state.engine==='speech'){halt();if(wasPlaying)void play();}update();
 }
 function syncLanguage() {
  const next=getLanguage();if(next===state.lang)return;
  // An existing listening session follows the selected language at the same relative position.
  const active=state.active,wasPlaying=state.playing,progress=state.progress;halt();state.lang=next;state.progress=progress;state.seekPreview=null;mediaKey='';state.engine=recording()?'recorded':'speech';spokenOffset=0;state.message=active&&!wasPlaying?labels().switched:'';buildDock();update();if(wasPlaying)void play();
 }
 function showTranscript() {
  const open=()=>{const el=document.querySelector('#audio-transcript');if(el){el.open=true;el.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});}};
  if(document.body.dataset.route==='/audio')open();else{const after=()=>{window.removeEventListener('hashchange',after);requestAnimationFrame(open);};window.addEventListener('hashchange',after);location.hash='/audio';}
 }
 media.addEventListener('loadedmetadata',()=>{if(mediaKey!==`${state.id}:${state.lang}`)return;if(pendingSeek){media.currentTime=clamp(pendingSeek,0,media.duration);pendingSeek=0;}update();});
 media.addEventListener('timeupdate',()=>{if(state.engine==='recorded'&&Number.isFinite(media.duration)&&media.duration>0){state.progress=clamp(media.currentTime/media.duration,0,1);update();}});
 media.addEventListener('ended',()=>{if(state.engine==='recorded')finish();});
 media.addEventListener('waiting',()=>{if(state.playing){state.loading=true;update();}});
 media.addEventListener('playing',()=>{if(state.engine==='recorded'){state.loading=false;update();}});
 media.addEventListener('pause',()=>{if(state.engine==='recorded'&&media.paused&&!state.loading&&!media.ended){state.playing=false;update();}});
 media.addEventListener('error',()=>{if(state.engine!=='recorded'||!state.active||!state.playing)return;const request=++playRequest;media.pause();mediaKey='';state.token++;state.message=labels().fallback;startSpeech();if(request===playRequest)update();});
 document.addEventListener('click',event=>{
  const target=event.target.closest('button,a');if(!target)return;
  if(target.dataset.audioStart){if(target.dataset.audioStart!==state.id)choose(target.dataset.audioStart);if(state.active&&state.playing)pause();else void play();}
  if(target.hasAttribute('data-audio-toggle')){if(state.playing)pause();else void play();}
  if(target.hasAttribute('data-audio-close')){halt();state.active=false;state.progress=0;state.message='';update();}
  if(target.hasAttribute('data-audio-back'))seek((current()-10)/duration());
  if(target.hasAttribute('data-audio-forward'))seek((current()+10)/duration());
  if(target.hasAttribute('data-audio-transcript'))showTranscript();
 });
 document.addEventListener('input',event=>{if(event.target.matches('[data-audio-seek]')){state.seekPreview=Number(event.target.value)/1000;update();}});
 document.addEventListener('change',event=>{if(event.target.matches('[data-audio-seek]'))seek(Number(event.target.value)/1000);if(event.target.matches('[data-audio-speed]'))changeRate(Number(event.target.value));});
 window.addEventListener('pagehide',halt);
 document.addEventListener('tetouan-video-start',()=>{if(state.playing)pause();});
 setInterval(()=>{
  if(state.engine!=='speech'||!state.playing||!chunkStartedAt)return;
  const full=script(),elapsed=(performance.now()-chunkStartedAt)/1000;
  const estimated=chunkStart+elapsed*state.rate*full.length/duration();
  state.progress=clamp(Math.max(spokenOffset,Math.min(estimated,chunkEnd-1))/full.length,0,.995);update();
 },300);
 if(synthesis)synthesis.addEventListener('voiceschanged',()=>{if(state.message===labels().missingVoice&&matchingVoice()){state.message='';update();}});
 if('mediaSession' in navigator){
  for(const [action,handler] of Object.entries({play:()=>void play(),pause,stop:()=>{pause();state.active=false;update();},seekbackward:()=>seek((current()-10)/duration()),seekforward:()=>seek((current()+10)/duration()),seekto:details=>{if(Number.isFinite(details.seekTime))seek(details.seekTime/duration());}})){try{navigator.mediaSession.setActionHandler(action,handler);}catch{/* Optional OS controls differ between browsers. */}}
 }
 state.engine=recording()?'recorded':'speech';buildDock();
 return {page,homeTeaser,buttonForEntry,button,nav:()=>audioLabels[getLanguage()].nav,syncLanguage,refresh:update};
}
