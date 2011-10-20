AUI.add("aui-ace-editor-theme-idle_fingers",function(a){define("ace/theme/idle_fingers",["require","exports","module"],function(g,f,j){var i=g("pilot/dom"),h=".ace-idle-fingers .ace_editor {\n  border: 2px solid rgb(159, 159, 159);\n}\n\n.ace-idle-fingers .ace_editor.ace_focus {\n  border: 2px solid #327fbd;\n}\n\n.ace-idle-fingers .ace_gutter {\n  width: 50px;\n  background: #e8e8e8;\n  color: #333;\n  overflow : hidden;\n}\n\n.ace-idle-fingers .ace_gutter-layer {\n  width: 100%;\n  text-align: right;\n}\n\n.ace-idle-fingers .ace_gutter-layer .ace_gutter-cell {\n  padding-right: 6px;\n}\n\n.ace-idle-fingers .ace_print_margin {\n  width: 1px;\n  background: #e8e8e8;\n}\n\n.ace-idle-fingers .ace_scroller {\n  background-color: #323232;\n}\n\n.ace-idle-fingers .ace_text-layer {\n  cursor: text;\n  color: #FFFFFF;\n}\n\n.ace-idle-fingers .ace_cursor {\n  border-left: 2px solid #91FF00;\n}\n\n.ace-idle-fingers .ace_cursor.ace_overwrite {\n  border-left: 0px;\n  border-bottom: 1px solid #91FF00;\n}\n \n.ace-idle-fingers .ace_marker-layer .ace_selection {\n  background: rgba(90, 100, 126, 0.88);\n}\n\n.ace-idle-fingers .ace_marker-layer .ace_step {\n  background: rgb(198, 219, 174);\n}\n\n.ace-idle-fingers .ace_marker-layer .ace_bracket {\n  margin: -1px 0 0 -1px;\n  border: 1px solid #404040;\n}\n\n.ace-idle-fingers .ace_marker-layer .ace_active_line {\n  background: #353637;\n}\n\n       \n.ace-idle-fingers .ace_invisible {\n  color: #404040;\n}\n\n.ace-idle-fingers .ace_keyword {\n  color:#CC7833;\n}\n\n.ace-idle-fingers .ace_keyword.ace_operator {\n  \n}\n\n.ace-idle-fingers .ace_constant {\n  color:#6C99BB;\n}\n\n.ace-idle-fingers .ace_constant.ace_language {\n  \n}\n\n.ace-idle-fingers .ace_constant.ace_library {\n  \n}\n\n.ace-idle-fingers .ace_constant.ace_numeric {\n  \n}\n\n.ace-idle-fingers .ace_invalid {\n  color:#FFFFFF;\nbackground-color:#FF0000;\n}\n\n.ace-idle-fingers .ace_invalid.ace_illegal {\n  \n}\n\n.ace-idle-fingers .ace_invalid.ace_deprecated {\n  \n}\n\n.ace-idle-fingers .ace_support {\n  \n}\n\n.ace-idle-fingers .ace_support.ace_function {\n  color:#B83426;\n}\n\n.ace-idle-fingers .ace_function.ace_buildin {\n  \n}\n\n.ace-idle-fingers .ace_string {\n  color:#A5C261;\n}\n\n.ace-idle-fingers .ace_string.ace_regexp {\n  color:#CCCC33;\n}\n\n.ace-idle-fingers .ace_comment {\n  font-style:italic;\ncolor:#BC9458;\n}\n\n.ace-idle-fingers .ace_comment.ace_doc {\n  \n}\n\n.ace-idle-fingers .ace_comment.ace_doc.ace_tag {\n  \n}\n\n.ace-idle-fingers .ace_variable {\n  \n}\n\n.ace-idle-fingers .ace_variable.ace_language {\n  \n}\n\n.ace-idle-fingers .ace_xml_pe {\n  \n}\n\n.ace-idle-fingers .ace_meta {\n  \n}\n\n.ace-idle-fingers .ace_meta.ace_tag {\n  color:#FFE5BB;\n}\n\n.ace-idle-fingers .ace_meta.ace_tag.ace_input {\n  \n}\n\n.ace-idle-fingers .ace_entity.ace_other.ace_attribute-name {\n  \n}\n\n\n.ace-idle-fingers .ace_collab.ace_user1 {\n  color:#323232;\nbackground-color:#FFF980;   \n}";i.importCssString(h),f.cssClass="ace-idle-fingers";});},"@VERSION@",{requires:["aui-ace-editor-base"],skinnable:false});