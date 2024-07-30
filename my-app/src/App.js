import './App.css';

//COMPONENT -> in the form of function, must be in upper case
function Header(props) {
  console.log(`props`, props, props.title)
  return <header>
    <h1><a href="/">{props.title}</a></h1>
  </header>
}

function Nav(props) {
  const lis = [];
  for(let i = 0; i < props.topics.length; i++) {
    let t = props.topics[i];
    lis.push(<li key={t.id}><a href={`/read`+t.id}>{t.title}</a></li>)
  }
  return <nav>
    <ol>
      {lis}
    </ol>
  </nav>
}

//props 사용할때는 {props.title} 이렇게 괄호 안에 넣어야함
function Article(props) {
  return <article>
  <h2>{props.title}</h2>
  {props.body}
  </article>
}

function App() {
  const topics = [
    {id: 1, title:`html`, body:`html is ...`},
    {id: 2, title:`css`, body:`css is ...`},
    {id: 3, title:`js`, body:`js is ...`}
  ]
  return (
    <div>
      <Header title="React"></Header>
      <Header></Header>
      <Nav topics={topics}></Nav>
      <Article title="welcome" body="hello, web"></Article>
    </div>
  );
}

export default App;
