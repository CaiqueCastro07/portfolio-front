import logo from './logo.svg';
import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Intro from './components/Intro/Intro';
import BlackBar from './components/BlackBar/BlackBar';
import ToDo from './components/ToDo/ToDo';
import ContactForm from './components/ContactForm/ContactForm';
import ExtraIntro from './components/ExtraIntro/ExtraIntro';
import ApiController from './Api/api';
import SignIn from './components/SignIn/SignIn';
import { User } from './data/data';
import { useState, useEffect } from 'react';

function App() {

  const [logged, setLogged] = useState(false)
  const [loginScreen, setLoginScreen] = useState(false)
  const [todoPlace,setTodoPlace]= useState(false)

  useEffect(() => {
    const el = document.getElementById('todo-place')

    !todoPlace && setTodoPlace(el)
  }, []);


  const session = localStorage.getItem("login")

  //localStorage.removeItem("login")
  if (session && !logged) {
    setLogged(session)
    setLoginScreen(false)
  }

  return (
    <div className="page">
      <SignIn loginScreen={loginScreen} setLoginScreen={setLoginScreen} logged={logged} setLogged={setLogged}></SignIn>
      <Header setLogged={setLogged} logged={logged} setLoginScreen={setLoginScreen}></Header>
      <main className="main">
        <img src={require("./assets/BG-arrow-left.png")} alt="" className="bg-arrow-right" />
        <Intro todoPlace={todoPlace}></Intro>
        <BlackBar></BlackBar>
        <ToDo logged={logged}></ToDo>
        <img src={require("./assets/BG-arrow-up.png")} alt="" className="bg-arrow-up" />
        <ExtraIntro></ExtraIntro>
        <ContactForm></ContactForm>
      </main>
      <Footer></Footer>
    </div>
  )
}

export default App;
