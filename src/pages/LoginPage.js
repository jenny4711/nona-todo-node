import React,{useState} from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import api from '../utils/api';
import {useNavigate,Navigate} from "react-router-dom"

import { Link } from "react-router-dom";

const LoginPage = ({user,setUser}) => {
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [error,setError]=useState("")
  const navigate =useNavigate()

  async function handleSubmit(evt){
    evt.preventDefault();
    try{
      const res = await api.post("/user/login",{email,password})
      if(res.status === 200){
        setUser(res.data.user)
        sessionStorage.setItem("token",res.data.token)
        api.defaults.headers["authorization"]="Bearer "+res.data.token
        setError("")
        navigate("/")

      }
      throw new Error(res.message)

    }catch(err){
      setError(err.message)
    }
  }
  if(user){
    return <Navigate to="/"/>
  }
  return (
    <div className="display-center">
      <Form className="login-box" onSubmit={handleSubmit}>
        <h1>로그인</h1>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" onChange={(evt)=>setEmail(evt.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" onChange={(evt)=>setPassword(evt.target.value)}/>
        </Form.Group>
        <div className="button-box">
          <Button type="submit" className="button-primary">
            Login
          </Button>
          <span>
            계정이 없다면? <Link to="/register">회원가입 하기</Link>
          </span>
        </div>
      </Form>
    </div>
  );
};

export default LoginPage;
