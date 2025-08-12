import { useEffect, useState, useContext } from 'react';
import './styler.css';
import { useNavigate } from 'react-router';
import { Context } from "./context";
import Fun3 from './animation';  

const Fun1 = () => {
  const navigate = useNavigate();
  const { setSummary, setUrdu } = useContext(Context);
  const [pending, setPending] = useState(true);
  const [inpu, setInpu] = useState("");
  const [loading, setLoading] = useState(false);  

  const inpuhandler = (val) => {
    setInpu(val.target.value);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (window.puter && window.puter.ai && typeof window.puter.ai.chat === "function") {
        setPending(false);
        clearInterval(interval);
      }
    }, 300);
    return () => clearInterval(interval);
  }, []);

  const summarizer = async () => {
    setLoading(true); 
    try {
      const response = await window.puter.ai.chat(`Summarize this text  ${inpu}`);
      const res = await window.puter.ai.chat(`Translate it to Urdu ${response.message.content}`);
      setSummary(response.message?.content || 'No summary available');
      setUrdu(res.message?.content || 'Error while translating');
    } catch (err) {
      setSummary(`Error occurred: ${err}`);
      setUrdu('Error occurred while Translating');
    }
    setLoading(false);
    setInpu("");
    navigate("/output");
  };

  if (loading) {
    return <Fun3 />;
  }

  return (
    <div className='Main'>
      <div>
        <h1 className='Heading'>AI Text Summarizer</h1>
      </div>
      <div className={'Holder'}>
        <textarea
          value={inpu}
          className="container"
          onChange={inpuhandler}
          disabled={pending}
          placeholder='Enter text here ...'
        />
        <button className='Butt' onClick={summarizer} disabled={pending}>Submit</button>
      </div>
    </div>
  );
};

export default Fun1;
