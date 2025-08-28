//! Licensed to the .NET Foundation under one or more agreements.
//! The .NET Foundation licenses this file to you under the MIT license.

var e=!1;const t=async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,8,1,6,0,6,64,25,11,11])),o=async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,15,1,13,0,65,1,253,15,65,2,253,15,253,128,2,11])),n=async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,10,1,8,0,65,0,253,15,253,98,11])),r=Symbol.for("wasm promise_control");function i(e,t){let o=null;const n=new Promise((function(n,r){o={isDone:!1,promise:null,resolve:t=>{o.isDone||(o.isDone=!0,n(t),e&&e())},reject:e=>{o.isDone||(o.isDone=!0,r(e),t&&t())}}}));o.promise=n;const i=n;return i[r]=o,{promise:i,promise_control:o}}function s(e){return e[r]}function a(e){e&&function(e){return void 0!==e[r]}(e)||Be(!1,"Promise is not controllable")}const l="__mono_message__",c=["debug","log","trace","warn","info","error"],d="MONO_WASM: ";let u,f,m,g,p,h;function w(e){g=e}function b(e){if(Me.diagnosticTracing){const t="function"==typeof e?e():e;console.debug(d+t)}}function y(e,...t){console.info(d+e,...t)}function v(e,...t){console.info(e,...t)}function E(e,...t){console.warn(d+e,...t)}function _(e,...t){if(t&&t.length>0&&t[0]&&"object"==typeof t[0]){if(t[0].silent)return;if(t[0].toString)return void console.error(d+e,t[0].toString())}console.error(d+e,...t)}function x(e,t,o){return function(...n){try{let r=n[0];if(void 0===r)r="undefined";else if(null===r)r="null";else if("function"==typeof r)r=r.toString();else if("string"!=typeof r)try{r=JSON.stringify(r)}catch(e){r=r.toString()}t(o?JSON.stringify({method:e,payload:r,arguments:n.slice(1)}):[e+r,...n.slice(1)])}catch(e){m.error(`proxyConsole failed: ${e}`)}}}function j(e,t,o){f=t,g=e,m={...t};const n=`${o}/console`.replace("https://","wss://").replace("http://","ws://");u=new WebSocket(n),u.addEventListener("error",A),u.addEventListener("close",S),function(){for(const e of c)f[e]=x(`console.${e}`,T,!0)}()}function R(e){let t=30;const o=()=>{u?0==u.bufferedAmount||0==t?(e&&v(e),function(){for(const e of c)f[e]=x(`console.${e}`,m.log,!1)}(),u.removeEventListener("error",A),u.removeEventListener("close",S),u.close(1e3,e),u=void 0):(t--,globalThis.setTimeout(o,100)):e&&m&&m.log(e)};o()}function T(e){u&&u.readyState===WebSocket.OPEN?u.send(e):m.log(e)}function A(e){m.error(`[${g}] proxy console websocket error: ${e}`,e)}function S(e){m.debug(`[${g}] proxy console websocket closed: ${e}`,e)}function D(){Me.preferredIcuAsset=O(Me.config);let e="invariant"==Me.config.globalizationMode;if(!e)if(Me.preferredIcuAsset)Me.diagnosticTracing&&b("ICU data archive(s) available, disabling invariant mode");else{if("custom"===Me.config.globalizationMode||"all"===Me.config.globalizationMode||"sharded"===Me.config.globalizationMode){const e="invariant globalization mode is inactive and no ICU data archives are available";throw _(`ERROR: ${e}`),new Error(e)}Me.diagnosticTracing&&b("ICU data archive(s) not available, using invariant globalization mode"),e=!0,Me.preferredIcuAsset=null}const t="DOTNET_SYSTEM_GLOBALIZATION_INVARIANT",o=Me.config.environmentVariables;if(void 0===o[t]&&e&&(o[t]="1"),void 0===o.TZ)try{const e=Intl.DateTimeFormat().resolvedOptions().timeZone||null;e&&(o.TZ=e)}catch(e){y("failed to detect timezone, will fallback to UTC")}}function O(e){var t;if((null===(t=e.resources)||void 0===t?void 0:t.icu)&&"invariant"!=e.globalizationMode){const t=e.applicationCulture||(ke?globalThis.navigator&&globalThis.navigator.languages&&globalThis.navigator.languages[0]:Intl.DateTimeFormat().resolvedOptions().locale),o=e.resources.icu;let n=null;if("custom"===e.globalizationMode){if(o.length>=1)return o[0].name}else t&&"all"!==e.globalizationMode?"sharded"===e.globalizationMode&&(n=function(e){const t=e.split("-")[0];return"en"===t||["fr","fr-FR","it","it-IT","de","de-DE","es","es-ES"].includes(e)?"icudt_EFIGS.dat":["zh","ko","ja"].includes(t)?"icudt_CJK.dat":"icudt_no_CJK.dat"}(t)):n="icudt.dat";if(n)for(let e=0;e<o.length;e++){const t=o[e];if(t.virtualPath===n)return t.name}}return e.globalizationMode="invariant",null}(new Date).valueOf();const C=class{constructor(e){this.url=e}toString(){return this.url}};async function k(e,t){try{const o="function"==typeof globalThis.fetch;if(Se){const n=e.startsWith("file://");if(!n&&o)return globalThis.fetch(e,t||{credentials:"same-origin"});p||(h=Ne.require("url"),p=Ne.require("fs")),n&&(e=h.fileURLToPath(e));const r=await p.promises.readFile(e);return{ok:!0,headers:{length:0,get:()=>null},url:e,arrayBuffer:()=>r,json:()=>JSON.parse(r),text:()=>{throw new Error("NotImplementedException")}}}if(o)return globalThis.fetch(e,t||{credentials:"same-origin"});if("function"==typeof read)return{ok:!0,url:e,headers:{length:0,get:()=>null},arrayBuffer:()=>new Uint8Array(read(e,"binary")),json:()=>JSON.parse(read(e,"utf8")),text:()=>read(e,"utf8")}}catch(t){return{ok:!1,url:e,status:500,headers:{length:0,get:()=>null},statusText:"ERR28: "+t,arrayBuffer:()=>{throw t},json:()=>{throw t},text:()=>{throw t}}}throw new Error("No fetch implementation available")}function I(e){return"string"!=typeof e&&Be(!1,"url must be a string"),!L(e)&&0!==e.indexOf("./")&&0!==e.indexOf("../")&&globalThis.URL&&globalThis.document&&globalThis.document.baseURI&&(e=new URL(e,globalThis.document.baseURI).toString()),e}const U=/^[a-zA-Z][a-zA-Z\d+\-.]*?:\/\//,M=/[a-zA-Z]:[\\/]/;function L(e){return Se||Ie?e.startsWith("/")||e.startsWith("\\")||-1!==e.indexOf("///")||M.test(e):U.test(e)}let P,N=0;const $=[],z=[],W=new Map,F={"js-module-threads":!0,"js-module-runtime":!0,"js-module-dotnet":!0,"js-module-native":!0,"js-module-diagnostics":!0},B={...F,"js-module-library-initializer":!0},V={...F,dotnetwasm:!0,heap:!0,manifest:!0},q={...B,manifest:!0},H={...B,dotnetwasm:!0},J={dotnetwasm:!0,symbols:!0},Z={...B,dotnetwasm:!0,symbols:!0},Q={symbols:!0};function G(e){return!("icu"==e.behavior&&e.name!=Me.preferredIcuAsset)}function K(e,t,o){null!=t||(t=[]),Be(1==t.length,`Expect to have one ${o} asset in resources`);const n=t[0];return n.behavior=o,X(n),e.push(n),n}function X(e){V[e.behavior]&&W.set(e.behavior,e)}function Y(e){Be(V[e],`Unknown single asset behavior ${e}`);const t=W.get(e);if(t&&!t.resolvedUrl)if(t.resolvedUrl=Me.locateFile(t.name),F[t.behavior]){const e=ge(t);e?("string"!=typeof e&&Be(!1,"loadBootResource response for 'dotnetjs' type should be a URL string"),t.resolvedUrl=e):t.resolvedUrl=ce(t.resolvedUrl,t.behavior)}else if("dotnetwasm"!==t.behavior)throw new Error(`Unknown single asset behavior ${e}`);return t}function ee(e){const t=Y(e);return Be(t,`Single asset for ${e} not found`),t}let te=!1;async function oe(){if(!te){te=!0,Me.diagnosticTracing&&b("mono_download_assets");try{const e=[],t=[],o=(e,t)=>{!Z[e.behavior]&&G(e)&&Me.expected_instantiated_assets_count++,!H[e.behavior]&&G(e)&&(Me.expected_downloaded_assets_count++,t.push(se(e)))};for(const t of $)o(t,e);for(const e of z)o(e,t);Me.allDownloadsQueued.promise_control.resolve(),Promise.all([...e,...t]).then((()=>{Me.allDownloadsFinished.promise_control.resolve()})).catch((e=>{throw Me.err("Error in mono_download_assets: "+e),Xe(1,e),e})),await Me.runtimeModuleLoaded.promise;const n=async e=>{const t=await e;if(t.buffer){if(!Z[t.behavior]){t.buffer&&"object"==typeof t.buffer||Be(!1,"asset buffer must be array-like or buffer-like or promise of these"),"string"!=typeof t.resolvedUrl&&Be(!1,"resolvedUrl must be string");const e=t.resolvedUrl,o=await t.buffer,n=new Uint8Array(o);pe(t),await Ue.beforeOnRuntimeInitialized.promise,Ue.instantiate_asset(t,e,n)}}else J[t.behavior]?("symbols"===t.behavior&&(await Ue.instantiate_symbols_asset(t),pe(t)),J[t.behavior]&&++Me.actual_downloaded_assets_count):(t.isOptional||Be(!1,"Expected asset to have the downloaded buffer"),!H[t.behavior]&&G(t)&&Me.expected_downloaded_assets_count--,!Z[t.behavior]&&G(t)&&Me.expected_instantiated_assets_count--)},r=[],i=[];for(const t of e)r.push(n(t));for(const e of t)i.push(n(e));Promise.all(r).then((()=>{Ce||Ue.coreAssetsInMemory.promise_control.resolve()})).catch((e=>{throw Me.err("Error in mono_download_assets: "+e),Xe(1,e),e})),Promise.all(i).then((async()=>{Ce||(await Ue.coreAssetsInMemory.promise,Ue.allAssetsInMemory.promise_control.resolve())})).catch((e=>{throw Me.err("Error in mono_download_assets: "+e),Xe(1,e),e}))}catch(e){throw Me.err("Error in mono_download_assets: "+e),e}}}let ne=!1;function re(){if(ne)return;ne=!0;const e=Me.config,t=[];if(e.assets)for(const t of e.assets)"object"!=typeof t&&Be(!1,`asset must be object, it was ${typeof t} : ${t}`),"string"!=typeof t.behavior&&Be(!1,"asset behavior must be known string"),"string"!=typeof t.name&&Be(!1,"asset name must be string"),t.resolvedUrl&&"string"!=typeof t.resolvedUrl&&Be(!1,"asset resolvedUrl could be string"),t.hash&&"string"!=typeof t.hash&&Be(!1,"asset resolvedUrl could be string"),t.pendingDownload&&"object"!=typeof t.pendingDownload&&Be(!1,"asset pendingDownload could be object"),t.isCore?$.push(t):z.push(t),X(t);else if(e.resources){const o=e.resources;o.wasmNative||Be(!1,"resources.wasmNative must be defined"),o.jsModuleNative||Be(!1,"resources.jsModuleNative must be defined"),o.jsModuleRuntime||Be(!1,"resources.jsModuleRuntime must be defined"),K(z,o.wasmNative,"dotnetwasm"),K(t,o.jsModuleNative,"js-module-native"),K(t,o.jsModuleRuntime,"js-module-runtime"),o.jsModuleDiagnostics&&K(t,o.jsModuleDiagnostics,"js-module-diagnostics");const n=(e,t,o)=>{const n=e;n.behavior=t,o?(n.isCore=!0,$.push(n)):z.push(n)};if(o.coreAssembly)for(let e=0;e<o.coreAssembly.length;e++)n(o.coreAssembly[e],"assembly",!0);if(o.assembly)for(let e=0;e<o.assembly.length;e++)n(o.assembly[e],"assembly",!o.coreAssembly);if(0!=e.debugLevel&&Me.isDebuggingSupported()){if(o.corePdb)for(let e=0;e<o.corePdb.length;e++)n(o.corePdb[e],"pdb",!0);if(o.pdb)for(let e=0;e<o.pdb.length;e++)n(o.pdb[e],"pdb",!o.corePdb)}if(e.loadAllSatelliteResources&&o.satelliteResources)for(const e in o.satelliteResources)for(let t=0;t<o.satelliteResources[e].length;t++){const r=o.satelliteResources[e][t];r.culture=e,n(r,"resource",!o.coreAssembly)}if(o.coreVfs)for(let e=0;e<o.coreVfs.length;e++)n(o.coreVfs[e],"vfs",!0);if(o.vfs)for(let e=0;e<o.vfs.length;e++)n(o.vfs[e],"vfs",!o.coreVfs);const r=O(e);if(r&&o.icu)for(let e=0;e<o.icu.length;e++){const t=o.icu[e];t.name===r&&n(t,"icu",!1)}if(o.wasmSymbols)for(let e=0;e<o.wasmSymbols.length;e++)n(o.wasmSymbols[e],"symbols",!1)}if(e.appsettings)for(let t=0;t<e.appsettings.length;t++){const o=e.appsettings[t],n=he(o);"appsettings.json"!==n&&n!==`appsettings.${e.applicationEnvironment}.json`||z.push({name:o,behavior:"vfs",noCache:!0,useCredentials:!0})}e.assets=[...$,...z,...t]}async function ie(e){const t=await se(e);return await t.pendingDownloadInternal.response,t.buffer}async function se(e){try{return await ae(e)}catch(t){if(!Me.enableDownloadRetry)throw t;if(Ie||Se)throw t;if(e.pendingDownload&&e.pendingDownloadInternal==e.pendingDownload)throw t;if(e.resolvedUrl&&-1!=e.resolvedUrl.indexOf("file://"))throw t;if(t&&404==t.status)throw t;e.pendingDownloadInternal=void 0,await Me.allDownloadsQueued.promise;try{return Me.diagnosticTracing&&b(`Retrying download '${e.name}'`),await ae(e)}catch(t){return e.pendingDownloadInternal=void 0,await new Promise((e=>globalThis.setTimeout(e,100))),Me.diagnosticTracing&&b(`Retrying download (2) '${e.name}' after delay`),await ae(e)}}}async function ae(e){for(;P;)await P.promise;try{++N,N==Me.maxParallelDownloads&&(Me.diagnosticTracing&&b("Throttling further parallel downloads"),P=i());const t=await async function(e){if(e.pendingDownload&&(e.pendingDownloadInternal=e.pendingDownload),e.pendingDownloadInternal&&e.pendingDownloadInternal.response)return e.pendingDownloadInternal.response;if(e.buffer){const t=await e.buffer;return e.resolvedUrl||(e.resolvedUrl="undefined://"+e.name),e.pendingDownloadInternal={url:e.resolvedUrl,name:e.name,response:Promise.resolve({ok:!0,arrayBuffer:()=>t,json:()=>JSON.parse(new TextDecoder("utf-8").decode(t)),text:()=>{throw new Error("NotImplementedException")},headers:{get:()=>{}}})},e.pendingDownloadInternal.response}const t=e.loadRemote&&Me.config.remoteSources?Me.config.remoteSources:[""];let o;for(let n of t){n=n.trim(),"./"===n&&(n="");const t=le(e,n);e.name===t?Me.diagnosticTracing&&b(`Attempting to download '${t}'`):Me.diagnosticTracing&&b(`Attempting to download '${t}' for ${e.name}`);try{e.resolvedUrl=t;const n=fe(e);if(e.pendingDownloadInternal=n,o=await n.response,!o||!o.ok)continue;return o}catch(e){o||(o={ok:!1,url:t,status:0,statusText:""+e});continue}}const n=e.isOptional||e.name.match(/\.pdb$/)&&Me.config.ignorePdbLoadErrors;if(o||Be(!1,`Response undefined ${e.name}`),!n){const t=new Error(`download '${o.url}' for ${e.name} failed ${o.status} ${o.statusText}`);throw t.status=o.status,t}y(`optional download '${o.url}' for ${e.name} failed ${o.status} ${o.statusText}`)}(e);return t?(J[e.behavior]||(e.buffer=await t.arrayBuffer(),++Me.actual_downloaded_assets_count),e):e}finally{if(--N,P&&N==Me.maxParallelDownloads-1){Me.diagnosticTracing&&b("Resuming more parallel downloads");const e=P;P=void 0,e.promise_control.resolve()}}}function le(e,t){let o;return null==t&&Be(!1,`sourcePrefix must be provided for ${e.name}`),e.resolvedUrl?o=e.resolvedUrl:(o=""===t?"assembly"===e.behavior||"pdb"===e.behavior?e.name:"resource"===e.behavior&&e.culture&&""!==e.culture?`${e.culture}/${e.name}`:e.name:t+e.name,o=ce(Me.locateFile(o),e.behavior)),o&&"string"==typeof o||Be(!1,"attemptUrl need to be path or url string"),o}function ce(e,t){return Me.modulesUniqueQuery&&q[t]&&(e+=Me.modulesUniqueQuery),e}let de=0;const ue=new Set;function fe(e){try{e.resolvedUrl||Be(!1,"Request's resolvedUrl must be set");const t=function(e){let t=e.resolvedUrl;if(Me.loadBootResource){const o=ge(e);if(o instanceof Promise)return o;"string"==typeof o&&(t=o)}const o={};return Me.config.disableNoCacheFetch||(o.cache="no-cache"),e.useCredentials?o.credentials="include":!Me.config.disableIntegrityCheck&&e.hash&&(o.integrity=e.hash),Me.fetch_like(t,o)}(e),o={name:e.name,url:e.resolvedUrl,response:t};return ue.add(e.name),o.response.then((()=>{"assembly"==e.behavior&&Me.loadedAssemblies.push(e.name),de++,Me.onDownloadResourceProgress&&Me.onDownloadResourceProgress(de,ue.size)})),o}catch(t){const o={ok:!1,url:e.resolvedUrl,status:500,statusText:"ERR29: "+t,arrayBuffer:()=>{throw t},json:()=>{throw t}};return{name:e.name,url:e.resolvedUrl,response:Promise.resolve(o)}}}const me={resource:"assembly",assembly:"assembly",pdb:"pdb",icu:"globalization",vfs:"configuration",manifest:"manifest",dotnetwasm:"dotnetwasm","js-module-dotnet":"dotnetjs","js-module-native":"dotnetjs","js-module-runtime":"dotnetjs","js-module-threads":"dotnetjs"};function ge(e){var t;if(Me.loadBootResource){const o=null!==(t=e.hash)&&void 0!==t?t:"",n=e.resolvedUrl,r=me[e.behavior];if(r){const t=Me.loadBootResource(r,e.name,n,o,e.behavior);return"string"==typeof t?I(t):t}}}function pe(e){e.pendingDownloadInternal=null,e.pendingDownload=null,e.buffer=null,e.moduleExports=null}function he(e){let t=e.lastIndexOf("/");return t>=0&&t++,e.substring(t)}async function we(e){e&&await Promise.all((null!=e?e:[]).map((e=>async function(e){try{const t=e.name;if(!e.moduleExports){const o=ce(Me.locateFile(t),"js-module-library-initializer");Me.diagnosticTracing&&b(`Attempting to import '${o}' for ${e}`),e.moduleExports=await import(/*! webpackIgnore: true */o)}Me.libraryInitializers.push({scriptName:t,exports:e.moduleExports})}catch(t){E(`Failed to import library initializer '${e}': ${t}`)}}(e))))}async function be(e,t){if(!Me.libraryInitializers)return;const o=[];for(let n=0;n<Me.libraryInitializers.length;n++){const r=Me.libraryInitializers[n];r.exports[e]&&o.push(ye(r.scriptName,e,(()=>r.exports[e](...t))))}await Promise.all(o)}async function ye(e,t,o){try{await o()}catch(o){throw E(`Failed to invoke '${t}' on library initializer '${e}': ${o}`),Xe(1,o),o}}function ve(e,t){if(e===t)return e;const o={...t};return void 0!==o.assets&&o.assets!==e.assets&&(o.assets=[...e.assets||[],...o.assets||[]]),void 0!==o.resources&&(o.resources=_e(e.resources||{assembly:[],jsModuleNative:[],jsModuleRuntime:[],wasmNative:[]},o.resources)),void 0!==o.environmentVariables&&(o.environmentVariables={...e.environmentVariables||{},...o.environmentVariables||{}}),void 0!==o.runtimeOptions&&o.runtimeOptions!==e.runtimeOptions&&(o.runtimeOptions=[...e.runtimeOptions||[],...o.runtimeOptions||[]]),Object.assign(e,o)}function Ee(e,t){if(e===t)return e;const o={...t};return o.config&&(e.config||(e.config={}),o.config=ve(e.config,o.config)),Object.assign(e,o)}function _e(e,t){if(e===t)return e;const o={...t};return void 0!==o.assembly&&(o.assembly=[...e.assembly||[],...o.assembly||[]]),void 0!==o.lazyAssembly&&(o.lazyAssembly=[...e.lazyAssembly||[],...o.lazyAssembly||[]]),void 0!==o.pdb&&(o.pdb=[...e.pdb||[],...o.pdb||[]]),void 0!==o.jsModuleWorker&&(o.jsModuleWorker=[...e.jsModuleWorker||[],...o.jsModuleWorker||[]]),void 0!==o.jsModuleNative&&(o.jsModuleNative=[...e.jsModuleNative||[],...o.jsModuleNative||[]]),void 0!==o.jsModuleDiagnostics&&(o.jsModuleDiagnostics=[...e.jsModuleDiagnostics||[],...o.jsModuleDiagnostics||[]]),void 0!==o.jsModuleRuntime&&(o.jsModuleRuntime=[...e.jsModuleRuntime||[],...o.jsModuleRuntime||[]]),void 0!==o.wasmSymbols&&(o.wasmSymbols=[...e.wasmSymbols||[],...o.wasmSymbols||[]]),void 0!==o.wasmNative&&(o.wasmNative=[...e.wasmNative||[],...o.wasmNative||[]]),void 0!==o.icu&&(o.icu=[...e.icu||[],...o.icu||[]]),void 0!==o.satelliteResources&&(o.satelliteResources=function(e,t){if(e===t)return e;for(const o in t)e[o]=[...e[o]||[],...t[o]||[]];return e}(e.satelliteResources||{},o.satelliteResources||{})),void 0!==o.modulesAfterConfigLoaded&&(o.modulesAfterConfigLoaded=[...e.modulesAfterConfigLoaded||[],...o.modulesAfterConfigLoaded||[]]),void 0!==o.modulesAfterRuntimeReady&&(o.modulesAfterRuntimeReady=[...e.modulesAfterRuntimeReady||[],...o.modulesAfterRuntimeReady||[]]),void 0!==o.extensions&&(o.extensions={...e.extensions||{},...o.extensions||{}}),void 0!==o.vfs&&(o.vfs=[...e.vfs||[],...o.vfs||[]]),Object.assign(e,o)}function xe(){const e=Me.config;if(e.environmentVariables=e.environmentVariables||{},e.runtimeOptions=e.runtimeOptions||[],e.resources=e.resources||{assembly:[],jsModuleNative:[],jsModuleWorker:[],jsModuleRuntime:[],wasmNative:[],vfs:[],satelliteResources:{}},e.assets){Me.diagnosticTracing&&b("config.assets is deprecated, use config.resources instead");for(const t of e.assets){const o={};switch(t.behavior){case"assembly":o.assembly=[t];break;case"pdb":o.pdb=[t];break;case"resource":o.satelliteResources={},o.satelliteResources[t.culture]=[t];break;case"icu":o.icu=[t];break;case"symbols":o.wasmSymbols=[t];break;case"vfs":o.vfs=[t];break;case"dotnetwasm":o.wasmNative=[t];break;case"js-module-threads":o.jsModuleWorker=[t];break;case"js-module-runtime":o.jsModuleRuntime=[t];break;case"js-module-native":o.jsModuleNative=[t];break;case"js-module-diagnostics":o.jsModuleDiagnostics=[t];break;case"js-module-dotnet":break;default:throw new Error(`Unexpected behavior ${t.behavior} of asset ${t.name}`)}_e(e.resources,o)}}e.debugLevel,e.applicationEnvironment||(e.applicationEnvironment="Production"),e.applicationCulture&&(e.environmentVariables.LANG=`${e.applicationCulture}.UTF-8`),Ue.diagnosticTracing=Me.diagnosticTracing=!!e.diagnosticTracing,Ue.waitForDebugger=e.waitForDebugger,Me.maxParallelDownloads=e.maxParallelDownloads||Me.maxParallelDownloads,Me.enableDownloadRetry=void 0!==e.enableDownloadRetry?e.enableDownloadRetry:Me.enableDownloadRetry}let je=!1;async function Re(e){var t;if(je)return void await Me.afterConfigLoaded.promise;let o;try{if(e.configSrc||Me.config&&0!==Object.keys(Me.config).length&&(Me.config.assets||Me.config.resources)||(e.configSrc="dotnet.boot.js"),o=e.configSrc,je=!0,o&&(Me.diagnosticTracing&&b("mono_wasm_load_config"),await async function(e){const t=e.configSrc,o=Me.locateFile(t);let n=null;void 0!==Me.loadBootResource&&(n=Me.loadBootResource("manifest",t,o,"","manifest"));let r,i=null;if(n)if("string"==typeof n)n.includes(".json")?(i=await s(I(n)),r=await Ae(i)):r=(await import(I(n))).config;else{const e=await n;"function"==typeof e.json?(i=e,r=await Ae(i)):r=e.config}else o.includes(".json")?(i=await s(ce(o,"manifest")),r=await Ae(i)):r=(await import(ce(o,"manifest"))).config;function s(e){return Me.fetch_like(e,{method:"GET",credentials:"include",cache:"no-cache"})}Me.config.applicationEnvironment&&(r.applicationEnvironment=Me.config.applicationEnvironment),ve(Me.config,r)}(e)),xe(),await we(null===(t=Me.config.resources)||void 0===t?void 0:t.modulesAfterConfigLoaded),await be("onRuntimeConfigLoaded",[Me.config]),e.onConfigLoaded)try{await e.onConfigLoaded(Me.config,Pe),xe()}catch(e){throw _("onConfigLoaded() failed",e),e}xe(),Me.afterConfigLoaded.promise_control.resolve(Me.config)}catch(t){const n=`Failed to load config file ${o} ${t} ${null==t?void 0:t.stack}`;throw Me.config=e.config=Object.assign(Me.config,{message:n,error:t,isError:!0}),Xe(1,new Error(n)),t}}function Te(){return!!globalThis.navigator&&(Me.isChromium||Me.isFirefox)}async function Ae(e){const t=Me.config,o=await e.json();t.applicationEnvironment||o.applicationEnvironment||(o.applicationEnvironment=e.headers.get("Blazor-Environment")||e.headers.get("DotNet-Environment")||void 0),o.environmentVariables||(o.environmentVariables={});const n=e.headers.get("DOTNET-MODIFIABLE-ASSEMBLIES");n&&(o.environmentVariables.DOTNET_MODIFIABLE_ASSEMBLIES=n);const r=e.headers.get("ASPNETCORE-BROWSER-TOOLS");return r&&(o.environmentVariables.__ASPNETCORE_BROWSER_TOOLS=r),o}"function"!=typeof importScripts||globalThis.onmessage||(globalThis.dotnetSidecar=!0);const Se="object"==typeof process&&"object"==typeof process.versions&&"string"==typeof process.versions.node,De="function"==typeof importScripts,Oe=De&&"undefined"!=typeof dotnetSidecar,Ce=De&&!Oe,ke="object"==typeof window||De&&!Se,Ie=!ke&&!Se;let Ue={},Me={},Le={},Pe={},Ne={},$e=!1;const ze={},We={config:ze},Fe={mono:{},binding:{},internal:Ne,module:We,loaderHelpers:Me,runtimeHelpers:Ue,diagnosticHelpers:Le,api:Pe};function Be(e,t){if(e)return;const o="Assert failed: "+("function"==typeof t?t():t),n=new Error(o);_(o,n),Ue.nativeAbort(n)}function Ve(){return void 0!==Me.exitCode}function qe(){return Ue.runtimeReady&&!Ve()}function He(){Ve()&&Be(!1,`.NET runtime already exited with ${Me.exitCode} ${Me.exitReason}. You can use runtime.runMain() which doesn't exit the runtime.`),Ue.runtimeReady||Be(!1,".NET runtime didn't start yet. Please call dotnet.create() first.")}function Je(){ke&&(globalThis.addEventListener("unhandledrejection",et),globalThis.addEventListener("error",tt))}let Ze,Qe;function Ge(e){Qe&&Qe(e),Xe(e,Me.exitReason)}function Ke(e){Ze&&Ze(e||Me.exitReason),Xe(1,e||Me.exitReason)}function Xe(t,o){var n,r;const i=o&&"object"==typeof o;t=i&&"number"==typeof o.status?o.status:void 0===t?-1:t;const s=i&&"string"==typeof o.message?o.message:""+o;(o=i?o:Ue.ExitStatus?function(e,t){const o=new Ue.ExitStatus(e);return o.message=t,o.toString=()=>t,o}(t,s):new Error("Exit with code "+t+" "+s)).status=t,o.message||(o.message=s);const a=""+(o.stack||(new Error).stack);try{Object.defineProperty(o,"stack",{get:()=>a})}catch(e){}const l=!!o.silent;if(o.silent=!0,Ve())Me.diagnosticTracing&&b("mono_exit called after exit");else{try{We.onAbort==Ke&&(We.onAbort=Ze),We.onExit==Ge&&(We.onExit=Qe),ke&&(globalThis.removeEventListener("unhandledrejection",et),globalThis.removeEventListener("error",tt)),Ue.runtimeReady?(Ue.jiterpreter_dump_stats&&Ue.jiterpreter_dump_stats(!1),0===t&&(null===(n=Me.config)||void 0===n?void 0:n.interopCleanupOnExit)&&Ue.forceDisposeProxies(!0,!0),e&&0!==t&&(null===(r=Me.config)||void 0===r||r.dumpThreadsOnNonZeroExit)):(Me.diagnosticTracing&&b(`abort_startup, reason: ${o}`),function(e){Me.allDownloadsQueued.promise_control.reject(e),Me.allDownloadsFinished.promise_control.reject(e),Me.afterConfigLoaded.promise_control.reject(e),Me.wasmCompilePromise.promise_control.reject(e),Me.runtimeModuleLoaded.promise_control.reject(e),Ue.dotnetReady&&(Ue.dotnetReady.promise_control.reject(e),Ue.afterInstantiateWasm.promise_control.reject(e),Ue.beforePreInit.promise_control.reject(e),Ue.afterPreInit.promise_control.reject(e),Ue.afterPreRun.promise_control.reject(e),Ue.beforeOnRuntimeInitialized.promise_control.reject(e),Ue.afterOnRuntimeInitialized.promise_control.reject(e),Ue.afterPostRun.promise_control.reject(e))}(o))}catch(e){E("mono_exit A failed",e)}try{l||(function(e,t){if(0!==e&&t){const e=Ue.ExitStatus&&t instanceof Ue.ExitStatus?b:_;"string"==typeof t?e(t):(void 0===t.stack&&(t.stack=(new Error).stack+""),t.message?e(Ue.stringify_as_error_with_stack?Ue.stringify_as_error_with_stack(t.message+"\n"+t.stack):t.message+"\n"+t.stack):e(JSON.stringify(t)))}!Ce&&Me.config&&(Me.config.logExitCode?Me.config.forwardConsoleLogsToWS?R("WASM EXIT "+e):v("WASM EXIT "+e):Me.config.forwardConsoleLogsToWS&&R())}(t,o),function(e){if(ke&&!Ce&&Me.config&&Me.config.appendElementOnExit&&document){const t=document.createElement("label");t.id="tests_done",0!==e&&(t.style.background="red"),t.innerHTML=""+e,document.body.appendChild(t)}}(t))}catch(e){E("mono_exit B failed",e)}Me.exitCode=t,Me.exitReason||(Me.exitReason=o),!Ce&&Ue.runtimeReady&&We.runtimeKeepalivePop()}if(Me.config&&Me.config.asyncFlushOnExit&&0===t)throw(async()=>{try{await async function(){try{const e=await import(/*! webpackIgnore: true */"process"),t=e=>new Promise(((t,o)=>{e.on("error",o),e.end("","utf8",t)})),o=t(e.stderr),n=t(e.stdout);let r;const i=new Promise((e=>{r=setTimeout((()=>e("timeout")),1e3)}));await Promise.race([Promise.all([n,o]),i]),clearTimeout(r)}catch(e){_(`flushing std* streams failed: ${e}`)}}()}finally{Ye(t,o)}})(),o;Ye(t,o)}function Ye(e,t){if(Ue.runtimeReady&&Ue.nativeExit)try{Ue.nativeExit(e)}catch(e){!Ue.ExitStatus||e instanceof Ue.ExitStatus||E("set_exit_code_and_quit_now failed: "+e.toString())}if(0!==e||!ke)throw Se&&Ne.process?Ne.process.exit(e):Ue.quit&&Ue.quit(e,t),t}function et(e){ot(e,e.reason,"rejection")}function tt(e){ot(e,e.error,"error")}function ot(e,t,o){e.preventDefault();try{t||(t=new Error("Unhandled "+o)),void 0===t.stack&&(t.stack=(new Error).stack),t.stack=t.stack+"",t.silent||(_("Unhandled error:",t),Xe(1,t))}catch(e){}}!function(e){if($e)throw new Error("Loader module already loaded");$e=!0,Ue=e.runtimeHelpers,Me=e.loaderHelpers,Le=e.diagnosticHelpers,Pe=e.api,Ne=e.internal,Object.assign(Pe,{INTERNAL:Ne,invokeLibraryInitializers:be}),Object.assign(e.module,{config:ve(ze,{environmentVariables:{}})});const r={mono_wasm_bindings_is_ready:!1,config:e.module.config,diagnosticTracing:!1,nativeAbort:e=>{throw e||new Error("abort")},nativeExit:e=>{throw new Error("exit:"+e)}},l={gitHash:"30000d883e06c122311a66894579bc12329a09d4",config:e.module.config,diagnosticTracing:!1,maxParallelDownloads:16,enableDownloadRetry:!0,_loaded_files:[],loadedFiles:[],loadedAssemblies:[],libraryInitializers:[],workerNextNumber:1,actual_downloaded_assets_count:0,actual_instantiated_assets_count:0,expected_downloaded_assets_count:0,expected_instantiated_assets_count:0,afterConfigLoaded:i(),allDownloadsQueued:i(),allDownloadsFinished:i(),wasmCompilePromise:i(),runtimeModuleLoaded:i(),loadingWorkers:i(),is_exited:Ve,is_runtime_running:qe,assert_runtime_running:He,mono_exit:Xe,createPromiseController:i,getPromiseController:s,assertIsControllablePromise:a,mono_download_assets:oe,resolve_single_asset_path:ee,setup_proxy_console:j,set_thread_prefix:w,installUnhandledErrorHandler:Je,retrieve_asset_download:ie,invokeLibraryInitializers:be,isDebuggingSupported:Te,exceptions:t,simd:n,relaxedSimd:o};Object.assign(Ue,r),Object.assign(Me,l)}(Fe);let nt,rt,it,st=!1,at=!1;async function lt(e){if(!at){if(at=!0,ke&&Me.config.forwardConsoleLogsToWS&&void 0!==globalThis.WebSocket&&j("main",globalThis.console,globalThis.location.origin),We||Be(!1,"Null moduleConfig"),Me.config||Be(!1,"Null moduleConfig.config"),"function"==typeof e){const t=e(Fe.api);if(t.ready)throw new Error("Module.ready couldn't be redefined.");Object.assign(We,t),Ee(We,t)}else{if("object"!=typeof e)throw new Error("Can't use moduleFactory callback of createDotnetRuntime function.");Ee(We,e)}await async function(e){if(Se){const e=await import(/*! webpackIgnore: true */"process"),t=14;if(e.versions.node.split(".")[0]<t)throw new Error(`NodeJS at '${e.execPath}' has too low version '${e.versions.node}', please use at least ${t}. See also https://aka.ms/dotnet-wasm-features`)}const t=/*! webpackIgnore: true */import.meta.url,o=t.indexOf("?");var n;if(o>0&&(Me.modulesUniqueQuery=t.substring(o)),Me.scriptUrl=t.replace(/\\/g,"/").replace(/[?#].*/,""),Me.scriptDirectory=(n=Me.scriptUrl).slice(0,n.lastIndexOf("/"))+"/",Me.locateFile=e=>"URL"in globalThis&&globalThis.URL!==C?new URL(e,Me.scriptDirectory).toString():L(e)?e:Me.scriptDirectory+e,Me.fetch_like=k,Me.out=console.log,Me.err=console.error,Me.onDownloadResourceProgress=e.onDownloadResourceProgress,ke&&globalThis.navigator){const e=globalThis.navigator,t=e.userAgentData&&e.userAgentData.brands;t&&t.length>0?Me.isChromium=t.some((e=>"Google Chrome"===e.brand||"Microsoft Edge"===e.brand||"Chromium"===e.brand)):e.userAgent&&(Me.isChromium=e.userAgent.includes("Chrome"),Me.isFirefox=e.userAgent.includes("Firefox"))}Ne.require=Se?await import(/*! webpackIgnore: true */"module").then((e=>e.createRequire(/*! webpackIgnore: true */import.meta.url))):Promise.resolve((()=>{throw new Error("require not supported")})),void 0===globalThis.URL&&(globalThis.URL=C)}(We)}}async function ct(e){return await lt(e),Ze=We.onAbort,Qe=We.onExit,We.onAbort=Ke,We.onExit=Ge,We.ENVIRONMENT_IS_PTHREAD?async function(){(function(){const e=new MessageChannel,t=e.port1,o=e.port2;t.addEventListener("message",(e=>{var n,r;n=JSON.parse(e.data.config),r=JSON.parse(e.data.monoThreadInfo),st?Me.diagnosticTracing&&b("mono config already received"):(ve(Me.config,n),Ue.monoThreadInfo=r,xe(),Me.diagnosticTracing&&b("mono config received"),st=!0,Me.afterConfigLoaded.promise_control.resolve(Me.config),ke&&n.forwardConsoleLogsToWS&&void 0!==globalThis.WebSocket&&Me.setup_proxy_console("worker-idle",console,globalThis.location.origin)),t.close(),o.close()}),{once:!0}),t.start(),self.postMessage({[l]:{monoCmd:"preload",port:o}},[o])})(),await Me.afterConfigLoaded.promise,function(){const e=Me.config;e.assets||Be(!1,"config.assets must be defined");for(const t of e.assets)X(t),Q[t.behavior]&&z.push(t)}(),setTimeout((async()=>{try{await oe()}catch(e){Xe(1,e)}}),0);const e=dt(),t=await Promise.all(e);return await ut(t),We}():async function(){var e;await Re(We),re();const t=dt();(async function(){try{const e=ee("dotnetwasm");await se(e),e&&e.pendingDownloadInternal&&e.pendingDownloadInternal.response||Be(!1,"Can't load dotnet.native.wasm");const t=await e.pendingDownloadInternal.response,o=t.headers&&t.headers.get?t.headers.get("Content-Type"):void 0;let n;if("function"==typeof WebAssembly.compileStreaming&&"application/wasm"===o)n=await WebAssembly.compileStreaming(t);else{ke&&"application/wasm"!==o&&E('WebAssembly resource does not have the expected content type "application/wasm", so falling back to slower ArrayBuffer instantiation.');const e=await t.arrayBuffer();Me.diagnosticTracing&&b("instantiate_wasm_module buffered"),n=Ie?await Promise.resolve(new WebAssembly.Module(e)):await WebAssembly.compile(e)}e.pendingDownloadInternal=null,e.pendingDownload=null,e.buffer=null,e.moduleExports=null,Me.wasmCompilePromise.promise_control.resolve(n)}catch(e){Me.wasmCompilePromise.promise_control.reject(e)}})(),setTimeout((async()=>{try{D(),await oe()}catch(e){Xe(1,e)}}),0);const o=await Promise.all(t);return await ut(o),await Ue.dotnetReady.promise,await we(null===(e=Me.config.resources)||void 0===e?void 0:e.modulesAfterRuntimeReady),await be("onRuntimeReady",[Fe.api]),Pe}()}function dt(){const e=ee("js-module-runtime"),t=ee("js-module-native");if(nt&&rt)return[nt,rt,it];"object"==typeof e.moduleExports?nt=e.moduleExports:(Me.diagnosticTracing&&b(`Attempting to import '${e.resolvedUrl}' for ${e.name}`),nt=import(/*! webpackIgnore: true */e.resolvedUrl)),"object"==typeof t.moduleExports?rt=t.moduleExports:(Me.diagnosticTracing&&b(`Attempting to import '${t.resolvedUrl}' for ${t.name}`),rt=import(/*! webpackIgnore: true */t.resolvedUrl));const o=Y("js-module-diagnostics");return o&&("object"==typeof o.moduleExports?it=o.moduleExports:(Me.diagnosticTracing&&b(`Attempting to import '${o.resolvedUrl}' for ${o.name}`),it=import(/*! webpackIgnore: true */o.resolvedUrl))),[nt,rt,it]}async function ut(e){const{initializeExports:t,initializeReplacements:o,configureRuntimeStartup:n,configureEmscriptenStartup:r,configureWorkerStartup:i,setRuntimeGlobals:s,passEmscriptenInternals:a}=e[0],{default:l}=e[1],c=e[2];s(Fe),t(Fe),c&&c.setRuntimeGlobals(Fe),await n(We),Me.runtimeModuleLoaded.promise_control.resolve(),l((e=>(Object.assign(We,{ready:e.ready,__dotnet_runtime:{initializeReplacements:o,configureEmscriptenStartup:r,configureWorkerStartup:i,passEmscriptenInternals:a}}),We))).catch((e=>{if(e.message&&e.message.toLowerCase().includes("out of memory"))throw new Error(".NET runtime has failed to start, because too much memory was requested. Please decrease the memory by adjusting EmccMaximumHeapSize. See also https://aka.ms/dotnet-wasm-features");throw e}))}const ft=new class{withModuleConfig(e){try{return Ee(We,e),this}catch(e){throw Xe(1,e),e}}withOnConfigLoaded(e){try{return Ee(We,{onConfigLoaded:e}),this}catch(e){throw Xe(1,e),e}}withConsoleForwarding(){try{return ve(ze,{forwardConsoleLogsToWS:!0}),this}catch(e){throw Xe(1,e),e}}withExitOnUnhandledError(){try{return ve(ze,{exitOnUnhandledError:!0}),Je(),this}catch(e){throw Xe(1,e),e}}withAsyncFlushOnExit(){try{return ve(ze,{asyncFlushOnExit:!0}),this}catch(e){throw Xe(1,e),e}}withExitCodeLogging(){try{return ve(ze,{logExitCode:!0}),this}catch(e){throw Xe(1,e),e}}withElementOnExit(){try{return ve(ze,{appendElementOnExit:!0}),this}catch(e){throw Xe(1,e),e}}withInteropCleanupOnExit(){try{return ve(ze,{interopCleanupOnExit:!0}),this}catch(e){throw Xe(1,e),e}}withDumpThreadsOnNonZeroExit(){try{return ve(ze,{dumpThreadsOnNonZeroExit:!0}),this}catch(e){throw Xe(1,e),e}}withWaitingForDebugger(e){try{return ve(ze,{waitForDebugger:e}),this}catch(e){throw Xe(1,e),e}}withInterpreterPgo(e,t){try{return ve(ze,{interpreterPgo:e,interpreterPgoSaveDelay:t}),ze.runtimeOptions?ze.runtimeOptions.push("--interp-pgo-recording"):ze.runtimeOptions=["--interp-pgo-recording"],this}catch(e){throw Xe(1,e),e}}withConfig(e){try{return ve(ze,e),this}catch(e){throw Xe(1,e),e}}withConfigSrc(e){try{return e&&"string"==typeof e||Be(!1,"must be file path or URL"),Ee(We,{configSrc:e}),this}catch(e){throw Xe(1,e),e}}withVirtualWorkingDirectory(e){try{return e&&"string"==typeof e||Be(!1,"must be directory path"),ve(ze,{virtualWorkingDirectory:e}),this}catch(e){throw Xe(1,e),e}}withEnvironmentVariable(e,t){try{const o={};return o[e]=t,ve(ze,{environmentVariables:o}),this}catch(e){throw Xe(1,e),e}}withEnvironmentVariables(e){try{return e&&"object"==typeof e||Be(!1,"must be dictionary object"),ve(ze,{environmentVariables:e}),this}catch(e){throw Xe(1,e),e}}withDiagnosticTracing(e){try{return"boolean"!=typeof e&&Be(!1,"must be boolean"),ve(ze,{diagnosticTracing:e}),this}catch(e){throw Xe(1,e),e}}withDebugging(e){try{return null!=e&&"number"==typeof e||Be(!1,"must be number"),ve(ze,{debugLevel:e}),this}catch(e){throw Xe(1,e),e}}withApplicationArguments(...e){try{return e&&Array.isArray(e)||Be(!1,"must be array of strings"),ve(ze,{applicationArguments:e}),this}catch(e){throw Xe(1,e),e}}withRuntimeOptions(e){try{return e&&Array.isArray(e)||Be(!1,"must be array of strings"),ze.runtimeOptions?ze.runtimeOptions.push(...e):ze.runtimeOptions=e,this}catch(e){throw Xe(1,e),e}}withMainAssembly(e){try{return ve(ze,{mainAssemblyName:e}),this}catch(e){throw Xe(1,e),e}}withApplicationArgumentsFromQuery(){try{if(!globalThis.window)throw new Error("Missing window to the query parameters from");if(void 0===globalThis.URLSearchParams)throw new Error("URLSearchParams is supported");const e=new URLSearchParams(globalThis.window.location.search).getAll("arg");return this.withApplicationArguments(...e)}catch(e){throw Xe(1,e),e}}withApplicationEnvironment(e){try{return ve(ze,{applicationEnvironment:e}),this}catch(e){throw Xe(1,e),e}}withApplicationCulture(e){try{return ve(ze,{applicationCulture:e}),this}catch(e){throw Xe(1,e),e}}withResourceLoader(e){try{return Me.loadBootResource=e,this}catch(e){throw Xe(1,e),e}}async download(){try{await async function(){lt(We),await Re(We),re(),D(),oe(),await Me.allDownloadsFinished.promise}()}catch(e){throw Xe(1,e),e}}async create(){try{return this.instance||(this.instance=await async function(){return await ct(We),Fe.api}()),this.instance}catch(e){throw Xe(1,e),e}}async run(){try{return We.config||Be(!1,"Null moduleConfig.config"),this.instance||await this.create(),this.instance.runMainAndExit()}catch(e){throw Xe(1,e),e}}},mt=Xe,gt=ct;Ie||"function"==typeof globalThis.URL||Be(!1,"This browser/engine doesn't support URL API. Please use a modern version. See also https://aka.ms/dotnet-wasm-features"),"function"!=typeof globalThis.BigInt64Array&&Be(!1,"This browser/engine doesn't support BigInt64Array API. Please use a modern version. See also https://aka.ms/dotnet-wasm-features"),ft.withConfig(/*json-start*/{
  "mainAssemblyName": "Capybara",
  "resources": {
    "hash": "sha256-k4iljg56EsSOjs/2JkMY+OscWTpoCAfZe5twC9rPXlg=",
    "jsModuleNative": [
      {
        "name": "dotnet.native.zsfa8hv1st.js"
      }
    ],
    "jsModuleRuntime": [
      {
        "name": "dotnet.runtime.ph7fh99gkp.js"
      }
    ],
    "wasmNative": [
      {
        "name": "dotnet.native.w5wtqe7cbb.wasm",
        "integrity": "sha256-FAoAZsnphAkw1ASdsPnq4k/zL/O4WrsajWy0pYq9+v0="
      }
    ],
    "icu": [
      {
        "virtualPath": "icudt_CJK.dat",
        "name": "icudt_CJK.tjcz0u77k5.dat",
        "integrity": "sha256-SZLtQnRc0JkwqHab0VUVP7T3uBPSeYzxzDnpxPpUnHk="
      },
      {
        "virtualPath": "icudt_EFIGS.dat",
        "name": "icudt_EFIGS.tptq2av103.dat",
        "integrity": "sha256-8fItetYY8kQ0ww6oxwTLiT3oXlBwHKumbeP2pRF4yTc="
      },
      {
        "virtualPath": "icudt_no_CJK.dat",
        "name": "icudt_no_CJK.lfu7j35m59.dat",
        "integrity": "sha256-L7sV7NEYP37/Qr2FPCePo5cJqRgTXRwGHuwF5Q+0Nfs="
      }
    ],
    "coreAssembly": [
      {
        "virtualPath": "System.Runtime.InteropServices.JavaScript.wasm",
        "name": "System.Runtime.InteropServices.JavaScript.r94ctjevtl.wasm",
        "integrity": "sha256-YVZY+i10RUDjwr33TY8G2kR+yo+8fUd1kHVV8EMwLII="
      },
      {
        "virtualPath": "System.Private.CoreLib.wasm",
        "name": "System.Private.CoreLib.1rag88dnx0.wasm",
        "integrity": "sha256-bVKayn3HfKMuTmmRFFJDYelmSFzDWiRYOicUcdbOB7A="
      }
    ],
    "assembly": [
      {
        "virtualPath": "Blazor-ApexCharts.wasm",
        "name": "Blazor-ApexCharts.kem0c92the.wasm",
        "integrity": "sha256-lN5nS4iVdKzeWsKuXYOGS6AyUc3u1m6Ur0WWiC0OgQ0="
      },
      {
        "virtualPath": "BlazorComponentUtilities.wasm",
        "name": "BlazorComponentUtilities.jrk97nw8r4.wasm",
        "integrity": "sha256-oQvSWR3JOlm+ohv4ovIcQkgLnBzz+q8hRIwWOFZCd9I="
      },
      {
        "virtualPath": "BlazorPro.Spinkit.wasm",
        "name": "BlazorPro.Spinkit.xgohbmf257.wasm",
        "integrity": "sha256-IQlANxXKe2MbUR2gXAqzX+z6JMbE7zAfl7+HV2shzGc="
      },
      {
        "virtualPath": "BootstrapBlazor.wasm",
        "name": "BootstrapBlazor.9cbb9jws84.wasm",
        "integrity": "sha256-KeOBeGOBM4p3eJNQhAp+BZ2gefgU2/cCgnqgyvrsI/k="
      },
      {
        "virtualPath": "BootstrapBlazor.Markdown.wasm",
        "name": "BootstrapBlazor.Markdown.iebqamopbh.wasm",
        "integrity": "sha256-Ot55gclxdqdx4mYX7u2Th1jw/brJr7vIhzxjKeUxkzE="
      },
      {
        "virtualPath": "BootstrapBlazor.WebAPI.wasm",
        "name": "BootstrapBlazor.WebAPI.1cl339xwip.wasm",
        "integrity": "sha256-wUWuOXjm0yd4EGJHfwNhBCEd0UCkrhgcsZV7scfl/6o="
      },
      {
        "virtualPath": "CodeBeam.MudBlazor.Extensions.wasm",
        "name": "CodeBeam.MudBlazor.Extensions.osrmjmqc7c.wasm",
        "integrity": "sha256-OOHKHO/zGKg8QCze4D8F1zrytSf38wBkExNfl5143nc="
      },
      {
        "virtualPath": "CsvHelper.wasm",
        "name": "CsvHelper.5c97h8cn3b.wasm",
        "integrity": "sha256-BXz5RCSFBrg3KCDZD4lxgyWmw1YH6vUT0N/oIQdCKfA="
      },
      {
        "virtualPath": "Heron.MudCalendar.wasm",
        "name": "Heron.MudCalendar.do3ml3dz7a.wasm",
        "integrity": "sha256-45LQMxJ+HY79OYqc3hpftY6l+GFW6FmGsBi6DwZEa5A="
      },
      {
        "virtualPath": "JiuLing.CommonLibs.wasm",
        "name": "JiuLing.CommonLibs.02r9qlvrdw.wasm",
        "integrity": "sha256-yJCux3XksZ+R7rtES2+m/g53i7GJB5p+2qAs5nUuLiI="
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Authorization.wasm",
        "name": "Microsoft.AspNetCore.Authorization.am4afbz6iz.wasm",
        "integrity": "sha256-4mAPr0WhCpJC25aoHqNwKRfHDb2HEQuCavxcjbM8jhA="
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Components.wasm",
        "name": "Microsoft.AspNetCore.Components.16hyayn4lq.wasm",
        "integrity": "sha256-aQ0jJaaoFjgvTh1zc/i4TXitVmoWGGJ6lbMN+CSL8S4="
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Components.Authorization.wasm",
        "name": "Microsoft.AspNetCore.Components.Authorization.ay2eivva5b.wasm",
        "integrity": "sha256-jlu84lmwPQXGzWVXWjndEggD/4kq+bymC7BNoZndAS8="
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Components.Forms.wasm",
        "name": "Microsoft.AspNetCore.Components.Forms.dievbe0k59.wasm",
        "integrity": "sha256-y8F0/cxwFA6acRGORpQmQSadu0nX+cyMqWty8jdAYho="
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Components.Web.wasm",
        "name": "Microsoft.AspNetCore.Components.Web.a567kd88ta.wasm",
        "integrity": "sha256-3oIPEEuqNjxjdMhRYBUokAz65gJkWN2VYeeAg78+zM0="
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Components.WebAssembly.wasm",
        "name": "Microsoft.AspNetCore.Components.WebAssembly.o6ypafqhzk.wasm",
        "integrity": "sha256-sMBwv2fPZGnn6RlPbeu3KRgNU7Q+vJEBsBnwqVnQ5vI="
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Connections.Abstractions.wasm",
        "name": "Microsoft.AspNetCore.Connections.Abstractions.6gdc3hlgco.wasm",
        "integrity": "sha256-FuYGzWF9uSRFKV34IwHzj1paWFNJH8lEmQgBNB97ioc="
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Http.Connections.Client.wasm",
        "name": "Microsoft.AspNetCore.Http.Connections.Client.zazvsfg6x0.wasm",
        "integrity": "sha256-hYM0TbKdMU3t6iwkues/v6oclY0WjRpuBAw8VC86l/o="
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Http.Connections.Common.wasm",
        "name": "Microsoft.AspNetCore.Http.Connections.Common.e0s2a1zgel.wasm",
        "integrity": "sha256-Thjixh0T98E4Uf14O1PpeSKciugyAHMF/9R51E1+HaE="
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Metadata.wasm",
        "name": "Microsoft.AspNetCore.Metadata.npgmw2tlnm.wasm",
        "integrity": "sha256-G3Y4HEAwFZ8GXua5jHS3vVkFR47ge7B6kESGyN83v1M="
      },
      {
        "virtualPath": "Microsoft.AspNetCore.SignalR.Client.wasm",
        "name": "Microsoft.AspNetCore.SignalR.Client.zf9v24by4q.wasm",
        "integrity": "sha256-j0P64E9yqEgZh36dZVpTXY3Ww9f8Wfn2SOzLjFUw4KY="
      },
      {
        "virtualPath": "Microsoft.AspNetCore.SignalR.Client.Core.wasm",
        "name": "Microsoft.AspNetCore.SignalR.Client.Core.31b2ekntwf.wasm",
        "integrity": "sha256-qQ1vh5CNJBCLd76at0f50GuxtK31J+fqHJUVieG1BeA="
      },
      {
        "virtualPath": "Microsoft.AspNetCore.SignalR.Common.wasm",
        "name": "Microsoft.AspNetCore.SignalR.Common.18i8pv7k1i.wasm",
        "integrity": "sha256-v+z/kDc5ZW7wSjha/ZX4KH/TKyGS8qSZVSyKGkK0fwM="
      },
      {
        "virtualPath": "Microsoft.AspNetCore.SignalR.Protocols.Json.wasm",
        "name": "Microsoft.AspNetCore.SignalR.Protocols.Json.6tp62yiee6.wasm",
        "integrity": "sha256-KnIudVRT2Ig+l5BPJnvOTLtq425hWIUF1hhu5klDTc4="
      },
      {
        "virtualPath": "Microsoft.Extensions.Caching.Abstractions.wasm",
        "name": "Microsoft.Extensions.Caching.Abstractions.y8753i9951.wasm",
        "integrity": "sha256-DhHPGPOjHJHX/Td9xENlRanGcB1a3b7RbdJkAWXDMTc="
      },
      {
        "virtualPath": "Microsoft.Extensions.Caching.Memory.wasm",
        "name": "Microsoft.Extensions.Caching.Memory.j5bw4o8t78.wasm",
        "integrity": "sha256-iVumXYcWITKMDxw1Ybsx80UWnaffvp3mdmgHE/OiQBM="
      },
      {
        "virtualPath": "Microsoft.Extensions.Configuration.wasm",
        "name": "Microsoft.Extensions.Configuration.ji3joyjraz.wasm",
        "integrity": "sha256-i2jT6cADqAdsN5zJizqWm0QLIus9G9i7l0Q6wyp6hsQ="
      },
      {
        "virtualPath": "Microsoft.Extensions.Configuration.Abstractions.wasm",
        "name": "Microsoft.Extensions.Configuration.Abstractions.ckiujfblgc.wasm",
        "integrity": "sha256-hMfSrg9ZWzvrZ/RLXXoMt249IqErOkM0BzZ8ZDTA26g="
      },
      {
        "virtualPath": "Microsoft.Extensions.Configuration.Binder.wasm",
        "name": "Microsoft.Extensions.Configuration.Binder.lwppcpvgjy.wasm",
        "integrity": "sha256-mzCeDro0iwqIk1oxN6y6KpTqPNHJnz6TTIrQX3nZdeo="
      },
      {
        "virtualPath": "Microsoft.Extensions.Configuration.FileExtensions.wasm",
        "name": "Microsoft.Extensions.Configuration.FileExtensions.daz8cab9o8.wasm",
        "integrity": "sha256-pUgSRFtBxYZDYPZV75+a8QKWoYEdipni/6XyJrBLNp8="
      },
      {
        "virtualPath": "Microsoft.Extensions.Configuration.Json.wasm",
        "name": "Microsoft.Extensions.Configuration.Json.wsls7j2abv.wasm",
        "integrity": "sha256-oG/a0eoN/EOaod7E/geXUKTn3uAmog0oUMUdFuQQBic="
      },
      {
        "virtualPath": "Microsoft.Extensions.DependencyInjection.wasm",
        "name": "Microsoft.Extensions.DependencyInjection.bwn1fu9v2p.wasm",
        "integrity": "sha256-xdkH35jKFGrtFD2UTItvO9HatLL8TRuVbkSbqP4pGKI="
      },
      {
        "virtualPath": "Microsoft.Extensions.DependencyInjection.Abstractions.wasm",
        "name": "Microsoft.Extensions.DependencyInjection.Abstractions.v442nu6x5r.wasm",
        "integrity": "sha256-b9Av5dIyEBkU5Hg/NZNTju9yjfqYyHms5Id5BhVJGG0="
      },
      {
        "virtualPath": "Microsoft.Extensions.Diagnostics.wasm",
        "name": "Microsoft.Extensions.Diagnostics.bp08l8ziw2.wasm",
        "integrity": "sha256-cUVjdOSLeYLB271VrY1R/hil2+/M5PwRFA+pV9O+yzA="
      },
      {
        "virtualPath": "Microsoft.Extensions.Diagnostics.Abstractions.wasm",
        "name": "Microsoft.Extensions.Diagnostics.Abstractions.obozxda2be.wasm",
        "integrity": "sha256-HGUIFFipOc/3qLnh6xcy+OPTbm2uQiZHVxg7WrbR0Qc="
      },
      {
        "virtualPath": "Microsoft.Extensions.Features.wasm",
        "name": "Microsoft.Extensions.Features.ouv8uy28v6.wasm",
        "integrity": "sha256-wOYXLjWyfe/HXGu0PPu/H/QQocNiNBm3phLOr/HJ8no="
      },
      {
        "virtualPath": "Microsoft.Extensions.FileProviders.Abstractions.wasm",
        "name": "Microsoft.Extensions.FileProviders.Abstractions.nwgmjkhh7h.wasm",
        "integrity": "sha256-6e0GAFoRSsGFT1/wTv/d5rtw8XVf/iCl2wXDXLer3rc="
      },
      {
        "virtualPath": "Microsoft.Extensions.FileProviders.Physical.wasm",
        "name": "Microsoft.Extensions.FileProviders.Physical.cxaal3el4d.wasm",
        "integrity": "sha256-0JYXLGC0mXIruR4wf7r1swBndK8dao1j+xGqRo4eGZs="
      },
      {
        "virtualPath": "Microsoft.Extensions.FileSystemGlobbing.wasm",
        "name": "Microsoft.Extensions.FileSystemGlobbing.zm4bxbw8pj.wasm",
        "integrity": "sha256-xUas+/PqsZnLkoMlMTa8uUgBmVp+DhSyhLMLW51KRcA="
      },
      {
        "virtualPath": "Microsoft.Extensions.Hosting.Abstractions.wasm",
        "name": "Microsoft.Extensions.Hosting.Abstractions.vfr2idrusa.wasm",
        "integrity": "sha256-a83PtIugAbNTBTnlW9ppr8jgVIG+rkOmJsjVOIBZhn0="
      },
      {
        "virtualPath": "Microsoft.Extensions.Http.wasm",
        "name": "Microsoft.Extensions.Http.0fx08a73e3.wasm",
        "integrity": "sha256-LEkWPqHYjLw2swI4AOI9sd6NJ1Zfxa7Msj5K5V32zwI="
      },
      {
        "virtualPath": "Microsoft.Extensions.Localization.wasm",
        "name": "Microsoft.Extensions.Localization.flg0p3xuro.wasm",
        "integrity": "sha256-A4m4dVc+7utK0fqp3Q/CSj7HKYppIDXHYRdEEscIJhk="
      },
      {
        "virtualPath": "Microsoft.Extensions.Localization.Abstractions.wasm",
        "name": "Microsoft.Extensions.Localization.Abstractions.wtvj10j3sj.wasm",
        "integrity": "sha256-HEcHPANxgwKUhmJGFRXNLnNAHWCKbcPEGSiZsuFKjwQ="
      },
      {
        "virtualPath": "Microsoft.Extensions.Logging.wasm",
        "name": "Microsoft.Extensions.Logging.rzgdi2boub.wasm",
        "integrity": "sha256-uR4O1XerIvvxf4g5TEBVKDzanip5ERX0EYWNwI91V9U="
      },
      {
        "virtualPath": "Microsoft.Extensions.Logging.Abstractions.wasm",
        "name": "Microsoft.Extensions.Logging.Abstractions.4dzzg0ufn7.wasm",
        "integrity": "sha256-OLL/CQluM0bDHInYw+WiQ4/rB+MhBbVYR1KVSg07cA8="
      },
      {
        "virtualPath": "Microsoft.Extensions.Options.wasm",
        "name": "Microsoft.Extensions.Options.odg74nh3r9.wasm",
        "integrity": "sha256-rF5Kqfe5gtoZrMnP++rbTQoEzz/bE5f2O5NR+LmgK6k="
      },
      {
        "virtualPath": "Microsoft.Extensions.Options.ConfigurationExtensions.wasm",
        "name": "Microsoft.Extensions.Options.ConfigurationExtensions.xd8lnxzhm4.wasm",
        "integrity": "sha256-tShzBymIEVAxGgu2d1xul5DmhdIGPYz1ogtvdnAVHw8="
      },
      {
        "virtualPath": "Microsoft.Extensions.Primitives.wasm",
        "name": "Microsoft.Extensions.Primitives.kqrqjog7lk.wasm",
        "integrity": "sha256-7CHT1/b8nK4nVXjhkbfpTX6fXjVklfKF6mtB+O3t9kI="
      },
      {
        "virtualPath": "Microsoft.JSInterop.wasm",
        "name": "Microsoft.JSInterop.3cbd3hfygr.wasm",
        "integrity": "sha256-o7GdKBPv+HBd9w7gC9+2nb6fEif3lhwr4/c7ClZj9rc="
      },
      {
        "virtualPath": "Microsoft.JSInterop.WebAssembly.wasm",
        "name": "Microsoft.JSInterop.WebAssembly.hc17b4cpzp.wasm",
        "integrity": "sha256-kX1JcSX28ntu0k+kL2duMelFf4MW0NkFOpZ1XMnE5sA="
      },
      {
        "virtualPath": "MudBlazor.wasm",
        "name": "MudBlazor.gn910ljauw.wasm",
        "integrity": "sha256-HAsbi5cwS39nSvosnBsb7P798gI8DkeMabKa8vpmq/w="
      },
      {
        "virtualPath": "ReactorBlazorQRCodeScanner.wasm",
        "name": "ReactorBlazorQRCodeScanner.cra8myaxxj.wasm",
        "integrity": "sha256-iJmCEWRuvqyU+l62D8OrQ2ULBTM9xAv3EsYik8tzyiM="
      },
      {
        "virtualPath": "Tewr.Blazor.FileReader.wasm",
        "name": "Tewr.Blazor.FileReader.64lx0zzd22.wasm",
        "integrity": "sha256-2johdatokNmFJ2ImQ4NDECayWmZZwkT4Q03+I8iggx8="
      },
      {
        "virtualPath": "Toolbelt.Blazor.PWA.Updater.wasm",
        "name": "Toolbelt.Blazor.PWA.Updater.hhcg7r9wws.wasm",
        "integrity": "sha256-yxmijHoIMG2sOdxMexImmbEOTYDED3ERqP6exA/qsYM="
      },
      {
        "virtualPath": "Toolbelt.Blazor.PWA.Updater.Service.wasm",
        "name": "Toolbelt.Blazor.PWA.Updater.Service.jry656higl.wasm",
        "integrity": "sha256-f4LpyqjBWc03Q3fjea9z4gVidvDE55VMMY9WbsAGHOU="
      },
      {
        "virtualPath": "Toolbelt.Blazor.SpeechSynthesis.wasm",
        "name": "Toolbelt.Blazor.SpeechSynthesis.zieylbssan.wasm",
        "integrity": "sha256-9YDtqdoepwPdftbrtjWLJG1Wn+Tlw01wMBw7nFpC5cE="
      },
      {
        "virtualPath": "Toolbelt.Web.CssClassInlineBuilder.wasm",
        "name": "Toolbelt.Web.CssClassInlineBuilder.s96yuzfwrp.wasm",
        "integrity": "sha256-QI4m/6TJGKg9JYj3j21i2HlNOfGqMJmJmFwxqRBxoOM="
      },
      {
        "virtualPath": "UAParser.wasm",
        "name": "UAParser.o84k4c0k2d.wasm",
        "integrity": "sha256-eIZXP6Q7o4UEv0jJ0y/5JsXg5Z2gMjC021Ea4crJFNE="
      },
      {
        "virtualPath": "zxing.wasm",
        "name": "zxing.cslsbo1ipr.wasm",
        "integrity": "sha256-tMfd0yYIsmnNL+xt9XPz0JttM4ydnaDExf6FoFjM0Kg="
      },
      {
        "virtualPath": "ZXingBlazor.wasm",
        "name": "ZXingBlazor.6d6suntskg.wasm",
        "integrity": "sha256-xobOHXZi8knx9rrEgz7S0uIwj0SddcNgLa9R4wXtomc="
      },
      {
        "virtualPath": "Microsoft.CSharp.wasm",
        "name": "Microsoft.CSharp.2o2dkfcirx.wasm",
        "integrity": "sha256-PkGyn4j0p2KWQ/7bjBL4XLnkRlhZ2WbLOfbeg17qex4="
      },
      {
        "virtualPath": "System.Collections.Concurrent.wasm",
        "name": "System.Collections.Concurrent.g7fy6guw6k.wasm",
        "integrity": "sha256-fGfOfNGJITBk7M3tYt6snCGNKMIiWt8B4zEby+iR7FQ="
      },
      {
        "virtualPath": "System.Collections.Immutable.wasm",
        "name": "System.Collections.Immutable.vlx5640i5e.wasm",
        "integrity": "sha256-Yw92alsqj6c24neRu/7PDyJV3hvjWcXJjR5FW7Gvxwo="
      },
      {
        "virtualPath": "System.Collections.NonGeneric.wasm",
        "name": "System.Collections.NonGeneric.juhzjprsma.wasm",
        "integrity": "sha256-5RMSabIAqbOZK70YAXRUp8O9CyJIQezkLkem+bKRqfA="
      },
      {
        "virtualPath": "System.Collections.Specialized.wasm",
        "name": "System.Collections.Specialized.ydqchmcq5v.wasm",
        "integrity": "sha256-auZQJ7O7qheWp4aaERjndqCv+uq3LiFBFuMt+5R4FGw="
      },
      {
        "virtualPath": "System.Collections.wasm",
        "name": "System.Collections.xpbqg0gdlj.wasm",
        "integrity": "sha256-1Q0o7jTTABht5ZpAxwFJKEKboI4PvznTYoihHYiSMVc="
      },
      {
        "virtualPath": "System.ComponentModel.Annotations.wasm",
        "name": "System.ComponentModel.Annotations.ts2jqgzzh6.wasm",
        "integrity": "sha256-7R5dYqDC/GwnZoB5tH2qnsOpQ0g0gxIoggA1Zf7q0eM="
      },
      {
        "virtualPath": "System.ComponentModel.Primitives.wasm",
        "name": "System.ComponentModel.Primitives.wba2dajb0d.wasm",
        "integrity": "sha256-NNrXzcU1YkOyetgQlojvrdtIUgt4zYEDLYLKfIjGU5Q="
      },
      {
        "virtualPath": "System.ComponentModel.TypeConverter.wasm",
        "name": "System.ComponentModel.TypeConverter.bu536kvmai.wasm",
        "integrity": "sha256-U0afx7ZSXjxU6fG+TOf2LlPqvXxD4X1A8i2CfTfi/ao="
      },
      {
        "virtualPath": "System.ComponentModel.wasm",
        "name": "System.ComponentModel.6vum3nuxvu.wasm",
        "integrity": "sha256-wgRDaKX9FrlN0dnYScEfwojoIOVSMsqGPDdDZEJ2Iqg="
      },
      {
        "virtualPath": "System.Console.wasm",
        "name": "System.Console.bi1c2nu0u7.wasm",
        "integrity": "sha256-o3Ce7/SsSc1YFbB5p1rhn+8sgb0mwyjn8oHzPrj4v7A="
      },
      {
        "virtualPath": "System.Data.Common.wasm",
        "name": "System.Data.Common.f0wnlimyiq.wasm",
        "integrity": "sha256-z560cbz9NToydzUVeK4ajBOLy1HcXyHYr/vRjn0oVnw="
      },
      {
        "virtualPath": "System.Diagnostics.Debug.wasm",
        "name": "System.Diagnostics.Debug.1ttspraver.wasm",
        "integrity": "sha256-GxWhSHklWgTT8Q+GGp+ykVVHoCUtt4kii0KUzE/t+Zs="
      },
      {
        "virtualPath": "System.Diagnostics.DiagnosticSource.wasm",
        "name": "System.Diagnostics.DiagnosticSource.30wlstqply.wasm",
        "integrity": "sha256-Q6WqbKY/VetF7z7dYbALjy3P9ylGVQBNUCPyM0pgUg4="
      },
      {
        "virtualPath": "System.Diagnostics.FileVersionInfo.wasm",
        "name": "System.Diagnostics.FileVersionInfo.5606dtfx0o.wasm",
        "integrity": "sha256-o8hBfd6nSdaccZHsklo7FfDwRg6jr2556E/p/vdmQ5Y="
      },
      {
        "virtualPath": "System.Diagnostics.TraceSource.wasm",
        "name": "System.Diagnostics.TraceSource.2sv4jtodax.wasm",
        "integrity": "sha256-4sC/zrduDxJ2a8eCIBP7n0I2qz7Jnmx8I89sTqZCDak="
      },
      {
        "virtualPath": "System.Drawing.Primitives.wasm",
        "name": "System.Drawing.Primitives.vwmyz6v7hh.wasm",
        "integrity": "sha256-gcxaNsfniVW/5W6ab7wHm60PY8wGPUd4IOsZ+QxOykI="
      },
      {
        "virtualPath": "System.Drawing.wasm",
        "name": "System.Drawing.l3xncduaq8.wasm",
        "integrity": "sha256-r7ikePd1TDjahb6DC5KNcxLgrmXuRB+tlzc+ViGX/ys="
      },
      {
        "virtualPath": "System.IO.Compression.ZipFile.wasm",
        "name": "System.IO.Compression.ZipFile.ovkl8gbl31.wasm",
        "integrity": "sha256-9JTunpSgzBssXGfJt/IXYi45DnaV6Zt+vw6JqUsofbk="
      },
      {
        "virtualPath": "System.IO.Compression.wasm",
        "name": "System.IO.Compression.hfeeyp74de.wasm",
        "integrity": "sha256-jRaDzixiigQc73D1niO67R477l1nUA5A703aCL8BGX4="
      },
      {
        "virtualPath": "System.IO.FileSystem.Watcher.wasm",
        "name": "System.IO.FileSystem.Watcher.x52mk1v0fi.wasm",
        "integrity": "sha256-ddy0A8wPwodpIOXSe3QZDli/4EJq7tJxYF0iai2GzZM="
      },
      {
        "virtualPath": "System.IO.Pipelines.wasm",
        "name": "System.IO.Pipelines.5tws9hzvq4.wasm",
        "integrity": "sha256-GRJj6QsiOyRav95Igt4uMaZhkG8GuX1bSNShFqg7uNM="
      },
      {
        "virtualPath": "System.Linq.Expressions.wasm",
        "name": "System.Linq.Expressions.odwvzyxjq2.wasm",
        "integrity": "sha256-rFDTYt/vgFwXXkQdryWTSBCgI8NACwQLAMog85pt/GU="
      },
      {
        "virtualPath": "System.Linq.Queryable.wasm",
        "name": "System.Linq.Queryable.lrbm6fhk04.wasm",
        "integrity": "sha256-EVe23r6T5adDugQoNwfkmc6RoR8lJhRKwTe7jMCO8cE="
      },
      {
        "virtualPath": "System.Linq.wasm",
        "name": "System.Linq.i7puf4uvoq.wasm",
        "integrity": "sha256-HnreoWFi1ZwCtFm9KKE6VcvF5pxAnoblIUvPcEdw278="
      },
      {
        "virtualPath": "System.Memory.wasm",
        "name": "System.Memory.lhy2xtvxm6.wasm",
        "integrity": "sha256-GaALj88Y815uevgoyDODkDttY8Vjfew8rhonGLiYU0s="
      },
      {
        "virtualPath": "System.Net.Http.Json.wasm",
        "name": "System.Net.Http.Json.lisa20wupz.wasm",
        "integrity": "sha256-3XAda3oNwKlb+VCosgLELAoQCdrRvJM2wfuRtL6b5Tw="
      },
      {
        "virtualPath": "System.Net.Http.wasm",
        "name": "System.Net.Http.4jv46ubby4.wasm",
        "integrity": "sha256-oOYAdoDw1bZ9NDPlOk0ojaETMHHPjb/nBe9VRNLCEP8="
      },
      {
        "virtualPath": "System.Net.Primitives.wasm",
        "name": "System.Net.Primitives.xzq60du2tx.wasm",
        "integrity": "sha256-031fbyv3b8uyqpSf8eAhj166vlF+S5OPxT01U7voXvY="
      },
      {
        "virtualPath": "System.Net.Requests.wasm",
        "name": "System.Net.Requests.3hxwigsvwv.wasm",
        "integrity": "sha256-d4MK3Vu53VFyQJ4ryC/NRxrwP7peMYHxvRoryWlDpvE="
      },
      {
        "virtualPath": "System.Net.Security.wasm",
        "name": "System.Net.Security.lk9jpbi7n4.wasm",
        "integrity": "sha256-y6MiCS/ESQ75HyKTAMnd4mwhb8y3t85i4gPe3zT00Lk="
      },
      {
        "virtualPath": "System.Net.ServerSentEvents.wasm",
        "name": "System.Net.ServerSentEvents.14okvphfg6.wasm",
        "integrity": "sha256-7/Uu+IzpLraaF/1Zn75hqE745D0JAtoNQSW49B7rYMM="
      },
      {
        "virtualPath": "System.Net.WebSockets.Client.wasm",
        "name": "System.Net.WebSockets.Client.r10u75h1m1.wasm",
        "integrity": "sha256-v0ZmQyEjBp1BMq/mMCfIcJfDEgblVYZoWClULGrlZf4="
      },
      {
        "virtualPath": "System.Net.WebSockets.wasm",
        "name": "System.Net.WebSockets.vjprsqf5j7.wasm",
        "integrity": "sha256-5dHBe2oslrPGyaO09TTspsnFA1TrthAfm2tVWO/ShRE="
      },
      {
        "virtualPath": "System.ObjectModel.wasm",
        "name": "System.ObjectModel.1cq7snl94i.wasm",
        "integrity": "sha256-75b/T22jXVKNyMjnTHRa6ljBNoxyKHp7bQD9kOV6c4E="
      },
      {
        "virtualPath": "System.Private.Uri.wasm",
        "name": "System.Private.Uri.6moy0hk76r.wasm",
        "integrity": "sha256-4mo/nmIu3bmStHQI/EVRMr2CwkU/OKXT4VnGT7jQ2n4="
      },
      {
        "virtualPath": "System.Private.Xml.wasm",
        "name": "System.Private.Xml.gs932p5gqv.wasm",
        "integrity": "sha256-UOo0ewWfSxESE0AKGi5HeSngt2uo+AT6f5IoOUzzFEY="
      },
      {
        "virtualPath": "System.Reflection.Emit.ILGeneration.wasm",
        "name": "System.Reflection.Emit.ILGeneration.qabkca1lr5.wasm",
        "integrity": "sha256-MrqVCBGoZNQnsa/cnaQefMyU9Wh9xrB9IiQK/5FK6do="
      },
      {
        "virtualPath": "System.Reflection.Emit.wasm",
        "name": "System.Reflection.Emit.bxzve93xd8.wasm",
        "integrity": "sha256-n8nNHTfHbmlqRjHjZeJJsM0a9qi2VfDUqLwpdhlYBsk="
      },
      {
        "virtualPath": "System.Reflection.Primitives.wasm",
        "name": "System.Reflection.Primitives.2lmw53tvtv.wasm",
        "integrity": "sha256-qiThZNSKlcbisohVN63ucSkRFpVl1ul43xn7GH37pMM="
      },
      {
        "virtualPath": "System.Runtime.Extensions.wasm",
        "name": "System.Runtime.Extensions.arr7t16mgl.wasm",
        "integrity": "sha256-Rkk/TaFB7S8krdiOht3gR2lLxewu9zMqJIlY3oYB1D8="
      },
      {
        "virtualPath": "System.Runtime.InteropServices.wasm",
        "name": "System.Runtime.InteropServices.z5ffb55e56.wasm",
        "integrity": "sha256-eRamUxjn/OzftBpZ5KTJ33CvezFviYxFfBA3cEb3YAQ="
      },
      {
        "virtualPath": "System.Runtime.Numerics.wasm",
        "name": "System.Runtime.Numerics.dhetwqkmo7.wasm",
        "integrity": "sha256-b4knbImBTu/GZ35tuXeIBvKZHLvty5fNORdBdJdSGLE="
      },
      {
        "virtualPath": "System.Runtime.Serialization.Formatters.wasm",
        "name": "System.Runtime.Serialization.Formatters.k9ztotzzxp.wasm",
        "integrity": "sha256-yPNnJhJ+XMZq43c9iVX1q4aSTjP9+uDuCe55g/3aiWE="
      },
      {
        "virtualPath": "System.Runtime.Serialization.Primitives.wasm",
        "name": "System.Runtime.Serialization.Primitives.78f0ei0jzn.wasm",
        "integrity": "sha256-6ZwbZd5RmQDgnnsYBv/VFSGe/zutsySV/tV9smKTfFI="
      },
      {
        "virtualPath": "System.Runtime.wasm",
        "name": "System.Runtime.fsfn5juh0r.wasm",
        "integrity": "sha256-Ud9Csxc/laWHDB51qW+DbdTbnUPldVl5bDfBrpHga0s="
      },
      {
        "virtualPath": "System.Security.Claims.wasm",
        "name": "System.Security.Claims.lsd4pg9sus.wasm",
        "integrity": "sha256-1adid4Q5JZloxJYTfQFZFF9h71DrXF//5BovsWttnto="
      },
      {
        "virtualPath": "System.Security.Cryptography.wasm",
        "name": "System.Security.Cryptography.lzhbf73pno.wasm",
        "integrity": "sha256-L3XEkRqF+93dhKj1GEL2IDDNYAp8+1lEmURETOqjIao="
      },
      {
        "virtualPath": "System.Text.Encodings.Web.wasm",
        "name": "System.Text.Encodings.Web.zt2kz9lr33.wasm",
        "integrity": "sha256-qd3UTtlS9dvUipOgXqoc0kUfIJbcgDteq4H003wtecg="
      },
      {
        "virtualPath": "System.Text.Json.wasm",
        "name": "System.Text.Json.u8mkqtay05.wasm",
        "integrity": "sha256-nrs8RzyQv8cB/Vrf7QOuMMu2s4F9NTXxSFHa2gC/C3g="
      },
      {
        "virtualPath": "System.Text.RegularExpressions.wasm",
        "name": "System.Text.RegularExpressions.lwkoo4zkp1.wasm",
        "integrity": "sha256-K6gz4vIuP4/wLPQPHB7n1Nn19x/ctyrWq5yqYVmCJqE="
      },
      {
        "virtualPath": "System.Threading.Channels.wasm",
        "name": "System.Threading.Channels.e1vrwuiqmh.wasm",
        "integrity": "sha256-4s3COqvRZks3Tw9S/bBdzUweNNpTI8x1tiJAqBHigds="
      },
      {
        "virtualPath": "System.Threading.Thread.wasm",
        "name": "System.Threading.Thread.5tssps13t1.wasm",
        "integrity": "sha256-JwYWUAjjaf6wP3jIkjtC6LSvzxlijq9Z5KPRmKA3zvw="
      },
      {
        "virtualPath": "System.Threading.wasm",
        "name": "System.Threading.8n1iwr7od4.wasm",
        "integrity": "sha256-1LRs6auiGzgvHohZDSznX+JhfZDFvsf9QWfYl6eVvVI="
      },
      {
        "virtualPath": "System.Web.HttpUtility.wasm",
        "name": "System.Web.HttpUtility.mx1o98jozm.wasm",
        "integrity": "sha256-yhhsk6SveeJniP9VYYhPvfpFtIjctYy3C5IQSg3wGJY="
      },
      {
        "virtualPath": "System.wasm",
        "name": "System.qd6vz5dsw4.wasm",
        "integrity": "sha256-DjnfyiJT4CEyoUxKWMF1eMsCn7Be4e1lTKynlybkqs4="
      },
      {
        "virtualPath": "netstandard.wasm",
        "name": "netstandard.hr5thc4tkl.wasm",
        "integrity": "sha256-baOpQNLrgqB53yHPGnOJUZB182pVHTbO8es45V88Y9o="
      },
      {
        "virtualPath": "Capybara.wasm",
        "name": "Capybara.aai4dfcmme.wasm",
        "integrity": "sha256-bsETnJyzqlObbueRPLZIM/gh60DJQ52fTidHfcTMkGQ="
      }
    ],
    "satelliteResources": {
      "bg": [
        {
          "virtualPath": "Heron.MudCalendar.resources.wasm",
          "name": "Heron.MudCalendar.resources.k1lrur7sl7.wasm",
          "integrity": "sha256-SD1t3wER1tNLxtgrwQUkAQJbuylJjJb4b0SkXxzR9Dw="
        }
      ],
      "cs": [
        {
          "virtualPath": "Heron.MudCalendar.resources.wasm",
          "name": "Heron.MudCalendar.resources.o51vzdvqal.wasm",
          "integrity": "sha256-ZCEb1J+2bDq4Byg//yWzXez+XAlfNDW7UlUrSRB1haY="
        }
      ],
      "da": [
        {
          "virtualPath": "Heron.MudCalendar.resources.wasm",
          "name": "Heron.MudCalendar.resources.pkh2tn15rj.wasm",
          "integrity": "sha256-eQ6bjfzJQ8xP4hE8iQTCNcPZ5aFKK1ekY+SfKMpGDoc="
        }
      ],
      "de": [
        {
          "virtualPath": "Heron.MudCalendar.resources.wasm",
          "name": "Heron.MudCalendar.resources.hzhvbx2f6j.wasm",
          "integrity": "sha256-zVuF7a1j86MdxzX7iyDR3IRbpxcuB7QhmAGczMv+OF4="
        }
      ],
      "el": [
        {
          "virtualPath": "Heron.MudCalendar.resources.wasm",
          "name": "Heron.MudCalendar.resources.nw4f58mphm.wasm",
          "integrity": "sha256-l6v4DIT5tPsPy0nyp+QRiAKyUrAm6dOWna+cRAMLOd0="
        }
      ],
      "es": [
        {
          "virtualPath": "Heron.MudCalendar.resources.wasm",
          "name": "Heron.MudCalendar.resources.zkzc157p18.wasm",
          "integrity": "sha256-3Tupj8RUQYvnJf2KSCcmTcLqmzf/4Y3GFv1engxJ2Bk="
        }
      ],
      "et": [
        {
          "virtualPath": "Heron.MudCalendar.resources.wasm",
          "name": "Heron.MudCalendar.resources.l2gfe60ngk.wasm",
          "integrity": "sha256-45rGaYO8MCeu5pvqsXaoka6LY9kXxeC/4/99i7sReLk="
        }
      ],
      "fa": [
        {
          "virtualPath": "Heron.MudCalendar.resources.wasm",
          "name": "Heron.MudCalendar.resources.njztx0963f.wasm",
          "integrity": "sha256-Myqf6frNgAJs2x7KBZZmGyuc+ZioWD05JKFMoU28xpw="
        }
      ],
      "fi": [
        {
          "virtualPath": "Heron.MudCalendar.resources.wasm",
          "name": "Heron.MudCalendar.resources.oc7jlj6lak.wasm",
          "integrity": "sha256-CFMuTcHnXf24ux+1B5tgsYKk4+0Cawj66sd0PRsDhTU="
        }
      ],
      "fr": [
        {
          "virtualPath": "Heron.MudCalendar.resources.wasm",
          "name": "Heron.MudCalendar.resources.e8odq3a2xy.wasm",
          "integrity": "sha256-7iEgA5yQz7UZEtPCfJKdikzrR2UiZQsExnb0GbaGhiQ="
        }
      ],
      "hr": [
        {
          "virtualPath": "Heron.MudCalendar.resources.wasm",
          "name": "Heron.MudCalendar.resources.yxympnd5nk.wasm",
          "integrity": "sha256-Zt93JQrVD1d97ObxKCf0qfLzgiqfs96slPKCPf86Jkg="
        }
      ],
      "hu": [
        {
          "virtualPath": "Heron.MudCalendar.resources.wasm",
          "name": "Heron.MudCalendar.resources.7nqg1wtv4d.wasm",
          "integrity": "sha256-HWR/KH/kU0GASKObpQtw4V3IClW+QFst/yCCYIDdF80="
        }
      ],
      "id": [
        {
          "virtualPath": "Heron.MudCalendar.resources.wasm",
          "name": "Heron.MudCalendar.resources.gljhuer8dr.wasm",
          "integrity": "sha256-jPzbtru6JcSGdWrKHOKy4mu6JjNQhPTsUkSuB8lG0Z4="
        }
      ],
      "it": [
        {
          "virtualPath": "Heron.MudCalendar.resources.wasm",
          "name": "Heron.MudCalendar.resources.ilo87yl1he.wasm",
          "integrity": "sha256-ehKZILSxUjvqPxHxQXY2CgbY44/bsM0dnPYHi3ru7Ao="
        }
      ],
      "ja": [
        {
          "virtualPath": "Heron.MudCalendar.resources.wasm",
          "name": "Heron.MudCalendar.resources.df1f7wgmzl.wasm",
          "integrity": "sha256-+Rtk0yTWE2opX/ddRLnKUweB8cNHIYibpYrhm39U4iA="
        }
      ],
      "ko": [
        {
          "virtualPath": "Heron.MudCalendar.resources.wasm",
          "name": "Heron.MudCalendar.resources.mbrjl4gr31.wasm",
          "integrity": "sha256-7mm0qN9iA/PgS+bpuYAslteAFDHJ6DxQ/2r8HppByFw="
        }
      ],
      "lt": [
        {
          "virtualPath": "Heron.MudCalendar.resources.wasm",
          "name": "Heron.MudCalendar.resources.w6y7yl6nfu.wasm",
          "integrity": "sha256-2J6FsOu4Vt1jKXOUVVVfuD/xuSU2VyJ/eQsTLHpcbEI="
        }
      ],
      "lv": [
        {
          "virtualPath": "Heron.MudCalendar.resources.wasm",
          "name": "Heron.MudCalendar.resources.80entt2m82.wasm",
          "integrity": "sha256-qBdkMmfa8NRqwZLf12A3LDXsY9dtcS3xx2mp8U9iM3U="
        }
      ],
      "nb": [
        {
          "virtualPath": "Heron.MudCalendar.resources.wasm",
          "name": "Heron.MudCalendar.resources.ggax9hhy5y.wasm",
          "integrity": "sha256-0C+7FGCy+WyVFGZfl5u0S87cm3rE3366Z+vVgxaFnS4="
        }
      ],
      "nl": [
        {
          "virtualPath": "Heron.MudCalendar.resources.wasm",
          "name": "Heron.MudCalendar.resources.fdg7x32cyt.wasm",
          "integrity": "sha256-XeQtwl8sjb+PGSR7N1qeXxrf1V65YchOnBw80aK923I="
        }
      ],
      "pl": [
        {
          "virtualPath": "Heron.MudCalendar.resources.wasm",
          "name": "Heron.MudCalendar.resources.ph01uy5cpr.wasm",
          "integrity": "sha256-Q1GpCzxn1pb8F1piEznROl42Y0x/S88m+4bQpNFfT7k="
        }
      ],
      "pt": [
        {
          "virtualPath": "Heron.MudCalendar.resources.wasm",
          "name": "Heron.MudCalendar.resources.0x71j7ccmy.wasm",
          "integrity": "sha256-rPJvXRl0E2+9zk/Vjm5gD0jWsRZfupHdVV41Z/r1/lM="
        }
      ],
      "ro": [
        {
          "virtualPath": "Heron.MudCalendar.resources.wasm",
          "name": "Heron.MudCalendar.resources.7xvhmwlohv.wasm",
          "integrity": "sha256-22GUDcG5B/gE2LTQ+QmCrWYpxWbGO/NhIAU24LHVamE="
        }
      ],
      "ru": [
        {
          "virtualPath": "Heron.MudCalendar.resources.wasm",
          "name": "Heron.MudCalendar.resources.lviqpdy3yu.wasm",
          "integrity": "sha256-Ec9yH4nwfmANSwVotSxubJ9Lmn/YCVzs2x+ujbw6tN4="
        }
      ],
      "sk": [
        {
          "virtualPath": "Heron.MudCalendar.resources.wasm",
          "name": "Heron.MudCalendar.resources.merl96kz2d.wasm",
          "integrity": "sha256-AgGUhJkDNhiYeMYtfkIi7+GIfifRDFrNCsAEmflb2nM="
        }
      ],
      "sl": [
        {
          "virtualPath": "Heron.MudCalendar.resources.wasm",
          "name": "Heron.MudCalendar.resources.q6l1wyrzw8.wasm",
          "integrity": "sha256-foY3BwANcr7LSZMHc+Tq6Er9uobxQ4U+ib0FzRZKQ1s="
        }
      ],
      "sv": [
        {
          "virtualPath": "Heron.MudCalendar.resources.wasm",
          "name": "Heron.MudCalendar.resources.uvgaiic9qz.wasm",
          "integrity": "sha256-+k3vGp+NAFYSrrZx8/oAVv6cchHPkvBNp+vxIichV1s="
        }
      ],
      "tr": [
        {
          "virtualPath": "Heron.MudCalendar.resources.wasm",
          "name": "Heron.MudCalendar.resources.uacfywpuf3.wasm",
          "integrity": "sha256-Bt71xmwE1hJu8bQqMw4wmbF9NZXmuGyfbvvD5hgtcKU="
        }
      ],
      "uk": [
        {
          "virtualPath": "Heron.MudCalendar.resources.wasm",
          "name": "Heron.MudCalendar.resources.13667qnkui.wasm",
          "integrity": "sha256-sxyWZrrsMxnwR3w+lvx5If2nqWmDiLm10SHBf/HMk2Y="
        }
      ],
      "zh": [
        {
          "virtualPath": "Heron.MudCalendar.resources.wasm",
          "name": "Heron.MudCalendar.resources.anf5v6fgv6.wasm",
          "integrity": "sha256-diX71yifAkdZ5BDpzSfefVKl+u6+PtX5IN1bBnfwerM="
        }
      ]
    },
    "libraryInitializers": [
      {
        "name": "_content/Toolbelt.Blazor.GetProperty.Script/Toolbelt.Blazor.GetProperty.Script.lib.module.js"
      },
      {
        "name": "_content/ReactorBlazorQRCodeScanner/ReactorBlazorQRCodeScanner.0vos51tt9n.lib.module.js"
      }
    ],
    "modulesAfterConfigLoaded": [
      {
        "name": "../_content/ReactorBlazorQRCodeScanner/ReactorBlazorQRCodeScanner.0vos51tt9n.lib.module.js"
      }
    ],
    "modulesAfterRuntimeReady": [
      {
        "name": "../_content/Toolbelt.Blazor.GetProperty.Script/Toolbelt.Blazor.GetProperty.Script.lib.module.js"
      }
    ]
  },
  "debugLevel": 0,
  "linkerEnabled": true,
  "appsettings": [
    "../appsettings.json"
  ],
  "globalizationMode": "sharded",
  "extensions": {
    "blazor": {}
  },
  "runtimeConfig": {
    "runtimeOptions": {
      "configProperties": {
        "Microsoft.AspNetCore.Components.Routing.RegexConstraintSupport": false,
        "System.Net.Http.WasmEnableStreamingResponse": true,
        "Toolbelt.Blazor.SpeechSynthesis.OptimizeForWasm": true,
        "Microsoft.Extensions.DependencyInjection.VerifyOpenGenericServiceTrimmability": true,
        "System.ComponentModel.DefaultValueAttribute.IsSupported": false,
        "System.ComponentModel.Design.IDesignerHost.IsSupported": false,
        "System.ComponentModel.TypeConverter.EnableUnsafeBinaryFormatterInDesigntimeLicenseContextSerialization": false,
        "System.ComponentModel.TypeDescriptor.IsComObjectDescriptorSupported": false,
        "System.Data.DataSet.XmlSerializationIsSupported": false,
        "System.Diagnostics.Debugger.IsSupported": false,
        "System.Diagnostics.Metrics.Meter.IsSupported": false,
        "System.Diagnostics.Tracing.EventSource.IsSupported": false,
        "System.GC.Server": true,
        "System.Globalization.Invariant": false,
        "System.TimeZoneInfo.Invariant": false,
        "System.Linq.Enumerable.IsSizeOptimized": true,
        "System.Net.Http.EnableActivityPropagation": false,
        "System.Net.SocketsHttpHandler.Http3Support": false,
        "System.Reflection.Metadata.MetadataUpdater.IsSupported": false,
        "System.Resources.ResourceManager.AllowCustomResourceTypes": false,
        "System.Resources.UseSystemResourceKeys": true,
        "System.Runtime.CompilerServices.RuntimeFeature.IsDynamicCodeSupported": true,
        "System.Runtime.InteropServices.BuiltInComInterop.IsSupported": false,
        "System.Runtime.InteropServices.EnableConsumingManagedCodeFromNativeHosting": false,
        "System.Runtime.InteropServices.EnableCppCLIHostActivation": false,
        "System.Runtime.InteropServices.Marshalling.EnableGeneratedComInterfaceComImportInterop": false,
        "System.Runtime.Serialization.EnableUnsafeBinaryFormatterSerialization": false,
        "System.StartupHookProvider.IsSupported": false,
        "System.Text.Encoding.EnableUnsafeUTF7Encoding": false,
        "System.Text.Json.JsonSerializer.IsReflectionEnabledByDefault": true,
        "System.Threading.Thread.EnableAutoreleasePool": false,
        "Microsoft.AspNetCore.Components.Endpoints.NavigationManager.DisableThrowNavigationException": false
      }
    }
  }
}/*json-end*/);export{gt as default,ft as dotnet,mt as exit};
//# sourceMappingURL=dotnet.js.map
