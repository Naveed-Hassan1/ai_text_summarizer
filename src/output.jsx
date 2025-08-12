import { useNavigate } from 'react-router';
import './styler.css';
import { useContext, useState } from 'react';
import { Context } from "./context";

const Fun2 = () => {
  const [speach, setSpeach] = useState(true);
  const { summary } = useContext(Context);
  const { urdu } = useContext(Context);
  const navigate = useNavigate();

  const reset = () => {
    navigate("/input");
  };
  const copier = (text) => {
    navigator.clipboard.writeText(text).then(console.log("Copied"));
  };

  const audio = (text, lang) => {
    speechSynthesis.getVoices().forEach(voice => {
      console.log(`${voice.name} - ${voice.lang}`);
    });



    if (speach) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      window.speechSynthesis.speak(utterance);
    } else {
      window.speechSynthesis.cancel();
    }
    setSpeach(!speach);
  };


  return (
    <div className='Main'>
      <div>
        <h1 className='Heading'>AI Text Summarizer</h1>
      </div>
      <div className={'Holder'}>

        <div className='Foonts'>
          <div className="fontinternal">
            <i className="fa fa-volume-up" onClick={() => { audio(summary, 'en-US'); }} style={{ paddingRight: "20px", color: "#6e48aa" }}></i>
            <i className="fa fa-copy" onClick={() => copier(summary)} style={{ paddingRight: "20px", color: "#6e48aa" }}></i>
          </div>
          <div className="fontinternal">
            <i className="fa fa-volume-up" onClick={() => { audio(urdu, 'ur-') }} style={{ paddingRight: "20px", color: "#6e48aa" }}></i>
            <i className="fa fa-copy" onClick={() => copier(urdu)} style={{ paddingRight: "20px", color: "#6e48aa" }}></i>
          </div>
        </div>


        <div style={{ display: "flex", flexDirection: "row", gap: "20px" }}>
          <textarea value={summary} className="container" placeholder='summary will be here...' readOnly />
          <textarea value={urdu} className="container" placeholder='Urdu Translation will be here...' readOnly />
        </div>
        <button className='Butt' onClick={reset}>Reset</button>
      </div>
    </div>
  );
};

export default Fun2;
