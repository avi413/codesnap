import './Main.css'
import Editor from '../Editor/Editor';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

function Main() {
  return (
    <main className='main'>
      <Header />
      <div className='main__editor-container'>
      <Editor />
      </div>

      <Footer />
    </main>
  );
}

export default Main;
