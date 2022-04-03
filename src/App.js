import "./App.css";
import { useState } from "react";

function Header() {
  return (
    <header>
      <h1>고량주</h1>
    </header>
  );
}
function Nav(props) {
  const lis = [];
  for (let i = 0; i < props.topics.length; i++) {
    let t = props.topics[i];
    lis.push(<li key={t.id}>{t.name}</li>);
  }
  return (
    <>
      <ul>{lis}</ul>
    </>
  );
}

function Article(props) {
  const box1 = [];
  for (let i = 0; i < props.topics.length; i++) {
    let t = props.topics[i];
    box1.push(
      <div className="box" key={t.id}>
        <img src={t.image} alt={t.content} />
        <p>{t.name}</p>
      </div>
    );
  }
  return <>{box1}</>;
}

function Create(props) {
  return (
    <>
      <div className="item">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            const name = event.target.name.value;
            const image = event.target.image.value;
            const content = event.target.content.value;
            props.onCreate(name, image, content);
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
          />
          <p>이미지</p>
          <input name="image" className="image" type="text" placeholder="url" />
          <p>내용</p>
          <input
            name="content"
            className="content"
            type="text"
            placeholder="내용"
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
      id: 1,
      name: "1",
      content: "1",
      image: "images/1.jpg",
    },
    {
      id: 2,
      name: "2",
      content: "2",
      image: "images/2.jpg",
    },
    {
      id: 3,
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
        onCreate={(_name, _image, _content) => {
          const newTopic = {
            // id: nextId,
            name: _name,
            image: _image,
            content: _content,
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
        <Header />
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
