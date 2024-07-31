import './App.css';
import {useState} from 'react';

//COMPONENT -> in the form of function, must be in upper case
function Header(props) {
  console.log(`props`, props, props.title)
  return <header>
    <h1><a href="/" onClick={function(event){
      event.preventDefault();
      props.onChangeMode();
    }}>{props.title}</a></h1>
  </header>
}

//PROPS -> props 사용할때는 {props.title} 이렇게 괄호 안에 넣어야함
function Article(props) {
  return <article>
  <h2>{props.title}</h2>
  {props.body}
  </article>
}

function Nav(props) {
  const lis = [];
  for(let i = 0; i < props.topics.length; i++) {
    let t = props.topics[i];
    lis.push(<li key={t.id}>
      <a id={t.id} href={`/read`+t.id} onClick={event=>{
        event.preventDefault();
        props.onChangeMode(Number(event.target.id)); //event.target -> event를 유발시킨 타켓
      }}>{t.title} </a>
    </li>)
  }
  return <nav>
    <ol>
      {lis}
    </ol>
  </nav>
}

function Create(props) {
  return <article>
    <h2>create</h2>
    <form onSubmit={event => {
      event.preventDefault();
      const title = event.target.title.value; //event.target = form tag
      const body = event.target.body.value;
      props.onCreate(title, body);
    }}>
      <p><input type="text" name="title" placeholder='title'></input></p>
      <p><textarea name="body" placeholder='body'></textarea></p>
      <p><input type="submit" value="Create"></input></p>    
    </form>
  </article>
}

function App() {
  // const _mode = useState(`Welcome`); //useState는 배열을 나타냄
  // console.log(_mode);
  // const mode = _mode[0];
  // const setMode = _mode[1];
  const [mode, setMode] = useState(`Welcome`);
  const [id, setId] = useState(null);
  const [topics, setTopics] = useState([
    {id: 1, title:`html`, body:`html is ...`},
    {id: 2, title:`css`, body:`css is ...`},
    {id: 3, title:`js`, body:`js is ...`}
  ]);
  const [nextId, setNextId] = useState(4);
  let content = null;
  if (mode === `Welcome`) {
    content = <Article title="welcome" body="hello, web"></Article>
  } else if (mode === `READ`) {
    let title, body = null;
    for (let i=0; i<topics.length; i++) {
      console.log(topics[i].id, id)
      if(topics[i].id === id){ //숫자인지 아닌지 잘 판별하기
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content =  <Article title={title} body={body}></Article>
  } else if (mode === 'create'){
    content = <Create onCreate={(_title, _body)=>{
      const newTopic = {id:nextId, title:_title, body:_body}
      const newTopics = [...topics];
      newTopics.push(newTopic);
      setTopics(newTopics);
      setMode('READ');
      setId(nextId);
      setNextId(nextId+1);
    }}></Create>
  }
  return (
    <div>
      <Header title="React" onChangeMode={()=>{
        // alert(`header`);
        setMode('Welcome')
      }}></Header>
      <Header></Header>
      <Nav topics={topics} onChangeMode={(_id)=>{
        // alert(id);
        setMode('READ')
        setId(_id);
      }}></Nav>
      {content}
      <a href="/create" onClick={event => {
        event.preventDefault(); //stops the browser from navigating to /create
        setMode('create');
      }}>create</a>
    </div>
  );
}

export default App;
