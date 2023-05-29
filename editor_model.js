const listenersEmitters = require("./Listeners_Emitters");
const ListenerService = require("./ListenerService");
class Editor_Model {
  constructor(text_from_server, session_id) {
    this.session_id = session_id;
    this.text_content = text_from_server;
    this.code_editor_options = {
      //mode:"javascript"text/x-c++src
      //
      mode: "javascript",
      lineNumbers: true,
      lineWrapping: true,
      indentWithTabs: true,
      value: this.text_concent,
      styleActiveLine: true,
      matchBrackets: true,
      theme: "solarized",
      // linting option is not documented.
      lint: { esversion: "10" },
      width: "auto",
      gutters: ["CodeMirror-lint-markers"],

      extraKeys: {
        "Ctrl-J": "toMatchingTag",
        "Ctrl-S": function (cm) {
          saveCode(cm); //function called when 'ctrl+s' is used when instance is in focus
        },
        F11: function (cm) {
          toggleFullscreen(cm, true); //function called for full screen mode
        },
        Esc: function (cm) {
          toggleFullscreen(cm, false); //function to escape full screen mode
        },
      },

      dom: [
        `
          // DOM dependency functions
          ${ListenerService.toString()};
          
          let editor;
          let marker = window.location.href  ;
            const frag = document.createDocumentFragment();
            const form = document.createElement("Form");
            form.id="select_a_theme";
            let label = document.createElement("Label");
            label.for = "theme_id";
            label.innerHTML = "Choose a theme";
            const select = document.createElement("SELECT");
            select.name = "themes";
            select.id = "theme_id";
            form.appendChild(label);
            form.appendChild(select);
            const links = document.getElementsByTagName("link");
            let i = 0;
            while (links.length > i) {
              const link = links[i++];
              if (link.href.includes("theme")) {
                const css = link.href.split("/").pop().split(".").shift();
                const theme = document.createElement("OPTION");
                theme.value = css;
                theme.innerText = css;
                select.appendChild(theme);
              }
              frag.appendChild(form);
              document.body.appendChild(frag);
            }
            let cached_code= "";
            let ce = document.getElementById("textArea");
            let text_code = localStorage.getItem(marker)
            ce.textContent = text_code ? text_code : ""; 
            var text = ce.textContent || ce.innerText || ce.innerHTML || editor_.code_text;
            editor = CodeMirror((node) => {ce.parentNode.replaceChild(node, ce)},
                                editor_.code_editor_options
            );
          text_code ? editor.getDoc().setValue(text_code) : null;
            var widgets = [];
            function updateHints() {
              let str_code = editor.getValue();
              JSHINT.errors = JSHINT.errors || [];
              
            
              editor.operation(function() {
  
                for (var i = 0; i < widgets.length; ++i)editor.removeLineWidget(widgets[i]);
                widgets.length = 0;
                const str = editor.getValue();
                
              
                JSHINT(str, {esversion : "10"});
                localStorage.setItem(marker,str);
              if ( !JSHINT.errors.length && str_code.length && cached_code !== str.trim()) {
                cached_code= str.trim(); 
                
               setTimeout(()=>{
                 const listenersEmitters = ${
                   listenersEmitters.client.emitters.string_code
                 }
                  listenersEmitters(socket, str_code.trim());
               },350)
              }
                for (var i = 0; i < JSHINT.errors.length; ++i) {
                  var err = JSHINT.errors[i];
                  if (!err) {
                    continue;
                  }
                 
                  var msg = document.createElement("div");
                  var icon = msg.appendChild(document.createElement("span"));
                  icon.innerHTML = "!!";
                  icon.className = "lint-error-icon";
                  msg.appendChild(document.createTextNode(err.reason));
                  msg.className = "lint-error";
                  widgets.push(editor.addLineWidget(err.line - 1, msg, {
                    coverGutter : false,
                    noHScroll : true,
                  }));
                }
              });
              let info = editor.getScrollInfo();
              let after =
                  editor.charCoords({line : editor.getCursor().line + 1, ch : 0}, "local")
                      .top;
              if (info.top + info.clientHeight < after)
                editor.scrollTo(null, after - info.clientHeight + 3);
            }
            let waiting;
            editor.on(
                "change", function() {
                  clearTimeout(waiting);
                  waiting = setTimeout(updateHints, 500);
                });
            
                setTimeout(updateHints, 100);
  
                editor.setOption("theme", "dracula");
                document.createDocumentFragment();
  
  
                document.createElement("FORM")
  
                var div = document.getElementById("news-list");
            let urlNode = document.getElementById("url");
  
  const listenerService =  new Map();
  // listenerService.set(urlNode,{type:'keydown', dep:{socket:socket},  method:({socket})=>  socket.emit('url', {url: data.value})   });
  listenerService.set(select, {type:'click', dep:{editor:editor}, method:(event,{editor})=> editor.setOption("theme",event.target.value)});
  ListenerService(listenerService);
          `,
      ],
    };
  }

  /** 
      @parameter text {String}
      @parameter session_id {String}
      @parameter socket {Object}
      @return void
      **/
  save_text(text, socket) {
    console.log(
      `client code for ${this.session_id}:  ${log_to_client.logging.string(
        text,
        socket
      )}`
    );
  }
  get_text_content() {
    return this.text_content;
  }
  start_editor() {
    return {
      code_text: this.text_content,
      editor_options: this.code_editor_options,
    };
  }
}
module.exports = { editor_model: Editor_Model };
