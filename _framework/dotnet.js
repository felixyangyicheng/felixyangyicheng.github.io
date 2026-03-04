//! Licensed to the .NET Foundation under one or more agreements.
//! The .NET Foundation licenses this file to you under the MIT license.

var e=!1;const t=async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,8,1,6,0,6,64,25,11,11])),o=async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,15,1,13,0,65,1,253,15,65,2,253,15,253,128,2,11])),n=async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,10,1,8,0,65,0,253,15,253,98,11])),r=Symbol.for("wasm promise_control");function i(e,t){let o=null;const n=new Promise((function(n,r){o={isDone:!1,promise:null,resolve:t=>{o.isDone||(o.isDone=!0,n(t),e&&e())},reject:e=>{o.isDone||(o.isDone=!0,r(e),t&&t())}}}));o.promise=n;const i=n;return i[r]=o,{promise:i,promise_control:o}}function s(e){return e[r]}function a(e){e&&function(e){return void 0!==e[r]}(e)||Be(!1,"Promise is not controllable")}const l="__mono_message__",c=["debug","log","trace","warn","info","error"],d="MONO_WASM: ";let u,f,m,g,p,h;function w(e){g=e}function b(e){if(Pe.diagnosticTracing){const t="function"==typeof e?e():e;console.debug(d+t)}}function y(e,...t){console.info(d+e,...t)}function v(e,...t){console.info(e,...t)}function E(e,...t){console.warn(d+e,...t)}function _(e,...t){if(t&&t.length>0&&t[0]&&"object"==typeof t[0]){if(t[0].silent)return;if(t[0].toString)return void console.error(d+e,t[0].toString())}console.error(d+e,...t)}function x(e,t,o){return function(...n){try{let r=n[0];if(void 0===r)r="undefined";else if(null===r)r="null";else if("function"==typeof r)r=r.toString();else if("string"!=typeof r)try{r=JSON.stringify(r)}catch(e){r=r.toString()}t(o?JSON.stringify({method:e,payload:r,arguments:n.slice(1)}):[e+r,...n.slice(1)])}catch(e){m.error(`proxyConsole failed: ${e}`)}}}function j(e,t,o){f=t,g=e,m={...t};const n=`${o}/console`.replace("https://","wss://").replace("http://","ws://");u=new WebSocket(n),u.addEventListener("error",A),u.addEventListener("close",S),function(){for(const e of c)f[e]=x(`console.${e}`,T,!0)}()}function R(e){let t=30;const o=()=>{u?0==u.bufferedAmount||0==t?(e&&v(e),function(){for(const e of c)f[e]=x(`console.${e}`,m.log,!1)}(),u.removeEventListener("error",A),u.removeEventListener("close",S),u.close(1e3,e),u=void 0):(t--,globalThis.setTimeout(o,100)):e&&m&&m.log(e)};o()}function T(e){u&&u.readyState===WebSocket.OPEN?u.send(e):m.log(e)}function A(e){m.error(`[${g}] proxy console websocket error: ${e}`,e)}function S(e){m.debug(`[${g}] proxy console websocket closed: ${e}`,e)}function D(){Pe.preferredIcuAsset=O(Pe.config);let e="invariant"==Pe.config.globalizationMode;if(!e)if(Pe.preferredIcuAsset)Pe.diagnosticTracing&&b("ICU data archive(s) available, disabling invariant mode");else{if("custom"===Pe.config.globalizationMode||"all"===Pe.config.globalizationMode||"sharded"===Pe.config.globalizationMode){const e="invariant globalization mode is inactive and no ICU data archives are available";throw _(`ERROR: ${e}`),new Error(e)}Pe.diagnosticTracing&&b("ICU data archive(s) not available, using invariant globalization mode"),e=!0,Pe.preferredIcuAsset=null}const t="DOTNET_SYSTEM_GLOBALIZATION_INVARIANT",o=Pe.config.environmentVariables;if(void 0===o[t]&&e&&(o[t]="1"),void 0===o.TZ)try{const e=Intl.DateTimeFormat().resolvedOptions().timeZone||null;e&&(o.TZ=e)}catch(e){y("failed to detect timezone, will fallback to UTC")}}function O(e){var t;if((null===(t=e.resources)||void 0===t?void 0:t.icu)&&"invariant"!=e.globalizationMode){const t=e.applicationCulture||(ke?globalThis.navigator&&globalThis.navigator.languages&&globalThis.navigator.languages[0]:Intl.DateTimeFormat().resolvedOptions().locale),o=e.resources.icu;let n=null;if("custom"===e.globalizationMode){if(o.length>=1)return o[0].name}else t&&"all"!==e.globalizationMode?"sharded"===e.globalizationMode&&(n=function(e){const t=e.split("-")[0];return"en"===t||["fr","fr-FR","it","it-IT","de","de-DE","es","es-ES"].includes(e)?"icudt_EFIGS.dat":["zh","ko","ja"].includes(t)?"icudt_CJK.dat":"icudt_no_CJK.dat"}(t)):n="icudt.dat";if(n)for(let e=0;e<o.length;e++){const t=o[e];if(t.virtualPath===n)return t.name}}return e.globalizationMode="invariant",null}(new Date).valueOf();const C=class{constructor(e){this.url=e}toString(){return this.url}};async function k(e,t){try{const o="function"==typeof globalThis.fetch;if(Se){const n=e.startsWith("file://");if(!n&&o)return globalThis.fetch(e,t||{credentials:"same-origin"});p||(h=Ne.require("url"),p=Ne.require("fs")),n&&(e=h.fileURLToPath(e));const r=await p.promises.readFile(e);return{ok:!0,headers:{length:0,get:()=>null},url:e,arrayBuffer:()=>r,json:()=>JSON.parse(r),text:()=>{throw new Error("NotImplementedException")}}}if(o)return globalThis.fetch(e,t||{credentials:"same-origin"});if("function"==typeof read)return{ok:!0,url:e,headers:{length:0,get:()=>null},arrayBuffer:()=>new Uint8Array(read(e,"binary")),json:()=>JSON.parse(read(e,"utf8")),text:()=>read(e,"utf8")}}catch(t){return{ok:!1,url:e,status:500,headers:{length:0,get:()=>null},statusText:"ERR28: "+t,arrayBuffer:()=>{throw t},json:()=>{throw t},text:()=>{throw t}}}throw new Error("No fetch implementation available")}function I(e){return"string"!=typeof e&&Be(!1,"url must be a string"),!M(e)&&0!==e.indexOf("./")&&0!==e.indexOf("../")&&globalThis.URL&&globalThis.document&&globalThis.document.baseURI&&(e=new URL(e,globalThis.document.baseURI).toString()),e}const U=/^[a-zA-Z][a-zA-Z\d+\-.]*?:\/\//,P=/[a-zA-Z]:[\\/]/;function M(e){return Se||Ie?e.startsWith("/")||e.startsWith("\\")||-1!==e.indexOf("///")||P.test(e):U.test(e)}let L,N=0;const $=[],z=[],W=new Map,F={"js-module-threads":!0,"js-module-runtime":!0,"js-module-dotnet":!0,"js-module-native":!0,"js-module-diagnostics":!0},B={...F,"js-module-library-initializer":!0},V={...F,dotnetwasm:!0,heap:!0,manifest:!0},q={...B,manifest:!0},H={...B,dotnetwasm:!0},J={dotnetwasm:!0,symbols:!0},Z={...B,dotnetwasm:!0,symbols:!0},Q={symbols:!0};function G(e){return!("icu"==e.behavior&&e.name!=Pe.preferredIcuAsset)}function K(e,t,o){null!=t||(t=[]),Be(1==t.length,`Expect to have one ${o} asset in resources`);const n=t[0];return n.behavior=o,X(n),e.push(n),n}function X(e){V[e.behavior]&&W.set(e.behavior,e)}function Y(e){Be(V[e],`Unknown single asset behavior ${e}`);const t=W.get(e);if(t&&!t.resolvedUrl)if(t.resolvedUrl=Pe.locateFile(t.name),F[t.behavior]){const e=ge(t);e?("string"!=typeof e&&Be(!1,"loadBootResource response for 'dotnetjs' type should be a URL string"),t.resolvedUrl=e):t.resolvedUrl=ce(t.resolvedUrl,t.behavior)}else if("dotnetwasm"!==t.behavior)throw new Error(`Unknown single asset behavior ${e}`);return t}function ee(e){const t=Y(e);return Be(t,`Single asset for ${e} not found`),t}let te=!1;async function oe(){if(!te){te=!0,Pe.diagnosticTracing&&b("mono_download_assets");try{const e=[],t=[],o=(e,t)=>{!Z[e.behavior]&&G(e)&&Pe.expected_instantiated_assets_count++,!H[e.behavior]&&G(e)&&(Pe.expected_downloaded_assets_count++,t.push(se(e)))};for(const t of $)o(t,e);for(const e of z)o(e,t);Pe.allDownloadsQueued.promise_control.resolve(),Promise.all([...e,...t]).then((()=>{Pe.allDownloadsFinished.promise_control.resolve()})).catch((e=>{throw Pe.err("Error in mono_download_assets: "+e),Xe(1,e),e})),await Pe.runtimeModuleLoaded.promise;const n=async e=>{const t=await e;if(t.buffer){if(!Z[t.behavior]){t.buffer&&"object"==typeof t.buffer||Be(!1,"asset buffer must be array-like or buffer-like or promise of these"),"string"!=typeof t.resolvedUrl&&Be(!1,"resolvedUrl must be string");const e=t.resolvedUrl,o=await t.buffer,n=new Uint8Array(o);pe(t),await Ue.beforeOnRuntimeInitialized.promise,Ue.instantiate_asset(t,e,n)}}else J[t.behavior]?("symbols"===t.behavior&&(await Ue.instantiate_symbols_asset(t),pe(t)),J[t.behavior]&&++Pe.actual_downloaded_assets_count):(t.isOptional||Be(!1,"Expected asset to have the downloaded buffer"),!H[t.behavior]&&G(t)&&Pe.expected_downloaded_assets_count--,!Z[t.behavior]&&G(t)&&Pe.expected_instantiated_assets_count--)},r=[],i=[];for(const t of e)r.push(n(t));for(const e of t)i.push(n(e));Promise.all(r).then((()=>{Ce||Ue.coreAssetsInMemory.promise_control.resolve()})).catch((e=>{throw Pe.err("Error in mono_download_assets: "+e),Xe(1,e),e})),Promise.all(i).then((async()=>{Ce||(await Ue.coreAssetsInMemory.promise,Ue.allAssetsInMemory.promise_control.resolve())})).catch((e=>{throw Pe.err("Error in mono_download_assets: "+e),Xe(1,e),e}))}catch(e){throw Pe.err("Error in mono_download_assets: "+e),e}}}let ne=!1;function re(){if(ne)return;ne=!0;const e=Pe.config,t=[];if(e.assets)for(const t of e.assets)"object"!=typeof t&&Be(!1,`asset must be object, it was ${typeof t} : ${t}`),"string"!=typeof t.behavior&&Be(!1,"asset behavior must be known string"),"string"!=typeof t.name&&Be(!1,"asset name must be string"),t.resolvedUrl&&"string"!=typeof t.resolvedUrl&&Be(!1,"asset resolvedUrl could be string"),t.hash&&"string"!=typeof t.hash&&Be(!1,"asset resolvedUrl could be string"),t.pendingDownload&&"object"!=typeof t.pendingDownload&&Be(!1,"asset pendingDownload could be object"),t.isCore?$.push(t):z.push(t),X(t);else if(e.resources){const o=e.resources;o.wasmNative||Be(!1,"resources.wasmNative must be defined"),o.jsModuleNative||Be(!1,"resources.jsModuleNative must be defined"),o.jsModuleRuntime||Be(!1,"resources.jsModuleRuntime must be defined"),K(z,o.wasmNative,"dotnetwasm"),K(t,o.jsModuleNative,"js-module-native"),K(t,o.jsModuleRuntime,"js-module-runtime"),o.jsModuleDiagnostics&&K(t,o.jsModuleDiagnostics,"js-module-diagnostics");const n=(e,t,o)=>{const n=e;n.behavior=t,o?(n.isCore=!0,$.push(n)):z.push(n)};if(o.coreAssembly)for(let e=0;e<o.coreAssembly.length;e++)n(o.coreAssembly[e],"assembly",!0);if(o.assembly)for(let e=0;e<o.assembly.length;e++)n(o.assembly[e],"assembly",!o.coreAssembly);if(0!=e.debugLevel&&Pe.isDebuggingSupported()){if(o.corePdb)for(let e=0;e<o.corePdb.length;e++)n(o.corePdb[e],"pdb",!0);if(o.pdb)for(let e=0;e<o.pdb.length;e++)n(o.pdb[e],"pdb",!o.corePdb)}if(e.loadAllSatelliteResources&&o.satelliteResources)for(const e in o.satelliteResources)for(let t=0;t<o.satelliteResources[e].length;t++){const r=o.satelliteResources[e][t];r.culture=e,n(r,"resource",!o.coreAssembly)}if(o.coreVfs)for(let e=0;e<o.coreVfs.length;e++)n(o.coreVfs[e],"vfs",!0);if(o.vfs)for(let e=0;e<o.vfs.length;e++)n(o.vfs[e],"vfs",!o.coreVfs);const r=O(e);if(r&&o.icu)for(let e=0;e<o.icu.length;e++){const t=o.icu[e];t.name===r&&n(t,"icu",!1)}if(o.wasmSymbols)for(let e=0;e<o.wasmSymbols.length;e++)n(o.wasmSymbols[e],"symbols",!1)}if(e.appsettings)for(let t=0;t<e.appsettings.length;t++){const o=e.appsettings[t],n=he(o);"appsettings.json"!==n&&n!==`appsettings.${e.applicationEnvironment}.json`||z.push({name:o,behavior:"vfs",cache:"no-cache",useCredentials:!0})}e.assets=[...$,...z,...t]}async function ie(e){const t=await se(e);return await t.pendingDownloadInternal.response,t.buffer}async function se(e){try{return await ae(e)}catch(t){if(!Pe.enableDownloadRetry)throw t;if(Ie||Se)throw t;if(e.pendingDownload&&e.pendingDownloadInternal==e.pendingDownload)throw t;if(e.resolvedUrl&&-1!=e.resolvedUrl.indexOf("file://"))throw t;if(t&&404==t.status)throw t;e.pendingDownloadInternal=void 0,await Pe.allDownloadsQueued.promise;try{return Pe.diagnosticTracing&&b(`Retrying download '${e.name}'`),await ae(e)}catch(t){return e.pendingDownloadInternal=void 0,await new Promise((e=>globalThis.setTimeout(e,100))),Pe.diagnosticTracing&&b(`Retrying download (2) '${e.name}' after delay`),await ae(e)}}}async function ae(e){for(;L;)await L.promise;try{++N,N==Pe.maxParallelDownloads&&(Pe.diagnosticTracing&&b("Throttling further parallel downloads"),L=i());const t=await async function(e){if(e.pendingDownload&&(e.pendingDownloadInternal=e.pendingDownload),e.pendingDownloadInternal&&e.pendingDownloadInternal.response)return e.pendingDownloadInternal.response;if(e.buffer){const t=await e.buffer;return e.resolvedUrl||(e.resolvedUrl="undefined://"+e.name),e.pendingDownloadInternal={url:e.resolvedUrl,name:e.name,response:Promise.resolve({ok:!0,arrayBuffer:()=>t,json:()=>JSON.parse(new TextDecoder("utf-8").decode(t)),text:()=>{throw new Error("NotImplementedException")},headers:{get:()=>{}}})},e.pendingDownloadInternal.response}const t=e.loadRemote&&Pe.config.remoteSources?Pe.config.remoteSources:[""];let o;for(let n of t){n=n.trim(),"./"===n&&(n="");const t=le(e,n);e.name===t?Pe.diagnosticTracing&&b(`Attempting to download '${t}'`):Pe.diagnosticTracing&&b(`Attempting to download '${t}' for ${e.name}`);try{e.resolvedUrl=t;const n=fe(e);if(e.pendingDownloadInternal=n,o=await n.response,!o||!o.ok)continue;return o}catch(e){o||(o={ok:!1,url:t,status:0,statusText:""+e});continue}}const n=e.isOptional||e.name.match(/\.pdb$/)&&Pe.config.ignorePdbLoadErrors;if(o||Be(!1,`Response undefined ${e.name}`),!n){const t=new Error(`download '${o.url}' for ${e.name} failed ${o.status} ${o.statusText}`);throw t.status=o.status,t}y(`optional download '${o.url}' for ${e.name} failed ${o.status} ${o.statusText}`)}(e);return t?(J[e.behavior]||(e.buffer=await t.arrayBuffer(),++Pe.actual_downloaded_assets_count),e):e}finally{if(--N,L&&N==Pe.maxParallelDownloads-1){Pe.diagnosticTracing&&b("Resuming more parallel downloads");const e=L;L=void 0,e.promise_control.resolve()}}}function le(e,t){let o;return null==t&&Be(!1,`sourcePrefix must be provided for ${e.name}`),e.resolvedUrl?o=e.resolvedUrl:(o=""===t?"assembly"===e.behavior||"pdb"===e.behavior?e.name:"resource"===e.behavior&&e.culture&&""!==e.culture?`${e.culture}/${e.name}`:e.name:t+e.name,o=ce(Pe.locateFile(o),e.behavior)),o&&"string"==typeof o||Be(!1,"attemptUrl need to be path or url string"),o}function ce(e,t){return Pe.modulesUniqueQuery&&q[t]&&(e+=Pe.modulesUniqueQuery),e}let de=0;const ue=new Set;function fe(e){try{e.resolvedUrl||Be(!1,"Request's resolvedUrl must be set");const t=function(e){let t=e.resolvedUrl;if(Pe.loadBootResource){const o=ge(e);if(o instanceof Promise)return o;"string"==typeof o&&(t=o)}const o={};return e.cache?o.cache=e.cache:Pe.config.disableNoCacheFetch||(o.cache="no-cache"),e.useCredentials?o.credentials="include":!Pe.config.disableIntegrityCheck&&e.hash&&(o.integrity=e.hash),Pe.fetch_like(t,o)}(e),o={name:e.name,url:e.resolvedUrl,response:t};return ue.add(e.name),o.response.then((()=>{"assembly"==e.behavior&&Pe.loadedAssemblies.push(e.name),de++,Pe.onDownloadResourceProgress&&Pe.onDownloadResourceProgress(de,ue.size)})),o}catch(t){const o={ok:!1,url:e.resolvedUrl,status:500,statusText:"ERR29: "+t,arrayBuffer:()=>{throw t},json:()=>{throw t}};return{name:e.name,url:e.resolvedUrl,response:Promise.resolve(o)}}}const me={resource:"assembly",assembly:"assembly",pdb:"pdb",icu:"globalization",vfs:"configuration",manifest:"manifest",dotnetwasm:"dotnetwasm","js-module-dotnet":"dotnetjs","js-module-native":"dotnetjs","js-module-runtime":"dotnetjs","js-module-threads":"dotnetjs"};function ge(e){var t;if(Pe.loadBootResource){const o=null!==(t=e.hash)&&void 0!==t?t:"",n=e.resolvedUrl,r=me[e.behavior];if(r){const t=Pe.loadBootResource(r,e.name,n,o,e.behavior);return"string"==typeof t?I(t):t}}}function pe(e){e.pendingDownloadInternal=null,e.pendingDownload=null,e.buffer=null,e.moduleExports=null}function he(e){let t=e.lastIndexOf("/");return t>=0&&t++,e.substring(t)}async function we(e){e&&await Promise.all((null!=e?e:[]).map((e=>async function(e){try{const t=e.name;if(!e.moduleExports){const o=ce(Pe.locateFile(t),"js-module-library-initializer");Pe.diagnosticTracing&&b(`Attempting to import '${o}' for ${e}`),e.moduleExports=await import(/*! webpackIgnore: true */o)}Pe.libraryInitializers.push({scriptName:t,exports:e.moduleExports})}catch(t){E(`Failed to import library initializer '${e}': ${t}`)}}(e))))}async function be(e,t){if(!Pe.libraryInitializers)return;const o=[];for(let n=0;n<Pe.libraryInitializers.length;n++){const r=Pe.libraryInitializers[n];r.exports[e]&&o.push(ye(r.scriptName,e,(()=>r.exports[e](...t))))}await Promise.all(o)}async function ye(e,t,o){try{await o()}catch(o){throw E(`Failed to invoke '${t}' on library initializer '${e}': ${o}`),Xe(1,o),o}}function ve(e,t){if(e===t)return e;const o={...t};return void 0!==o.assets&&o.assets!==e.assets&&(o.assets=[...e.assets||[],...o.assets||[]]),void 0!==o.resources&&(o.resources=_e(e.resources||{assembly:[],jsModuleNative:[],jsModuleRuntime:[],wasmNative:[]},o.resources)),void 0!==o.environmentVariables&&(o.environmentVariables={...e.environmentVariables||{},...o.environmentVariables||{}}),void 0!==o.runtimeOptions&&o.runtimeOptions!==e.runtimeOptions&&(o.runtimeOptions=[...e.runtimeOptions||[],...o.runtimeOptions||[]]),Object.assign(e,o)}function Ee(e,t){if(e===t)return e;const o={...t};return o.config&&(e.config||(e.config={}),o.config=ve(e.config,o.config)),Object.assign(e,o)}function _e(e,t){if(e===t)return e;const o={...t};return void 0!==o.coreAssembly&&(o.coreAssembly=[...e.coreAssembly||[],...o.coreAssembly||[]]),void 0!==o.assembly&&(o.assembly=[...e.assembly||[],...o.assembly||[]]),void 0!==o.lazyAssembly&&(o.lazyAssembly=[...e.lazyAssembly||[],...o.lazyAssembly||[]]),void 0!==o.corePdb&&(o.corePdb=[...e.corePdb||[],...o.corePdb||[]]),void 0!==o.pdb&&(o.pdb=[...e.pdb||[],...o.pdb||[]]),void 0!==o.jsModuleWorker&&(o.jsModuleWorker=[...e.jsModuleWorker||[],...o.jsModuleWorker||[]]),void 0!==o.jsModuleNative&&(o.jsModuleNative=[...e.jsModuleNative||[],...o.jsModuleNative||[]]),void 0!==o.jsModuleDiagnostics&&(o.jsModuleDiagnostics=[...e.jsModuleDiagnostics||[],...o.jsModuleDiagnostics||[]]),void 0!==o.jsModuleRuntime&&(o.jsModuleRuntime=[...e.jsModuleRuntime||[],...o.jsModuleRuntime||[]]),void 0!==o.wasmSymbols&&(o.wasmSymbols=[...e.wasmSymbols||[],...o.wasmSymbols||[]]),void 0!==o.wasmNative&&(o.wasmNative=[...e.wasmNative||[],...o.wasmNative||[]]),void 0!==o.icu&&(o.icu=[...e.icu||[],...o.icu||[]]),void 0!==o.satelliteResources&&(o.satelliteResources=function(e,t){if(e===t)return e;for(const o in t)e[o]=[...e[o]||[],...t[o]||[]];return e}(e.satelliteResources||{},o.satelliteResources||{})),void 0!==o.modulesAfterConfigLoaded&&(o.modulesAfterConfigLoaded=[...e.modulesAfterConfigLoaded||[],...o.modulesAfterConfigLoaded||[]]),void 0!==o.modulesAfterRuntimeReady&&(o.modulesAfterRuntimeReady=[...e.modulesAfterRuntimeReady||[],...o.modulesAfterRuntimeReady||[]]),void 0!==o.extensions&&(o.extensions={...e.extensions||{},...o.extensions||{}}),void 0!==o.vfs&&(o.vfs=[...e.vfs||[],...o.vfs||[]]),Object.assign(e,o)}function xe(){const e=Pe.config;if(e.environmentVariables=e.environmentVariables||{},e.runtimeOptions=e.runtimeOptions||[],e.resources=e.resources||{assembly:[],jsModuleNative:[],jsModuleWorker:[],jsModuleRuntime:[],wasmNative:[],vfs:[],satelliteResources:{}},e.assets){Pe.diagnosticTracing&&b("config.assets is deprecated, use config.resources instead");for(const t of e.assets){const o={};switch(t.behavior){case"assembly":o.assembly=[t];break;case"pdb":o.pdb=[t];break;case"resource":o.satelliteResources={},o.satelliteResources[t.culture]=[t];break;case"icu":o.icu=[t];break;case"symbols":o.wasmSymbols=[t];break;case"vfs":o.vfs=[t];break;case"dotnetwasm":o.wasmNative=[t];break;case"js-module-threads":o.jsModuleWorker=[t];break;case"js-module-runtime":o.jsModuleRuntime=[t];break;case"js-module-native":o.jsModuleNative=[t];break;case"js-module-diagnostics":o.jsModuleDiagnostics=[t];break;case"js-module-dotnet":break;default:throw new Error(`Unexpected behavior ${t.behavior} of asset ${t.name}`)}_e(e.resources,o)}}e.debugLevel,e.applicationEnvironment||(e.applicationEnvironment="Production"),e.applicationCulture&&(e.environmentVariables.LANG=`${e.applicationCulture}.UTF-8`),Ue.diagnosticTracing=Pe.diagnosticTracing=!!e.diagnosticTracing,Ue.waitForDebugger=e.waitForDebugger,Pe.maxParallelDownloads=e.maxParallelDownloads||Pe.maxParallelDownloads,Pe.enableDownloadRetry=void 0!==e.enableDownloadRetry?e.enableDownloadRetry:Pe.enableDownloadRetry}let je=!1;async function Re(e){var t;if(je)return void await Pe.afterConfigLoaded.promise;let o;try{if(e.configSrc||Pe.config&&0!==Object.keys(Pe.config).length&&(Pe.config.assets||Pe.config.resources)||(e.configSrc="dotnet.boot.js"),o=e.configSrc,je=!0,o&&(Pe.diagnosticTracing&&b("mono_wasm_load_config"),await async function(e){const t=e.configSrc,o=Pe.locateFile(t);let n=null;void 0!==Pe.loadBootResource&&(n=Pe.loadBootResource("manifest",t,o,"","manifest"));let r,i=null;if(n)if("string"==typeof n)n.includes(".json")?(i=await s(I(n)),r=await Ae(i)):r=(await import(I(n))).config;else{const e=await n;"function"==typeof e.json?(i=e,r=await Ae(i)):r=e.config}else o.includes(".json")?(i=await s(ce(o,"manifest")),r=await Ae(i)):r=(await import(ce(o,"manifest"))).config;function s(e){return Pe.fetch_like(e,{method:"GET",credentials:"include",cache:"no-cache"})}Pe.config.applicationEnvironment&&(r.applicationEnvironment=Pe.config.applicationEnvironment),ve(Pe.config,r)}(e)),xe(),await we(null===(t=Pe.config.resources)||void 0===t?void 0:t.modulesAfterConfigLoaded),await be("onRuntimeConfigLoaded",[Pe.config]),e.onConfigLoaded)try{await e.onConfigLoaded(Pe.config,Le),xe()}catch(e){throw _("onConfigLoaded() failed",e),e}xe(),Pe.afterConfigLoaded.promise_control.resolve(Pe.config)}catch(t){const n=`Failed to load config file ${o} ${t} ${null==t?void 0:t.stack}`;throw Pe.config=e.config=Object.assign(Pe.config,{message:n,error:t,isError:!0}),Xe(1,new Error(n)),t}}function Te(){return!!globalThis.navigator&&(Pe.isChromium||Pe.isFirefox)}async function Ae(e){const t=Pe.config,o=await e.json();t.applicationEnvironment||o.applicationEnvironment||(o.applicationEnvironment=e.headers.get("Blazor-Environment")||e.headers.get("DotNet-Environment")||void 0),o.environmentVariables||(o.environmentVariables={});const n=e.headers.get("DOTNET-MODIFIABLE-ASSEMBLIES");n&&(o.environmentVariables.DOTNET_MODIFIABLE_ASSEMBLIES=n);const r=e.headers.get("ASPNETCORE-BROWSER-TOOLS");return r&&(o.environmentVariables.__ASPNETCORE_BROWSER_TOOLS=r),o}"function"!=typeof importScripts||globalThis.onmessage||(globalThis.dotnetSidecar=!0);const Se="object"==typeof process&&"object"==typeof process.versions&&"string"==typeof process.versions.node,De="function"==typeof importScripts,Oe=De&&"undefined"!=typeof dotnetSidecar,Ce=De&&!Oe,ke="object"==typeof window||De&&!Se,Ie=!ke&&!Se;let Ue={},Pe={},Me={},Le={},Ne={},$e=!1;const ze={},We={config:ze},Fe={mono:{},binding:{},internal:Ne,module:We,loaderHelpers:Pe,runtimeHelpers:Ue,diagnosticHelpers:Me,api:Le};function Be(e,t){if(e)return;const o="Assert failed: "+("function"==typeof t?t():t),n=new Error(o);_(o,n),Ue.nativeAbort(n)}function Ve(){return void 0!==Pe.exitCode}function qe(){return Ue.runtimeReady&&!Ve()}function He(){Ve()&&Be(!1,`.NET runtime already exited with ${Pe.exitCode} ${Pe.exitReason}. You can use runtime.runMain() which doesn't exit the runtime.`),Ue.runtimeReady||Be(!1,".NET runtime didn't start yet. Please call dotnet.create() first.")}function Je(){ke&&(globalThis.addEventListener("unhandledrejection",et),globalThis.addEventListener("error",tt))}let Ze,Qe;function Ge(e){Qe&&Qe(e),Xe(e,Pe.exitReason)}function Ke(e){Ze&&Ze(e||Pe.exitReason),Xe(1,e||Pe.exitReason)}function Xe(t,o){var n,r;const i=o&&"object"==typeof o;t=i&&"number"==typeof o.status?o.status:void 0===t?-1:t;const s=i&&"string"==typeof o.message?o.message:""+o;(o=i?o:Ue.ExitStatus?function(e,t){const o=new Ue.ExitStatus(e);return o.message=t,o.toString=()=>t,o}(t,s):new Error("Exit with code "+t+" "+s)).status=t,o.message||(o.message=s);const a=""+(o.stack||(new Error).stack);try{Object.defineProperty(o,"stack",{get:()=>a})}catch(e){}const l=!!o.silent;if(o.silent=!0,Ve())Pe.diagnosticTracing&&b("mono_exit called after exit");else{try{We.onAbort==Ke&&(We.onAbort=Ze),We.onExit==Ge&&(We.onExit=Qe),ke&&(globalThis.removeEventListener("unhandledrejection",et),globalThis.removeEventListener("error",tt)),Ue.runtimeReady?(Ue.jiterpreter_dump_stats&&Ue.jiterpreter_dump_stats(!1),0===t&&(null===(n=Pe.config)||void 0===n?void 0:n.interopCleanupOnExit)&&Ue.forceDisposeProxies(!0,!0),e&&0!==t&&(null===(r=Pe.config)||void 0===r||r.dumpThreadsOnNonZeroExit)):(Pe.diagnosticTracing&&b(`abort_startup, reason: ${o}`),function(e){Pe.allDownloadsQueued.promise_control.reject(e),Pe.allDownloadsFinished.promise_control.reject(e),Pe.afterConfigLoaded.promise_control.reject(e),Pe.wasmCompilePromise.promise_control.reject(e),Pe.runtimeModuleLoaded.promise_control.reject(e),Ue.dotnetReady&&(Ue.dotnetReady.promise_control.reject(e),Ue.afterInstantiateWasm.promise_control.reject(e),Ue.beforePreInit.promise_control.reject(e),Ue.afterPreInit.promise_control.reject(e),Ue.afterPreRun.promise_control.reject(e),Ue.beforeOnRuntimeInitialized.promise_control.reject(e),Ue.afterOnRuntimeInitialized.promise_control.reject(e),Ue.afterPostRun.promise_control.reject(e))}(o))}catch(e){E("mono_exit A failed",e)}try{l||(function(e,t){if(0!==e&&t){const e=Ue.ExitStatus&&t instanceof Ue.ExitStatus?b:_;"string"==typeof t?e(t):(void 0===t.stack&&(t.stack=(new Error).stack+""),t.message?e(Ue.stringify_as_error_with_stack?Ue.stringify_as_error_with_stack(t.message+"\n"+t.stack):t.message+"\n"+t.stack):e(JSON.stringify(t)))}!Ce&&Pe.config&&(Pe.config.logExitCode?Pe.config.forwardConsoleLogsToWS?R("WASM EXIT "+e):v("WASM EXIT "+e):Pe.config.forwardConsoleLogsToWS&&R())}(t,o),function(e){if(ke&&!Ce&&Pe.config&&Pe.config.appendElementOnExit&&document){const t=document.createElement("label");t.id="tests_done",0!==e&&(t.style.background="red"),t.innerHTML=""+e,document.body.appendChild(t)}}(t))}catch(e){E("mono_exit B failed",e)}Pe.exitCode=t,Pe.exitReason||(Pe.exitReason=o),!Ce&&Ue.runtimeReady&&We.runtimeKeepalivePop()}if(Pe.config&&Pe.config.asyncFlushOnExit&&0===t)throw(async()=>{try{await async function(){try{const e=await import(/*! webpackIgnore: true */"process"),t=e=>new Promise(((t,o)=>{e.on("error",o),e.end("","utf8",t)})),o=t(e.stderr),n=t(e.stdout);let r;const i=new Promise((e=>{r=setTimeout((()=>e("timeout")),1e3)}));await Promise.race([Promise.all([n,o]),i]),clearTimeout(r)}catch(e){_(`flushing std* streams failed: ${e}`)}}()}finally{Ye(t,o)}})(),o;Ye(t,o)}function Ye(e,t){if(Ue.runtimeReady&&Ue.nativeExit)try{Ue.nativeExit(e)}catch(e){!Ue.ExitStatus||e instanceof Ue.ExitStatus||E("set_exit_code_and_quit_now failed: "+e.toString())}if(0!==e||!ke)throw Se&&Ne.process?Ne.process.exit(e):Ue.quit&&Ue.quit(e,t),t}function et(e){ot(e,e.reason,"rejection")}function tt(e){ot(e,e.error,"error")}function ot(e,t,o){e.preventDefault();try{t||(t=new Error("Unhandled "+o)),void 0===t.stack&&(t.stack=(new Error).stack),t.stack=t.stack+"",t.silent||(_("Unhandled error:",t),Xe(1,t))}catch(e){}}!function(e){if($e)throw new Error("Loader module already loaded");$e=!0,Ue=e.runtimeHelpers,Pe=e.loaderHelpers,Me=e.diagnosticHelpers,Le=e.api,Ne=e.internal,Object.assign(Le,{INTERNAL:Ne,invokeLibraryInitializers:be}),Object.assign(e.module,{config:ve(ze,{environmentVariables:{}})});const r={mono_wasm_bindings_is_ready:!1,config:e.module.config,diagnosticTracing:!1,nativeAbort:e=>{throw e||new Error("abort")},nativeExit:e=>{throw new Error("exit:"+e)}},l={gitHash:"c2435c3e0f46de784341ac3ed62863ce77e117b4",config:e.module.config,diagnosticTracing:!1,maxParallelDownloads:16,enableDownloadRetry:!0,_loaded_files:[],loadedFiles:[],loadedAssemblies:[],libraryInitializers:[],workerNextNumber:1,actual_downloaded_assets_count:0,actual_instantiated_assets_count:0,expected_downloaded_assets_count:0,expected_instantiated_assets_count:0,afterConfigLoaded:i(),allDownloadsQueued:i(),allDownloadsFinished:i(),wasmCompilePromise:i(),runtimeModuleLoaded:i(),loadingWorkers:i(),is_exited:Ve,is_runtime_running:qe,assert_runtime_running:He,mono_exit:Xe,createPromiseController:i,getPromiseController:s,assertIsControllablePromise:a,mono_download_assets:oe,resolve_single_asset_path:ee,setup_proxy_console:j,set_thread_prefix:w,installUnhandledErrorHandler:Je,retrieve_asset_download:ie,invokeLibraryInitializers:be,isDebuggingSupported:Te,exceptions:t,simd:n,relaxedSimd:o};Object.assign(Ue,r),Object.assign(Pe,l)}(Fe);let nt,rt,it,st=!1,at=!1;async function lt(e){if(!at){if(at=!0,ke&&Pe.config.forwardConsoleLogsToWS&&void 0!==globalThis.WebSocket&&j("main",globalThis.console,globalThis.location.origin),We||Be(!1,"Null moduleConfig"),Pe.config||Be(!1,"Null moduleConfig.config"),"function"==typeof e){const t=e(Fe.api);if(t.ready)throw new Error("Module.ready couldn't be redefined.");Object.assign(We,t),Ee(We,t)}else{if("object"!=typeof e)throw new Error("Can't use moduleFactory callback of createDotnetRuntime function.");Ee(We,e)}await async function(e){if(Se){const e=await import(/*! webpackIgnore: true */"process"),t=14;if(e.versions.node.split(".")[0]<t)throw new Error(`NodeJS at '${e.execPath}' has too low version '${e.versions.node}', please use at least ${t}. See also https://aka.ms/dotnet-wasm-features`)}const t=/*! webpackIgnore: true */import.meta.url,o=t.indexOf("?");var n;if(o>0&&(Pe.modulesUniqueQuery=t.substring(o)),Pe.scriptUrl=t.replace(/\\/g,"/").replace(/[?#].*/,""),Pe.scriptDirectory=(n=Pe.scriptUrl).slice(0,n.lastIndexOf("/"))+"/",Pe.locateFile=e=>"URL"in globalThis&&globalThis.URL!==C?new URL(e,Pe.scriptDirectory).toString():M(e)?e:Pe.scriptDirectory+e,Pe.fetch_like=k,Pe.out=console.log,Pe.err=console.error,Pe.onDownloadResourceProgress=e.onDownloadResourceProgress,ke&&globalThis.navigator){const e=globalThis.navigator,t=e.userAgentData&&e.userAgentData.brands;t&&t.length>0?Pe.isChromium=t.some((e=>"Google Chrome"===e.brand||"Microsoft Edge"===e.brand||"Chromium"===e.brand)):e.userAgent&&(Pe.isChromium=e.userAgent.includes("Chrome"),Pe.isFirefox=e.userAgent.includes("Firefox"))}Ne.require=Se?await import(/*! webpackIgnore: true */"module").then((e=>e.createRequire(/*! webpackIgnore: true */import.meta.url))):Promise.resolve((()=>{throw new Error("require not supported")})),void 0===globalThis.URL&&(globalThis.URL=C)}(We)}}async function ct(e){return await lt(e),Ze=We.onAbort,Qe=We.onExit,We.onAbort=Ke,We.onExit=Ge,We.ENVIRONMENT_IS_PTHREAD?async function(){(function(){const e=new MessageChannel,t=e.port1,o=e.port2;t.addEventListener("message",(e=>{var n,r;n=JSON.parse(e.data.config),r=JSON.parse(e.data.monoThreadInfo),st?Pe.diagnosticTracing&&b("mono config already received"):(ve(Pe.config,n),Ue.monoThreadInfo=r,xe(),Pe.diagnosticTracing&&b("mono config received"),st=!0,Pe.afterConfigLoaded.promise_control.resolve(Pe.config),ke&&n.forwardConsoleLogsToWS&&void 0!==globalThis.WebSocket&&Pe.setup_proxy_console("worker-idle",console,globalThis.location.origin)),t.close(),o.close()}),{once:!0}),t.start(),self.postMessage({[l]:{monoCmd:"preload",port:o}},[o])})(),await Pe.afterConfigLoaded.promise,function(){const e=Pe.config;e.assets||Be(!1,"config.assets must be defined");for(const t of e.assets)X(t),Q[t.behavior]&&z.push(t)}(),setTimeout((async()=>{try{await oe()}catch(e){Xe(1,e)}}),0);const e=dt(),t=await Promise.all(e);return await ut(t),We}():async function(){var e;await Re(We),re();const t=dt();(async function(){try{const e=ee("dotnetwasm");await se(e),e&&e.pendingDownloadInternal&&e.pendingDownloadInternal.response||Be(!1,"Can't load dotnet.native.wasm");const t=await e.pendingDownloadInternal.response,o=t.headers&&t.headers.get?t.headers.get("Content-Type"):void 0;let n;if("function"==typeof WebAssembly.compileStreaming&&"application/wasm"===o)n=await WebAssembly.compileStreaming(t);else{ke&&"application/wasm"!==o&&E('WebAssembly resource does not have the expected content type "application/wasm", so falling back to slower ArrayBuffer instantiation.');const e=await t.arrayBuffer();Pe.diagnosticTracing&&b("instantiate_wasm_module buffered"),n=Ie?await Promise.resolve(new WebAssembly.Module(e)):await WebAssembly.compile(e)}e.pendingDownloadInternal=null,e.pendingDownload=null,e.buffer=null,e.moduleExports=null,Pe.wasmCompilePromise.promise_control.resolve(n)}catch(e){Pe.wasmCompilePromise.promise_control.reject(e)}})(),setTimeout((async()=>{try{D(),await oe()}catch(e){Xe(1,e)}}),0);const o=await Promise.all(t);return await ut(o),await Ue.dotnetReady.promise,await we(null===(e=Pe.config.resources)||void 0===e?void 0:e.modulesAfterRuntimeReady),await be("onRuntimeReady",[Fe.api]),Le}()}function dt(){const e=ee("js-module-runtime"),t=ee("js-module-native");if(nt&&rt)return[nt,rt,it];"object"==typeof e.moduleExports?nt=e.moduleExports:(Pe.diagnosticTracing&&b(`Attempting to import '${e.resolvedUrl}' for ${e.name}`),nt=import(/*! webpackIgnore: true */e.resolvedUrl)),"object"==typeof t.moduleExports?rt=t.moduleExports:(Pe.diagnosticTracing&&b(`Attempting to import '${t.resolvedUrl}' for ${t.name}`),rt=import(/*! webpackIgnore: true */t.resolvedUrl));const o=Y("js-module-diagnostics");return o&&("object"==typeof o.moduleExports?it=o.moduleExports:(Pe.diagnosticTracing&&b(`Attempting to import '${o.resolvedUrl}' for ${o.name}`),it=import(/*! webpackIgnore: true */o.resolvedUrl))),[nt,rt,it]}async function ut(e){const{initializeExports:t,initializeReplacements:o,configureRuntimeStartup:n,configureEmscriptenStartup:r,configureWorkerStartup:i,setRuntimeGlobals:s,passEmscriptenInternals:a}=e[0],{default:l}=e[1],c=e[2];s(Fe),t(Fe),c&&c.setRuntimeGlobals(Fe),await n(We),Pe.runtimeModuleLoaded.promise_control.resolve(),l((e=>(Object.assign(We,{ready:e.ready,__dotnet_runtime:{initializeReplacements:o,configureEmscriptenStartup:r,configureWorkerStartup:i,passEmscriptenInternals:a}}),We))).catch((e=>{if(e.message&&e.message.toLowerCase().includes("out of memory"))throw new Error(".NET runtime has failed to start, because too much memory was requested. Please decrease the memory by adjusting EmccMaximumHeapSize. See also https://aka.ms/dotnet-wasm-features");throw e}))}const ft=new class{withModuleConfig(e){try{return Ee(We,e),this}catch(e){throw Xe(1,e),e}}withOnConfigLoaded(e){try{return Ee(We,{onConfigLoaded:e}),this}catch(e){throw Xe(1,e),e}}withConsoleForwarding(){try{return ve(ze,{forwardConsoleLogsToWS:!0}),this}catch(e){throw Xe(1,e),e}}withExitOnUnhandledError(){try{return ve(ze,{exitOnUnhandledError:!0}),Je(),this}catch(e){throw Xe(1,e),e}}withAsyncFlushOnExit(){try{return ve(ze,{asyncFlushOnExit:!0}),this}catch(e){throw Xe(1,e),e}}withExitCodeLogging(){try{return ve(ze,{logExitCode:!0}),this}catch(e){throw Xe(1,e),e}}withElementOnExit(){try{return ve(ze,{appendElementOnExit:!0}),this}catch(e){throw Xe(1,e),e}}withInteropCleanupOnExit(){try{return ve(ze,{interopCleanupOnExit:!0}),this}catch(e){throw Xe(1,e),e}}withDumpThreadsOnNonZeroExit(){try{return ve(ze,{dumpThreadsOnNonZeroExit:!0}),this}catch(e){throw Xe(1,e),e}}withWaitingForDebugger(e){try{return ve(ze,{waitForDebugger:e}),this}catch(e){throw Xe(1,e),e}}withInterpreterPgo(e,t){try{return ve(ze,{interpreterPgo:e,interpreterPgoSaveDelay:t}),ze.runtimeOptions?ze.runtimeOptions.push("--interp-pgo-recording"):ze.runtimeOptions=["--interp-pgo-recording"],this}catch(e){throw Xe(1,e),e}}withConfig(e){try{return ve(ze,e),this}catch(e){throw Xe(1,e),e}}withConfigSrc(e){try{return e&&"string"==typeof e||Be(!1,"must be file path or URL"),Ee(We,{configSrc:e}),this}catch(e){throw Xe(1,e),e}}withVirtualWorkingDirectory(e){try{return e&&"string"==typeof e||Be(!1,"must be directory path"),ve(ze,{virtualWorkingDirectory:e}),this}catch(e){throw Xe(1,e),e}}withEnvironmentVariable(e,t){try{const o={};return o[e]=t,ve(ze,{environmentVariables:o}),this}catch(e){throw Xe(1,e),e}}withEnvironmentVariables(e){try{return e&&"object"==typeof e||Be(!1,"must be dictionary object"),ve(ze,{environmentVariables:e}),this}catch(e){throw Xe(1,e),e}}withDiagnosticTracing(e){try{return"boolean"!=typeof e&&Be(!1,"must be boolean"),ve(ze,{diagnosticTracing:e}),this}catch(e){throw Xe(1,e),e}}withDebugging(e){try{return null!=e&&"number"==typeof e||Be(!1,"must be number"),ve(ze,{debugLevel:e}),this}catch(e){throw Xe(1,e),e}}withApplicationArguments(...e){try{return e&&Array.isArray(e)||Be(!1,"must be array of strings"),ve(ze,{applicationArguments:e}),this}catch(e){throw Xe(1,e),e}}withRuntimeOptions(e){try{return e&&Array.isArray(e)||Be(!1,"must be array of strings"),ze.runtimeOptions?ze.runtimeOptions.push(...e):ze.runtimeOptions=e,this}catch(e){throw Xe(1,e),e}}withMainAssembly(e){try{return ve(ze,{mainAssemblyName:e}),this}catch(e){throw Xe(1,e),e}}withApplicationArgumentsFromQuery(){try{if(!globalThis.window)throw new Error("Missing window to the query parameters from");if(void 0===globalThis.URLSearchParams)throw new Error("URLSearchParams is supported");const e=new URLSearchParams(globalThis.window.location.search).getAll("arg");return this.withApplicationArguments(...e)}catch(e){throw Xe(1,e),e}}withApplicationEnvironment(e){try{return ve(ze,{applicationEnvironment:e}),this}catch(e){throw Xe(1,e),e}}withApplicationCulture(e){try{return ve(ze,{applicationCulture:e}),this}catch(e){throw Xe(1,e),e}}withResourceLoader(e){try{return Pe.loadBootResource=e,this}catch(e){throw Xe(1,e),e}}async download(){try{await async function(){lt(We),await Re(We),re(),D(),oe(),await Pe.allDownloadsFinished.promise}()}catch(e){throw Xe(1,e),e}}async create(){try{return this.instance||(this.instance=await async function(){return await ct(We),Fe.api}()),this.instance}catch(e){throw Xe(1,e),e}}async run(){try{return We.config||Be(!1,"Null moduleConfig.config"),this.instance||await this.create(),this.instance.runMainAndExit()}catch(e){throw Xe(1,e),e}}},mt=Xe,gt=ct;Ie||"function"==typeof globalThis.URL||Be(!1,"This browser/engine doesn't support URL API. Please use a modern version. See also https://aka.ms/dotnet-wasm-features"),"function"!=typeof globalThis.BigInt64Array&&Be(!1,"This browser/engine doesn't support BigInt64Array API. Please use a modern version. See also https://aka.ms/dotnet-wasm-features"),ft.withConfig(/*json-start*/{
  "mainAssemblyName": "Capybara",
  "resources": {
    "hash": "sha256-EnK/2nqSXxt60OW84LdVDmyXs1haOOpv3XW9K1iZylg=",
    "jsModuleNative": [
      {
        "name": "dotnet.native.ou6otd71kf.js"
      }
    ],
    "jsModuleRuntime": [
      {
        "name": "dotnet.runtime.q5rqv3xrhm.js"
      }
    ],
    "wasmNative": [
      {
        "name": "dotnet.native.lasbl8suhp.wasm",
        "integrity": "sha256-AwfyB1eCzFuFUeryhWTUDBTaqw24LrUVfTT4kFyrwh0=",
        "cache": "force-cache"
      }
    ],
    "icu": [
      {
        "virtualPath": "icudt_CJK.dat",
        "name": "icudt_CJK.tjcz0u77k5.dat",
        "integrity": "sha256-SZLtQnRc0JkwqHab0VUVP7T3uBPSeYzxzDnpxPpUnHk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "icudt_EFIGS.dat",
        "name": "icudt_EFIGS.tptq2av103.dat",
        "integrity": "sha256-8fItetYY8kQ0ww6oxwTLiT3oXlBwHKumbeP2pRF4yTc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "icudt_no_CJK.dat",
        "name": "icudt_no_CJK.lfu7j35m59.dat",
        "integrity": "sha256-L7sV7NEYP37/Qr2FPCePo5cJqRgTXRwGHuwF5Q+0Nfs=",
        "cache": "force-cache"
      }
    ],
    "coreAssembly": [
      {
        "virtualPath": "System.Runtime.InteropServices.JavaScript.wasm",
        "name": "System.Runtime.InteropServices.JavaScript.ul6odlo8xj.wasm",
        "integrity": "sha256-cli2ovgcOl5t8/IW9YWZLyzeYKZjyD5cn6O0Z1y7qaQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Private.CoreLib.wasm",
        "name": "System.Private.CoreLib.2d0kdi7rmq.wasm",
        "integrity": "sha256-Ktx84+CJ8qLZS0uGakYABkW7JaZYAHgAxNXFBlvghYo=",
        "cache": "force-cache"
      }
    ],
    "assembly": [
      {
        "virtualPath": "Blazor-ApexCharts.wasm",
        "name": "Blazor-ApexCharts.xli09jm79l.wasm",
        "integrity": "sha256-y6xCVrdHquOGKqSnGKW9wnOTiqE342sjwA+qfkd5ONM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "BlazorComponentUtilities.wasm",
        "name": "BlazorComponentUtilities.jrk97nw8r4.wasm",
        "integrity": "sha256-oQvSWR3JOlm+ohv4ovIcQkgLnBzz+q8hRIwWOFZCd9I=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "BlazorPro.Spinkit.wasm",
        "name": "BlazorPro.Spinkit.xgohbmf257.wasm",
        "integrity": "sha256-IQlANxXKe2MbUR2gXAqzX+z6JMbE7zAfl7+HV2shzGc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "BootstrapBlazor.wasm",
        "name": "BootstrapBlazor.rw8lzla761.wasm",
        "integrity": "sha256-pQjcOlOoWmzT8lDMfjKcDn4nFMDqTArk61/8F8KO760=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "BootstrapBlazor.Markdown.wasm",
        "name": "BootstrapBlazor.Markdown.vkk40yc4oa.wasm",
        "integrity": "sha256-0Ta16ZoF96Pa6cb72eOgwfq4b1LdgOp0j8W1cpOB2UU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "BootstrapBlazor.WebAPI.wasm",
        "name": "BootstrapBlazor.WebAPI.1cl339xwip.wasm",
        "integrity": "sha256-wUWuOXjm0yd4EGJHfwNhBCEd0UCkrhgcsZV7scfl/6o=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Heron.MudCalendar.wasm",
        "name": "Heron.MudCalendar.1hk7d6nwlz.wasm",
        "integrity": "sha256-myd64akaNXeyGBp5ZyRYj+qEinJD7EfBZjlePYjbM5s=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "JiuLing.CommonLibs.wasm",
        "name": "JiuLing.CommonLibs.mzxuhx1yrz.wasm",
        "integrity": "sha256-kmxTcACE5aljW4Q3WD8fWxCcI4G9CdgDWSNUJqg/VwU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Authorization.wasm",
        "name": "Microsoft.AspNetCore.Authorization.ha7zamteux.wasm",
        "integrity": "sha256-qcFxfk5Jj8l/YK7nhMq1k7DnKlgjkuMCe8FXKirfMFo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Components.wasm",
        "name": "Microsoft.AspNetCore.Components.l05z6nmo4v.wasm",
        "integrity": "sha256-JebY02fppbodvaRkj7Qio+XzA5fKfvX2Mb+1BnfYMVs=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Components.Authorization.wasm",
        "name": "Microsoft.AspNetCore.Components.Authorization.7xjct6kdv5.wasm",
        "integrity": "sha256-JXuWjqucjgGki29bU1/e1/zBQk5xfKdlc6juvPv42sE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Components.Forms.wasm",
        "name": "Microsoft.AspNetCore.Components.Forms.k2z2o3hdlg.wasm",
        "integrity": "sha256-DHJ3Ar3jWuBmXxOkNdb0/fTMgJ2cHNGsuiBEyXxEbxY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Components.Web.wasm",
        "name": "Microsoft.AspNetCore.Components.Web.c5snwmkwc1.wasm",
        "integrity": "sha256-wJn7npit33C0ZSflK0ni6emlSB36udeJhTiKnm0F7eo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Components.WebAssembly.wasm",
        "name": "Microsoft.AspNetCore.Components.WebAssembly.my8efd4vit.wasm",
        "integrity": "sha256-Ihg/Uc6xKn30srpgjS6ssTQujKLl35fWeNCbayiFwSY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Connections.Abstractions.wasm",
        "name": "Microsoft.AspNetCore.Connections.Abstractions.5h8d1ve7n5.wasm",
        "integrity": "sha256-13YBWI/XIVujZRkM+GJErMTFyfBOKqf23oxjOgvuWWg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Http.Connections.Client.wasm",
        "name": "Microsoft.AspNetCore.Http.Connections.Client.1nd0180rr2.wasm",
        "integrity": "sha256-Dcai/apiYttBe+JqbpZ/Zc+PvEb7kiJVRp2q57AAbyU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Http.Connections.Common.wasm",
        "name": "Microsoft.AspNetCore.Http.Connections.Common.9c25ro3znw.wasm",
        "integrity": "sha256-Gea96aorcuhUor2d+6jc7NM2+DwTqhS8LPBxQmfNkvA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Metadata.wasm",
        "name": "Microsoft.AspNetCore.Metadata.3tj1rw598p.wasm",
        "integrity": "sha256-hyVhdjUpyHZZbSg8L54mTM1ZMzP8qbsRT1GFPfuKAW4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.AspNetCore.SignalR.Client.wasm",
        "name": "Microsoft.AspNetCore.SignalR.Client.q4hbf9men2.wasm",
        "integrity": "sha256-ej7KVZLwZVB6uTHKgfa20LmCMpXFjiU5QAUkZhXdlYo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.AspNetCore.SignalR.Client.Core.wasm",
        "name": "Microsoft.AspNetCore.SignalR.Client.Core.htjggaeejx.wasm",
        "integrity": "sha256-VaAxwLM8IS4CWPjTD04zdJbsW9arbEFJIl0h+rL/ycw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.AspNetCore.SignalR.Common.wasm",
        "name": "Microsoft.AspNetCore.SignalR.Common.7k0mpde2yi.wasm",
        "integrity": "sha256-Vxm0qRig9Y19qsZA5jMKfelGAwC0CJqjy/z29qECc4g=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.AspNetCore.SignalR.Protocols.Json.wasm",
        "name": "Microsoft.AspNetCore.SignalR.Protocols.Json.34kx473cem.wasm",
        "integrity": "sha256-7euoZ3ZNT0rCiqWfIu4ViuetCh0+8iI721yvXsb7fG0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Caching.Abstractions.wasm",
        "name": "Microsoft.Extensions.Caching.Abstractions.iadvam2mul.wasm",
        "integrity": "sha256-Cld6svDmaIN9+iq0iSPSxZBC6Mc4rYKSSbDYQ4ZWHiY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Caching.Memory.wasm",
        "name": "Microsoft.Extensions.Caching.Memory.7898zqiilr.wasm",
        "integrity": "sha256-tyu8lWaHOcRbx2PGE82UCPeh4XLPrG9/CCrDJ+BhCHM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Configuration.wasm",
        "name": "Microsoft.Extensions.Configuration.vfvt99wuj1.wasm",
        "integrity": "sha256-azHQkYoey/sEhX4XKT643GG7hpcYDAxh9vgJMqwZLd8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Configuration.Abstractions.wasm",
        "name": "Microsoft.Extensions.Configuration.Abstractions.4sj04alncn.wasm",
        "integrity": "sha256-JGC9dWu/8K8IwDa9Hbw5Z6wDhhZh2bFcSmRwPPGblK4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Configuration.Binder.wasm",
        "name": "Microsoft.Extensions.Configuration.Binder.6wvlv0lpyf.wasm",
        "integrity": "sha256-tqNIn+D5gCEa7lTt8neGFsHInVkjoO4XorKycZi+EM8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Configuration.FileExtensions.wasm",
        "name": "Microsoft.Extensions.Configuration.FileExtensions.5wijr4mjze.wasm",
        "integrity": "sha256-ZZHhwaRTOo1fWEENbHFWRLjFsI/jhFcwGxArzShOrf8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Configuration.Json.wasm",
        "name": "Microsoft.Extensions.Configuration.Json.g7s117afa6.wasm",
        "integrity": "sha256-9D2solUsLjbFfsFbngcVF+9CNKvNTVVNESmEV8OiMYU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.DependencyInjection.wasm",
        "name": "Microsoft.Extensions.DependencyInjection.79qy5ms8qg.wasm",
        "integrity": "sha256-lUlrBksBkQaAt6ES1aYJuSgqEycaq9un03HjojneMNU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.DependencyInjection.Abstractions.wasm",
        "name": "Microsoft.Extensions.DependencyInjection.Abstractions.oa8t6kgith.wasm",
        "integrity": "sha256-QOX1Ol2F7MRgwUXw26llqyytQnj59IMnbypvPaFT4NM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Diagnostics.wasm",
        "name": "Microsoft.Extensions.Diagnostics.w3dl0sqxt4.wasm",
        "integrity": "sha256-nAW02+CSARAMBc7dCGw3tEdPcY2Ea7LRoJZ+pQg8HNs=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Diagnostics.Abstractions.wasm",
        "name": "Microsoft.Extensions.Diagnostics.Abstractions.isypqwhob8.wasm",
        "integrity": "sha256-npldTut68mqzQngvA3K/GSRCbYWhEVEjs1SJ18ArUuo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Features.wasm",
        "name": "Microsoft.Extensions.Features.xeuqs8zk69.wasm",
        "integrity": "sha256-eQisN26qr0dy/Hdj3clB44fHYJJAAiiqTH7f+qcLjgA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.FileProviders.Abstractions.wasm",
        "name": "Microsoft.Extensions.FileProviders.Abstractions.8p1r5e77qb.wasm",
        "integrity": "sha256-XI47H9CJpv1dbZ3fwzCfKY6NcHXNOxKQp/Wf5XoH3h8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.FileProviders.Physical.wasm",
        "name": "Microsoft.Extensions.FileProviders.Physical.hpeobyote0.wasm",
        "integrity": "sha256-ddMpWZ45rn58U7jvAnce1LoZe1ZuwsCk9E5BdZxEw+A=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.FileSystemGlobbing.wasm",
        "name": "Microsoft.Extensions.FileSystemGlobbing.lxhfpbxc3z.wasm",
        "integrity": "sha256-id2rp/3V97tOedrVqIK7n9wi/Ku0kTvnd/4AhVz5Bqk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Http.wasm",
        "name": "Microsoft.Extensions.Http.othohhnlkl.wasm",
        "integrity": "sha256-xEoYtk/vAQPNcKHEKjJJh1TxUUGtwhybviiSUmNiVeM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Localization.wasm",
        "name": "Microsoft.Extensions.Localization.xcslyy3nju.wasm",
        "integrity": "sha256-L2P/tLhZ6FSR1KG27vIE/jer8JBjOAPRMf7D9eFEUNs=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Localization.Abstractions.wasm",
        "name": "Microsoft.Extensions.Localization.Abstractions.p31reu08uv.wasm",
        "integrity": "sha256-VUQ1lLI2VehA1Sc1H+eEM5Wo6ejwEoLz+6JxhCpY984=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Logging.wasm",
        "name": "Microsoft.Extensions.Logging.rdg544eyp4.wasm",
        "integrity": "sha256-L1bF5n+9gpBxrjwDtqRbuzHX6GpEkWbSB2dZzuI8c8U=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Logging.Abstractions.wasm",
        "name": "Microsoft.Extensions.Logging.Abstractions.da25u0jtgj.wasm",
        "integrity": "sha256-1eg7xHRgxSwDY+i6qIVxCSxw9jo7DirHldalehNlxt8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Options.wasm",
        "name": "Microsoft.Extensions.Options.9w9x65j0r5.wasm",
        "integrity": "sha256-pyWsUcPd3YLorRQE70Uke2ADx3z5FztEUqfU+lnWTo4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Options.ConfigurationExtensions.wasm",
        "name": "Microsoft.Extensions.Options.ConfigurationExtensions.51x2fgty5z.wasm",
        "integrity": "sha256-uRKXKG+r7QQPA85+U2lwTB451Nw3+0IeD9j6KNEmhMM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Primitives.wasm",
        "name": "Microsoft.Extensions.Primitives.b40engu30r.wasm",
        "integrity": "sha256-G0/8sdy53kgob3BnXIYK0/Zpc0+fmhfc6RN6IC6QqzI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.JSInterop.wasm",
        "name": "Microsoft.JSInterop.drunhk0zxe.wasm",
        "integrity": "sha256-h8NaNotd4b2n6sHPJP/v0vpEHQc6BTcJap3hpmn4p8Q=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.JSInterop.WebAssembly.wasm",
        "name": "Microsoft.JSInterop.WebAssembly.mrus3axuke.wasm",
        "integrity": "sha256-wmWkUz8XauAbA+eb0N0RvClESqaj+ct9V3xtGILLnp8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "MudBlazor.wasm",
        "name": "MudBlazor.59skr31ip9.wasm",
        "integrity": "sha256-97xQ7pqpnAKas0w2JmvIli7948EbdTzO/fx5CuU868c=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "ReactorBlazorQRCodeScanner.wasm",
        "name": "ReactorBlazorQRCodeScanner.cra8myaxxj.wasm",
        "integrity": "sha256-iJmCEWRuvqyU+l62D8OrQ2ULBTM9xAv3EsYik8tzyiM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Tewr.Blazor.FileReader.wasm",
        "name": "Tewr.Blazor.FileReader.64lx0zzd22.wasm",
        "integrity": "sha256-2johdatokNmFJ2ImQ4NDECayWmZZwkT4Q03+I8iggx8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Toolbelt.Blazor.PWA.Updater.wasm",
        "name": "Toolbelt.Blazor.PWA.Updater.5baid6ti8i.wasm",
        "integrity": "sha256-sVn/cd7yLNN6fAJoCpiSGelIs0XXDYfhivaodQ6ncxs=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Toolbelt.Blazor.PWA.Updater.Service.wasm",
        "name": "Toolbelt.Blazor.PWA.Updater.Service.fapmvd217y.wasm",
        "integrity": "sha256-h1wQYR1toSQSS2RZuDlQf+Ia02QTSVtrlNCPY/oq0Rk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Toolbelt.Blazor.SpeechSynthesis.wasm",
        "name": "Toolbelt.Blazor.SpeechSynthesis.7bye09dlzx.wasm",
        "integrity": "sha256-M3lAmvoS2f1kxOT1kc6AWVpauLVlAhNBM2O3JRzbt7M=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Toolbelt.Web.CssClassInlineBuilder.wasm",
        "name": "Toolbelt.Web.CssClassInlineBuilder.s96yuzfwrp.wasm",
        "integrity": "sha256-QI4m/6TJGKg9JYj3j21i2HlNOfGqMJmJmFwxqRBxoOM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "UAParser.wasm",
        "name": "UAParser.o84k4c0k2d.wasm",
        "integrity": "sha256-eIZXP6Q7o4UEv0jJ0y/5JsXg5Z2gMjC021Ea4crJFNE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "ZXingBlazor.wasm",
        "name": "ZXingBlazor.6d6suntskg.wasm",
        "integrity": "sha256-xobOHXZi8knx9rrEgz7S0uIwj0SddcNgLa9R4wXtomc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.CSharp.wasm",
        "name": "Microsoft.CSharp.ljpvj8m2xh.wasm",
        "integrity": "sha256-73kgkJU6OIDlbRsQYBx0AuRUafgaYBZroaATYw2HsCY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Collections.Concurrent.wasm",
        "name": "System.Collections.Concurrent.w2r3zvhhsc.wasm",
        "integrity": "sha256-2NorL1bLtQl2lsEmW5fID25AHgACFjrZsBwtxYe8nN4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Collections.Immutable.wasm",
        "name": "System.Collections.Immutable.qs6n4qhkpz.wasm",
        "integrity": "sha256-Kr69X7sT9gJeO0xgANy8cWZLYNDtHuM2rVeqIV/fB1s=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Collections.NonGeneric.wasm",
        "name": "System.Collections.NonGeneric.xyrffave91.wasm",
        "integrity": "sha256-p30yEwsyJpXBqdlJ+3v5rVwI6udUmvXM26054EhbhlY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Collections.Specialized.wasm",
        "name": "System.Collections.Specialized.4kynqejdje.wasm",
        "integrity": "sha256-TC8tKZ/lIATDWwxkYtJ3EFeU//wEPxzN+TEIVh+wXwg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Collections.wasm",
        "name": "System.Collections.e0zip2bgnp.wasm",
        "integrity": "sha256-vjKIiOlVyt5KnRhaxpDylUUVjjNZRyn++40QvbuBGBU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ComponentModel.Annotations.wasm",
        "name": "System.ComponentModel.Annotations.epcpq8suy7.wasm",
        "integrity": "sha256-ksbgB9BsoKEUzbvBfZTG6nhNNIitiD4fiMoZlsszeYQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ComponentModel.Primitives.wasm",
        "name": "System.ComponentModel.Primitives.1jfej9ge6y.wasm",
        "integrity": "sha256-44JoI0nrEOuIRdl4Mg6uV8k4k8PskXJTK6R7MgO40pA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ComponentModel.TypeConverter.wasm",
        "name": "System.ComponentModel.TypeConverter.dct5cu5u1l.wasm",
        "integrity": "sha256-M0jtfq6AMyfrJ3/U0G7i12ztGVUvhLmg8eYH9UHhWKA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ComponentModel.wasm",
        "name": "System.ComponentModel.36gpd97ysv.wasm",
        "integrity": "sha256-5QA7+HkNwa6PHdzov3+8HYI+1xfkhcyzMm30jPvgeXE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Console.wasm",
        "name": "System.Console.j8olcgfgt8.wasm",
        "integrity": "sha256-Ddaf0Nb9P0OQRMZ9lNCPrKJjNWA3uAglqWcJjiJnMXg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Data.Common.wasm",
        "name": "System.Data.Common.w66muyppuk.wasm",
        "integrity": "sha256-2D7lEfzXXEV6m0WAlVk/UbzjD0XZQ2Ud64iRCZBhR5M=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Diagnostics.Debug.wasm",
        "name": "System.Diagnostics.Debug.pjn2fobi0o.wasm",
        "integrity": "sha256-teIXGQ0gGtIhnf5+kOS0RWtYrRPXn1bCHNmCt6KC2IU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Diagnostics.DiagnosticSource.wasm",
        "name": "System.Diagnostics.DiagnosticSource.bhuq3p2wro.wasm",
        "integrity": "sha256-zyM71UM3TRdJrPzIHrLlW2Z7Zd2EGaE/NvJHqjyIFCw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Diagnostics.FileVersionInfo.wasm",
        "name": "System.Diagnostics.FileVersionInfo.fxg21fj5rc.wasm",
        "integrity": "sha256-M2/LoCY1E7xHTLCvSgZbzBuC7TVhGVC2UxHWqq1n2DM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Diagnostics.TraceSource.wasm",
        "name": "System.Diagnostics.TraceSource.4x4eczabke.wasm",
        "integrity": "sha256-aGjRsA6FTxt5l6TA2kZ8vHLE3msTm1reMFSC1cOfYFg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Drawing.Primitives.wasm",
        "name": "System.Drawing.Primitives.dr6is8pck6.wasm",
        "integrity": "sha256-R8FQ8C5HETXzl5QrDjQHcKh2e7gl/ruIbeVUmGZAJTw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Drawing.wasm",
        "name": "System.Drawing.8wgi7x9zvd.wasm",
        "integrity": "sha256-+P6iv9BqBaSzIMcl/QoNjmkXV39NyvncqPXZ1Ss7398=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.Compression.ZipFile.wasm",
        "name": "System.IO.Compression.ZipFile.b922g1jc9o.wasm",
        "integrity": "sha256-EaQ3BHQnoSazgIDMQSNLa7RERW0VXatarWnrqooAg+g=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.Compression.wasm",
        "name": "System.IO.Compression.av8m5uwgis.wasm",
        "integrity": "sha256-ZjPXI8D4RhA771uVyJsW2HP5ubAfRShTG07Sz4yjuC0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.FileSystem.Watcher.wasm",
        "name": "System.IO.FileSystem.Watcher.07t2tzfeth.wasm",
        "integrity": "sha256-TBkINe1dqJd6NZyVVZ/0OHYKv4Oy2XoWUPnxpY9LRPE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.Pipelines.wasm",
        "name": "System.IO.Pipelines.flsdiiei25.wasm",
        "integrity": "sha256-/fOfXolsnHCGYamE8UuIRQAykDJTRyP/KpN8iPwXdFM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Linq.Expressions.wasm",
        "name": "System.Linq.Expressions.aor2km7j2x.wasm",
        "integrity": "sha256-mtQ6Cbz/NKAgIAb5k/q9Kvyf4AbLRXPsmtwsQqam8/w=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Linq.Queryable.wasm",
        "name": "System.Linq.Queryable.tzyhu92bfk.wasm",
        "integrity": "sha256-l7KoDO7LZvnkOk0Ni7Ir0J+FZPAxi6JgSSFXP+LaIj4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Linq.wasm",
        "name": "System.Linq.usn0lpusjb.wasm",
        "integrity": "sha256-gm4ZNrDLoA3kHPsi0UcMoiJMU1/PUIB3lr9tWt7FFdw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Memory.wasm",
        "name": "System.Memory.2znf0o5hui.wasm",
        "integrity": "sha256-4uhBjXb06ASo3FiP9Z7ABbe7qkfsSMU+brV+WQZhSZ0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.Http.Json.wasm",
        "name": "System.Net.Http.Json.3ik98ya8s2.wasm",
        "integrity": "sha256-9b81nOeLh3TQ9s8mZFVK7hIdeCXqqrMtpwzTZMlWC38=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.Http.wasm",
        "name": "System.Net.Http.5q3jcro49g.wasm",
        "integrity": "sha256-Yw7UOlEFJu7uz7yaGlpZbWlfq1HvEKDQYZRcm8bvCFQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.Primitives.wasm",
        "name": "System.Net.Primitives.iubzj40n06.wasm",
        "integrity": "sha256-ummKdcmdyMVnBjtLsiXKlTGe+1jogemgMa+TO3vd+rw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.Requests.wasm",
        "name": "System.Net.Requests.wijmssnld1.wasm",
        "integrity": "sha256-WEh++fJ00JwO5ZNKfrCSfby3yswL51mR2CXjIUEPghM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.Security.wasm",
        "name": "System.Net.Security.qb2kchyvfh.wasm",
        "integrity": "sha256-xpizzmo1vnINQa07gTV1wPXErHVLep9NX4aeN4X0nLc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.ServerSentEvents.wasm",
        "name": "System.Net.ServerSentEvents.nnz8c1zwd0.wasm",
        "integrity": "sha256-fTnXuroDEpTMquGN2nVP49PkEDCxWqtneC+B2hBTXKo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.WebSockets.Client.wasm",
        "name": "System.Net.WebSockets.Client.wmeo5kdsnf.wasm",
        "integrity": "sha256-6NpzC2sH5D3HrNJ0UOYR4pZSxdNKFipxSxUatlBVThM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.WebSockets.wasm",
        "name": "System.Net.WebSockets.jsjr3uqlj2.wasm",
        "integrity": "sha256-85dtgrwutXZWILNVUw/3Kr5CX31+D1er+dgVo/c5Q7k=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ObjectModel.wasm",
        "name": "System.ObjectModel.44zfsisgnm.wasm",
        "integrity": "sha256-hEPRzooGz74NuGCbScBZuCUmYl9lhWxEYOV+MiziGHY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Private.Uri.wasm",
        "name": "System.Private.Uri.gh3kym0jus.wasm",
        "integrity": "sha256-XHcTuTsGv6SDkSSkut9gwdwX7K8Y7EQb/63i8Vn71HE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Private.Xml.wasm",
        "name": "System.Private.Xml.xe9bio2vpa.wasm",
        "integrity": "sha256-aZb9dz2bFiw8uFZmwuL1uEsI+m22zSrTiz2tAnUQpBc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Reflection.Emit.ILGeneration.wasm",
        "name": "System.Reflection.Emit.ILGeneration.unrs334i57.wasm",
        "integrity": "sha256-Cgo/4JbpUC9HGMVuaVRbbkU9OoFPCJkLvnJnICKAgLg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Reflection.Emit.wasm",
        "name": "System.Reflection.Emit.kl9mqeg15m.wasm",
        "integrity": "sha256-6JN0vxK9fB/r6/MDfIQcAeWJsftX9R40bdK+s4ygEdE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Reflection.Primitives.wasm",
        "name": "System.Reflection.Primitives.nsfubnmzhb.wasm",
        "integrity": "sha256-d3K/0sOH7IpBeQB9qj98KMmsPZy9QPcDIJxaT7Gw7LE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.Extensions.wasm",
        "name": "System.Runtime.Extensions.bi2ew5dqrv.wasm",
        "integrity": "sha256-zVefFEvGKvj2hqmQ5fR+I0KqNo+B5TivCZV8AWpLWYA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.InteropServices.wasm",
        "name": "System.Runtime.InteropServices.fj9jdecnpc.wasm",
        "integrity": "sha256-9aPqmfsBq57giPJV0U0WNFiu3KZ9vUmwqO4JNEcQ880=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.Numerics.wasm",
        "name": "System.Runtime.Numerics.qihwqo3hx3.wasm",
        "integrity": "sha256-TrWS/v95xevIU2X0zGwTHVsGHkIOmKWJZzQFPFxjx7A=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.Serialization.Formatters.wasm",
        "name": "System.Runtime.Serialization.Formatters.8maq9fo5j6.wasm",
        "integrity": "sha256-QL20dcFrAe8H6bVc80jmevSsa8wV7wVzIE4H8KT8L7s=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.Serialization.Primitives.wasm",
        "name": "System.Runtime.Serialization.Primitives.qoj5bzwz14.wasm",
        "integrity": "sha256-FvaH00mrAD7P4EMDMSdNLADQ3qsXfsi7+jsCkknnMjU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.wasm",
        "name": "System.Runtime.5tfa1sg9dm.wasm",
        "integrity": "sha256-iT/xT1zUBFgKzDbB+TMdZMofAirtuYEi6IpcxdAt1AI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.Claims.wasm",
        "name": "System.Security.Claims.da67a56heh.wasm",
        "integrity": "sha256-lTkJJ/tbz25jH1FxFSnF3QRKdSgv09xObTmkgYZ4Tu8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.Cryptography.wasm",
        "name": "System.Security.Cryptography.0u46sx4xf6.wasm",
        "integrity": "sha256-+J06O0P4WygrUnPAMMeb4zz4D9dgDWcpiZwLHqMP/ek=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Text.Encodings.Web.wasm",
        "name": "System.Text.Encodings.Web.xsvsbotou3.wasm",
        "integrity": "sha256-AasS64M/JtVd979KXhniez07/xO0iBCOhXpSTKqLDwE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Text.Json.wasm",
        "name": "System.Text.Json.w843vev7wx.wasm",
        "integrity": "sha256-wKDj51x3YX3uOLdxnFf9GxbrLk+I3PMts2ERwKuvb+0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Text.RegularExpressions.wasm",
        "name": "System.Text.RegularExpressions.3gjkm7x74k.wasm",
        "integrity": "sha256-c8F15z2G09UYfu+FxHKKmSCNEIV01+HZH/2lli7COso=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Threading.Channels.wasm",
        "name": "System.Threading.Channels.vu74xl07m4.wasm",
        "integrity": "sha256-x/VJYd+5ZwpIoNq6HXjTccX30CwzirW5UiSNPAn7Yv8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Threading.Thread.wasm",
        "name": "System.Threading.Thread.yr31wp0wmo.wasm",
        "integrity": "sha256-Xu1MO/TRKm5JZD+Olqo1Dj4GUKspXXZtgQZgIlDYLhE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Threading.wasm",
        "name": "System.Threading.j6wd91wnkv.wasm",
        "integrity": "sha256-1Q57VhoVIPypbzAcMEa5g0yRlkwTJIcbtLTKAYGQn2Y=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Web.HttpUtility.wasm",
        "name": "System.Web.HttpUtility.j5qr0w2y2e.wasm",
        "integrity": "sha256-2SJLAI2HFAq4oTyM7vsMa/zmTR6XGPl691zs1eMaPXc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.wasm",
        "name": "System.deed694j9w.wasm",
        "integrity": "sha256-JRSnUKU4RCZCvwQXVaK87jabHPSnQK1daxG24xvCico=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "netstandard.wasm",
        "name": "netstandard.ssy4r43xma.wasm",
        "integrity": "sha256-LIRT8gfanB9vbYP80BFT7WXq0+4hQzQE1f6K9RVLX7k=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Capybara.wasm",
        "name": "Capybara.zqtqhixrga.wasm",
        "integrity": "sha256-5d3vKUTrONqZfhXAEwvalWdWeaICcLDh5fiO56/eu0E=",
        "cache": "force-cache"
      }
    ],
    "satelliteResources": {
      "bg": [
        {
          "virtualPath": "Heron.MudCalendar.resources.wasm",
          "name": "Heron.MudCalendar.resources.ohlid21622.wasm",
          "integrity": "sha256-TELOilsckjI8CmyaaBSyLVRQXF2+TzCT2R0pjQO86tU=",
          "cache": "force-cache"
        }
      ],
      "cs": [
        {
          "virtualPath": "Heron.MudCalendar.resources.wasm",
          "name": "Heron.MudCalendar.resources.1cxx0jffoq.wasm",
          "integrity": "sha256-//wFAWuboCD+je00HoZaVwUftNLwUx3+fVhys6xCo0E=",
          "cache": "force-cache"
        }
      ],
      "da": [
        {
          "virtualPath": "Heron.MudCalendar.resources.wasm",
          "name": "Heron.MudCalendar.resources.hze11xkvgm.wasm",
          "integrity": "sha256-HceI19TsSI5O+sGFkMIlHLFXnkgclRGbW8mUhOYQ2tk=",
          "cache": "force-cache"
        }
      ],
      "de": [
        {
          "virtualPath": "Heron.MudCalendar.resources.wasm",
          "name": "Heron.MudCalendar.resources.4nv3gxmd7k.wasm",
          "integrity": "sha256-EGmosppbUwXlF/NtjSc6PBVP1Upw8x/+NdwHmnYeYlE=",
          "cache": "force-cache"
        }
      ],
      "el": [
        {
          "virtualPath": "Heron.MudCalendar.resources.wasm",
          "name": "Heron.MudCalendar.resources.h0ux81zchn.wasm",
          "integrity": "sha256-zw2pvHNGLPHI7c+3qFRWWpLPmsLAdhp8Y+e0JZDEI/0=",
          "cache": "force-cache"
        }
      ],
      "es": [
        {
          "virtualPath": "Heron.MudCalendar.resources.wasm",
          "name": "Heron.MudCalendar.resources.bl7iavp6we.wasm",
          "integrity": "sha256-EdNy/hrKCfvurTh0yGzJ5xsw6Wpv/iNDemdDvQYNSbw=",
          "cache": "force-cache"
        }
      ],
      "et": [
        {
          "virtualPath": "Heron.MudCalendar.resources.wasm",
          "name": "Heron.MudCalendar.resources.iaf145rlx1.wasm",
          "integrity": "sha256-VlQMZl/d8fiyFLGzeze+skfbPD88UnyUGaibhqXTevE=",
          "cache": "force-cache"
        }
      ],
      "fa": [
        {
          "virtualPath": "Heron.MudCalendar.resources.wasm",
          "name": "Heron.MudCalendar.resources.2qp4v1wzi5.wasm",
          "integrity": "sha256-xsFsnkwdbGuoxSNgM91KNkFjVNmTC5lnruDz46/wopc=",
          "cache": "force-cache"
        }
      ],
      "fi": [
        {
          "virtualPath": "Heron.MudCalendar.resources.wasm",
          "name": "Heron.MudCalendar.resources.9bispkt0ma.wasm",
          "integrity": "sha256-S1uTlu5og63FUEfO/3HOfYwR7Wd6AFbS8ROuXDvS9Mk=",
          "cache": "force-cache"
        }
      ],
      "fr": [
        {
          "virtualPath": "Heron.MudCalendar.resources.wasm",
          "name": "Heron.MudCalendar.resources.i0xepwlkyc.wasm",
          "integrity": "sha256-XthE9yKyHhehZuR6vMX1UkE8U4YRubVWKkx163HjycU=",
          "cache": "force-cache"
        }
      ],
      "hr": [
        {
          "virtualPath": "Heron.MudCalendar.resources.wasm",
          "name": "Heron.MudCalendar.resources.viutj0rqc4.wasm",
          "integrity": "sha256-OZ0ukIBi31fp/xHbzmmLkbyohNVPiyH+QXRwq225P3o=",
          "cache": "force-cache"
        }
      ],
      "hu": [
        {
          "virtualPath": "Heron.MudCalendar.resources.wasm",
          "name": "Heron.MudCalendar.resources.nkpru7opud.wasm",
          "integrity": "sha256-ySvhXhTgNhbZ90cStADIalyEVY8+xDdGdZh+sD7IM4k=",
          "cache": "force-cache"
        }
      ],
      "id": [
        {
          "virtualPath": "Heron.MudCalendar.resources.wasm",
          "name": "Heron.MudCalendar.resources.6afga2co16.wasm",
          "integrity": "sha256-XgPlhTblqP8yFtERK/KQW9xG549gqY3j+0sJKCdSBKY=",
          "cache": "force-cache"
        }
      ],
      "it": [
        {
          "virtualPath": "Heron.MudCalendar.resources.wasm",
          "name": "Heron.MudCalendar.resources.tk5ofwzoqz.wasm",
          "integrity": "sha256-w65OOA4QiEWbexrRvMNXP0RhQhEqbyPZsI7lIMt++Qs=",
          "cache": "force-cache"
        }
      ],
      "ja": [
        {
          "virtualPath": "Heron.MudCalendar.resources.wasm",
          "name": "Heron.MudCalendar.resources.ez8tcwddvd.wasm",
          "integrity": "sha256-uu5sKJLeY7A7vRsN2Xuz2G2L3pR1sUT1MPTAPRkEzoc=",
          "cache": "force-cache"
        }
      ],
      "ko": [
        {
          "virtualPath": "Heron.MudCalendar.resources.wasm",
          "name": "Heron.MudCalendar.resources.3zg80v5ku4.wasm",
          "integrity": "sha256-Ecypra7cBzeDEKoobVrl9lyTnwbjofeoDJ6JgHQJdj4=",
          "cache": "force-cache"
        }
      ],
      "lt": [
        {
          "virtualPath": "Heron.MudCalendar.resources.wasm",
          "name": "Heron.MudCalendar.resources.8auankn45m.wasm",
          "integrity": "sha256-MJGlQLzmOuPFU4Uz0kvwTQwkeILqz5DFEBen00Ru6Ek=",
          "cache": "force-cache"
        }
      ],
      "lv": [
        {
          "virtualPath": "Heron.MudCalendar.resources.wasm",
          "name": "Heron.MudCalendar.resources.26y26c3iqf.wasm",
          "integrity": "sha256-ej/Pe9vS6PI2stixHyNI8QkNl1xQKOogsymEsh2W1T8=",
          "cache": "force-cache"
        }
      ],
      "nb": [
        {
          "virtualPath": "Heron.MudCalendar.resources.wasm",
          "name": "Heron.MudCalendar.resources.rmagfmh8ak.wasm",
          "integrity": "sha256-0zCyT66UMD06EReumdODJkmmXhRC3y7j0X6TwzmXaxo=",
          "cache": "force-cache"
        }
      ],
      "nl": [
        {
          "virtualPath": "Heron.MudCalendar.resources.wasm",
          "name": "Heron.MudCalendar.resources.k61wqoi9pj.wasm",
          "integrity": "sha256-BBjLskrrKCzNfINPKOurMAod74TILkAJqWmHZ8kivbQ=",
          "cache": "force-cache"
        }
      ],
      "pl": [
        {
          "virtualPath": "Heron.MudCalendar.resources.wasm",
          "name": "Heron.MudCalendar.resources.f6ursdkspm.wasm",
          "integrity": "sha256-ef42WuM4QcmmSZXYFGTnpyyiQqWYlVtqY8S2PyPpCP0=",
          "cache": "force-cache"
        }
      ],
      "pt": [
        {
          "virtualPath": "Heron.MudCalendar.resources.wasm",
          "name": "Heron.MudCalendar.resources.v67e7yodwp.wasm",
          "integrity": "sha256-5wrOM9whX2ZVz+/WfkvSbz6OPzWR9aTH4o8j9lZexTU=",
          "cache": "force-cache"
        }
      ],
      "ro": [
        {
          "virtualPath": "Heron.MudCalendar.resources.wasm",
          "name": "Heron.MudCalendar.resources.37d95siih2.wasm",
          "integrity": "sha256-8Z/G9RcT2enNpAYc9kXsUnBnerWZqNJwpxEFurTUyok=",
          "cache": "force-cache"
        }
      ],
      "ru": [
        {
          "virtualPath": "Heron.MudCalendar.resources.wasm",
          "name": "Heron.MudCalendar.resources.omuq9uec4x.wasm",
          "integrity": "sha256-cCGxGf21grbAEq0Pg1Dcqm8H3jUkLy2/KlPPPzZzJ5c=",
          "cache": "force-cache"
        }
      ],
      "sk": [
        {
          "virtualPath": "Heron.MudCalendar.resources.wasm",
          "name": "Heron.MudCalendar.resources.4ttlrukj5u.wasm",
          "integrity": "sha256-2EKUXums+j2b5H4KvtbmodSGJ2UN6DOEt/Vupwztu3I=",
          "cache": "force-cache"
        }
      ],
      "sl": [
        {
          "virtualPath": "Heron.MudCalendar.resources.wasm",
          "name": "Heron.MudCalendar.resources.30tpek9pf5.wasm",
          "integrity": "sha256-E81cTc0vDBYRp/xEKvZLk7Tp0ySXRkh8JUKWR3vywcM=",
          "cache": "force-cache"
        }
      ],
      "sv": [
        {
          "virtualPath": "Heron.MudCalendar.resources.wasm",
          "name": "Heron.MudCalendar.resources.kf88en8kt2.wasm",
          "integrity": "sha256-sOYrO/cxXoAaYZsM6J0VA5v4T9ZVWLA/tDmisk3nuHw=",
          "cache": "force-cache"
        }
      ],
      "tr": [
        {
          "virtualPath": "Heron.MudCalendar.resources.wasm",
          "name": "Heron.MudCalendar.resources.q4fna6q6pc.wasm",
          "integrity": "sha256-phFp5auBOK7FgaomTx93DOr/paTGd/HTdgL5onj0OZA=",
          "cache": "force-cache"
        }
      ],
      "uk": [
        {
          "virtualPath": "Heron.MudCalendar.resources.wasm",
          "name": "Heron.MudCalendar.resources.ug67k39jbu.wasm",
          "integrity": "sha256-ghOR+T+Ooey82jK9DvWc9zvDhQ1fx2XSgjI03Fbo7rE=",
          "cache": "force-cache"
        }
      ],
      "zh": [
        {
          "virtualPath": "Heron.MudCalendar.resources.wasm",
          "name": "Heron.MudCalendar.resources.hs3x5scr7g.wasm",
          "integrity": "sha256-j9nhV4neWVGI8/NA0yjaxH4jm4Z976muSSYuINIHpIU=",
          "cache": "force-cache"
        }
      ]
    },
    "libraryInitializers": [
      {
        "name": "_content/ReactorBlazorQRCodeScanner/ReactorBlazorQRCodeScanner.0vos51tt9n.lib.module.js"
      }
    ],
    "modulesAfterConfigLoaded": [
      {
        "name": "../_content/ReactorBlazorQRCodeScanner/ReactorBlazorQRCodeScanner.0vos51tt9n.lib.module.js"
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
        "Toolbelt.Blazor.SpeechSynthesis.OptimizeForWasm": true,
        "Toolbelt.Blazor.SpeechSynthesis.JavaScriptCacheBusting": true,
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
        "System.Net.Http.WasmEnableStreamingResponse": true,
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
