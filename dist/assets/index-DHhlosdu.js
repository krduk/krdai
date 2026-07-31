(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))a(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&a(c)}).observe(document,{childList:!0,subtree:!0});function o(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(i){if(i.ep)return;i.ep=!0;const r=o(i);fetch(i.href,r)}})();var de;(function(e){e.STRING="STRING",e.NUMBER="NUMBER",e.INTEGER="INTEGER",e.BOOLEAN="BOOLEAN",e.ARRAY="ARRAY",e.OBJECT="OBJECT"})(de||(de={}));/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ue;(function(e){e.LANGUAGE_UNSPECIFIED="language_unspecified",e.PYTHON="python"})(ue||(ue={}));var he;(function(e){e.OUTCOME_UNSPECIFIED="outcome_unspecified",e.OUTCOME_OK="outcome_ok",e.OUTCOME_FAILED="outcome_failed",e.OUTCOME_DEADLINE_EXCEEDED="outcome_deadline_exceeded"})(he||(he={}));/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fe=["user","model","function","system"];var ge;(function(e){e.HARM_CATEGORY_UNSPECIFIED="HARM_CATEGORY_UNSPECIFIED",e.HARM_CATEGORY_HATE_SPEECH="HARM_CATEGORY_HATE_SPEECH",e.HARM_CATEGORY_SEXUALLY_EXPLICIT="HARM_CATEGORY_SEXUALLY_EXPLICIT",e.HARM_CATEGORY_HARASSMENT="HARM_CATEGORY_HARASSMENT",e.HARM_CATEGORY_DANGEROUS_CONTENT="HARM_CATEGORY_DANGEROUS_CONTENT"})(ge||(ge={}));var me;(function(e){e.HARM_BLOCK_THRESHOLD_UNSPECIFIED="HARM_BLOCK_THRESHOLD_UNSPECIFIED",e.BLOCK_LOW_AND_ABOVE="BLOCK_LOW_AND_ABOVE",e.BLOCK_MEDIUM_AND_ABOVE="BLOCK_MEDIUM_AND_ABOVE",e.BLOCK_ONLY_HIGH="BLOCK_ONLY_HIGH",e.BLOCK_NONE="BLOCK_NONE"})(me||(me={}));var ve;(function(e){e.HARM_PROBABILITY_UNSPECIFIED="HARM_PROBABILITY_UNSPECIFIED",e.NEGLIGIBLE="NEGLIGIBLE",e.LOW="LOW",e.MEDIUM="MEDIUM",e.HIGH="HIGH"})(ve||(ve={}));var pe;(function(e){e.BLOCKED_REASON_UNSPECIFIED="BLOCKED_REASON_UNSPECIFIED",e.SAFETY="SAFETY",e.OTHER="OTHER"})(pe||(pe={}));var Y;(function(e){e.FINISH_REASON_UNSPECIFIED="FINISH_REASON_UNSPECIFIED",e.STOP="STOP",e.MAX_TOKENS="MAX_TOKENS",e.SAFETY="SAFETY",e.RECITATION="RECITATION",e.LANGUAGE="LANGUAGE",e.OTHER="OTHER"})(Y||(Y={}));var Ee;(function(e){e.TASK_TYPE_UNSPECIFIED="TASK_TYPE_UNSPECIFIED",e.RETRIEVAL_QUERY="RETRIEVAL_QUERY",e.RETRIEVAL_DOCUMENT="RETRIEVAL_DOCUMENT",e.SEMANTIC_SIMILARITY="SEMANTIC_SIMILARITY",e.CLASSIFICATION="CLASSIFICATION",e.CLUSTERING="CLUSTERING"})(Ee||(Ee={}));var ye;(function(e){e.MODE_UNSPECIFIED="MODE_UNSPECIFIED",e.AUTO="AUTO",e.ANY="ANY",e.NONE="NONE"})(ye||(ye={}));/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class L extends Error{constructor(n){super(`[GoogleGenerativeAI Error]: ${n}`)}}class K extends L{constructor(n,o){super(n),this.response=o}}class Re extends L{constructor(n,o,a,i){super(n),this.status=o,this.statusText=a,this.errorDetails=i}}class H extends L{}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ot="https://generativelanguage.googleapis.com",it="v1beta",st="0.17.2",at="genai-js";var j;(function(e){e.GENERATE_CONTENT="generateContent",e.STREAM_GENERATE_CONTENT="streamGenerateContent",e.COUNT_TOKENS="countTokens",e.EMBED_CONTENT="embedContent",e.BATCH_EMBED_CONTENTS="batchEmbedContents"})(j||(j={}));class rt{constructor(n,o,a,i,r){this.model=n,this.task=o,this.apiKey=a,this.stream=i,this.requestOptions=r}toString(){var n,o;const a=((n=this.requestOptions)===null||n===void 0?void 0:n.apiVersion)||it;let r=`${((o=this.requestOptions)===null||o===void 0?void 0:o.baseUrl)||ot}/${a}/${this.model}:${this.task}`;return this.stream&&(r+="?alt=sse"),r}}function ct(e){const n=[];return e!=null&&e.apiClient&&n.push(e.apiClient),n.push(`${at}/${st}`),n.join(" ")}async function lt(e){var n;const o=new Headers;o.append("Content-Type","application/json"),o.append("x-goog-api-client",ct(e.requestOptions)),o.append("x-goog-api-key",e.apiKey);let a=(n=e.requestOptions)===null||n===void 0?void 0:n.customHeaders;if(a){if(!(a instanceof Headers))try{a=new Headers(a)}catch(i){throw new H(`unable to convert customHeaders value ${JSON.stringify(a)} to Headers: ${i.message}`)}for(const[i,r]of a.entries()){if(i==="x-goog-api-key")throw new H(`Cannot set reserved header name ${i}`);if(i==="x-goog-api-client")throw new H(`Header name ${i} can only be set using the apiClient field`);o.append(i,r)}}return o}async function dt(e,n,o,a,i,r){const c=new rt(e,n,o,a,r);return{url:c.toString(),fetchOptions:Object.assign(Object.assign({},gt(r)),{method:"POST",headers:await lt(c),body:i})}}async function z(e,n,o,a,i,r={},c=fetch){const{url:p,fetchOptions:b}=await dt(e,n,o,a,i,r);return ut(p,b,c)}async function ut(e,n,o=fetch){let a;try{a=await o(e,n)}catch(i){ht(i,e)}return a.ok||await ft(a,e),a}function ht(e,n){let o=e;throw e instanceof Re||e instanceof H||(o=new L(`Error fetching from ${n.toString()}: ${e.message}`),o.stack=e.stack),o}async function ft(e,n){let o="",a;try{const i=await e.json();o=i.error.message,i.error.details&&(o+=` ${JSON.stringify(i.error.details)}`,a=i.error.details)}catch{}throw new Re(`Error fetching from ${n.toString()}: [${e.status} ${e.statusText}] ${o}`,e.status,e.statusText,a)}function gt(e){const n={};if((e==null?void 0:e.signal)!==void 0||(e==null?void 0:e.timeout)>=0){const o=new AbortController;(e==null?void 0:e.timeout)>=0&&setTimeout(()=>o.abort(),e.timeout),e!=null&&e.signal&&e.signal.addEventListener("abort",()=>{o.abort()}),n.signal=o.signal}return n}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ne(e){return e.text=()=>{if(e.candidates&&e.candidates.length>0){if(e.candidates.length>1&&console.warn(`This response had ${e.candidates.length} candidates. Returning text from the first candidate only. Access response.candidates directly to use the other candidates.`),X(e.candidates[0]))throw new K(`${U(e)}`,e);return mt(e)}else if(e.promptFeedback)throw new K(`Text not available. ${U(e)}`,e);return""},e.functionCall=()=>{if(e.candidates&&e.candidates.length>0){if(e.candidates.length>1&&console.warn(`This response had ${e.candidates.length} candidates. Returning function calls from the first candidate only. Access response.candidates directly to use the other candidates.`),X(e.candidates[0]))throw new K(`${U(e)}`,e);return console.warn("response.functionCall() is deprecated. Use response.functionCalls() instead."),Ce(e)[0]}else if(e.promptFeedback)throw new K(`Function call not available. ${U(e)}`,e)},e.functionCalls=()=>{if(e.candidates&&e.candidates.length>0){if(e.candidates.length>1&&console.warn(`This response had ${e.candidates.length} candidates. Returning function calls from the first candidate only. Access response.candidates directly to use the other candidates.`),X(e.candidates[0]))throw new K(`${U(e)}`,e);return Ce(e)}else if(e.promptFeedback)throw new K(`Function call not available. ${U(e)}`,e)},e}function mt(e){var n,o,a,i;const r=[];if(!((o=(n=e.candidates)===null||n===void 0?void 0:n[0].content)===null||o===void 0)&&o.parts)for(const c of(i=(a=e.candidates)===null||a===void 0?void 0:a[0].content)===null||i===void 0?void 0:i.parts)c.text&&r.push(c.text),c.executableCode&&r.push("\n```"+c.executableCode.language+`
`+c.executableCode.code+"\n```\n"),c.codeExecutionResult&&r.push("\n```\n"+c.codeExecutionResult.output+"\n```\n");return r.length>0?r.join(""):""}function Ce(e){var n,o,a,i;const r=[];if(!((o=(n=e.candidates)===null||n===void 0?void 0:n[0].content)===null||o===void 0)&&o.parts)for(const c of(i=(a=e.candidates)===null||a===void 0?void 0:a[0].content)===null||i===void 0?void 0:i.parts)c.functionCall&&r.push(c.functionCall);if(r.length>0)return r}const vt=[Y.RECITATION,Y.SAFETY,Y.LANGUAGE];function X(e){return!!e.finishReason&&vt.includes(e.finishReason)}function U(e){var n,o,a;let i="";if((!e.candidates||e.candidates.length===0)&&e.promptFeedback)i+="Response was blocked",!((n=e.promptFeedback)===null||n===void 0)&&n.blockReason&&(i+=` due to ${e.promptFeedback.blockReason}`),!((o=e.promptFeedback)===null||o===void 0)&&o.blockReasonMessage&&(i+=`: ${e.promptFeedback.blockReasonMessage}`);else if(!((a=e.candidates)===null||a===void 0)&&a[0]){const r=e.candidates[0];X(r)&&(i+=`Candidate was blocked due to ${r.finishReason}`,r.finishMessage&&(i+=`: ${r.finishMessage}`))}return i}function J(e){return this instanceof J?(this.v=e,this):new J(e)}function pt(e,n,o){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var a=o.apply(e,n||[]),i,r=[];return i={},c("next"),c("throw"),c("return"),i[Symbol.asyncIterator]=function(){return this},i;function c(_){a[_]&&(i[_]=function(I){return new Promise(function(T,G){r.push([_,I,T,G])>1||p(_,I)})})}function p(_,I){try{b(a[_](I))}catch(T){F(r[0][3],T)}}function b(_){_.value instanceof J?Promise.resolve(_.value.v).then(A,D):F(r[0][2],_)}function A(_){p("next",_)}function D(_){p("throw",_)}function F(_,I){_(I),r.shift(),r.length&&p(r[0][0],r[0][1])}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ie=/^data\: (.*)(?:\n\n|\r\r|\r\n\r\n)/;function Et(e){const n=e.body.pipeThrough(new TextDecoderStream("utf8",{fatal:!0})),o=It(n),[a,i]=o.tee();return{stream:Ct(a),response:yt(i)}}async function yt(e){const n=[],o=e.getReader();for(;;){const{done:a,value:i}=await o.read();if(a)return ne(St(n));n.push(i)}}function Ct(e){return pt(this,arguments,function*(){const o=e.getReader();for(;;){const{value:a,done:i}=yield J(o.read());if(i)break;yield yield J(ne(a))}})}function It(e){const n=e.getReader();return new ReadableStream({start(a){let i="";return r();function r(){return n.read().then(({value:c,done:p})=>{if(p){if(i.trim()){a.error(new L("Failed to parse stream"));return}a.close();return}i+=c;let b=i.match(Ie),A;for(;b;){try{A=JSON.parse(b[1])}catch{a.error(new L(`Error parsing JSON response: "${b[1]}"`));return}a.enqueue(A),i=i.substring(b[0].length),b=i.match(Ie)}return r()})}}})}function St(e){const n=e[e.length-1],o={promptFeedback:n==null?void 0:n.promptFeedback};for(const a of e){if(a.candidates)for(const i of a.candidates){const r=i.index;if(o.candidates||(o.candidates=[]),o.candidates[r]||(o.candidates[r]={index:i.index}),o.candidates[r].citationMetadata=i.citationMetadata,o.candidates[r].finishReason=i.finishReason,o.candidates[r].finishMessage=i.finishMessage,o.candidates[r].safetyRatings=i.safetyRatings,i.content&&i.content.parts){o.candidates[r].content||(o.candidates[r].content={role:i.content.role||"user",parts:[]});const c={};for(const p of i.content.parts)p.text&&(c.text=p.text),p.functionCall&&(c.functionCall=p.functionCall),p.executableCode&&(c.executableCode=p.executableCode),p.codeExecutionResult&&(c.codeExecutionResult=p.codeExecutionResult),Object.keys(c).length===0&&(c.text=""),o.candidates[r].content.parts.push(c)}}a.usageMetadata&&(o.usageMetadata=a.usageMetadata)}return o}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Te(e,n,o,a){const i=await z(n,j.STREAM_GENERATE_CONTENT,e,!0,JSON.stringify(o),a);return Et(i)}async function Ae(e,n,o,a){const r=await(await z(n,j.GENERATE_CONTENT,e,!1,JSON.stringify(o),a)).json();return{response:ne(r)}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ne(e){if(e!=null){if(typeof e=="string")return{role:"system",parts:[{text:e}]};if(e.text)return{role:"system",parts:[e]};if(e.parts)return e.role?e:{role:"system",parts:e.parts}}}function W(e){let n=[];if(typeof e=="string")n=[{text:e}];else for(const o of e)typeof o=="string"?n.push({text:o}):n.push(o);return _t(n)}function _t(e){const n={role:"user",parts:[]},o={role:"function",parts:[]};let a=!1,i=!1;for(const r of e)"functionResponse"in r?(o.parts.push(r),i=!0):(n.parts.push(r),a=!0);if(a&&i)throw new L("Within a single message, FunctionResponse cannot be mixed with other type of part in the request for sending chat message.");if(!a&&!i)throw new L("No content is provided for sending chat message.");return a?n:o}function bt(e,n){var o;let a={model:n==null?void 0:n.model,generationConfig:n==null?void 0:n.generationConfig,safetySettings:n==null?void 0:n.safetySettings,tools:n==null?void 0:n.tools,toolConfig:n==null?void 0:n.toolConfig,systemInstruction:n==null?void 0:n.systemInstruction,cachedContent:(o=n==null?void 0:n.cachedContent)===null||o===void 0?void 0:o.name,contents:[]};const i=e.generateContentRequest!=null;if(e.contents){if(i)throw new H("CountTokensRequest must have one of contents or generateContentRequest, not both.");a.contents=e.contents}else if(i)a=Object.assign(Object.assign({},a),e.generateContentRequest);else{const r=W(e);a.contents=[r]}return{generateContentRequest:a}}function Se(e){let n;return e.contents?n=e:n={contents:[W(e)]},e.systemInstruction&&(n.systemInstruction=Ne(e.systemInstruction)),n}function wt(e){return typeof e=="string"||Array.isArray(e)?{content:W(e)}:e}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _e=["text","inlineData","functionCall","functionResponse","executableCode","codeExecutionResult"],Mt={user:["text","inlineData"],function:["functionResponse"],model:["text","functionCall","executableCode","codeExecutionResult"],system:["text"]};function Ot(e){let n=!1;for(const o of e){const{role:a,parts:i}=o;if(!n&&a!=="user")throw new L(`First content should be with role 'user', got ${a}`);if(!fe.includes(a))throw new L(`Each item should include role field. Got ${a} but valid roles are: ${JSON.stringify(fe)}`);if(!Array.isArray(i))throw new L("Content should have 'parts' property with an array of Parts");if(i.length===0)throw new L("Each Content should have at least one part");const r={text:0,inlineData:0,functionCall:0,functionResponse:0,fileData:0,executableCode:0,codeExecutionResult:0};for(const p of i)for(const b of _e)b in p&&(r[b]+=1);const c=Mt[a];for(const p of _e)if(!c.includes(p)&&r[p]>0)throw new L(`Content with role '${a}' can't contain '${p}' part`);n=!0}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const be="SILENT_ERROR";class Rt{constructor(n,o,a,i={}){this.model=o,this.params=a,this._requestOptions=i,this._history=[],this._sendPromise=Promise.resolve(),this._apiKey=n,a!=null&&a.history&&(Ot(a.history),this._history=a.history)}async getHistory(){return await this._sendPromise,this._history}async sendMessage(n,o={}){var a,i,r,c,p,b;await this._sendPromise;const A=W(n),D={safetySettings:(a=this.params)===null||a===void 0?void 0:a.safetySettings,generationConfig:(i=this.params)===null||i===void 0?void 0:i.generationConfig,tools:(r=this.params)===null||r===void 0?void 0:r.tools,toolConfig:(c=this.params)===null||c===void 0?void 0:c.toolConfig,systemInstruction:(p=this.params)===null||p===void 0?void 0:p.systemInstruction,cachedContent:(b=this.params)===null||b===void 0?void 0:b.cachedContent,contents:[...this._history,A]},F=Object.assign(Object.assign({},this._requestOptions),o);let _;return this._sendPromise=this._sendPromise.then(()=>Ae(this._apiKey,this.model,D,F)).then(I=>{var T;if(I.response.candidates&&I.response.candidates.length>0){this._history.push(A);const G=Object.assign({parts:[],role:"model"},(T=I.response.candidates)===null||T===void 0?void 0:T[0].content);this._history.push(G)}else{const G=U(I.response);G&&console.warn(`sendMessage() was unsuccessful. ${G}. Inspect response object for details.`)}_=I}),await this._sendPromise,_}async sendMessageStream(n,o={}){var a,i,r,c,p,b;await this._sendPromise;const A=W(n),D={safetySettings:(a=this.params)===null||a===void 0?void 0:a.safetySettings,generationConfig:(i=this.params)===null||i===void 0?void 0:i.generationConfig,tools:(r=this.params)===null||r===void 0?void 0:r.tools,toolConfig:(c=this.params)===null||c===void 0?void 0:c.toolConfig,systemInstruction:(p=this.params)===null||p===void 0?void 0:p.systemInstruction,cachedContent:(b=this.params)===null||b===void 0?void 0:b.cachedContent,contents:[...this._history,A]},F=Object.assign(Object.assign({},this._requestOptions),o),_=Te(this._apiKey,this.model,D,F);return this._sendPromise=this._sendPromise.then(()=>_).catch(I=>{throw new Error(be)}).then(I=>I.response).then(I=>{if(I.candidates&&I.candidates.length>0){this._history.push(A);const T=Object.assign({},I.candidates[0].content);T.role||(T.role="model"),this._history.push(T)}else{const T=U(I);T&&console.warn(`sendMessageStream() was unsuccessful. ${T}. Inspect response object for details.`)}}).catch(I=>{I.message!==be&&console.error(I)}),_}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Tt(e,n,o,a){return(await z(n,j.COUNT_TOKENS,e,!1,JSON.stringify(o),a)).json()}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function At(e,n,o,a){return(await z(n,j.EMBED_CONTENT,e,!1,JSON.stringify(o),a)).json()}async function Nt(e,n,o,a){const i=o.requests.map(c=>Object.assign(Object.assign({},c),{model:n}));return(await z(n,j.BATCH_EMBED_CONTENTS,e,!1,JSON.stringify({requests:i}),a)).json()}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class we{constructor(n,o,a={}){this.apiKey=n,this._requestOptions=a,o.model.includes("/")?this.model=o.model:this.model=`models/${o.model}`,this.generationConfig=o.generationConfig||{},this.safetySettings=o.safetySettings||[],this.tools=o.tools,this.toolConfig=o.toolConfig,this.systemInstruction=Ne(o.systemInstruction),this.cachedContent=o.cachedContent}async generateContent(n,o={}){var a;const i=Se(n),r=Object.assign(Object.assign({},this._requestOptions),o);return Ae(this.apiKey,this.model,Object.assign({generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,cachedContent:(a=this.cachedContent)===null||a===void 0?void 0:a.name},i),r)}async generateContentStream(n,o={}){var a;const i=Se(n),r=Object.assign(Object.assign({},this._requestOptions),o);return Te(this.apiKey,this.model,Object.assign({generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,cachedContent:(a=this.cachedContent)===null||a===void 0?void 0:a.name},i),r)}startChat(n){var o;return new Rt(this.apiKey,this.model,Object.assign({generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,cachedContent:(o=this.cachedContent)===null||o===void 0?void 0:o.name},n),this._requestOptions)}async countTokens(n,o={}){const a=bt(n,{model:this.model,generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,cachedContent:this.cachedContent}),i=Object.assign(Object.assign({},this._requestOptions),o);return Tt(this.apiKey,this.model,a,i)}async embedContent(n,o={}){const a=wt(n),i=Object.assign(Object.assign({},this._requestOptions),o);return At(this.apiKey,this.model,a,i)}async batchEmbedContents(n,o={}){const a=Object.assign(Object.assign({},this._requestOptions),o);return Nt(this.apiKey,this.model,n,a)}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lt{constructor(n){this.apiKey=n}getGenerativeModel(n,o){if(!n.model)throw new L("Must provide a model name. Example: genai.getGenerativeModel({ model: 'my-model-name' })");return new we(this.apiKey,n,o)}getGenerativeModelFromCachedContent(n,o){if(!n.name)throw new H("Cached content must contain a `name` field.");if(!n.model)throw new H("Cached content must contain a `model` field.");const a={model:n.model,tools:n.tools,toolConfig:n.toolConfig,systemInstruction:n.systemInstruction,cachedContent:n};return new we(this.apiKey,a,o)}}var oe={};(function e(n,o,a,i){var r=!!(n.Worker&&n.Blob&&n.Promise&&n.OffscreenCanvas&&n.OffscreenCanvasRenderingContext2D&&n.HTMLCanvasElement&&n.HTMLCanvasElement.prototype.transferControlToOffscreen&&n.URL&&n.URL.createObjectURL),c=typeof Path2D=="function"&&typeof DOMMatrix=="function",p=function(){if(!n.OffscreenCanvas)return!1;try{var s=new OffscreenCanvas(1,1),t=s.getContext("2d");t.fillRect(0,0,1,1);var l=s.transferToImageBitmap();t.createPattern(l,"no-repeat")}catch{return!1}return!0}();function b(){}function A(s){var t=o.exports.Promise,l=t!==void 0?t:n.Promise;return typeof l=="function"?new l(s):(s(b,b),null)}var D=function(s,t){return{transform:function(l){if(s)return l;if(t.has(l))return t.get(l);var u=new OffscreenCanvas(l.width,l.height),h=u.getContext("2d");return h.drawImage(l,0,0),t.set(l,u),u},clear:function(){t.clear()}}}(p,new Map),F=function(){var s=Math.floor(16.666666666666668),t,l,u={},h=0;return typeof requestAnimationFrame=="function"&&typeof cancelAnimationFrame=="function"?(t=function(f){var m=Math.random();return u[m]=requestAnimationFrame(function d(v){h===v||h+s-1<v?(h=v,delete u[m],f()):u[m]=requestAnimationFrame(d)}),m},l=function(f){u[f]&&cancelAnimationFrame(u[f])}):(t=function(f){return setTimeout(f,s)},l=function(f){return clearTimeout(f)}),{frame:t,cancel:l}}(),_=function(){var s,t,l={};function u(h){function f(m,d){h.postMessage({options:m||{},callback:d})}h.init=function(d){var v=d.transferControlToOffscreen();h.postMessage({canvas:v},[v])},h.fire=function(d,v,C){if(t)return f(d,null),t;var w=Math.random().toString(36).slice(2);return t=A(function(S){function M(R){R.data.callback===w&&(delete l[w],h.removeEventListener("message",M),t=null,D.clear(),C(),S())}h.addEventListener("message",M),f(d,w),l[w]=M.bind(null,{data:{callback:w}})}),t},h.reset=function(){h.postMessage({reset:!0});for(var d in l)l[d](),delete l[d]}}return function(){if(s)return s;if(!a&&r){var h=["var CONFETTI, SIZE = {}, module = {};","("+e.toString()+")(this, module, true, SIZE);","onmessage = function(msg) {","  if (msg.data.options) {","    CONFETTI(msg.data.options).then(function () {","      if (msg.data.callback) {","        postMessage({ callback: msg.data.callback });","      }","    });","  } else if (msg.data.reset) {","    CONFETTI && CONFETTI.reset();","  } else if (msg.data.resize) {","    SIZE.width = msg.data.resize.width;","    SIZE.height = msg.data.resize.height;","  } else if (msg.data.canvas) {","    SIZE.width = msg.data.canvas.width;","    SIZE.height = msg.data.canvas.height;","    CONFETTI = module.exports.create(msg.data.canvas);","  }","}"].join(`
`);try{s=new Worker(URL.createObjectURL(new Blob([h])))}catch(f){return typeof console<"u"&&typeof console.warn=="function"&&console.warn("🎊 Could not load worker",f),null}u(s)}return s}}(),I={particleCount:50,angle:90,spread:45,startVelocity:45,decay:.9,gravity:1,drift:0,ticks:200,x:.5,y:.5,shapes:["square","circle"],zIndex:100,colors:["#26ccff","#a25afd","#ff5e7e","#88ff5a","#fcff42","#ffa62d","#ff36ff"],disableForReducedMotion:!1,scalar:1};function T(s,t){return t?t(s):s}function G(s){return s!=null}function O(s,t,l){return T(s&&G(s[t])?s[t]:I[t],l)}function ke(s){return s<0?0:Math.floor(s)}function De(s,t){return Math.floor(Math.random()*(t-s))+s}function Q(s){return parseInt(s,16)}function Fe(s){return s.map(Be)}function Be(s){var t=String(s).replace(/[^0-9a-f]/gi,"");return t.length<6&&(t=t[0]+t[0]+t[1]+t[1]+t[2]+t[2]),{r:Q(t.substring(0,2)),g:Q(t.substring(2,4)),b:Q(t.substring(4,6))}}function Pe(s){var t=O(s,"origin",Object);return t.x=O(t,"x",Number),t.y=O(t,"y",Number),t}function Ge(s){s.width=document.documentElement.clientWidth,s.height=document.documentElement.clientHeight}function Ue(s){var t=s.getBoundingClientRect();s.width=t.width,s.height=t.height}function $e(s){var t=document.createElement("canvas");return t.style.position="fixed",t.style.top="0px",t.style.left="0px",t.style.pointerEvents="none",t.style.zIndex=s,t}function He(s,t,l,u,h,f,m,d,v){s.save(),s.translate(t,l),s.rotate(f),s.scale(u,h),s.arc(0,0,1,m,d,v),s.restore()}function je(s){var t=s.angle*(Math.PI/180),l=s.spread*(Math.PI/180);return{x:s.x,y:s.y,wobble:Math.random()*10,wobbleSpeed:Math.min(.11,Math.random()*.1+.05),velocity:s.startVelocity*.5+Math.random()*s.startVelocity,angle2D:-t+(.5*l-Math.random()*l),tiltAngle:(Math.random()*(.75-.25)+.25)*Math.PI,color:s.color,shape:s.shape,tick:0,totalTicks:s.ticks,decay:s.decay,drift:s.drift,random:Math.random()+2,tiltSin:0,tiltCos:0,wobbleX:0,wobbleY:0,gravity:s.gravity*3,ovalScalar:.6,scalar:s.scalar,flat:s.flat}}function Ke(s,t){t.x+=Math.cos(t.angle2D)*t.velocity+t.drift,t.y+=Math.sin(t.angle2D)*t.velocity+t.gravity,t.velocity*=t.decay,t.flat?(t.wobble=0,t.wobbleX=t.x+10*t.scalar,t.wobbleY=t.y+10*t.scalar,t.tiltSin=0,t.tiltCos=0,t.random=1):(t.wobble+=t.wobbleSpeed,t.wobbleX=t.x+10*t.scalar*Math.cos(t.wobble),t.wobbleY=t.y+10*t.scalar*Math.sin(t.wobble),t.tiltAngle+=.1,t.tiltSin=Math.sin(t.tiltAngle),t.tiltCos=Math.cos(t.tiltAngle),t.random=Math.random()+2);var l=t.tick++/t.totalTicks,u=t.x+t.random*t.tiltCos,h=t.y+t.random*t.tiltSin,f=t.wobbleX+t.random*t.tiltCos,m=t.wobbleY+t.random*t.tiltSin;if(s.fillStyle="rgba("+t.color.r+", "+t.color.g+", "+t.color.b+", "+(1-l)+")",s.beginPath(),c&&t.shape.type==="path"&&typeof t.shape.path=="string"&&Array.isArray(t.shape.matrix))s.fill(Ye(t.shape.path,t.shape.matrix,t.x,t.y,Math.abs(f-u)*.1,Math.abs(m-h)*.1,Math.PI/10*t.wobble));else if(t.shape.type==="bitmap"){var d=Math.PI/10*t.wobble,v=Math.abs(f-u)*.1,C=Math.abs(m-h)*.1,w=t.shape.bitmap.width*t.scalar,S=t.shape.bitmap.height*t.scalar,M=new DOMMatrix([Math.cos(d)*v,Math.sin(d)*v,-Math.sin(d)*C,Math.cos(d)*C,t.x,t.y]);M.multiplySelf(new DOMMatrix(t.shape.matrix));var R=s.createPattern(D.transform(t.shape.bitmap),"no-repeat");R.setTransform(M),s.globalAlpha=1-l,s.fillStyle=R,s.fillRect(t.x-w/2,t.y-S/2,w,S),s.globalAlpha=1}else if(t.shape==="circle")s.ellipse?s.ellipse(t.x,t.y,Math.abs(f-u)*t.ovalScalar,Math.abs(m-h)*t.ovalScalar,Math.PI/10*t.wobble,0,2*Math.PI):He(s,t.x,t.y,Math.abs(f-u)*t.ovalScalar,Math.abs(m-h)*t.ovalScalar,Math.PI/10*t.wobble,0,2*Math.PI);else if(t.shape==="star")for(var E=Math.PI/2*3,N=4*t.scalar,x=8*t.scalar,k=t.x,P=t.y,$=5,B=Math.PI/$;$--;)k=t.x+Math.cos(E)*x,P=t.y+Math.sin(E)*x,s.lineTo(k,P),E+=B,k=t.x+Math.cos(E)*N,P=t.y+Math.sin(E)*N,s.lineTo(k,P),E+=B;else s.moveTo(Math.floor(t.x),Math.floor(t.y)),s.lineTo(Math.floor(t.wobbleX),Math.floor(h)),s.lineTo(Math.floor(f),Math.floor(m)),s.lineTo(Math.floor(u),Math.floor(t.wobbleY));return s.closePath(),s.fill(),t.tick<t.totalTicks}function qe(s,t,l,u,h){var f=t.slice(),m=s.getContext("2d"),d,v,C=A(function(w){function S(){d=v=null,m.clearRect(0,0,u.width,u.height),D.clear(),h(),w()}function M(){a&&!(u.width===i.width&&u.height===i.height)&&(u.width=s.width=i.width,u.height=s.height=i.height),!u.width&&!u.height&&(l(s),u.width=s.width,u.height=s.height),m.clearRect(0,0,u.width,u.height),f=f.filter(function(R){return Ke(m,R)}),f.length?d=F.frame(M):S()}d=F.frame(M),v=S});return{addFettis:function(w){return f=f.concat(w),C},canvas:s,promise:C,reset:function(){d&&F.cancel(d),v&&v()}}}function ie(s,t){var l=!s,u=!!O(t||{},"resize"),h=!1,f=O(t,"disableForReducedMotion",Boolean),m=r&&!!O(t||{},"useWorker"),d=m?_():null,v=l?Ge:Ue,C=s&&d?!!s.__confetti_initialized:!1,w=typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion)").matches,S;function M(E,N,x){for(var k=O(E,"particleCount",ke),P=O(E,"angle",Number),$=O(E,"spread",Number),B=O(E,"startVelocity",Number),We=O(E,"decay",Number),ze=O(E,"gravity",Number),Xe=O(E,"drift",Number),ae=O(E,"colors",Fe),Ze=O(E,"ticks",Number),re=O(E,"shapes"),Qe=O(E,"scalar"),et=!!O(E,"flat"),ce=Pe(E),le=k,te=[],tt=s.width*ce.x,nt=s.height*ce.y;le--;)te.push(je({x:tt,y:nt,angle:P,spread:$,startVelocity:B,color:ae[le%ae.length],shape:re[De(0,re.length)],ticks:Ze,decay:We,gravity:ze,drift:Xe,scalar:Qe,flat:et}));return S?S.addFettis(te):(S=qe(s,te,v,N,x),S.promise)}function R(E){var N=f||O(E,"disableForReducedMotion",Boolean),x=O(E,"zIndex",Number);if(N&&w)return A(function(B){B()});l&&S?s=S.canvas:l&&!s&&(s=$e(x),document.body.appendChild(s)),u&&!C&&v(s);var k={width:s.width,height:s.height};d&&!C&&d.init(s),C=!0,d&&(s.__confetti_initialized=!0);function P(){if(d){var B={getBoundingClientRect:function(){if(!l)return s.getBoundingClientRect()}};v(B),d.postMessage({resize:{width:B.width,height:B.height}});return}k.width=k.height=null}function $(){S=null,u&&(h=!1,n.removeEventListener("resize",P)),l&&s&&(document.body.contains(s)&&document.body.removeChild(s),s=null,C=!1)}return u&&!h&&(h=!0,n.addEventListener("resize",P,!1)),d?d.fire(E,k,$):M(E,k,$)}return R.reset=function(){d&&d.reset(),S&&S.reset()},R}var ee;function se(){return ee||(ee=ie(null,{useWorker:!0,resize:!0})),ee}function Ye(s,t,l,u,h,f,m){var d=new Path2D(s),v=new Path2D;v.addPath(d,new DOMMatrix(t));var C=new Path2D;return C.addPath(v,new DOMMatrix([Math.cos(m)*h,Math.sin(m)*h,-Math.sin(m)*f,Math.cos(m)*f,l,u])),C}function Ve(s){if(!c)throw new Error("path confetti are not supported in this browser");var t,l;typeof s=="string"?t=s:(t=s.path,l=s.matrix);var u=new Path2D(t),h=document.createElement("canvas"),f=h.getContext("2d");if(!l){for(var m=1e3,d=m,v=m,C=0,w=0,S,M,R=0;R<m;R+=2)for(var E=0;E<m;E+=2)f.isPointInPath(u,R,E,"nonzero")&&(d=Math.min(d,R),v=Math.min(v,E),C=Math.max(C,R),w=Math.max(w,E));S=C-d,M=w-v;var N=10,x=Math.min(N/S,N/M);l=[x,0,0,x,-Math.round(S/2+d)*x,-Math.round(M/2+v)*x]}return{type:"path",path:t,matrix:l}}function Je(s){var t,l=1,u="#000000",h='"Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji", "EmojiOne Color", "Android Emoji", "Twemoji Mozilla", "system emoji", sans-serif';typeof s=="string"?t=s:(t=s.text,l="scalar"in s?s.scalar:l,h="fontFamily"in s?s.fontFamily:h,u="color"in s?s.color:u);var f=10*l,m=""+f+"px "+h,d=new OffscreenCanvas(f,f),v=d.getContext("2d");v.font=m;var C=v.measureText(t),w=Math.ceil(C.actualBoundingBoxRight+C.actualBoundingBoxLeft),S=Math.ceil(C.actualBoundingBoxAscent+C.actualBoundingBoxDescent),M=2,R=C.actualBoundingBoxLeft+M,E=C.actualBoundingBoxAscent+M;w+=M+M,S+=M+M,d=new OffscreenCanvas(w,S),v=d.getContext("2d"),v.font=m,v.fillStyle=u,v.fillText(t,R,E);var N=1/l;return{type:"bitmap",bitmap:d.transferToImageBitmap(),matrix:[N,0,0,N,-w*N/2,-S*N/2]}}o.exports=function(){return se().apply(this,arguments)},o.exports.reset=function(){se().reset()},o.exports.create=ie,o.exports.shapeFromPath=Ve,o.exports.shapeFromText=Je})(function(){return typeof window<"u"?window:typeof self<"u"?self:this||{}}(),oe,!1);const xt=oe.exports;oe.exports.create;const y={apiKey:localStorage.getItem("gemini_api_key")||"",model:localStorage.getItem("gemini_model")||"gemini-1.5-flash",autoSpeech:localStorage.getItem("auto_speech")!=="false",childName:localStorage.getItem("child_name")||"きみ",honorific:localStorage.getItem("honorific")||"くん",savedThoughts:JSON.parse(localStorage.getItem("saved_thoughts")||"[]"),currentDialogue:[]},q={こども:{emoji:"👦",class:"speech-kodomo",pitch:1.4,rate:1.1},博士:{emoji:"🔬",class:"speech-hakase",pitch:.9,rate:1},おばあちゃん:{emoji:"👵",class:"speech-obachan",pitch:.8,rate:.85},案内役:{emoji:"📢",class:"speech-anai",pitch:1.1,rate:1}},kt=e=>`
# 目的
ユーザー（子供）の質問に対して、3人の異なる性格のキャラクターがそれぞれの視点で意見を出し合い、最終的に子供自身にどう思うかを考えてもらうためのAIです。

# キャラクター（ペルソナ）設定
1. **こども（ひらめき・楽しさ担当）**：
   - 性格：いつも元気でポジティブ。楽しいことや新しいアイデアが大好き。「〜〜したら楽しそう！」という視点で話す。
2. **博士（論理・仕組み担当）**：
   - 性格：科学知識が豊富。冷静で真面目。「データによると〜〜」「仕組みは〜〜」という視点で話す。
3. **おばあちゃん（慎重・別の視点担当）**：
   - 性格：おっとりしていて慎重。見落としがちなリスクや、別の優しい視点に気づかせてくれる。「〜〜かもしれないよぉ」と話す。

# 応答のルール
- 子供が理解しやすい、優しく簡単な言葉（小学校低学年向け）を使ってください。漢字には難しすぎるものを避け、平仮名も適度に使用してください。
- 答えをすぐに教えるのではなく、それぞれの意見を出すだけにとどめてください。
- 音声で読み上げられたときに誰のセリフか分かりやすいよう、以下のような【劇のセリフ形式】で出力してください。長文は避け、テンポよく掛け合いをさせてください。
- 案内役は三人のうちいずれかが行ってもよいし、案内役として発言してもよい。
- 最後に必ず、案内役（またはキャラクター）として「${e}は、どう思う？」と優しく問いかけて終わってください。

# 出力フォーマットの例
案内役「面白い質問だね！みんなはどう思う？」
こども「ぼくは〜〜だと思うな！だって楽しそうじゃん！」
博士「〜〜という理由もあります。」
おばあちゃん「う〜ん、でも〜〜なこともあるかも？」
案内役「みんな違って面白いね。${e}は、どう思う？」
`,g={btnSettings:document.getElementById("btn-settings"),settingsModal:document.getElementById("settings-modal"),btnCloseModal:document.getElementById("btn-close-modal"),btnSaveSettings:document.getElementById("btn-save-settings"),apiKeyInput:document.getElementById("api-key-input"),selectModel:document.getElementById("select-model"),checkAutoSpeech:document.getElementById("check-auto-speech"),inputChildName:document.getElementById("input-child-name"),selectHonorific:document.getElementById("select-honorific"),questionInput:document.getElementById("question-input"),btnAsk:document.getElementById("btn-ask"),loadingState:document.getElementById("loading-state"),dialogueSection:document.getElementById("dialogue-section"),dialogueList:document.getElementById("dialogue-list"),btnReadAll:document.getElementById("btn-read-all"),thoughtSection:document.getElementById("thought-section"),thoughtPromptName:document.getElementById("thought-prompt-name"),inputMyOpinion:document.getElementById("input-my-opinion"),btnSaveThought:document.getElementById("btn-save-thought"),savedThoughtsSection:document.getElementById("saved-thoughts-section"),savedThoughtsList:document.getElementById("saved-thoughts-list")};function Dt(){g.apiKeyInput.value=y.apiKey,g.selectModel.value=y.model,g.checkAutoSpeech.checked=y.autoSpeech,g.inputChildName.value=y.childName,g.selectHonorific.value=y.honorific,xe(),g.btnSettings.addEventListener("click",()=>V(!0)),g.btnCloseModal.addEventListener("click",()=>V(!1)),g.btnSaveSettings.addEventListener("click",Ft),g.inputChildName.addEventListener("change",Me),g.selectHonorific.addEventListener("change",Me),document.querySelectorAll(".tag-btn").forEach(e=>{e.addEventListener("click",()=>{g.questionInput.value=e.dataset.question,Oe()})}),g.btnAsk.addEventListener("click",Oe),g.btnReadAll.addEventListener("click",Le),g.btnSaveThought.addEventListener("click",Ut),y.apiKey||setTimeout(()=>{V(!0)},500)}function Me(){y.childName=g.inputChildName.value.trim()||"きみ",y.honorific=g.selectHonorific.value,localStorage.setItem("child_name",y.childName),localStorage.setItem("honorific",y.honorific)}function V(e){e?g.settingsModal.classList.remove("hidden"):g.settingsModal.classList.add("hidden")}function Ft(){y.apiKey=g.apiKeyInput.value.trim(),y.model=g.selectModel.value,y.autoSpeech=g.checkAutoSpeech.checked,localStorage.setItem("gemini_api_key",y.apiKey),localStorage.setItem("gemini_model",y.model),localStorage.setItem("auto_speech",y.autoSpeech),V(!1),alert("設定をほぞんしました！✨")}async function Oe(){const e=g.questionInput.value.trim();if(!e){alert("しつもんを入力してね！");return}if(!y.apiKey){alert("最初に「せってい（⚙️）」から Gemini APIキー を入力してね！"),V(!0);return}g.dialogueSection.classList.add("hidden"),g.thoughtSection.classList.add("hidden"),g.loadingState.classList.remove("hidden");const n=`${y.childName}${y.honorific}`;try{const r=(await new Lt(y.apiKey).getGenerativeModel({model:y.model,systemInstruction:kt(n)}).generateContent(e)).response.text(),c=Bt(r);y.currentDialogue=c,Pt(c,n),y.autoSpeech&&Le()}catch(o){console.error("Error fetching Gemini response:",o),alert(`エラーが発生しました: ${o.message||o}`)}finally{g.loadingState.classList.add("hidden")}}function Bt(e){const n=e.split(`
`).map(i=>i.trim()).filter(i=>i.length>0),o=[],a=/^(こども|博士|おばあちゃん|案内役)[「:：](.*)[」]?$/;return n.forEach(i=>{const r=i.match(a);if(r){let c=r[1],p=r[2].replace(/[」]$/,"");o.push({speaker:c,text:p})}else o.push({speaker:"案内役",text:i})}),o}function Pt(e,n){g.dialogueList.innerHTML="",e.forEach((o,a)=>{const i=q[o.speaker]||q.案内役,r=document.createElement("div");r.className=`speech-bubble-item ${i.class}`,r.style.animationDelay=`${a*.15}s`,r.innerHTML=`
      <div class="speech-avatar">${i.emoji}</div>
      <div class="speech-content">
        <div class="speech-speaker">${o.speaker}</div>
        <div class="speech-text">${Z(o.text)}</div>
        <div class="speech-action">
          <button class="btn-speak-single" data-index="${a}">🔊 きく</button>
        </div>
      </div>
    `,g.dialogueList.appendChild(r)}),document.querySelectorAll(".btn-speak-single").forEach(o=>{o.addEventListener("click",a=>{const i=a.target.dataset.index;Gt(e[i])})}),g.dialogueSection.classList.remove("hidden"),g.thoughtSection.classList.remove("hidden"),g.thoughtPromptName.textContent=n,g.inputMyOpinion.value="",g.dialogueSection.scrollIntoView({behavior:"smooth"})}function Gt(e){if(!("speechSynthesis"in window)){alert("お使いのブラウザは音声読み上げに対応していません。");return}window.speechSynthesis.cancel();const n=q[e.speaker]||q.案内役,o=new SpeechSynthesisUtterance(e.text);o.lang="ja-JP",o.pitch=n.pitch,o.rate=n.rate,window.speechSynthesis.speak(o)}function Le(){!("speechSynthesis"in window)||y.currentDialogue.length===0||(window.speechSynthesis.cancel(),y.currentDialogue.forEach(e=>{const n=q[e.speaker]||q.案内役,o=`${e.speaker}。${e.text}`,a=new SpeechSynthesisUtterance(o);a.lang="ja-JP",a.pitch=n.pitch,a.rate=n.rate,window.speechSynthesis.speak(a)}))}function Ut(){const e=g.inputMyOpinion.value.trim(),n=g.questionInput.value.trim();if(!e){alert("じぶんの考えを入力してね！");return}const o={id:Date.now(),date:new Date().toLocaleDateString("ja-JP"),question:n,opinion:e,author:`${y.childName}${y.honorific}`};y.savedThoughts.unshift(o),localStorage.setItem("saved_thoughts",JSON.stringify(y.savedThoughts)),xe(),xt({particleCount:100,spread:70,origin:{y:.6}}),alert("ノートにほぞんしたよ！よく考えたね！🌟")}function xe(){if(y.savedThoughts.length===0){g.savedThoughtsSection.classList.add("hidden");return}g.savedThoughtsSection.classList.remove("hidden"),g.savedThoughtsList.innerHTML=y.savedThoughts.map(e=>`
    <div class="saved-item">
      <div class="saved-q">❓ しつもん: ${Z(e.question)}</div>
      <div class="saved-a">💡 ${Z(e.author)}の考え: ${Z(e.opinion)} <small>(${e.date})</small></div>
    </div>
  `).join("")}function Z(e){return e.replace(/[&<>"']/g,function(n){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[n]})}document.addEventListener("DOMContentLoaded",Dt);
