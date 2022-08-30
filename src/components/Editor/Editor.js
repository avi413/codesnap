import './Editor.css';
import CodeMirror from '@uiw/react-codemirror';
import { okaidia } from '@uiw/codemirror-theme-okaidia';
import { loadLanguage, langNames } from '@uiw/codemirror-extensions-langs';
import { useRef, useState } from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';

import html2canvas from 'html2canvas';
import shoot from '../../images/camera.png';

export default function Editor() {
  const [code, setCode] = useLocalStorage(
    'code',
    "console.log('hello world!');"
  );
  const [lang, setLang] = useLocalStorage('lang', 'javascript');
  const onChange = (editor, change) => {
    setCode(editor);
  };

  const [title, setTitle] = useLocalStorage(
    'title',
    "Title"
  );

  const printRef = useRef();

  const handleDownloadImage = async () => {
    const element = printRef.current;
    const canvas = await html2canvas(element);

    const data = canvas.toDataURL('image/jpg');
    const link = document.createElement('a');

    if (typeof link.download === 'string') {
      link.href = data;
      link.download = 'image.jpg';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      window.open(data);
    }
  };

  const handleChange = (event) => {
    const value = event.target.value;
    setLang(value);
  };

  const handletitleChange = (event) => {
    const value = event.target.value;
    setTitle(value);
  }

  return (
    <>
      <div className='top'>
        <select name='langs' id='langs' onChange={handleChange} value={lang}>
          {langNames.map((lang) => (
            <option value={lang} key={lang}>
              {lang}
            </option>
          ))}
        </select>
        <button
          type='button'
          onClick={handleDownloadImage}
          className='buuton button_type_editor'
        >
          <img src={shoot} alt='take a shoot' className='shoot-img' />
        </button>
      </div>

      <div className='editor' ref={printRef}>
        <div className='editor__frame'>
          <header className='editor-header'>
            <div className='editor__title-img'>
              <svg
                _ngcontent-knt-c6=''
                height='14'
                viewBox='0 0 54 14'
                width='54'
                xmlns='http://www.w3.org/2000/svg'
                className='ng-star-inserted'
              >
                <g _ngcontent-knt-c6='' fill='none' transform='translate(1 1)'>
                  <circle
                    _ngcontent-knt-c6=''
                    cx='6'
                    cy='6'
                    fill='#FF5F56'
                    r='6'
                    stroke='#E0443E'
                  ></circle>
                  <circle
                    _ngcontent-knt-c6=''
                    cx='26'
                    cy='6'
                    fill='#FFBD2E'
                    r='6'
                    stroke='#DEA123'
                  ></circle>
                  <circle
                    _ngcontent-knt-c6=''
                    cx='46'
                    cy='6'
                    fill='#27C93F'
                    r='6'
                    stroke='#1AAB29'
                  ></circle>
                </g>
              </svg>
            </div>

            <input className='editor__title' value={title} onChange={handletitleChange}/>
          </header>
          <header className='editor-header'></header>
          <CodeMirror
            className='editor__area'
            value={code}
            height='auto'
            theme={okaidia}
            extensions={[loadLanguage(lang)]}
            onChange={onChange}
            maxWidth='350'
          />
          <div></div>
        </div>
      </div>
    </>
  );
}
