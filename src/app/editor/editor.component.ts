import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client';
import * as CodeMirror from 'codemirror';
import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/addon/edit/matchbrackets.js';
import 'codemirror/addon/edit/closebrackets.js';
import 'codemirror/addon/hint/show-hint.js';
import 'codemirror/addon/hint/javascript-hint.js';
import 'codemirror/addon/lint/lint.js';
import 'codemirror/addon/lint/json-lint.js';
import 'codemirror/lib/codemirror.css';
import 'codemirror/addon/display/panel';
import './editor.component.css';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  socket = io.default();
  // editor: CodeMirror.EditorFromTextArea;
  editor: CodeMirror.Editor;
  fileList: string[] = [];
  currentFile: string | null = null;

  ngOnInit() {
    this.socket.on('update', (content: string) => {
      this.editor.setValue(content);
    });

    // Fetch file list
    fetch('/files')
      .then(response => response.json())
      .then(files => {
        this.fileList = files;
      });
  }

  onFileChange() {
    if (this.currentFile) {
      this.socket.emit('leave', this.currentFile);
    }
    this.socket.emit('join', this.currentFile);

    // Fetch file content
    fetch(`/files/${this.currentFile}`)
      .then(response => response.json())
      .then(content => {
        this.editor.setValue(content);
      });
  }
  
  editor = CodeMirror.fromTextArea(document.getElementById('editor') as HTMLTextAreaElement, {
    mode: 'application/json',
    lineNumbers: true,
    matchBrackets: true,
    autoCloseBrackets: true,
    extraKeys: { 'Ctrl-Space': 'autocomplete' },
    gutters: ['CodeMirror-lint-markers'],
    lint: true,
});

  onEditorChange() {
    const content = this.editor.getValue();
    this.socket.emit('update', { fileName: this.currentFile, content });
  }
}

