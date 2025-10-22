import React, { useRef, useEffect, useState } from 'react';
import Editor from '@monaco-editor/react';
import { useGetFileContentQuery, useSaveFileMutation } from '../../apis/adminsApi';

const FileEditor = ({ file, onBack, onFileSaved }) => {
  const [content, setContent] = useState('');
  const [isDirty, setIsDirty] = useState(false);
  const editorRef = useRef(null);

  const { data, error, isLoading, refetch } = useGetFileContentQuery(file.path);
  const [saveFile, { isLoading: isSaving }] = useSaveFileMutation();

  console.log(data);
  

  useEffect(() => {
    if (data?.content) {
      setContent(data.content);
      setIsDirty(false);
    }
  }, [data]);

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    
    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      target: monaco.languages.typescript.ScriptTarget.Latest,
      allowNonTsExtensions: true,
      moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
      module: monaco.languages.typescript.ModuleKind.CommonJS,
      noEmit: true,
      esModuleInterop: true,
      jsx: monaco.languages.typescript.JsxEmit.React,
      reactNamespace: 'React',
      allowJs: true,
      typeRoots: ['node_modules/@types']
    });

    monaco.languages.typescript.typescriptDefaults.addExtraLib(
      `declare module 'react' { export = any; }`,
      'file:///node_modules/react/index.d.ts'
    );
  };

  const handleEditorChange = (value) => {
    setContent(value);
    setIsDirty(true);
  };

  const handleSave = async () => {
    try {
      await saveFile({ filepath: file.path, content }).unwrap();
      setIsDirty(false);
      onFileSaved();
      alert('Файл успешно сохранен!');
    } catch (error) {
      alert('Ошибка сохранения файла: ' + error.data?.error);
    }
  };

  const getLanguageFromExtension = (filename) => {
    const ext = filename.split('.').pop()?.toLowerCase();
    const languageMap = {
      js: 'javascript',
      jsx: 'javascript',
      ts: 'typescript',
      tsx: 'typescript',
      css: 'css',
      scss: 'scss',
      json: 'json',
      md: 'markdown',
      html: 'html',
      py: 'python',
    };
    return languageMap[ext] || 'plaintext';
  };

  if (isLoading) {
    return (
      <div className="h-full flex flex-col bg-gray-900">
        <div className="bg-gray-800 border-b border-gray-700 px-6 py-4">
          <button 
            onClick={onBack}
            className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors cursor-pointer"
          >
            ← Назад
          </button>
        </div>
        <div className="flex-1 flex items-center justify-center text-gray-400">
          Загрузка содержимого файла...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full flex flex-col bg-gray-900">
        <div className="bg-gray-800 border-b border-gray-700 px-6 py-4">
          <button 
            onClick={onBack}
            className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors"
          >
            ← Назад
          </button>
        </div>
        <div className="flex-1 flex items-center justify-center text-red-400">
          Ошибка загрузки файла: {error.data?.error || error.message}
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-gray-900">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button 
              onClick={onBack}
              className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors cursor-pointer"
            >
              ← Назад к файлам
            </button>
            <button 
              onClick={handleSave}
              disabled={!isDirty || isSaving}
              className={`px-4 py-2 rounded-lg transition-colors ${
                !isDirty || isSaving
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  : 'bg-green-600 text-white hover:bg-green-700'
              }`}
            >
              {isSaving ? '💾 Сохранение...' : '💾 Сохранить'}
            </button>
            {isDirty && (
              <span className="text-yellow-400 text-sm">* Есть несохраненные изменения</span>
            )}
          </div>
          <div className="text-right">
            <h3 className="text-white font-semibold">{file.name}</h3>
            <div className="text-sm text-gray-400">
              {file.path} • {getLanguageFromExtension(file.name)}
            </div>
          </div>
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1">
        <Editor
          height="100%"
          language={getLanguageFromExtension(file.name)}
          value={content}
          onChange={handleEditorChange}
          onMount={handleEditorDidMount}
          theme="vs-dark"
          options={{
            minimap: { enabled: true },
            scrollBeyondLastLine: false,
            fontSize: 14,
            wordWrap: 'on',
            automaticLayout: true,
            tabSize: 2,
            insertSpaces: true,
            formatOnPaste: true,
            formatOnType: true,
          }}
        />
      </div>
    </div>
  );
};

export default FileEditor;