import "./App.css";
import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { useMutation } from "convex/react";
import Badge from 'react-bootstrap/Badge'
import { ChangeEvent, FormEventHandler, useState } from "react";
//import { Placeholder } from "react-bootstrap";

function App() {

  const [statement, setStatement] = useState("")
  const [button, setButtonOn] = useState(true)
  const [placeholder, setPlaceholder] = useState("")

  const characterLimit = 280
  const feeling = useQuery(api.sentiment.get);

  const postsomething = useMutation(api.sentiment.createSentiment)


  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const time: Date = new Date()
    const datetime: string = time.toLocaleString()
    postsomething({ text: statement, datetime: datetime })
    setPlaceholder("")
    // Your form submission logic here
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newStatement = e.target.value;
    const characterLimit = 100;
    setPlaceholder(e.target.value)
    setStatement(newStatement);

    if (newStatement.length <= characterLimit) {
      setButtonOn(false);
    }
    if (newStatement.length > characterLimit - 1) {
      setButtonOn(true);
    }
  };




  return (
    <div className="App">
      <div>What People Are Saying:</div>
      <div className="bodybox">
        <div id='chatboarder'>
          {feeling?.map(({ _id, text, datetime }) => (
            <div className="chatlog" key={_id}>{text}&nbsp;{datetime}</div>
          ))}
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <label>I've been holding back! What I really wanna say is...&nbsp;</label>
        <input
          type="text" name="chat" id="chatbox" placeholder={placeholder} onChange={handleChange} />
        <Badge
          className='mt-3'
          bg={`${statement.length > characterLimit ? 'danger' : 'primary'}`}>
          {statement.length}/{characterLimit}
        </Badge>
        <button
       
          disabled={button}>
          Share and then Zip It.
        </button>
      </form>
    </div>
  );
}




export default App;