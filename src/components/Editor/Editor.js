import './Editor.css';
import CodeMirror from '@uiw/react-codemirror';
import { okaidia } from '@uiw/codemirror-theme-okaidia';
import { loadLanguage } from '@uiw/codemirror-extensions-langs';
import { useRef, useState } from 'react';
import html2canvas from 'html2canvas';

export default function Editor() {
  const [code, setCode] = useState("console.log('hello world!');");
  const onChange = ((editor, change) => {
    setCode(editor)
  });

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


  return (
    <>    
    <button type="button" onClick={handleDownloadImage}>
    Download as Image
  </button> 
    <div className='editor' ref={printRef}>
      <header className='editor-header'></header>
      <CodeMirror
        className='editor__area'
        value={code}
        height= 'auto'
        theme={okaidia}
        extensions={[loadLanguage('javascript')]}
        onChange={onChange}
        
      />
       <div>

    </div>

    </div>

    </>
  );
}
