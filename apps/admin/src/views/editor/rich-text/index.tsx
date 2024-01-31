import { t } from 'i18next';
import { type FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { PageWrapper } from '@/components/Page';

import { WANG_EDITOR_PLUGIN } from '@/settings/websiteSetting';

import Editor from './components/Editor';
import Toolbar from './components/Toolbar';

import type { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor';

import '@wangeditor/editor/dist/css/style.css';

const RichTextEditor: FC = () => {
  const [editor, setEditor] = useState<IDomEditor | null>(null);
  const [html, setHtml] = useState('<p>hello</p>');

  const toolbarConfig: Partial<IToolbarConfig> = {};
  const editorConfig: Partial<IEditorConfig> = {
    // TS 语法
    placeholder: t('请输入内容...'),
  };

  useEffect(
    () => () => {
      if (editor == null) return;
      editor.destroy();
      setEditor(null);
    },
    [editor],
  );

  return (
    <PageWrapper plugin={WANG_EDITOR_PLUGIN}>
      <div style={{ border: '1px solid #ccc' }}>
        <Toolbar
          editor={editor}
          defaultConfig={toolbarConfig}
          mode='default'
          style={{ borderBottom: '1px solid #ccc' }}
        />

        <Editor
          defaultConfig={editorConfig}
          value={html}
          onCreated={setEditor}
          onChange={(editor) => setHtml(editor.getHtml())}
          mode='default'
          style={{ height: '500px', overflowY: 'hidden' }}
        />
      </div>
    </PageWrapper>
  );
};

export default RichTextEditor;
