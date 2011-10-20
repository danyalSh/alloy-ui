AUI.add('aui-ace-editor-mode-html', function(A) {
define("ace/mode/html",["require","exports","module","pilot/oop","ace/mode/text","ace/mode/javascript","ace/mode/css","ace/tokenizer","ace/mode/html_highlight_rules","ace/mode/behaviour/xml"],function(a,b,c){var d=a("pilot/oop"),e=a("ace/mode/text").Mode,f=a("ace/mode/javascript").Mode,g=a("ace/mode/css").Mode,h=a("ace/tokenizer").Tokenizer,i=a("ace/mode/html_highlight_rules").HtmlHighlightRules,j=a("ace/mode/behaviour/xml").XmlBehaviour,k=function(){var a=new i;this.$tokenizer=new h(a.getRules()),this.$behaviour=new j,this.$embeds=a.getEmbeds(),this.createModeDelegates({"js-":f,"css-":g})};d.inherits(k,e),function(){this.toggleCommentLines=function(a,b,c,d){return 0},this.getNextLineIndent=function(a,b,c){return this.$getIndent(b)},this.checkOutdent=function(a,b,c){return!1}}.call(k.prototype),b.Mode=k}),define("ace/mode/javascript",["require","exports","module","pilot/oop","ace/mode/text","ace/tokenizer","ace/mode/javascript_highlight_rules","ace/mode/matching_brace_outdent","ace/range","ace/worker/worker_client","ace/mode/behaviour/cstyle"],function(a,b,c){var d=a("pilot/oop"),e=a("ace/mode/text").Mode,f=a("ace/tokenizer").Tokenizer,g=a("ace/mode/javascript_highlight_rules").JavaScriptHighlightRules,h=a("ace/mode/matching_brace_outdent").MatchingBraceOutdent,i=a("ace/range").Range,j=a("ace/worker/worker_client").WorkerClient,k=a("ace/mode/behaviour/cstyle").CstyleBehaviour,l=function(){this.$tokenizer=new f((new g).getRules()),this.$outdent=new h,this.$behaviour=new k};d.inherits(l,e),function(){this.toggleCommentLines=function(a,b,c,d){var e=!0,f=[],g=/^(\s*)\/\//;for(var h=c;h<=d;h++)if(!g.test(b.getLine(h))){e=!1;break}if(e){var j=new i(0,0,0,0);for(var h=c;h<=d;h++){var k=b.getLine(h),l=k.match(g);j.start.row=h,j.end.row=h,j.end.column=l[0].length,b.replace(j,l[1])}}else b.indentRows(c,d,"//")},this.getNextLineIndent=function(a,b,c){var d=this.$getIndent(b),e=this.$tokenizer.getLineTokens(b,a),f=e.tokens,g=e.state;if(f.length&&f[f.length-1].type=="comment")return d;if(a=="start"){var h=b.match(/^.*[\{\(\[\:]\s*$/);h&&(d+=c)}else if(a=="doc-start"){if(g=="start")return"";var h=b.match(/^\s*(\/?)\*/);h&&(h[1]&&(d+=" "),d+="* ")}return d},this.checkOutdent=function(a,b,c){return this.$outdent.checkOutdent(b,c)},this.autoOutdent=function(a,b,c){this.$outdent.autoOutdent(b,c)},this.createWorker=function(a){var b=a.getDocument(),c=new j(["ace","pilot"],"worker-javascript.js","ace/mode/javascript_worker","JavaScriptWorker");c.call("setValue",[b.getValue()]),b.on("change",function(a){a.range={start:a.data.range.start,end:a.data.range.end},c.emit("change",a)}),c.on("jslint",function(b){var c=[];for(var d=0;d<b.data.length;d++){var e=b.data[d];e&&c.push({row:e.line-1,column:e.character-1,text:e.reason,type:"warning",lint:e})}a.setAnnotations(c)}),c.on("narcissus",function(b){a.setAnnotations([b.data])}),c.on("terminate",function(){a.clearAnnotations()});return c}}.call(l.prototype),b.Mode=l}),define("ace/mode/javascript_highlight_rules",["require","exports","module","pilot/oop","pilot/lang","ace/unicode","ace/mode/doc_comment_highlight_rules","ace/mode/text_highlight_rules"],function(a,b,c){var d=a("pilot/oop"),e=a("pilot/lang"),f=a("ace/unicode"),g=a("ace/mode/doc_comment_highlight_rules").DocCommentHighlightRules,h=a("ace/mode/text_highlight_rules").TextHighlightRules,i=function(){var a=e.arrayToMap("break|case|catch|continue|default|delete|do|else|finally|for|function|if|in|instanceof|new|return|switch|throw|try|typeof|let|var|while|with|const|yield|import|get|set".split("|")),b=e.arrayToMap("null|Infinity|NaN|undefined".split("|")),c=e.arrayToMap("class|enum|extends|super|export|implements|private|public|interface|package|protected|static".split("|")),d="["+f.packages.L+"\\$_]["+f.packages.L+f.packages.Mn+f.packages.Mc+f.packages.Nd+f.packages.Pc+"\\$_]*\\b";this.$rules={start:[{token:"comment",regex:"\\/\\/.*$"},(new g).getStartRule("doc-start"),{token:"comment",merge:!0,regex:"\\/\\*",next:"comment"},{token:"string",regex:'["](?:(?:\\\\.)|(?:[^"\\\\]))*?["]'},{token:"string",merge:!0,regex:'["].*\\\\$',next:"qqstring"},{token:"string",regex:"['](?:(?:\\\\.)|(?:[^'\\\\]))*?[']"},{token:"string",merge:!0,regex:"['].*\\\\$",next:"qstring"},{token:"constant.numeric",regex:"0[xX][0-9a-fA-F]+\\b"},{token:"constant.numeric",regex:"[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"},{token:"constant.language.boolean",regex:"(?:true|false)\\b"},{token:function(d){return d=="this"?"variable.language":a.hasOwnProperty(d)?"keyword":b.hasOwnProperty(d)?"constant.language":c.hasOwnProperty(d)?"invalid.illegal":d=="debugger"?"invalid.deprecated":"identifier"},regex:d},{token:"keyword.operator",regex:"!|\\$|%|&|\\*|\\-\\-|\\-|\\+\\+|\\+|~|===|==|=|!=|!==|<=|>=|<<=|>>=|>>>=|<>|<|>|!|&&|\\|\\||\\?\\:|\\*=|%=|\\+=|\\-=|&=|\\^=|\\b(?:in|instanceof|new|delete|typeof|void)",next:"regex_allowed"},{token:"lparen",regex:"[[({]",next:"regex_allowed"},{token:"rparen",regex:"[\\])}]"},{token:"keyword.operator",regex:"\\/=?",next:"regex_allowed"},{token:"comment",regex:"^#!.*$"},{token:"text",regex:"\\s+"}],regex_allowed:[{token:"string.regexp",regex:"\\/(?:(?:\\[(?:\\\\]|[^\\]])+\\])|(?:\\\\/|[^\\]/]))*[/]\\w*",next:"start"},{token:"text",regex:"\\s+"},{token:"empty",regex:"",next:"start"}],comment:[{token:"comment",regex:".*?\\*\\/",next:"start"},{token:"comment",merge:!0,regex:".+"}],qqstring:[{token:"string",regex:'(?:(?:\\\\.)|(?:[^"\\\\]))*?"',next:"start"},{token:"string",merge:!0,regex:".+"}],qstring:[{token:"string",regex:"(?:(?:\\\\.)|(?:[^'\\\\]))*?'",next:"start"},{token:"string",merge:!0,regex:".+"}]},this.embedRules(g,"doc-",[(new g).getEndRule("start")])};d.inherits(i,h),b.JavaScriptHighlightRules=i}),define("ace/mode/doc_comment_highlight_rules",["require","exports","module","pilot/oop","ace/mode/text_highlight_rules"],function(a,b,c){var d=a("pilot/oop"),e=a("ace/mode/text_highlight_rules").TextHighlightRules,f=function(){this.$rules={start:[{token:"comment.doc.tag",regex:"@[\\w\\d_]+"},{token:"comment.doc",merge:!0,regex:"\\s+"},{token:"comment.doc",merge:!0,regex:"TODO"},{token:"comment.doc",merge:!0,regex:"[^@\\*]+"},{token:"comment.doc",merge:!0,regex:"."}]}};d.inherits(f,e),function(){this.getStartRule=function(a){return{token:"comment.doc",merge:!0,regex:"\\/\\*(?=\\*)",next:a}},this.getEndRule=function(a){return{token:"comment.doc",merge:!0,regex:"\\*\\/",next:a}}}.call(f.prototype),b.DocCommentHighlightRules=f}),define("ace/mode/matching_brace_outdent",["require","exports","module","ace/range"],function(a,b,c){var d=a("ace/range").Range,e=function(){};(function(){this.checkOutdent=function(a,b){return/^\s+$/.test(a)?/^\s*\}/.test(b):!1},this.autoOutdent=function(a,b){var c=a.getLine(b),e=c.match(/^(\s*\})/);if(!e)return 0;var f=e[1].length,g=a.findMatchingBracket({row:b,column:f});if(!g||g.row==b)return 0;var h=this.$getIndent(a.getLine(g.row));a.replace(new d(b,0,b,f-1),h)},this.$getIndent=function(a){var b=a.match(/^(\s+)/);return b?b[1]:""}}).call(e.prototype),b.MatchingBraceOutdent=e}),define("ace/worker/worker_client",["require","exports","module","pilot/oop","pilot/event_emitter"],function(a,b,c){var d=a("pilot/oop"),e=a("pilot/event_emitter").EventEmitter,f=function(b,c,d,e){this.callbacks=[];if(a.packaged)var f=this.$guessBasePath(),g=this.$worker=new Worker(f+c);else{var h=this.$normalizePath(a.nameToUrl("ace/worker/worker",null,"_")),g=this.$worker=new Worker(h),i={};for(var j=0;j<b.length;j++){var k=b[j],l=this.$normalizePath(a.nameToUrl(k,null,"_").replace(/.js$/,""));i[k]=l}}this.$worker.postMessage({init:!0,tlns:i,module:d,classname:e}),this.callbackId=1,this.callbacks={};var m=this;this.$worker.onerror=function(a){window.console&&console.log&&console.log(a);throw a},this.$worker.onmessage=function(a){var b=a.data;switch(b.type){case"log":window.console&&console.log&&console.log(b.data);break;case"event":m._dispatchEvent(b.name,{data:b.data});break;case"call":var c=m.callbacks[b.id];c&&(c(b.data),delete m.callbacks[b.id])}}};(function(){d.implement(this,e),this.$normalizePath=function(a){a.match(/^\w+:/)||(a=location.protocol+"//"+location.host+location.pathname.replace(/\/.*?$/,"")+"/"+a.replace(/^\//,""));return a},this.$guessBasePath=function(){if(a.aceBaseUrl)return a.aceBaseUrl;var b=document.getElementsByTagName("script");for(var c=0;c<b.length;c++){var d=b[c],e=d.getAttribute("data-ace-base");if(e)return e.replace(/\/*$/,"/");var f=d.src||d.getAttribute("src");if(!f)continue;var g=f.match(/^(?:(.*\/)ace\.js|(.*\/)ace-uncompressed\.js)(?:\?|$)/);if(g)return g[1]||g[2]}return""},this.terminate=function(){this._dispatchEvent("terminate",{}),this.$worker.terminate()},this.send=function(a,b){this.$worker.postMessage({command:a,args:b})},this.call=function(a,b,c){if(c){var d=this.callbackId++;this.callbacks[d]=c,b.push(d)}this.send(a,b)},this.emit=function(a,b){this.$worker.postMessage({event:a,data:b})}}).call(f.prototype),b.WorkerClient=f}),define("ace/mode/behaviour/cstyle",["require","exports","module","pilot/oop","ace/mode/behaviour"],function(a,b,c){var d=a("pilot/oop"),e=a("ace/mode/behaviour").Behaviour,f=function(){this.add("braces","insertion",function(a,b,c,d,e){if(e=="{"){var f=c.getSelectionRange(),g=d.doc.getTextRange(f);return g!==""?{text:"{"+g+"}",selection:!1}:{text:"{}",selection:[1,1]}}if(e=="}"){var h=c.getCursorPosition(),i=d.doc.getLine(h.row),j=i.substring(h.column,h.column+1);if(j=="}"){var k=d.$findOpeningBracket("}",{column:h.column+1,row:h.row});if(k!==null)return{text:"",selection:[1,1]}}}else if(e=="\n"){var h=c.getCursorPosition(),i=d.doc.getLine(h.row),j=i.substring(h.column,h.column+1);if(j=="}"){var l=d.findMatchingBracket({row:h.row,column:h.column+1});if(!l)return!1;var m=this.getNextLineIndent(a,i.substring(0,i.length-1),d.getTabString()),n=this.$getIndent(d.doc.getLine(l.row));return{text:"\n"+m+"\n"+n,selection:[1,m.length,1,m.length]}}}return!1}),this.add("braces","deletion",function(a,b,c,d,e){var f=d.doc.getTextRange(e);if(!e.isMultiLine()&&f=="{"){var g=d.doc.getLine(e.start.row),h=g.substring(e.end.column,e.end.column+1);if(h=="}"){e.end.column++;return e}}return!1}),this.add("parens","insertion",function(a,b,c,d,e){if(e=="("){var f=c.getSelectionRange(),g=d.doc.getTextRange(f);return g!==""?{text:"("+g+")",selection:!1}:{text:"()",selection:[1,1]}}if(e==")"){var h=c.getCursorPosition(),i=d.doc.getLine(h.row),j=i.substring(h.column,h.column+1);if(j==")"){var k=d.$findOpeningBracket(")",{column:h.column+1,row:h.row});if(k!==null)return{text:"",selection:[1,1]}}}return!1}),this.add("parens","deletion",function(a,b,c,d,e){var f=d.doc.getTextRange(e);if(!e.isMultiLine()&&f=="("){var g=d.doc.getLine(e.start.row),h=g.substring(e.start.column+1,e.start.column+2);if(h==")"){e.end.column++;return e}}return!1}),this.add("string_dquotes","insertion",function(a,b,c,d,e){if(e=='"'){var f=c.getSelectionRange(),g=d.doc.getTextRange(f);if(g!=="")return{text:'"'+g+'"',selection:!1};var h=c.getCursorPosition(),i=d.doc.getLine(h.row),j=i.substring(h.column-1,h.column);if(j=="\\")return!1;var k=d.getTokens(f.start.row,f.start.row)[0].tokens,l=0,m,n=-1;for(var o=0;o<k.length;o++){m=k[o],m.type=="string"?n=-1:n<0&&(n=m.value.indexOf('"'));if(m.value.length+l>f.start.column)break;l+=k[o].value.length}if(!m||n<0&&m.type!=="comment"&&(m.type!=="string"||f.start.column!==m.value.length+l-1&&m.value.lastIndexOf('"')===m.value.length-1))return{text:'""',selection:[1,1]};if(m&&m.type==="string"){var p=i.substring(h.column,h.column+1);if(p=='"')return{text:"",selection:[1,1]}}}return!1}),this.add("string_dquotes","deletion",function(a,b,c,d,e){var f=d.doc.getTextRange(e);if(!e.isMultiLine()&&f=='"'){var g=d.doc.getLine(e.start.row),h=g.substring(e.start.column+1,e.start.column+2);if(h=='"'){e.end.column++;return e}}return!1})};d.inherits(f,e),b.CstyleBehaviour=f}),define("ace/mode/css",["require","exports","module","pilot/oop","ace/mode/text","ace/tokenizer","ace/mode/css_highlight_rules","ace/mode/matching_brace_outdent","ace/worker/worker_client"],function(a,b,c){var d=a("pilot/oop"),e=a("ace/mode/text").Mode,f=a("ace/tokenizer").Tokenizer,g=a("ace/mode/css_highlight_rules").CssHighlightRules,h=a("ace/mode/matching_brace_outdent").MatchingBraceOutdent,i=a("ace/worker/worker_client").WorkerClient,j=function(){this.$tokenizer=new f((new g).getRules()),this.$outdent=new h};d.inherits(j,e),function(){this.getNextLineIndent=function(a,b,c){var d=this.$getIndent(b),e=this.$tokenizer.getLineTokens(b,a).tokens;if(e.length&&e[e.length-1].type=="comment")return d;var f=b.match(/^.*\{\s*$/);f&&(d+=c);return d},this.checkOutdent=function(a,b,c){return this.$outdent.checkOutdent(b,c)},this.autoOutdent=function(a,b,c){this.$outdent.autoOutdent(b,c)},this.createWorker=function(a){var b=a.getDocument(),c=new i(["ace","pilot"],"worker-css.js","ace/mode/css_worker","Worker");c.call("setValue",[b.getValue()]),b.on("change",function(a){a.range={start:a.data.range.start,end:a.data.range.end},c.emit("change",a)}),c.on("csslint",function(b){var c=[];b.data.forEach(function(a){c.push({row:a.line-1,column:a.col-1,text:a.message,type:a.type,lint:a})}),a.setAnnotations(c)})}}.call(j.prototype),b.Mode=j}),define("ace/mode/css_highlight_rules",["require","exports","module","pilot/oop","pilot/lang","ace/mode/text_highlight_rules"],function(a,b,c){var d=a("pilot/oop"),e=a("pilot/lang"),f=a("ace/mode/text_highlight_rules").TextHighlightRules,g=function(){function g(a){var b=[],c=a.split("");for(var d=0;d<c.length;d++)b.push("[",c[d].toLowerCase(),c[d].toUpperCase(),"]");return b.join("")}var a=e.arrayToMap("-moz-box-sizing|-webkit-box-sizing|appearance|azimuth|background-attachment|background-color|background-image|background-position|background-repeat|background|border-bottom-color|border-bottom-style|border-bottom-width|border-bottom|border-collapse|border-color|border-left-color|border-left-style|border-left-width|border-left|border-right-color|border-right-style|border-right-width|border-right|border-spacing|border-style|border-top-color|border-top-style|border-top-width|border-top|border-width|border|bottom|box-sizing|caption-side|clear|clip|color|content|counter-increment|counter-reset|cue-after|cue-before|cue|cursor|direction|display|elevation|empty-cells|float|font-family|font-size-adjust|font-size|font-stretch|font-style|font-variant|font-weight|font|height|left|letter-spacing|line-height|list-style-image|list-style-position|list-style-type|list-style|margin-bottom|margin-left|margin-right|margin-top|marker-offset|margin|marks|max-height|max-width|min-height|min-width|-moz-border-radius|opacity|orphans|outline-color|outline-style|outline-width|outline|overflow|overflow-x|overflow-y|padding-bottom|padding-left|padding-right|padding-top|padding|page-break-after|page-break-before|page-break-inside|page|pause-after|pause-before|pause|pitch-range|pitch|play-during|position|quotes|richness|right|size|speak-header|speak-numeral|speak-punctuation|speech-rate|speak|stress|table-layout|text-align|text-decoration|text-indent|text-shadow|text-transform|top|unicode-bidi|vertical-align|visibility|voice-family|volume|white-space|widows|width|word-spacing|z-index".split("|")),b=e.arrayToMap("rgb|rgba|url|attr|counter|counters".split("|")),c=e.arrayToMap("absolute|all-scroll|always|armenian|auto|baseline|below|bidi-override|block|bold|bolder|border-box|both|bottom|break-all|break-word|capitalize|center|char|circle|cjk-ideographic|col-resize|collapse|content-box|crosshair|dashed|decimal-leading-zero|decimal|default|disabled|disc|distribute-all-lines|distribute-letter|distribute-space|distribute|dotted|double|e-resize|ellipsis|fixed|georgian|groove|hand|hebrew|help|hidden|hiragana-iroha|hiragana|horizontal|ideograph-alpha|ideograph-numeric|ideograph-parenthesis|ideograph-space|inactive|inherit|inline-block|inline|inset|inside|inter-ideograph|inter-word|italic|justify|katakana-iroha|katakana|keep-all|left|lighter|line-edge|line-through|line|list-item|loose|lower-alpha|lower-greek|lower-latin|lower-roman|lowercase|lr-tb|ltr|medium|middle|move|n-resize|ne-resize|newspaper|no-drop|no-repeat|nw-resize|none|normal|not-allowed|nowrap|oblique|outset|outside|overline|pointer|progress|relative|repeat-x|repeat-y|repeat|right|ridge|row-resize|rtl|s-resize|scroll|se-resize|separate|small-caps|solid|square|static|strict|super|sw-resize|table-footer-group|table-header-group|tb-rl|text-bottom|text-top|text|thick|thin|top|transparent|underline|upper-alpha|upper-latin|upper-roman|uppercase|vertical-ideographic|vertical-text|visible|w-resize|wait|whitespace|zero".split("|")),d=e.arrayToMap("aqua|black|blue|fuchsia|gray|green|lime|maroon|navy|olive|orange|purple|red|silver|teal|white|yellow".split("|")),f="\\-?(?:(?:[0-9]+)|(?:[0-9]*\\.[0-9]+))",h=[{token:"comment",merge:!0,regex:"\\/\\*",next:"ruleset_comment"},{token:"string",regex:'["](?:(?:\\\\.)|(?:[^"\\\\]))*?["]'},{token:"string",regex:"['](?:(?:\\\\.)|(?:[^'\\\\]))*?[']"},{token:"constant.numeric",regex:f+g("em")},{token:"constant.numeric",regex:f+g("ex")},{token:"constant.numeric",regex:f+g("px")},{token:"constant.numeric",regex:f+g("cm")},{token:"constant.numeric",regex:f+g("mm")},{token:"constant.numeric",regex:f+g("in")},{token:"constant.numeric",regex:f+g("pt")},{token:"constant.numeric",regex:f+g("pc")},{token:"constant.numeric",regex:f+g("deg")},{token:"constant.numeric",regex:f+g("rad")},{token:"constant.numeric",regex:f+g("grad")},{token:"constant.numeric",regex:f+g("ms")},{token:"constant.numeric",regex:f+g("s")},{token:"constant.numeric",regex:f+g("hz")},{token:"constant.numeric",regex:f+g("khz")},{token:"constant.numeric",regex:f+"%"},{token:"constant.numeric",regex:f},{token:"constant.numeric",regex:"#[a-fA-F0-9]{6}"},{token:"constant.numeric",regex:"#[a-fA-F0-9]{3}"},{token:function(e){return a.hasOwnProperty(e.toLowerCase())?"support.type":b.hasOwnProperty(e.toLowerCase())?"support.function":c.hasOwnProperty(e.toLowerCase())?"support.constant":d.hasOwnProperty(e.toLowerCase())?"support.constant.color":"text"},regex:"\\-?[a-zA-Z_][a-zA-Z0-9_\\-]*"}],i=e.copyArray(h);i.unshift({token:"rparen",regex:"\\}",next:"start"});var j=e.copyArray(h);j.unshift({token:"rparen",regex:"\\}",next:"media"});var k=[{token:"comment",merge:!0,regex:".+"}],l=e.copyArray(k);l.unshift({token:"comment",regex:".*?\\*\\/",next:"start"});var m=e.copyArray(k);m.unshift({token:"comment",regex:".*?\\*\\/",next:"media"});var n=e.copyArray(k);n.unshift({token:"comment",regex:".*?\\*\\/",next:"ruleset"}),this.$rules={start:[{token:"comment",merge:!0,regex:"\\/\\*",next:"comment"},{token:"lparen",regex:"\\{",next:"ruleset"},{token:"string",regex:"@media.*?{",next:"media"},{token:"keyword",regex:"#[a-zA-Z0-9-_]+"},{token:"variable",regex:"\\.[a-zA-Z0-9-_]+"},{token:"string",regex:":[a-zA-Z0-9-_]+"},{token:"constant",regex:"[a-zA-Z0-9-_]+"}],media:[{token:"comment",merge:!0,regex:"\\/\\*",next:"media_comment"},{token:"lparen",regex:"\\{",next:"media_ruleset"},{token:"string",regex:"\\}",next:"start"},{token:"keyword",regex:"#[a-zA-Z0-9-_]+"},{token:"variable",regex:"\\.[a-zA-Z0-9-_]+"},{token:"string",regex:":[a-zA-Z0-9-_]+"},{token:"constant",regex:"[a-zA-Z0-9-_]+"}],comment:l,ruleset:i,ruleset_comment:n,media_ruleset:j,media_comment:m}};d.inherits(g,f),b.CssHighlightRules=g}),define("ace/mode/html_highlight_rules",["require","exports","module","pilot/oop","ace/mode/css_highlight_rules","ace/mode/javascript_highlight_rules","ace/mode/text_highlight_rules"],function(a,b,c){var d=a("pilot/oop"),e=a("ace/mode/css_highlight_rules").CssHighlightRules,f=a("ace/mode/javascript_highlight_rules").JavaScriptHighlightRules,g=a("ace/mode/text_highlight_rules").TextHighlightRules,h=function(){function c(c,d,e){c[d]=[{token:"text",regex:"\\s+"},{token:"meta.tag",regex:"[-_a-zA-Z0-9:]+",next:d+"-attribute-list"},{token:"empty",regex:"",next:d+"-attribute-list"}],c[d+"-qstring"]=b("'",d),c[d+"-qqstring"]=b('"',d),c[d+"-attribute-list"]=[{token:"text",regex:">",next:e},{token:"entity.other.attribute-name",regex:"[-_a-zA-Z0-9:]+"},{token:"constant.numeric",regex:"[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"},{token:"text",regex:"\\s+"}].concat(a(d))}function b(a,b){return[{token:"string",merge:!0,regex:".*"+a,next:b},{token:"string",merge:!0,regex:".+"}]}function a(a){return[{token:"string",regex:'".*?"'},{token:"string",merge:!0,regex:'["].*$',next:a+"-qqstring"},{token:"string",regex:"'.*?'"},{token:"string",merge:!0,regex:"['].*$",next:a+"-qstring"}]}this.$rules={start:[{token:"text",merge:!0,regex:"<\\!\\[CDATA\\[",next:"cdata"},{token:"xml_pe",regex:"<\\?.*?\\?>"},{token:"comment",merge:!0,regex:"<\\!--",next:"comment"},{token:"text",regex:"<(?=s*script)",next:"script"},{token:"text",regex:"<(?=s*style)",next:"css"},{token:"text",regex:"<\\/?",next:"tag"},{token:"text",regex:"\\s+"},{token:"text",regex:"[^<]+"}],cdata:[{token:"text",regex:"\\]\\]>",next:"start"},{token:"text",merge:!0,regex:"\\s+"},{token:"text",merge:!0,regex:".+"}],comment:[{token:"comment",regex:".*?-->",next:"start"},{token:"comment",merge:!0,regex:".+"}]},c(this.$rules,"tag","start"),c(this.$rules,"css","css-start"),c(this.$rules,"script","js-start"),this.embedRules(f,"js-",[{token:"comment",regex:"\\/\\/.*(?=<\\/script>)",next:"tag"},{token:"text",regex:"<\\/(?=script)",next:"tag"}]),this.embedRules(e,"css-",[{token:"text",regex:"<\\/(?=style)",next:"tag"}])};d.inherits(h,g),b.HtmlHighlightRules=h}),define("ace/mode/behaviour/xml",["require","exports","module","pilot/oop","ace/mode/behaviour","ace/mode/behaviour/cstyle"],function(a,b,c){var d=a("pilot/oop"),e=a("ace/mode/behaviour").Behaviour,f=a("ace/mode/behaviour/cstyle").CstyleBehaviour,g=function(){this.inherit(f,["string_dquotes"]),this.add("brackets","insertion",function(a,b,c,d,e){if(e=="<"){var f=c.getSelectionRange(),g=d.doc.getTextRange(f);return g!==""?!1:{text:"<>",selection:[1,1]}}if(e==">"){var h=c.getCursorPosition(),i=d.doc.getLine(h.row),j=i.substring(h.column,h.column+1);if(j==">")return{text:"",selection:[1,1]}}else if(e=="\n"){var h=c.getCursorPosition(),i=d.doc.getLine(h.row),k=i.substring(h.column,h.column+2);if(k=="</"){var l=this.$getIndent(d.doc.getLine(h.row))+d.getTabString(),m=this.$getIndent(d.doc.getLine(h.row));return{text:"\n"+l+"\n"+m,selection:[1,l.length,1,l.length]}}}return!1})};d.inherits(g,e),b.XmlBehaviour=g})

}, '@VERSION@' ,{requires:['aui-ace-editor-base'], skinnable:false});
