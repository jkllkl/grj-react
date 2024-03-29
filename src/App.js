import { useState } from "react";


function Nav(props) {  
  return (
    <>
      <ul>
        {
          props.topics.map(item => <li key={item.name}>{item.name}</li>)
        }
      </ul>
    </>
  );
}

function Article(props) {
  const box1 = [];
  for (let i = 0; i < props.topics.length; i++) {
    let t = props.topics[i];
    box1.push(
      <div className="box" key={t.name}>
        <img src={t.image} alt={t.content} />
        <p>{t.name}</p>
      </div>
    );
  }
  return <>{box1}</>;
}

function Create(props) {
  const [data, setData] = useState({name: "", image: "", content: ""});
  return (
    <>
      <div className="item">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            props.onCreate(data);
          }}
          className="item-form"
        >
          <div
            className="close"
            value="Close"
            onClick={(event) => {
              event.preventDefault();
              props.onClose();
            }}
          >
            X
          </div>
          <p>이름</p>
          <input
            className="name"
            required
            maxLength="10"
            type="text"
            placeholder="이름"
            name="name"
            onChange={(event) => setData({...data, name: event.target.value})}
          />
          <p>이미지</p>
          <input name="image" className="image" type="text" placeholder="url"
                 onChange={(event) => setData({...data, image: event.target.value})} />
          <p>내용</p>
          <input
            name="content"
            className="content"
            type="text"
            placeholder="내용"
            onChange={(event) => setData({...data, content: event.target.value})}
          />
          <input className="submit" type="submit" value="Create"></input>
        </form>
      </div>
    </>
  );
}

function App() {
  let [mode, setMode] = useState("READ");
  // const [id, setId] = useState(null);
  // const [nextId, setNextId] = useState(4);
  const [topics, setTopics] = useState([
    {
      name: "1",
      content: "1",
      image: "images/1.jpg",
    },
    {
      name: "2",
      content: "2",
      image: "images/2.jpg",
    },
    {
      name: "3",
      content: "3",
      image: "images/3.jpg",
    },
  ]);

  let box = null;
  // if (mode === "READ") {
  //   let name,
  //     image,
  //     content = null;
  //   for (let i = 0; i < topics.length; i++) {
  //     if (topics[i].id === i) {
  //       name = topics[i].name;
  //       image = topics[i].image;
  //       content = topics[i].content;
  //     }
  //   }
  //   box = (
  //     <>
  //       <div className="box">
  //         <img src={image} alt={name} />
  //         <p>{content}</p>
  //       </div>
  //     </>
  //   );
  // } else
  if (mode === "CREATE") {
    box = (
      <Create
        onCreate={({ name, image, content }) => {
          const newTopic = {
            // id: nextId,
            name,
            image,
            content,
          };
          const newTopics = [...topics];
          // value값을 복제한 새로운 value
          newTopics.push(newTopic);
          setTopics(newTopics);
          setMode("READ");
          // // setId(nextId);
          // setNextId(nextId + 1);
        }}
        onClose={() => {
          setMode("READ");
        }}
      ></Create>
    );
  }

  return (
    <div className="App">
      <div className="main">
      <header>
        <h1>고량주</h1>
      </header>
        <div className="container">
          <aside>
            <button
              onClick={(event) => {
                event.preventDefault();
                setMode("CREATE");
              }}
              className="button"
            >
              추가
              {mode === "CREATE" ? <Create /> : null}
            </button>
            <Nav topics={topics}></Nav>
          </aside>
          <section>
            <Article topics={topics} />
            {box}
          </section>
        </div>
      </div>
    </div>
  );
}

export default App;
