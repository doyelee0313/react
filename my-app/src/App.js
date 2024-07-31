import './App.css';

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
        props.onChangeMode(event.target.id); //event.target -> event를 유발시킨 타켓
      }}>{t.title} </a>
    </li>)
  }
  return <nav>
    <ol>
      {lis}
    </ol>
  </nav>
}

function App() {
  const mode = `Welcome`;
  const topics = [
    {id: 1, title:`html`, body:`html is ...`},
    {id: 2, title:`css`, body:`css is ...`},
    {id: 3, title:`js`, body:`js is ...`}
  ]
  let content = null;
  if (mode === `Welcome`) {
    content = <Article title="welcome" body="hello, web"></Article>
  } else if (mode === `READ`) {
    content =  <Article title="read" body="hello, web"></Article>
  }
  return (
    <div>
      <Header title="React" onChangeMode={()=>{
        alert(`header`);
      }}></Header>
      <Header></Header>
      <Nav topics={topics} onChangeMode={(id)=>{
        alert(id);
      }}></Nav>
      {content}
    </div>
  );
}

export default App;
